'use server';

/**
 * @fileOverview AI flow for reviewing resumes and providing feedback.
 *
 * - reviewResume -  A function that accepts resume text and returns feedback.
 * - ReviewResumeInput - The input type for the reviewResume function.
 * - ReviewResumeOutput - The return type for the reviewResume function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ReviewResumeInputSchema = z.object({
  resumeText: z
    .string()
    .describe('The text content of the resume to be reviewed.'),
});

export type ReviewResumeInput = z.infer<typeof ReviewResumeInputSchema>;

const ReviewResumeOutputSchema = z.object({
  score: z.number().describe('A score between 0 and 100 representing the overall quality of the resume.'),
  feedback: z.string().describe('Detailed feedback on the resume, including strengths and weaknesses and suggestions for improvement.'),
});

export type ReviewResumeOutput = z.infer<typeof ReviewResumeOutputSchema>;

export async function reviewResume(input: ReviewResumeInput): Promise<ReviewResumeOutput> {
  return reviewResumeFlow(input);
}

const reviewResumePrompt = ai.definePrompt({
  name: 'reviewResumePrompt',
  input: {schema: ReviewResumeInputSchema},
  output: {schema: ReviewResumeOutputSchema},
  prompt: `You are an expert career coach specializing in resume writing.

You will analyze the provided resume text and provide feedback on its strengths and weaknesses.

Based on your analysis, give the resume an overall score between 0 and 100.

Provide detailed feedback, including specific areas for improvement. Explain your score.

Resume Text: {{{resumeText}}}`,
});

const reviewResumeFlow = ai.defineFlow(
  {
    name: 'reviewResumeFlow',
    inputSchema: ReviewResumeInputSchema,
    outputSchema: ReviewResumeOutputSchema,
  },
  async input => {
    const {output} = await reviewResumePrompt(input);
    return output!;
  }
);
