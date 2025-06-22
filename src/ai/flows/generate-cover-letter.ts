'use server';

/**
 * @fileOverview AI agent that generates a tailored cover letter from a prompt.
 *
 * - generateCoverLetter - A function that handles the cover letter generation process.
 * - GenerateCoverLetterInput - The input type for the generateCoverLetter function.
 * - GenerateCoverLetterOutput - The return type for the generateCoverLetter function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCoverLetterInputSchema = z.object({
  jobDescription: z.string().describe('The description of the job posting.'),
  resume: z.string().describe('The resume of the applicant.'),
  tone: z.string().describe('The tone of the cover letter.'),
  keyQualifications: z.string().describe('Key qualifications for the job from the job description'),
});
export type GenerateCoverLetterInput = z.infer<typeof GenerateCoverLetterInputSchema>;

const GenerateCoverLetterOutputSchema = z.object({
  coverLetter: z.string().describe('The generated cover letter.'),
});
export type GenerateCoverLetterOutput = z.infer<typeof GenerateCoverLetterOutputSchema>;

export async function generateCoverLetter(input: GenerateCoverLetterInput): Promise<GenerateCoverLetterOutput> {
  return generateCoverLetterFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCoverLetterPrompt',
  input: {schema: GenerateCoverLetterInputSchema},
  output: {schema: GenerateCoverLetterOutputSchema},
  prompt: `You are a professional cover letter writer. You will be provided a job description, resume, tone, and key qualifications. You will use this information to write a cover letter tailored to the job description.

Job Description: {{{jobDescription}}}

Resume: {{{resume}}}

Tone: {{{tone}}}

Key Qualifications: {{{keyQualifications}}}

Cover Letter:`,
});

const generateCoverLetterFlow = ai.defineFlow(
  {
    name: 'generateCoverLetterFlow',
    inputSchema: GenerateCoverLetterInputSchema,
    outputSchema: GenerateCoverLetterOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
