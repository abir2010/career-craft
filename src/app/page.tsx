import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileText, Mail, PenSquare, ArrowRight } from "lucide-react";

export default function Home() {
  const features = [
    {
      title: "Resume Builder",
      description:
        "Craft a professional resume from scratch with our easy-to-use editor and templates.",
      href: "/builder",
      icon: FileText,
    },
    {
      title: "AI Cover Letter Generator",
      description:
        "Generate personalized cover letters tailored to specific job descriptions using AI.",
      href: "/cover-letter",
      icon: Mail,
    },
    {
      title: "AI Resume Review",
      description:
        "Get instant feedback and a score on your resume to improve your chances of getting hired.",
      href: "/review",
      icon: PenSquare,
    },
  ];

  return (
    <div className="flex flex-col h-full bg-background">
      <header className="p-8">
        <h1 className="text-4xl font-headline font-bold text-foreground">
          Welcome to CareerCraft AI
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Your all-in-one solution for building a winning career profile.
        </p>
      </header>
      <main className="flex-1 p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="hover:shadow-lg transition-shadow duration-300"
          >
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="font-headline">{feature.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>{feature.description}</CardDescription>
              <Button asChild className="mt-4 w-full">
                <Link href={feature.href}>
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </main>
    </div>
  );
}
