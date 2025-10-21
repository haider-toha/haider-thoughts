import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, ExternalLink, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  type: "work" | "education" | "project";
  description: string;
  highlights: string[];
  technologies: string[];
  link?: string;
}

const experiences: Experience[] = [
  {
    id: "gs",
    title: "Software Engineer (Tech Risk & Platforms)",
    company: "Goldman Sachs",
    location: "London, UK",
    period: "Jul 2025 – Present",
    type: "work",
    description:
      "Building compliance automation and analytics platforms to scale audit and risk operations across global infrastructure.",
    highlights: [
      "Built a compliance monitoring platform (React, TypeScript, Flask, PostgreSQL) that reduced reporting cycles from 10 days to 2 hours.",
      "Designed FastAPI REST and GraphQL APIs for AWS evidence ingestion, optimised with GIN indexes and caching.",
      "Developed real-time dashboards (React + D3.js) processing 120GB/week of logs to surface control gaps and anomalies.",
      "Led AI-driven anomaly detection (PyTorch, scikit-learn) with 92% precision, deployed via Docker and ECS."
    ],
    technologies: ["React", "TypeScript", "Flask", "FastAPI", "PostgreSQL", "AWS", "Docker", "PyTorch"],
  },
  {
    id: "intern",
    title: "Software Engineering Intern (Global Investment Research)",
    company: "Goldman Sachs",
    location: "Birmingham, UK",
    period: "Summer 2024",
    type: "work",
    description:
      "Developed an NLP-powered search microservice to streamline financial data retrieval for 150+ research analysts.",
    highlights: [
      "Built an NLP query service translating natural language into MongoDB calls, cutting query time from 35s to 4s.",
      "Hosted 8-bit quantized Llama-3-8B model on SageMaker, reducing compute cost by 50%.",
      "Implemented semantic vector search for keyword disambiguation, achieving 94% query-to-API accuracy.",
      "Containerized Java/Python services using Docker and deployed on AWS ECS with Terraform IaC."
    ],
    technologies: ["Python", "Java", "Docker", "AWS SageMaker", "Terraform", "MongoDB", "LLMs", "Vector Search"],
  },
  {
    id: "provost",
    title: "Founder & Lead Engineer (Full-Stack and AI)",
    company: "Provost Academics",
    location: "London, UK",
    period: "May 2024 – Present",
    type: "project",
    description:
      "Founded an AI tutoring platform that automates academic marking and matches students with expert tutors.",
    highlights: [
      "Built an AI marking engine (GPT-4 + pgvector) achieving 95% agreement with human examiners across 200+ scripts.",
      "Developed full-stack platform using React, TypeScript, Supabase and Stripe, serving 50+ paying clients at £5k MRR.",
      "Implemented CI/CD pipelines with GitHub Actions, automated migrations and GDPR-compliant policies.",
      "Introduced human-in-the-loop feedback for model refinement and A/B prompt versioning."
    ],
    technologies: ["React", "TypeScript", "Supabase", "PostgreSQL", "Stripe", "pgvector", "LLMs", "CI/CD"],
    link: "https://www.provostacademics.co.uk",
  },
  {
    id: "imperial",
    title: "MEng Aeronautical Engineering",
    company: "Imperial College London",
    location: "London, UK",
    period: "2021 – 2025",
    type: "education",
    description:
      "Graduated with Upper Second-Class Honours. Specialized in computational methods, high-performance computing and applied mathematics.",
    highlights: [
      "Developed a parallel Navier–Stokes solver in C++ with hybrid MPI/OpenMP, achieving 12x performance speedup.",
      "Led Imperial Drone Society (Chair) and rebuilt the team from 6 to 75 members with £4k in sponsorships.",
      "Captain of Imperial Men’s Cricket Friendly XI, improving team performance and engagement.",
      "Completed coursework in CFD, data-driven control and structural mechanics."
    ],
    technologies: ["C++", "MPI", "OpenMP", "Python", "Data Science", "Simulation", "Leadership"],
  },
];

export function ExperienceSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getTypeColor = (type: Experience["type"]) => {
    switch (type) {
      case "work":
        return "bg-green-500";
      case "education":
        return "bg-blue-500";
      case "project":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  const getTypeLabel = (type: Experience["type"]) => {
    switch (type) {
      case "work":
        return "Work";
      case "education":
        return "Education";
      case "project":
        return "Project";
      default:
        return "Other";
    }
  };

  return (
    <div className="space-y-6">

      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border"></div>

        <div className="space-y-8">
          {experiences.map((exp) => (
            <div key={exp.id} className="relative flex gap-6">
              <div className="flex flex-col items-center">
                <div className={`w-3 h-3 rounded-full ${getTypeColor(exp.type)} relative z-10`}></div>
                <Badge variant="secondary" className="mt-2 text-xs">
                  {getTypeLabel(exp.type)}
                </Badge>
              </div>

              <Card className="flex-1 p-6 hover:shadow-lg transition-shadow">
                <div className="cursor-pointer" onClick={() => toggleExpanded(exp.id)}>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-lg font-semibold">{exp.title}</h4>
                        {expandedId === exp.id ? (
                          <ChevronDown size={16} className="text-muted-foreground" />
                        ) : (
                          <ChevronRight size={16} className="text-muted-foreground" />
                        )}
                      </div>
                      <p className="text-primary font-medium">{exp.company}</p>
                      <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>{exp.period}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin size={14} />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>

                    {exp.link && (
                      <Button
                        variant="ghost"
                        size="icon"
                        asChild
                        className="ml-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <a href={exp.link} target="_blank" rel="noopener noreferrer" title="Visit website">
                          <ExternalLink size={16} />
                        </a>
                      </Button>
                    )}
                  </div>

                  <p className="text-muted-foreground mb-4">{exp.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {exp.technologies.slice(0, 4).map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {exp.technologies.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{exp.technologies.length - 4} more
                      </Badge>
                    )}
                  </div>
                </div>

                {expandedId === exp.id && (
                  <div className="space-y-4 pt-4 border-t">
                    <div>
                      <h5 className="font-semibold mb-2">Key Achievements</h5>
                      <ul className="space-y-1">
                        {exp.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-primary mt-1">•</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {exp.technologies.length > 4 && (
                      <div>
                        <h5 className="font-semibold mb-2">All Technologies</h5>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech) => (
                            <Badge key={tech} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
