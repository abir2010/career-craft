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
      className="w-[8.5in] min-h-[11in] bg-white text-foreground p-8 shadow-lg font-body scale-[0.6] origin-top md:scale-100"
    >
      <header className="text-center border-b-2 border-gray-300 pb-4 mb-4">
        <h1 className="text-5xl font-bold font-headline text-foreground tracking-wide">
          {personalInfo.fullName}
        </h1>
        <div className="flex justify-center items-center gap-x-6 gap-y-2 mt-3 text-sm text-muted-foreground flex-wrap">
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
      <main>
        {personalInfo.careerObjective && (
          <section className="mb-4">
            <p className="text-muted-foreground text-sm">
              {personalInfo.careerObjective}
            </p>
          </section>
        )}
        <section className="mb-4">
          <h2 className="text-2xl font-bold font-headline text-primary border-b-2 border-primary/30 pb-1 mb-2 flex items-center gap-3 leading-tight">
            <Briefcase /> <span>Experience</span>
          </h2>
          {experience.map((exp, index) => (
            <div
              key={exp.id}
              className={`text-sm ${
                index < experience.length - 1 ? "mb-3" : ""
              }`}
            >
              <div className="flex justify-between items-baseline">
                <h3 className="text-lg font-semibold font-headline">
                  {exp.jobTitle}
                </h3>
                <p className="text-sm font-medium text-muted-foreground">
                  {exp.startDate} - {exp.endDate}
                </p>
              </div>
              <div className="flex justify-between items-baseline">
                <p className="font-medium text-foreground">{exp.company}</p>
                <p className="text-sm italic text-muted-foreground">
                  {exp.location}
                </p>
              </div>
              <ul className="mt-1 list-disc list-inside text-muted-foreground space-y-0.5 text-sm">
                {exp.description
                  .split("\n")
                  .map(
                    (line, i) =>
                      line && <li key={i}>{line.replace(/^- /, "")}</li>
                  )}
              </ul>
            </div>
          ))}
        </section>

        <section className="mb-4">
          <h2 className="text-2xl font-bold font-headline text-primary border-b-2 border-primary/30 pb-1 mb-2 flex items-center gap-3 leading-tight">
            <GraduationCap /> <span>Education</span>
          </h2>
          {education.map((edu, index) => (
            <div
              key={edu.id}
              className={`${index < education.length - 1 ? "mb-2" : ""}`}
            >
              <div className="flex justify-between items-baseline">
                <h3 className="text-lg font-semibold font-headline">
                  {edu.degree}
                </h3>
                <p className="text-sm font-medium text-muted-foreground">
                  {edu.gradDate}
                </p>
              </div>
              <div className="flex justify-between items-baseline">
                <p className="font-medium text-foreground">{edu.school}</p>
                <p className="text-sm italic text-muted-foreground">
                  {edu.location}
                </p>
              </div>
            </div>
          ))}
        </section>

        <section className="mb-4">
          <h2 className="text-2xl font-bold font-headline text-primary border-b-2 border-primary/30 pb-1 mb-2 flex items-center gap-3 leading-tight">
            <FolderKanban /> <span>Projects</span>
          </h2>
          {projects.map((proj, index) => (
            <div
              key={proj.id}
              className={`${index < projects.length - 1 ? "mb-3" : ""}`}
            >
              <div className="flex justify-between items-baseline">
                <h3 className="text-lg font-semibold font-headline">
                  {proj.name}
                </h3>
                {proj.link && (
                  <a
                    href={`//${proj.link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-primary hover:underline shrink-0"
                  >
                    {proj.link}
                  </a>
                )}
              </div>
              <ul className="mt-1 list-disc list-inside text-muted-foreground space-y-0.5 text-sm">
                {proj.description
                  .split("\n")
                  .map(
                    (line, i) =>
                      line && <li key={i}>{line.replace(/^- /, "")}</li>
                  )}
              </ul>
            </div>
          ))}
        </section>

        <section className="mb-4">
          <h2 className="text-2xl font-bold font-headline text-primary border-b-2 border-primary/30 pb-1 mb-2 flex items-center gap-3 leading-tight">
            <Star /> <span>Skills</span>
          </h2>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {skills.map(
              (skill) =>
                skill.name && (
                  <span
                    key={skill.id}
                    className="bg-primary/10 text-primary font-medium py-1 px-3 rounded-full text-sm"
                  >
                    {skill.name}
                  </span>
                )
            )}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold font-headline text-primary border-b-2 border-primary/30 pb-1 mb-2 flex items-center gap-3 leading-tight">
            <Award /> <span>Extracurricular Activities</span>
          </h2>
          {extracurriculars.map((extra, index) => (
            <div
              key={extra.id}
              className={`${
                index < extracurriculars.length - 1 ? "mb-2" : ""
              }`}
            >
              <h3 className="text-lg font-semibold font-headline">
                {extra.activity}
              </h3>
              <ul className="mt-1 list-disc list-inside text-muted-foreground space-y-0.5 text-sm">
                {extra.description
                  .split("\n")
                  .map(
                    (line, i) =>
                      line && <li key={i}>{line.replace(/^- /, "")}</li>
                  )}
              </ul>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
