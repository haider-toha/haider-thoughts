import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Code, 
  Palette, 
  Smartphone, 
  Globe, 
  Database, 
  Zap, 
  ExternalLink, 
  Github,
  Eye,
  Star
} from "lucide-react";
import { useState } from "react";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  skills: string[];
  examples: string[];
}

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

const services: Service[] = [
  {
    id: "frontend",
    title: "Frontend Development",
    description: "Creating beautiful, responsive, and interactive user interfaces using modern frameworks and libraries.",
    icon: Palette,
    skills: ["React", "Next.js", "Vue.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    examples: ["Single Page Applications", "Progressive Web Apps", "E-commerce Sites", "Dashboard Interfaces"]
  },
  {
    id: "backend",
    title: "Backend Development", 
    description: "Building robust, scalable server-side applications and APIs with proper architecture and security.",
    icon: Database,
    skills: ["Node.js", "Python", "Express", "FastAPI", "PostgreSQL", "MongoDB"],
    examples: ["REST APIs", "GraphQL Services", "Database Design", "Authentication Systems"]
  },
  {
    id: "fullstack",
    title: "Full-Stack Solutions",
    description: "End-to-end application development from concept to deployment with complete ownership.",
    icon: Globe,
    skills: ["MERN Stack", "Next.js", "Prisma", "AWS", "Docker", "CI/CD"],
    examples: ["SaaS Platforms", "Web Applications", "Content Management", "Real-time Apps"]
  },
  {
    id: "mobile",
    title: "Mobile Development",
    description: "Cross-platform mobile applications that provide native-like experiences on all devices.",
    icon: Smartphone,
    skills: ["React Native", "Expo", "Flutter", "iOS", "Android", "App Store"],
    examples: ["iOS Apps", "Android Apps", "Cross-platform", "PWA Mobile"]
  },
  {
    id: "optimization",
    title: "Performance & SEO",
    description: "Optimizing applications for speed, accessibility, and search engine visibility.",
    icon: Zap,
    skills: ["Web Vitals", "Lighthouse", "SEO", "A11y", "Performance", "Analytics"],
    examples: ["Core Web Vitals", "SEO Optimization", "Accessibility", "Speed Optimization"]
  },
  {
    id: "consulting",
    title: "Technical Consulting",
    description: "Strategic guidance on technology choices, architecture decisions, and development processes.",
    icon: Code,
    skills: ["Architecture", "Code Review", "Tech Stack", "Best Practices", "Mentoring", "Strategy"],
    examples: ["Tech Audits", "Architecture Planning", "Team Training", "Process Improvement"]
  }
];

const projects: Project[] = [
  {
    id: "ecommerce",
    title: "E-Commerce Platform",
    description: "A modern, fast, and scalable e-commerce solution with real-time inventory and payment processing.",
    image: "/api/placeholder/400/250",
    category: "Full-Stack",
    technologies: ["Next.js", "Stripe", "PostgreSQL", "Redis", "AWS"],
    liveUrl: "https://demo-ecommerce.example.com",
    githubUrl: "https://github.com/example/ecommerce",
    featured: true
  },
  {
    id: "dashboard",
    title: "Analytics Dashboard",
    description: "Real-time analytics dashboard with interactive charts and data visualization components.",
    image: "/api/placeholder/400/250", 
    category: "Frontend",
    technologies: ["React", "D3.js", "Chart.js", "WebSocket", "TypeScript"],
    liveUrl: "https://dashboard-demo.example.com",
    githubUrl: "https://github.com/example/dashboard"
  },
  {
    id: "mobile-app",
    title: "Fitness Tracking App",
    description: "Cross-platform mobile app for tracking workouts, nutrition, and progress with social features.",
    image: "/api/placeholder/400/250",
    category: "Mobile",
    technologies: ["React Native", "Firebase", "Redux", "Native Base"],
    liveUrl: "https://fitness-app.example.com",
    featured: true
  },
  {
    id: "api",
    title: "Social Media API",
    description: "RESTful API for a social media platform with user authentication, posts, and real-time messaging.",
    image: "/api/placeholder/400/250",
    category: "Backend", 
    technologies: ["Node.js", "Express", "MongoDB", "Socket.io", "JWT"],
    githubUrl: "https://github.com/example/social-api"
  },
  {
    id: "portfolio",
    title: "Creative Portfolio Site",
    description: "Animated portfolio website for a creative agency with smooth transitions and interactive elements.",
    image: "/api/placeholder/400/250",
    category: "Frontend",
    technologies: ["Next.js", "Framer Motion", "GSAP", "Tailwind CSS"],
    liveUrl: "https://creative-portfolio.example.com",
    githubUrl: "https://github.com/example/portfolio"
  },
  {
    id: "saas",
    title: "Project Management SaaS",
    description: "Complete project management solution with team collaboration, time tracking, and reporting.",
    image: "/api/placeholder/400/250",
    category: "Full-Stack",
    technologies: ["React", "Node.js", "PostgreSQL", "Docker", "AWS"],
    liveUrl: "https://project-mgmt.example.com",
    featured: true
  }
];

export function WhatIDoSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  const categories = ["all", "Full-Stack", "Frontend", "Backend", "Mobile"];
  
  const filteredProjects = selectedCategory === "all" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold">What I Do</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          I specialize in creating digital solutions that solve real problems. 
          From concept to deployment, I handle every aspect of modern web and mobile development.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => {
          const IconComponent = service.icon;
          return (
            <Card key={service.id} className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <IconComponent size={24} className="text-primary" />
                </div>
                <h4 className="text-lg font-semibold">{service.title}</h4>
              </div>
              
              <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                {service.description}
              </p>
              
              <div className="space-y-3">
                <div>
                  <h5 className="text-sm font-medium mb-2">Technologies:</h5>
                  <div className="flex flex-wrap gap-1">
                    {service.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h5 className="text-sm font-medium mb-2">Examples:</h5>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {service.examples.map((example) => (
                      <li key={example} className="flex items-center gap-1">
                        <span className="w-1 h-1 bg-primary rounded-full"></span>
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Portfolio Section */}
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-bold">Featured Projects</h3>
          <p className="text-muted-foreground">
            A showcase of some of my recent work across different domains
          </p>
          
          {/* Category Filter */}
          <div className="flex justify-center gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="capitalize"
              >
                {category === "all" ? "All Projects" : category}
              </Button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="relative overflow-hidden">
                <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <div className="text-4xl font-bold text-primary/40">
                    {project.title.substring(0, 2)}
                  </div>
                </div>
                
                {project.featured && (
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-yellow-500 text-black">
                      <Star size={12} className="mr-1" />
                      Featured
                    </Badge>
                  </div>
                )}
                
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  {project.liveUrl && (
                    <Button size="sm" asChild>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <Eye size={16} className="mr-2" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button size="sm" variant="secondary" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github size={16} className="mr-2" />
                        Code
                      </a>
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-lg font-semibold">{project.title}</h4>
                  <Badge variant="outline" className="text-xs">
                    {project.category}
                  </Badge>
                </div>
                
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <Card className="p-8 text-center bg-gradient-to-r from-primary/5 to-secondary/5">
        <h3 className="text-2xl font-bold mb-4">Ready to Start Your Project?</h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          I'm always excited to work on new and interesting projects. 
          Let's discuss how I can help bring your ideas to life.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg">
            Get in Touch
          </Button>
          <Button size="lg" variant="outline">
            View Full Portfolio
            <ExternalLink size={16} className="ml-2" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
