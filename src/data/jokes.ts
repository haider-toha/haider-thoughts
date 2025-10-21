export interface DevJoke {
  setup: string;
  punchline: string;
}

export const devJokes: DevJoke[] = [
  {
    setup: "Why do programmers prefer dark mode?",
    punchline: "Because light attracts bugs."
  },
  {
    setup: "How many programmers does it take to change a light bulb?",
    punchline: "None. That's a hardware problem."
  },
  {
    setup: "Why do Java developers wear glasses?",
    punchline: "Because they don't see sharp."
  },
  {
    setup: "I told my computer I needed a break...",
    punchline: "It froze."
  },
  {
    setup: "Why do Python programmers have low self-esteem?",
    punchline: "Because they constantly compare themselves to others."
  },
  {
    setup: "A SQL query walks into a bar...",
    punchline: "It joins two tables and asks for a drink."
  },
  {
    setup: "What do you call a programmer from Finland?",
    punchline: "Nerdic."
  },
  {
    setup: "Why was the JavaScript developer sad?",
    punchline: "Because he didn't Node how to Express himself."
  },
  {
    setup: "What's a programmer's favorite hangout place?",
    punchline: "The Foo Bar."
  },
  {
    setup: "Why did the developer go broke?",
    punchline: "Because he used up all his cache."
  },
  {
    setup: "Why was the function so happy?",
    punchline: "It finally returned something!"
  },
  {
    setup: "What did the front-end developer say to the back-end developer?",
    punchline: "\"You're not my type.\""
  },
  {
    setup: "How do you comfort a JavaScript bug?",
    punchline: "You console it."
  },
  {
    setup: "Why don't programmers like nature?",
    punchline: "Too many bugs."
  },
  {
    setup: "What's a developer's favorite tea?",
    punchline: "C-sharp tea."
  },
  {
    setup: "What did the API say to the developer?",
    punchline: "\"Stop calling me!\""
  },
  {
    setup: "Why was the developer late to work?",
    punchline: "He got stuck in a loop."
  },
  {
    setup: "Why do programmers hate to play hide and seek?",
    punchline: "Because they always get caught in the scope."
  },
  {
    setup: "What's a programmer's favorite movie?",
    punchline: "The Boolean Identity."
  },
  {
    setup: "Why did the HTML element feel empty inside?",
    punchline: "It had no content."
  },
  {
    setup: "Why did the CSS developer go to therapy?",
    punchline: "To get rid of his margins of error."
  },
  {
    setup: "I would tell you a UDP joke…",
    punchline: "But you might not get it."
  },
  {
    setup: "Knock knock. Who's there? Recursion.",
    punchline: "Knock knock."
  },
  {
    setup: "Why do developers hate working with salespeople?",
    punchline: "Too many promises in production."
  },
  {
    setup: "What did the computer say to the programmer?",
    punchline: "\"You had me at 'Hello World.'\""
  },
  {
    setup: "Why did the Boolean leave the party early?",
    punchline: "It was getting too true."
  },
  {
    setup: "Why did the developer break up with Git?",
    punchline: "Too many conflicts."
  },
  {
    setup: "Why was the computer cold?",
    punchline: "It left its Windows open."
  },
  {
    setup: "I asked the programmer to help me with a puzzle...",
    punchline: "He said, \"I'll take it one piece of code at a time.\""
  },
  {
    setup: "What's a programmer's favorite place to get lunch?",
    punchline: "The Stack."
  },
  {
    setup: "What do you call a programmer who doesn't comment code?",
    punchline: "A magician."
  },
  {
    setup: "Why did the array go to therapy?",
    punchline: "It had too many issues with its elements."
  },
  {
    setup: "Why do programmers always mix up Christmas and Halloween?",
    punchline: "Because Oct 31 == Dec 25."
  },
  {
    setup: "What do you call 8 Hobbits?",
    punchline: "A Hobbyte."
  },
  {
    setup: "What did the Git commit say to the repo?",
    punchline: "\"I've got your back.\""
  },
  {
    setup: "Why don't developers like to dance?",
    punchline: "They have two left shifts."
  },
  {
    setup: "What's a programmer's favorite exercise?",
    punchline: "Running loops."
  },
  {
    setup: "I told my friend 10 jokes about binary.",
    punchline: "Sadly, he didn't get either of them."
  },
  {
    setup: "Why did the database administrator leave his wife?",
    punchline: "She had one-to-many relationships."
  },
  {
    setup: "What's an object-oriented way to become rich?",
    punchline: "Inheritance."
  },
  {
    setup: "Why was the debugger feeling stressed?",
    punchline: "It had too many breakpoints."
  },
  {
    setup: "I tried to make a JavaScript joke...",
    punchline: "But I didn't have the closure."
  },
  {
    setup: "Why did the computer get in trouble at school?",
    punchline: "It wouldn't stop bit-shifting."
  },
  {
    setup: "What's a developer's favorite kind of music?",
    punchline: "Algo-rhythm."
  },
  {
    setup: "Why did the coder cross the road?",
    punchline: "To get to the other IDE."
  },
  {
    setup: "Why do developers never panic?",
    punchline: "They always handle exceptions."
  },
  {
    setup: "What's a coder's favorite snack?",
    punchline: "Microchips."
  },
  {
    setup: "Why was the software developer such a good musician?",
    punchline: "Because she had perfect syntax."
  },
  {
    setup: "What do you call a programmer who can't stop working?",
    punchline: "A code-aholic."
  },
  {
    setup: "What's the first thing a developer says when they wake up?",
    punchline: "\"Let's get this bread...crumbs.\""
  }
];

export function getRandomJoke(): DevJoke {
  return devJokes[Math.floor(Math.random() * devJokes.length)];
}
