'use server';

/**
 * @fileOverview AI flow for generating interview questions and answers.
 *
 * - prepareForInterview - A function that accepts a topic and returns Q&A pairs.
 * - PrepareInterviewInput - The input type for the prepareForInterview function.
 * - PrepareInterviewOutput - The return type for the prepareForInterview function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PrepareInterviewInputSchema = z.object({
  topic: z
    .string()
    .describe('The topic or job role for which to generate interview questions.'),
  existingQuestions: z
    .array(z.string())
    .optional()
    .describe('A list of questions that have already been generated to avoid duplicates.'),
});
export type PrepareInterviewInput = z.infer<typeof PrepareInterviewInputSchema>;

const QaPairSchema = z.object({
  question: z.string().describe('A potential interview question.'),
  answer: z.string().describe('An ideal, well-structured answer to the question.'),
});

const PrepareInterviewOutputSchema = z.object({
  qaPairs: z
    .array(QaPairSchema)
    .describe('A list of 5-10 interview questions and their answers.'),
});
export type PrepareInterviewOutput = z.infer<typeof PrepareInterviewOutputSchema>;

export async function prepareForInterview(input: PrepareInterviewInput): Promise<PrepareInterviewOutput> {
  return prepareInterviewFlow(input);
}

const prepareInterviewPrompt = ai.definePrompt({
  name: 'prepareInterviewPrompt',
  input: {schema: PrepareInterviewInputSchema},
  output: {schema: PrepareInterviewOutputSchema},
  prompt: `You are an expert career coach and interviewer. A user wants to practice for an interview.
  
Given the topic or job role below, please generate 5-10 common and insightful interview questions. For each question, provide a detailed, well-structured, and ideal answer.

Topic: {{{topic}}}
{{#if existingQuestions}}

Please generate new questions that are different from the ones already provided below:
{{#each existingQuestions}}
- {{{this}}}
{{/each}}
{{/if}}`,
});

const prepareInterviewFlow = ai.defineFlow(
  {
    name: 'prepareInterviewFlow',
    inputSchema: PrepareInterviewInputSchema,
    outputSchema: PrepareInterviewOutputSchema,
  },
  async input => {
    const {output} = await prepareInterviewPrompt(input);
    return output!;
  }
);
