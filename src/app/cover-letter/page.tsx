"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  generateCoverLetter,
  type GenerateCoverLetterOutput,
} from "@/ai/flows/generate-cover-letter";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles, Clipboard, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  jobDescription: z
    .string()
    .min(50, "Please provide a more detailed job description."),
  resume: z.string().min(100, "Please provide a more detailed resume."),
  tone: z.string(),
  keyQualifications: z
    .string()
    .min(10, "Please list at least one key qualification."),
});

export default function CoverLetterPage() {
  const [generation, setGeneration] =
    useState<GenerateCoverLetterOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobDescription: "",
      resume: "",
      tone: "Professional",
      keyQualifications: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setGeneration(null);
    try {
      const result = await generateCoverLetter(values);
      setGeneration(result);
    } catch (error) {
      console.error("Error generating cover letter:", error);
      toast({
        title: "Error",
        description: "Failed to generate cover letter. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleCopy = () => {
    if (generation?.coverLetter) {
      navigator.clipboard.writeText(generation.coverLetter);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-headline font-bold">
          AI Cover Letter Generator
        </h1>
        <p className="text-muted-foreground mt-2">
          Fill in the details below to generate a professional cover letter in
          seconds.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Your Information</CardTitle>
            <CardDescription>
              Provide the job details and your resume.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="jobDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Paste the job description here..."
                          rows={8}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="resume"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Resume</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Paste your resume text here..."
                          rows={8}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="keyQualifications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Key Qualifications</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., 5+ years of React experience, Project Management"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tone of Voice</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a tone" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Professional">
                            Professional
                          </SelectItem>
                          <SelectItem value="Enthusiastic">
                            Enthusiastic
                          </SelectItem>
                          <SelectItem value="Formal">Formal</SelectItem>
                          <SelectItem value="Creative">Creative</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Cover Letter
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-8">
          <Card className="flex-1 flex flex-col">
            <CardHeader>
              <CardTitle className="font-headline">
                Generated Cover Letter
              </CardTitle>
              <CardDescription>
                Your AI-generated cover letter will appear here.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 relative">
              {isLoading && (
                <div className="absolute inset-0 bg-background/50 flex flex-col items-center justify-center rounded-b-lg">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="mt-4 text-muted-foreground">
                    Crafting your letter...
                  </p>
                </div>
              )}
              {generation ? (
                <div className="space-y-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopy}
                    className="absolute top-4 right-4"
                  >
                    {hasCopied ? (
                      <Check className="mr-2 h-4 w-4" />
                    ) : (
                      <Clipboard className="mr-2 h-4 w-4" />
                    )}
                    Copy
                  </Button>
                  <pre className="whitespace-pre-wrap text-sm text-foreground font-body p-4 bg-muted/50 rounded-md h-[400px] overflow-auto">
                    {generation.coverLetter}
                  </pre>
                </div>
              ) : (
                !isLoading && (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <p>Your generated letter will be displayed here.</p>
                  </div>
                )
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
