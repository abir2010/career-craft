import type { ResumeData } from "../types";
import {
  Mail,
  Phone,
  MapPin,
  Link as LinkIcon,
  Briefcase,
  GraduationCap,
  Star,
  FolderKanban,
  Award,
} from "lucide-react";

interface ResumePreviewProps {
  resumeData: ResumeData;
}

export function ResumePreview({ resumeData }: ResumePreviewProps) {
  const {
    personalInfo,
    experience,
    education,
    projects,
    skills,
    extracurriculars,
  } = resumeData;

  return (
    <div
      id="resume-preview"
      className="w-[8.5in] min-h-[11in] bg-white text-gray-800 p-10 shadow-lg font-body scale-[0.6] origin-top md:scale-100"
    >
      <header className="text-center border-b-2 border-gray-300 pb-4 mb-6">
        <h1 className="text-5xl font-bold font-headline text-gray-800 tracking-wide">
          {personalInfo.fullName}
        </h1>
        <div className="flex justify-center items-center gap-x-6 gap-y-2 mt-4 text-sm text-gray-600 flex-wrap">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <span>{personalInfo.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span>{personalInfo.phoneNumber}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{personalInfo.address}</span>
          </div>
          <div className="flex items-center gap-2">
            <LinkIcon className="w-4 h-4" />
            <span>{personalInfo.link}</span>
          </div>
        </div>
      </header>
      <main className="space-y-8">
        {personalInfo.careerObjective && (
          <section>
            <p className="text-gray-600 text-sm">
              {personalInfo.careerObjective}
            </p>
          </section>
        )}
        <section>
          <h2 className="text-2xl font-bold font-headline text-primary border-b-2 border-primary/30 pb-2 mb-3 flex items-center gap-2">
            <Briefcase /> Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-lg font-semibold font-headline">
                    {exp.jobTitle}
                  </h3>
                  <p className="text-sm font-medium text-gray-600">
                    {exp.startDate} - {exp.endDate}
                  </p>
                </div>
                <div className="flex justify-between items-baseline">
                  <p className="font-medium text-gray-700">{exp.company}</p>
                  <p className="text-sm italic text-gray-500">
                    {exp.location}
                  </p>
                </div>
                <ul className="mt-1 list-disc list-inside text-gray-600 space-y-1 text-sm">
                  {exp.description
                    .split("\n")
                    .map(
                      (line, i) =>
                        line && <li key={i}>{line.replace(/^- /, "")}</li>
                    )}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold font-headline text-primary border-b-2 border-primary/30 pb-2 mb-3 flex items-center gap-2">
            <GraduationCap /> Education
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-lg font-semibold font-headline">
                    {edu.degree}
                  </h3>
                  <p className="text-sm font-medium text-gray-600">
                    {edu.gradDate}
                  </p>
                </div>
                <div className="flex justify-between items-baseline">
                  <p className="font-medium text-gray-700">{edu.school}</p>
                  <p className="text-sm italic text-gray-500">
                    {edu.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold font-headline text-primary border-b-2 border-primary/30 pb-2 mb-3 flex items-center gap-2">
            <FolderKanban /> Projects
          </h2>
          <div className="space-y-4">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-lg font-semibold font-headline">
                    {proj.name}
                  </h3>
                  {proj.link && (
                    <a
                      href={`//${proj.link}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      {proj.link}
                    </a>
                  )}
                </div>
                <ul className="mt-1 list-disc list-inside text-gray-600 space-y-1 text-sm">
                  {proj.description
                    .split("\n")
                    .map(
                      (line, i) =>
                        line && <li key={i}>{line.replace(/^- /, "")}</li>
                    )}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold font-headline text-primary border-b-2 border-primary/30 pb-2 mb-3 flex items-center gap-2">
            <Star /> Skills
          </h2>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {skills.map(
              (skill) =>
                skill.name && (
                  <span
                    key={skill.id}
                    className="bg-primary/10 text-foreground font-medium py-1 px-3 rounded-full text-sm"
                  >
                    {skill.name}
                  </span>
                )
            )}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold font-headline text-primary border-b-2 border-primary/30 pb-2 mb-3 flex items-center gap-2">
            <Award /> Extracurricular Activities
          </h2>
          <div className="space-y-3">
            {extracurriculars.map((extra) => (
              <div key={extra.id}>
                <h3 className="text-lg font-semibold font-headline">
                  {extra.activity}
                </h3>
                <ul className="mt-1 list-disc list-inside text-gray-600 space-y-1 text-sm">
                  {extra.description
                    .split("\n")
                    .map(
                      (line, i) =>
                        line && <li key={i}>{line.replace(/^- /, "")}</li>
                    )}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
