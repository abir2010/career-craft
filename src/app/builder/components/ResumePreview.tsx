import type { ResumeData } from "../types";
import { DefaultTemplate } from "../templates/DefaultTemplate";
import { ModernTemplate } from "../templates/ModernTemplate";
import { ClassicTemplate } from "../templates/ClassicTemplate";

interface ResumePreviewProps {
  resumeData: ResumeData;
  templateId: string;
}

export function ResumePreview({ resumeData, templateId }: ResumePreviewProps) {
  switch (templateId) {
    case "modern":
      return <ModernTemplate resumeData={resumeData} />;
    case "classic":
      return <ClassicTemplate resumeData={resumeData} />;
    case "default":
    default:
      return <DefaultTemplate resumeData={resumeData} />;
  }
}
