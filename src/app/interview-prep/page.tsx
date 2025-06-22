"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  prepareForInterview,
  type PrepareInterviewOutput,
} from "@/ai/flows/prepare-interview";
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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Loader2, Sparkles, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  topic: z
    .string()
    .min(3, "Please provide a topic for the interview questions."),
});

export default function InterviewPrepPage() {
  const [qaPairs, setQaPairs] = useState<PrepareInterviewOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setQaPairs(null);
    try {
      const result = await prepareForInterview(values);
      setQaPairs(result);
    } catch (error) {
      console.error("Error generating interview questions:", error);
      toast({
        title: "Error",
        description: "Failed to generate questions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-headline font-bold">
          AI Interview Preparation
        </h1>
        <p className="text-muted-foreground mt-2">
          Enter a topic, job title, or skill to generate practice interview
          questions and answers.
        </p>
      </div>

      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Interview Topic</CardTitle>
            <CardDescription>
              What would you like to practice for?
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
                  name="topic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Topic / Job Title / Skill</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., React Native Developer, Product Management, System Design"
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
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Questions
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
              <CardContent className="flex flex-col items-center justify-center h-64 p-6">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="mt-4 text-lg text-muted-foreground font-semibold">
                  Generating your questions...
                </p>
                <p className="text-sm text-muted-foreground">
                  This may take a moment.
                </p>
              </CardContent>
            </Card>
          )}

          {!isLoading && !qaPairs && (
            <Card className="flex-1">
              <CardContent className="flex flex-col items-center justify-center h-64 p-6 text-center">
                <MessageSquare className="h-12 w-12 text-muted-foreground/50" />
                <p className="mt-4 text-lg text-muted-foreground font-semibold">
                  Your questions and answers will appear here
                </p>
                <p className="text-sm text-muted-foreground">
                  Enter a topic above to get started.
                </p>
              </CardContent>
            </Card>
          )}

          {qaPairs && (
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">
                  Practice Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {qaPairs.qaPairs.map((qa, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                      <AccordionTrigger className="text-left font-semibold">
                        {qa.question}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="prose prose-sm dark:prose-invert max-w-none text-foreground/80 whitespace-pre-wrap font-body">
                          {qa.answer}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
