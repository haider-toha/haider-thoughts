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
    id: "current",
    title: "Senior Full-Stack Developer",
    company: "Tech Innovations Inc.",
    location: "Remote",
    period: "2023 - Present",
    type: "work",
    description: "Lead developer responsible for architecting and building scalable web applications using modern technologies.",
    highlights: [
      "Led a team of 4 developers in rebuilding the main product platform",
      "Improved application performance by 60% through optimization techniques",
      "Implemented CI/CD pipelines reducing deployment time by 80%",
      "Mentored junior developers and conducted technical interviews"
    ],
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS", "Docker"],
    link: "https://techinnovations.example.com"
  },
  {
    id: "previous-work",
    title: "Full-Stack Developer",
    company: "StartupXYZ",
    location: "San Francisco, CA",
    period: "2021 - 2023",
    type: "work",
    description: "Developed and maintained multiple client applications and internal tools for a fast-growing startup.",
    highlights: [
      "Built the company's main SaaS platform from scratch",
      "Integrated multiple third-party APIs and payment systems",
      "Collaborated with design team to implement pixel-perfect UIs",
      "Participated in agile development processes and sprint planning"
    ],
    technologies: ["React", "Next.js", "Python", "Django", "MongoDB", "Redis"],
    link: "https://startupxyz.example.com"
  },
  {
    id: "education",
    title: "Bachelor of Computer Science",
    company: "University of Technology",
    location: "Boston, MA",
    period: "2018 - 2022",
    type: "education",
    description: "Comprehensive computer science education with focus on software engineering and web technologies.",
    highlights: [
      "Graduated Magna Cum Laude with 3.8 GPA",
      "President of Computer Science Student Association",
      "Led development of university's student portal",
      "Teaching Assistant for Web Development courses"
    ],
    technologies: ["Java", "Python", "JavaScript", "SQL", "Algorithm Design"],
  },
  {
    id: "freelance",
    title: "Freelance Web Developer",
    company: "Self-Employed",
    location: "Remote",
    period: "2019 - 2021",
    type: "project",
    description: "Provided web development services to small businesses and startups.",
    highlights: [
      "Successfully completed 15+ projects for various clients",
      "Specialized in e-commerce and portfolio websites",
      "Maintained 5-star rating on freelance platforms",
      "Generated $50K+ in revenue over 2 years"
    ],
    technologies: ["WordPress", "Shopify", "React", "PHP", "MySQL"],
  }
];

export function ExperienceSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getTypeColor = (type: Experience['type']) => {
    switch (type) {
      case 'work': return 'bg-green-500';
      case 'education': return 'bg-blue-500';
      case 'project': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeLabel = (type: Experience['type']) => {
    switch (type) {
      case 'work': return 'Work';
      case 'education': return 'Education';
      case 'project': return 'Project';
      default: return 'Other';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold">Professional Journey</h3>
        <p className="text-muted-foreground">
          My career path, education, and key experiences that shaped my expertise
        </p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border"></div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="relative flex gap-6">
              {/* Timeline dot */}
              <div className="flex flex-col items-center">
                <div className={`w-3 h-3 rounded-full ${getTypeColor(exp.type)} relative z-10`}></div>
                <Badge variant="secondary" className="mt-2 text-xs">
                  {getTypeLabel(exp.type)}
                </Badge>
              </div>

              {/* Content */}
              <Card className="flex-1 p-6 hover:shadow-lg transition-shadow">
                <div 
                  className="cursor-pointer"
                  onClick={() => toggleExpanded(exp.id)}
                >
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
                        <a 
                          href={exp.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          title="Visit website"
                        >
                          <ExternalLink size={16} />
                        </a>
                      </Button>
                    )}
                  </div>

                  <p className="text-muted-foreground mb-4">{exp.description}</p>

                  {/* Technology tags */}
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

                {/* Expanded content */}
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

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-primary">5+</div>
          <div className="text-sm text-muted-foreground">Years Experience</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-primary">20+</div>
          <div className="text-sm text-muted-foreground">Projects Completed</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-primary">10+</div>
          <div className="text-sm text-muted-foreground">Technologies Mastered</div>
        </Card>
      </div>
    </div>
  );
}
