"use client";

import { useState } from "react";
import { ResumeForm } from "./components/ResumeForm";
import { ResumePreview } from "./components/ResumePreview";
import type { ResumeData } from "./types";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { initialResumeData } from "./initial-data";

export default function BuilderPage() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col h-full">
      <header className="p-4 border-b bg-card flex items-center justify-between no-print">
        <div>
          <h1 className="text-2xl font-headline font-bold">Resume Builder</h1>
          <p className="text-muted-foreground text-sm">
            Fill out the form to see your resume update in real-time.
          </p>
        </div>
        <Button onClick={handlePrint}>
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
      </header>
      <div className="flex-1 grid md:grid-cols-[450px_1fr] overflow-hidden">
        <div className="overflow-y-auto no-print">
          <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />
        </div>
        <div className="bg-muted/30 overflow-y-auto p-4 md:p-8 flex justify-center">
          <ResumePreview resumeData={resumeData} />
        </div>
      </div>
    </div>
  );
}
