import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Terminal, User, Briefcase, Code, FileText, HelpCircle, Sparkles } from 'lucide-react';

export function HelpSection() {
  const commands = [
    {
      command: 'haider run me',
      description: 'Opens the About section - learn about Haider',
    },
    {
      command: 'haider run experience', 
      description: 'Opens the Experience section - career journey',
    },
    {
      command: 'haider run projects',
      description: 'Opens the Projects section - what I build',
    },
    {
      command: 'haider run blog',
      description: 'Opens the Blog section - thoughts and writing',
    },
    {
      command: 'haider tell me a joke',
      description: 'Get a random developer dad joke',
    },
    {
      command: 'haider --help',
      description: 'Shows this help documentation',
    }
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Terminal className="w-6 h-6 text-green-500" />
          <h1 className="text-2xl font-bold font-mono">Command Reference</h1>
          <Terminal className="w-6 h-6 text-green-500" />
        </div>
        <Badge variant="secondary" className="font-mono">
          Available Commands - Type any of these in the terminal above
        </Badge>
      </div>

      {/* Commands List */}
      <div className="grid gap-4">
        {commands.map((cmd, index) => {
          return (
            <Card key={index} className="p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="mt-1">
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <code className="bg-muted px-3 py-1 rounded text-sm font-mono font-bold">
                      {cmd.command}
                    </code>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {cmd.description}
                  </div>
                  <div className="text-xs text-muted-foreground italic">
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Usage Tips */}
      <div className="bg-muted/50 rounded-lg p-6 space-y-4">
        <h3 className="font-bold font-mono flex items-center gap-2">
          <Terminal size={16} />
          Pro Tips
        </h3>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-1">→</span>
            <span>Use <kbd className="bg-muted px-2 py-1 rounded text-xs">↑↓</kbd> arrow keys to navigate commands</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-1">→</span>
            <span>Press <kbd className="bg-muted px-2 py-1 rounded text-xs">Enter</kbd> to execute the selected command</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-1">→</span>
            <span>Start typing to filter commands - no need to type the full command</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-1">→</span>
            <span>Commands are case-insensitive, so "HAIDER RUN ME" works too!</span>
          </li>
        </ul>
      </div>

    </div>
  );
}
