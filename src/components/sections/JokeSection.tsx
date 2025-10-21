import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { getRandomJoke } from '@/data/jokes';

export function JokeSection() {
  const [currentJoke, setCurrentJoke] = useState(() => getRandomJoke());
  const [showPunchline, setShowPunchline] = useState(false);

  const getNewJoke = () => {
    setCurrentJoke(getRandomJoke());
    setShowPunchline(false);
  };

  return (
    <div className="space-y-6 max-w-lg text-center mx-auto">
      {/* Joke Display */}
      <div className="bg-muted/50 rounded-lg p-8 space-y-4">
        {/* Setup */}
        <div className="text-xl font-medium leading-relaxed">
          {currentJoke.setup}
        </div>

        {/* Punchline Section */}
        {showPunchline ? (
          <div className="space-y-4">
            <div className="border-t border-muted-foreground/20 pt-4">
              <div className="text-xl font-bold text-primary">
                {currentJoke.punchline}
              </div>
            </div>
            
            {/* New Joke Button */}
            <Button 
              onClick={getNewJoke}
              variant="outline" 
              className="gap-2 font-mono"
            >
              Another one!
            </Button>
          </div>
        ) : (
          /* Why Button */
          <Button 
            onClick={() => setShowPunchline(true)}
            className="gap-2 font-mono mt-4"
          >
            Why?
          </Button>
        )}
      </div>
    </div>
  );
}
