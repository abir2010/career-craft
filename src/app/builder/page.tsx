"use client";

import { useState } from "react";
import { ResumeForm } from "./components/ResumeForm";
import { ResumePreview } from "./components/ResumePreview";
import type { ResumeData } from "./types";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { initialResumeData } from "./initial-data";

export default function BuilderPage() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [templateId, setTemplateId] = useState<string>("default");
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPdf = async () => {
    setIsDownloading(true);
    try {
      const { default: html2canvas } = await import("html2canvas");
      const { default: jsPDF } = await import("jspdf");

      const element = document.getElementById("resume-preview");
      if (!element) {
        console.error("Resume preview element not found");
        setIsDownloading(false);
        return;
      }

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "letter",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgProps = pdf.getImageProperties(imgData);
      const imgWidth = imgProps.width;
      const imgHeight = imgProps.height;
      const ratio = pdfWidth / imgWidth;
      const pdfHeight = imgHeight * ratio;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("resume.pdf");
    } catch (error) {
      console.error("Failed to generate PDF", error);
    } finally {
      setIsDownloading(false);
    }
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
        <Button onClick={handleDownloadPdf} disabled={isDownloading}>
          {isDownloading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Downloading...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </>
          )}
        </Button>
      </header>
      <div className="flex-1 grid md:grid-cols-[450px_1fr] overflow-hidden">
        <div className="overflow-y-auto no-print">
          <ResumeForm
            resumeData={resumeData}
            setResumeData={setResumeData}
            templateId={templateId}
            setTemplateId={setTemplateId}
          />
        </div>
        <div className="bg-muted/30 overflow-y-auto p-4 md:p-8 flex justify-center">
          <ResumePreview resumeData={resumeData} templateId={templateId} />
        </div>
      </div>
    </div>
  );
}
