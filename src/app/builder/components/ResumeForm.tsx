"use client";

import type { ResumeData } from "../types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Briefcase,
  GraduationCap,
  User,
  Star,
  PlusCircle,
  Trash2,
} from "lucide-react";

const uid = () => `id-${Date.now()}${Math.random().toString(36).substr(2, 9)}`;

interface ResumeFormProps {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

export function ResumeForm({ resumeData, setResumeData }: ResumeFormProps) {
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setResumeData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [name]: value },
    }));
  };

  const handleExperienceChange = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === id ? { ...exp, [name]: value } : exp
      ),
    }));
  };
  const addExperience = () => {
    setResumeData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: uid(),
          jobTitle: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    }));
  };
  const removeExperience = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }));
  };

  const handleEducationChange = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, [name]: value } : edu
      ),
    }));
  };
  const addEducation = () => {
    setResumeData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        { id: uid(), degree: "", school: "", location: "", gradDate: "" },
      ],
    }));
  };
  const removeEducation = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  const handleSkillChange = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.map((skill) =>
        skill.id === id ? { ...skill, name: value } : skill
      ),
    }));
  };
  const addSkill = () => {
    setResumeData((prev) => ({
      ...prev,
      skills: [...prev.skills, { id: uid(), name: "" }],
    }));
  };
  const removeSkill = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill.id !== id),
    }));
  };

  return (
    <div className="p-6 space-y-6">
      <Accordion
        type="multiple"
        defaultValue={["personal-info", "experience"]}
        className="w-full"
      >
        <AccordionItem value="personal-info">
          <AccordionTrigger>
            <div className="flex items-center gap-2 font-headline">
              <User /> Personal Information
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 p-2">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                value={resumeData.personalInfo.fullName}
                onChange={handlePersonalInfoChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={resumeData.personalInfo.email}
                onChange={handlePersonalInfoChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                value={resumeData.personalInfo.phoneNumber}
                onChange={handlePersonalInfoChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={resumeData.personalInfo.address}
                onChange={handlePersonalInfoChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="link">LinkedIn/Portfolio</Label>
              <Input
                id="link"
                name="link"
                value={resumeData.personalInfo.link}
                onChange={handlePersonalInfoChange}
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="experience">
          <AccordionTrigger>
            <div className="flex items-center gap-2 font-headline">
              <Briefcase /> Work Experience
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 p-2">
            {resumeData.experience.map((exp) => (
              <Card key={exp.id}>
                <CardContent className="p-4 space-y-4 relative">
                  <div className="space-y-2">
                    <Label htmlFor={`jobTitle-${exp.id}`}>Job Title</Label>
                    <Input
                      id={`jobTitle-${exp.id}`}
                      name="jobTitle"
                      value={exp.jobTitle}
                      onChange={(e) => handleExperienceChange(exp.id, e)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`company-${exp.id}`}>Company</Label>
                    <Input
                      id={`company-${exp.id}`}
                      name="company"
                      value={exp.company}
                      onChange={(e) => handleExperienceChange(exp.id, e)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`location-${exp.id}`}>Location</Label>
                      <Input
                        id={`location-${exp.id}`}
                        name="location"
                        value={exp.location}
                        onChange={(e) => handleExperienceChange(exp.id, e)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`startDate-${exp.id}`}>Start Date</Label>
                      <Input
                        id={`startDate-${exp.id}`}
                        name="startDate"
                        value={exp.startDate}
                        onChange={(e) => handleExperienceChange(exp.id, e)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`endDate-${exp.id}`}>End Date</Label>
                    <Input
                      id={`endDate-${exp.id}`}
                      name="endDate"
                      value={exp.endDate}
                      onChange={(e) => handleExperienceChange(exp.id, e)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`description-${exp.id}`}>
                      Description
                    </Label>
                    <Textarea
                      id={`description-${exp.id}`}
                      name="description"
                      value={exp.description}
                      onChange={(e) => handleExperienceChange(exp.id, e)}
                      rows={4}
                    />
                  </div>
                  {resumeData.experience.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 text-destructive"
                      onClick={() => removeExperience(exp.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
            <Button
              variant="outline"
              onClick={addExperience}
              className="w-full"
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Add Experience
            </Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="education">
          <AccordionTrigger>
            <div className="flex items-center gap-2 font-headline">
              <GraduationCap /> Education
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 p-2">
            {resumeData.education.map((edu) => (
              <Card key={edu.id}>
                <CardContent className="p-4 space-y-4 relative">
                  <div className="space-y-2">
                    <Label htmlFor={`degree-${edu.id}`}>
                      Degree/Certificate
                    </Label>
                    <Input
                      id={`degree-${edu.id}`}
                      name="degree"
                      value={edu.degree}
                      onChange={(e) => handleEducationChange(edu.id, e)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`school-${edu.id}`}>
                      School/University
                    </Label>
                    <Input
                      id={`school-${edu.id}`}
                      name="school"
                      value={edu.school}
                      onChange={(e) => handleEducationChange(edu.id, e)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`location-${edu.id}`}>Location</Label>
                      <Input
                        id={`location-${edu.id}`}
                        name="location"
                        value={edu.location}
                        onChange={(e) => handleEducationChange(edu.id, e)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`gradDate-${edu.id}`}>
                        Graduation Date
                      </Label>
                      <Input
                        id={`gradDate-${edu.id}`}
                        name="gradDate"
                        value={edu.gradDate}
                        onChange={(e) => handleEducationChange(edu.id, e)}
                      />
                    </div>
                  </div>
                  {resumeData.education.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 text-destructive"
                      onClick={() => removeEducation(edu.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
            <Button
              variant="outline"
              onClick={addEducation}
              className="w-full"
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Add Education
            </Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="skills">
          <AccordionTrigger>
            <div className="flex items-center gap-2 font-headline">
              <Star /> Skills
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 p-2">
            <div className="grid grid-cols-2 gap-4">
              {resumeData.skills.map((skill) => (
                <div key={skill.id} className="flex items-center gap-2">
                  <Input
                    name="name"
                    value={skill.name}
                    onChange={(e) => handleSkillChange(skill.id, e)}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive shrink-0"
                    onClick={() => removeSkill(skill.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Button variant="outline" onClick={addSkill} className="w-full">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Skill
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
