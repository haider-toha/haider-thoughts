import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  Globe, 
  Zap, 
  BarChart3, 
  Code, 
  ExternalLink 
} from "lucide-react";

const projects = [
  {
    id: "self-eng-agent",
    title: "Self-Engineering Agent Framework",
    description:
      "An autonomous agent framework that self-engineers new tools via TDD. When a capability is missing, it uses an LLM (GPT-4) to generate Python unit tests and code, verifies them in a secure Docker sandbox and integrates the new tool into its vector database registry for future use.",
    icon: Zap, // 'Zap' for automation/dynamic action or 'Brain' for intelligence
    technologies: ["Python", "OpenAI API", "Docker", "Flask", "Vector DB", "WebSockets"],
    links: {
      code: "https://github.com/your-repo/Self-Engineering-Agent-Framework.git", // Add your link
    }
  },
  {
    id: "fpl",
    title: "FPL Squad Optimiser",
    description:
      "A data-driven Fantasy Premier League optimiser. It uses a Python script with Pandas for data ETL from the FPL API, then applies integer linear programming via the PuLP library to find the optimal team. The model maximizes expected points subject to constraints like budget and team composition.",
    icon: BarChart3,
    technologies: ["Python", "Pandas", "PuLP", "Matplotlib", "NumPy"],
  },
  {
    id: "terratone",
    title: "Global Sentiment Map",
    description:
      "A real-time global sentiment visualizer. A Python worker scrapes multilingual headlines, queues them in Redis and a FastAPI service processes them using a fine-tuned Hugging Face BERT model for sentiment. The Next.js frontend renders the aggregated data on an interactive 3D globe using react-three-fiber.",
    icon: Globe,
    technologies: ["Next.js", "react-three-fiber", "FastAPI", "Hugging Face", "Redis", "Python"],
  },
  {
    id: "recipe-ancestry",
    title: "Recipe Ancestry",
    description:
      "A culinary NLP tool that traces recipe lineage. A FastAPI backend uses spaCy for named entity recognition (ingredients, techniques) from user input. A NetworkX knowledge graph, populated with historical recipe data, finds the closest 'relative' recipes. The relationships are visualized in the frontend using D3.js.",
    icon: Brain, 
    technologies: ["Python", "spaCy", "NetworkX", "FastAPI", "Next.js", "D3.js"],
  },
  {
    id: "chroma-ci",
    title: "Chroma CI",
    description:
      "A self-hosted visual regression testing CI tool. It uses GitHub Actions to trigger a Node.js script on pull requests. This script runs Playwright to capture component screenshots, compares them against a baseline using Pixelmatch for pixel-level diffing and posts the visual comparison back to the PR via the GitHub API.",
    icon: Zap,
    technologies: ["Node.js", "Playwright", "Pixelmatch", "GitHub Actions", "Docker", "TypeScript"],
  },
  {
    id: "ai-tools",
    title: "AI & Throwaway Experiments",
    description:
      "A monorepo of AI experiments. Includes a FastAPI backend for serving models, a LangChain-based RAG (Retrieval-Augmented Generation) pipeline querying a PostgreSQL vector store and local LLM sandboxes. These tools explore prompt engineering, function calling and vector search for personal workflows.",
    icon: Zap,
    technologies: ["Python", "LangChain", "FastAPI", "PostgreSQL", "OpenAI API"],
  },
  {
    id: "calligraphy",
    title: "Arabic Calligraphy Generator",
    description:
      "A generative art project for Arabic calligraphy. I trained a lightweight PyTorch (DCGAN) model on a custom dataset of calligraphic forms. The system uses OpenCV for image preprocessing and experiments with style transfer techniques using pre-trained Transformers to blend artistic styles.",
    icon: Code,
    technologies: ["PyTorch", "OpenCV", "Transformers", "TensorFlow"],
  }
];

export function WhatIDoSection() {
  return (
    <div className="space-y-8">
      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => {
          const Icon = project.icon;
          return (
            <Card
              key={project.id}
              className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon size={24} className="text-primary" />
                </div>
                <h4 className="text-lg font-semibold">{project.title}</h4>
              </div>

              <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1 mb-4">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="outline" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>

              {project.links && (
                <div className="flex gap-3">
                  {project.links.live && (
                    <Button size="sm" asChild>
                      <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                        Live
                        <ExternalLink size={14} className="ml-1" />
                      </a>
                    </Button>
                  )}
                  {project.links.code && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={project.links.code} target="_blank" rel="noopener noreferrer">
                        Code
                      </a>
                    </Button>
                  )}
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* CTA */}
      <Card className="p-8 text-center bg-gradient-to-r from-primary/5 to-secondary/5">
        <h3 className="text-2xl font-bold mb-4">Always Building, Always Learning</h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          I like side projects that teach me something new about systems, people or creativity. 
          If you’re working on something interesting, I’d love to hear about it.
        </p>
        <Button size="lg" asChild>
          <a href="mailto:mohammedhaidertoha@gmail.com">Get in Touch</a>
        </Button>
      </Card>
    </div>
  );
}
