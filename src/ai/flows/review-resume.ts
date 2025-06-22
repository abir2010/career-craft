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
  strengths: z.string().describe("A bulleted list of the resume's main strengths."),
  areasForImprovement: z.string().describe('A bulleted list of the key areas where the resume can be improved.'),
  actionableSuggestions: z.string().describe('A bulleted list of specific, actionable suggestions for improving the resume.'),
  detailedScore: z.object({
    writingStyle: z.number().describe('Score out of 100 for writing style, tone, and grammar.'),
    clarity: z.number().describe('Score out of 100 for clarity and conciseness.'),
    impact: z.number().describe('Score out of 100 for the use of impact statements and action verbs.'),
    structure: z.number().describe('Score out of 100 for the resume\'s formatting and structure.'),
  }).describe('A detailed breakdown of scores in four key categories.'),
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

You will analyze the provided resume text and provide structured feedback.

Based on your analysis, give the resume an overall score between 0 and 100.

Also provide a detailed score breakdown (0-100) for the following categories:
- Writing Style: Assess grammar, tone, and professional language.
- Clarity: Assess how clear and concise the information is.
- Impact: Assess the use of quantifiable achievements, action verbs, and impact-driven statements.
- Structure: Assess the formatting, layout, and overall readability.

Then, provide the following in bulleted lists:
- The resume's main strengths.
- The key areas where the resume can be improved.
- Specific, actionable suggestions for making those improvements.

Explain your score within the feedback.

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
