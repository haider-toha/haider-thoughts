import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Github, Linkedin, Mail, MapPin, Calendar } from "lucide-react";

export function AboutSection() {
  const skills = [
    "React", "TypeScript", "Node.js", "Python", "Next.js", "Tailwind CSS",
    "PostgreSQL", "AWS", "Docker", "GraphQL", "Git", "Figma"
  ];

  const interests = [
    "🎮 Gaming", "📚 Reading", "🎵 Music", "📷 Photography", 
    "✈️ Travel", "🏃‍♂️ Running", "☕ Coffee", "🎨 Design"
  ];

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
          HT
        </div>
        
        <div className="flex-1 space-y-4">
          <div>
            <h3 className="text-2xl font-bold mb-2">Haider Toha</h3>
            <p className="text-muted-foreground text-lg">
              Full-Stack Developer & Creative Thinker
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>Remote / Global</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>Available for new projects</span>
            </div>
          </div>
          
          <div className="flex gap-3">
            <a
              href="https://github.com/mohammedhaidertoha"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
            >
              <Github size={16} />
              <span>GitHub</span>
            </a>
            <a
              href="mailto:contact@haidertoha.com"
              className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
            >
              <Mail size={16} />
              <span>Email</span>
            </a>
            <a
              href="https://linkedin.com/in/haidertoha"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
            >
              <Linkedin size={16} />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bio */}
      <Card className="p-6">
        <h4 className="text-lg font-semibold mb-3">About Me</h4>
        <div className="space-y-3 text-muted-foreground">
          <p>
            I'm a passionate full-stack developer with a love for creating digital experiences 
            that make a difference. With several years of experience in web development, I enjoy 
            working with modern technologies and solving complex problems.
          </p>
          <p>
            When I'm not coding, you'll find me exploring new technologies, contributing to 
            open-source projects, or sharing my knowledge through blog posts and tutorials. 
            I believe in continuous learning and am always excited to take on new challenges.
          </p>
          <p>
            I have a particular interest in user experience design, performance optimization, 
            and building scalable applications. My goal is to create software that not only 
            works well but also provides an exceptional user experience.
          </p>
        </div>
      </Card>

      {/* Skills */}
      <Card className="p-6">
        <h4 className="text-lg font-semibold mb-4">Technical Skills</h4>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge
              key={skill}
              variant="secondary"
              className="px-3 py-1 text-sm hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </Card>

      {/* Interests */}
      <Card className="p-6">
        <h4 className="text-lg font-semibold mb-4">Interests & Hobbies</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {interests.map((interest) => (
            <div
              key={interest}
              className="flex items-center justify-center p-3 bg-muted/50 rounded-lg text-sm font-medium hover:bg-muted transition-colors"
            >
              {interest}
            </div>
          ))}
        </div>
      </Card>

      {/* Fun Facts */}
      <Card className="p-6">
        <h4 className="text-lg font-semibold mb-4">Fun Facts</h4>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span>I've been coding for over 5 years and still get excited by new frameworks</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span>Coffee enthusiast - I can tell you the best coffee shops in any city I visit</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span>I believe the best code is code you don't have to write</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span>Always learning something new - currently exploring AI/ML applications</span>
          </li>
        </ul>
      </Card>
    </div>
  );
}
