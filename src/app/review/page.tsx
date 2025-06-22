"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  reviewResume,
  type ReviewResumeOutput,
} from "@/ai/flows/review-resume";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { CircularProgress } from "@/components/ui/circular-progress";
import {
  Loader2,
  Sparkles,
  PenSquare,
  ThumbsUp,
  ThumbsDown,
  Wand2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  resumeText: z
    .string()
    .min(100, "Please paste your full resume for an accurate review."),
});

export default function ResumeReviewPage() {
  const [review, setReview] = useState<ReviewResumeOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      resumeText: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setReview(null);
    try {
      const result = await reviewResume(values);
      setReview(result);
    } catch (error) {
      console.error("Error reviewing resume:", error);
      toast({
        title: "Error",
        description: "Failed to review resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const detailedScores = review
    ? [
        {
          label: "Writing Style",
          value: review.detailedScore.writingStyle,
          color: "hsl(var(--chart-1))",
        },
        {
          label: "Clarity",
          value: review.detailedScore.clarity,
          color: "hsl(var(--chart-2))",
        },
        {
          label: "Impact",
          value: review.detailedScore.impact,
          color: "hsl(var(--chart-3))",
        },
        {
          label: "Structure",
          value: review.detailedScore.structure,
          color: "hsl(var(--chart-4))",
        },
      ]
    : [];

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-headline font-bold">AI Resume Review</h1>
        <p className="text-muted-foreground mt-2">
          Paste your resume below to get an instant score and detailed feedback.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Your Resume</CardTitle>
            <CardDescription>
              Paste your complete resume text into the box below.
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
                  name="resumeText"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Paste your resume text here..."
                          className="min-h-[400px] md:min-h-[600px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Review My Resume
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-8">
          {isLoading && (
            <Card className="flex-1">
              <CardContent className="flex flex-col items-center justify-center h-full p-6">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="mt-4 text-lg text-muted-foreground font-semibold">
                  Analyzing your resume...
                </p>
                <p className="text-sm text-muted-foreground">
                  This may take a moment.
                </p>
              </CardContent>
            </Card>
          )}

          {!isLoading && !review && (
            <Card className="flex-1">
              <CardContent className="flex flex-col items-center justify-center h-full p-6 text-center">
                <PenSquare className="h-12 w-12 text-muted-foreground/50" />
                <p className="mt-4 text-lg text-muted-foreground font-semibold">
                  Your review will appear here
                </p>
                <p className="text-sm text-muted-foreground">
                  Submit your resume to get started.
                </p>
              </CardContent>
            </Card>
          )}

          {review && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline">Overall Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center text-6xl font-bold font-headline text-primary">
                    {review.score}
                    <span className="text-3xl text-muted-foreground">
                      /100
                    </span>
                  </div>
                  <Progress value={review.score} className="mt-4 h-3" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-headline">
                    Detailed Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  {detailedScores.map((score) => (
                    <div
                      key={score.label}
                      className="flex flex-col items-center gap-2"
                    >
                      <CircularProgress
                        value={score.value}
                        color={score.color}
                        size={80}
                        strokeWidth={8}
                      />
                      <p className="text-sm font-medium text-muted-foreground">
                        {score.label}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-headline flex items-center gap-2">
                    <ThumbsUp className="h-5 w-5 text-green-500" />
                    Strengths
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm dark:prose-invert max-w-none text-foreground text-sm space-y-4 whitespace-pre-wrap font-body">
                    {review.strengths}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline flex items-center gap-2">
                    <ThumbsDown className="h-5 w-5 text-destructive" />
                    Areas for Improvement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm dark:prose-invert max-w-none text-foreground text-sm space-y-4 whitespace-pre-wrap font-body">
                    {review.areasForImprovement}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline flex items-center gap-2">
                    <Wand2 className="h-5 w-5 text-primary" />
                    Actionable Suggestions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm dark:prose-invert max-w-none text-foreground text-sm space-y-4 whitespace-pre-wrap font-body">
                    {review.actionableSuggestions}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
