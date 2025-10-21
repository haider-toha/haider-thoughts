import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Github, Linkedin, Mail, MapPin, Calendar } from "lucide-react";

export function AboutSection() {
  const skills = [
    "React", "TypeScript", "Python", "Node.js", "Next.js", "Tailwind CSS",
    "PostgreSQL", "AWS", "Docker", "GraphQL", "FastAPI", "Flask", "PyTorch", "TensorFlow"
  ];

  const interests = [
    "🏏 Cricket", "📚 Reading", "🕹️ Gaming", "✈️ Travel",
    "☕ Coffee", "🏋️‍♂️ Gym", "🖋️ Writing", "🧭 Gliding"
  ];

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="flex-1 space-y-4">
          <div>
            <h3 className="text-2xl font-bold mb-2">Haider Toha</h3>
            <p className="text-muted-foreground text-lg">
              Full-Stack and AI Engineer
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>London, UK / Remote</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>Joining Sammy Labs (YC W25) soon</span>
            </div>
          </div>
          
          <div className="flex gap-3">
            <a
              href="https://github.com/haider-toha"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
            >
              <Github size={16} />
              <span>GitHub</span>
            </a>
            <a
              href="mailto:mohammedhaidertoha@gmail.com"
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
  I'm a full-stack and AI engineer with an MEng in Aeronautics from Imperial College London. My background taught me to think rigorously about complex systems, blending first-principles engineering with data-driven development.
</p>
<p>
  At Goldman Sachs, I build analytics platforms and machine learning tools to scale tech risk and compliance. My work involves developing full-stack applications (React, Flask, PostgreSQL) and deploying NLP and deep learning pipelines on AWS, creating systems that cut reporting cycles from 10 days to 2 hours  and detect anomalies with 92% precision.
</p>
<p>
  Alongside this, I founded <strong>Provost Academics</strong>, an AI tutoring platform. I led the technical vision, building a RAG grading engine with 95% human-examiner agreement  and scaling the marketplace to 50+ paying clients and £5k MRR.
</p>
<p>
  I will soon be joining <strong>Sammy Labs</strong> (YC W25) as a founding engineer to help build their core AI infrastructure and products from the ground up.
</p>
<p>
  I’m drawn to complex problems that involve engineering and human experience. I thrive on building technology that moves the needle, systems that are reliable, meaningful and quietly elegant in their operation.
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
        <h4 className="text-lg font-semibold mb-4">Interests and Hobbies</h4>
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

      {/* Personal Reflections */}
      <Card className="p-6">
        <h4 className="text-lg font-semibold mb-4">Outside of Work</h4>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Outside work, I stay active with the gym, cricket and the occasional 
            late-night walk through Hyde Park when I need to clear my head. 
            I coach my local kids football team which has been one of the most grounding things I do each week. I have also started gliding and plan to get my pilot’s license.

          </p>
          <p>
            I love to travel and explore new places. I have visited three countries this year and hope to fit in another before it ends. 
            I enjoy trying new food, learning about cultures and staying curious about the world.
          </p>
          <p>
            On quieter days, I run a small book club with friends where we read everything 
            from economics to Islamic philosophy. I also recently started journaling and Arabic calligraphy which help me slow down and stay present.
          </p>
        </div>
      </Card>
    </div>
  );
}
