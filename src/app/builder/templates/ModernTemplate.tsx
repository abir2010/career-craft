import type { ResumeData } from "../types";

interface TemplateProps {
  resumeData: ResumeData;
}

export function ModernTemplate({ resumeData }: TemplateProps) {
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
      className="w-[8.5in] min-h-[11in] bg-white text-foreground flex shadow-lg font-body scale-[0.6] origin-top md:scale-100"
    >
      {/* Left Column */}
      <aside className="w-1/3 bg-slate-100 text-slate-800 p-8 flex flex-col">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-headline text-primary tracking-tight">
            {personalInfo.fullName}
          </h1>
          {personalInfo.careerObjective && (
            <p className="text-xs mt-2 text-slate-600">{personalInfo.careerObjective}</p>
          )}
        </div>

        <div className="space-y-4">
          <section>
            <h2 className="text-sm font-bold uppercase text-primary tracking-widest mb-2">Contact</h2>
            <div className="text-xs space-y-1 text-slate-600">
              <p>{personalInfo.email}</p>
              <p>{personalInfo.phoneNumber}</p>
              <p>{personalInfo.address}</p>
              {personalInfo.link && <a href={`//${personalInfo.link}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline block break-words">{personalInfo.link}</a>}
            </div>
          </section>
          
          <section>
            <h2 className="text-sm font-bold uppercase text-primary tracking-widest mb-2">Skills</h2>
            <div className="text-xs text-slate-600">
              {skills.map((skill) => skill.name).join(", ")}
            </div>
          </section>

          <section>
            <h2 className="text-sm font-bold uppercase text-primary tracking-widest mb-2">Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="text-xs mb-2">
                <h3 className="font-bold text-slate-700">{edu.degree}</h3>
                <p className="text-slate-600">{edu.school}</p>
                <p className="text-slate-500 italic">{edu.gradDate}</p>
              </div>
            ))}
          </section>

          {extracurriculars.length > 0 && (
             <section>
                <h2 className="text-sm font-bold uppercase text-primary tracking-widest mb-2">Extracurriculars</h2>
                {extracurriculars.map((extra) => (
                    <div key={extra.id} className="text-xs mb-2">
                        <h3 className="font-bold text-slate-700">{extra.activity}</h3>
                         <ul className="list-disc list-inside text-slate-600">
                           {extra.description.split('\n').map((line, i) => (line && <li key={i}>{line.replace(/^- /, '')}</li>))}
                         </ul>
                    </div>
                ))}
             </section>
          )}
        </div>
        <div className="mt-auto"/>
      </aside>

      {/* Right Column */}
      <main className="w-2/3 p-8 space-y-6">
        <section>
          <h2 className="text-2xl font-bold font-headline text-primary border-b-2 border-primary/30 pb-2 mb-4">
            Experience
          </h2>
          {experience.map((exp, index) => (
            <div key={exp.id} className={`text-sm ${index < experience.length - 1 ? "mb-4" : ""}`}>
              <div className="flex justify-between items-baseline">
                <h3 className="text-base font-semibold font-headline">{exp.jobTitle}</h3>
                <p className="text-xs font-medium text-muted-foreground">{exp.startDate} - {exp.endDate}</p>
              </div>
              <div className="flex justify-between items-baseline">
                <p className="font-medium text-foreground">{exp.company}</p>
                <p className="text-xs italic text-muted-foreground">{exp.location}</p>
              </div>
              <ul className="mt-1 list-disc list-inside text-muted-foreground space-y-0.5 text-xs">
                {exp.description.split("\n").map((line, i) => line && <li key={i}>{line.replace(/^- /, "")}</li>)}
              </ul>
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-2xl font-bold font-headline text-primary border-b-2 border-primary/30 pb-2 mb-4">
            Projects
          </h2>
          {projects.map((proj, index) => (
            <div key={proj.id} className={`${index < projects.length - 1 ? "mb-4" : ""}`}>
              <div className="flex justify-between items-baseline">
                <h3 className="text-base font-semibold font-headline">{proj.name}</h3>
                {proj.link && (
                  <a href={`//${proj.link}`} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-primary hover:underline shrink-0">
                    {proj.link}
                  </a>
                )}
              </div>
              <ul className="mt-1 list-disc list-inside text-muted-foreground space-y-0.5 text-xs">
                {proj.description.split("\n").map((line, i) => line && <li key={i}>{line.replace(/^- /, "")}</li>)}
              </ul>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
