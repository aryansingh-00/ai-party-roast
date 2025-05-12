
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

interface GameScreenProps {
  currentPlayer: string;
  allPlayers: string[];
  onNextPlayer: () => void;
}

// Sample questions bank
const QUESTIONS = [
  "Have you ever cheated on a test?",
  "Have you ever stolen something?",
  "Have you ever pretended to be sick to avoid an obligation?",
  "Have you ever lied to someone in this room?",
  "Have you ever peeked at someone else's phone without permission?",
  "Have you ever eaten food that fell on the floor?",
  "Have you ever sent a text to the wrong person?",
  "Have you ever gone a whole day without showering?",
  "Have you ever pretended to like a gift?",
  "Have you ever blamed someone else for your mistake?",
  "Have you ever crashed a party you weren't invited to?",
  "Have you ever stalked someone on social media?",
  "Have you ever worn the same underwear two days in a row?",
  "Have you ever taken credit for someone else's work?",
  "Have you ever secretly read someone's diary or journal?",
  "Have you ever fallen asleep during a movie at the theater?",
  "Have you ever faked knowing a celebrity?",
  "Have you ever pretended to be an expert on something you know nothing about?",
  "Have you ever laughed so hard you peed a little?",
  "Have you ever lied about your age?",
];

// Mock GPT responses based on truth/lie and the question
const generateRoastMessage = (name: string, question: string, wasLying: boolean): string => {
  const truthResponses = [
    `Wow ${name}, you're actually telling the truth! That's a first.`,
    `${name} coming clean? I didn't have that on my 2024 bingo card.`,
    `The truth? From ${name}? Someone check if pigs are flying!`,
    `${name} telling the truth is like finding a unicorn - rare and slightly magical.`,
    `Honesty from ${name}? Mark this day in your calendars, folks!`,
  ];
  
  const lieResponses = [
    `Nice try ${name}! Your nose just grew so much it almost hit the screen.`,
    `${name}, I've seen better liars in preschool. Step up your game!`,
    `${name}, that lie was so obvious even my circuits detected it!`,
    `Oh ${name}, you're about as convincing as a chocolate teapot.`,
    `${name}, you couldn't lie convincingly if your high score depended on it!`,
  ];
  
  const responseArray = wasLying ? lieResponses : truthResponses;
  return responseArray[Math.floor(Math.random() * responseArray.length)];
};

const GameScreen = ({ currentPlayer, allPlayers, onNextPlayer }: GameScreenProps) => {
  const [question, setQuestion] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isGeneratingResult, setIsGeneratingResult] = useState(false);
  const [isTruth, setIsTruth] = useState(false);
  const [roastMessage, setRoastMessage] = useState("");
  
  const truthSoundRef = useRef<HTMLAudioElement | null>(null);
  const lieSoundRef = useRef<HTMLAudioElement | null>(null);
  
  const { toast } = useToast();

  useEffect(() => {
    // Preload sounds
    truthSoundRef.current = new Audio("https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3");
    lieSoundRef.current = new Audio("https://assets.mixkit.co/active_storage/sfx/1018/1018-preview.mp3");
    
    return () => {
      // Cleanup
      if (truthSoundRef.current) {
        truthSoundRef.current.pause();
        truthSoundRef.current = null;
      }
      if (lieSoundRef.current) {
        lieSoundRef.current.pause();
        lieSoundRef.current = null;
      }
    };
  }, []);

  const getRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * QUESTIONS.length);
    setQuestion(QUESTIONS[randomIndex]);
    setShowResult(false);
    setRoastMessage("");
  };

  const determineResult = (answer: "yes" | "no") => {
    setIsGeneratingResult(true);
    
    // Simulate AI processing with a delay
    setTimeout(() => {
      // Random truth/lie detection (50% chance)
      const isLying = Math.random() > 0.5;
      setIsTruth(!isLying);
      
      // Play appropriate sound
      if (isLying) {
        lieSoundRef.current?.play().catch(error => {
          console.error("Error playing lie sound:", error);
        });
      } else {
        truthSoundRef.current?.play().catch(error => {
          console.error("Error playing truth sound:", error);
        });
      }
      
      // Generate roast message
      const roast = generateRoastMessage(currentPlayer, question, isLying);
      setRoastMessage(roast);
      
      setShowResult(true);
      setIsGeneratingResult(false);
    }, 1500);
  };

  const handleNextPlayer = () => {
    setShowResult(false);
    setQuestion("");
    setRoastMessage("");
    onNextPlayer();
  };

  return (
    <div className="space-y-6 w-full max-w-md mx-auto">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-1">
          {currentPlayer}'s Turn
        </h2>
        <p className="text-sm text-muted-foreground">
          {allPlayers.length} player{allPlayers.length !== 1 ? "s" : ""} in the game
        </p>
      </div>
      
      <Card className="p-6 shadow-lg">
        {!question ? (
          <div className="text-center space-y-4">
            <p className="text-lg">Ready to get exposed?</p>
            <Button 
              onClick={getRandomQuestion}
              className="bg-accent text-accent-foreground hover:bg-accent/80"
              size="lg"
            >
              Get a Question
            </Button>
          </div>
        ) : showResult ? (
          <div className="text-center space-y-4 scale-in">
            <div 
              className={`text-3xl font-bold mb-4 ${isTruth ? "text-green-500 bounce" : "text-red-500 shake"}`}
            >
              {isTruth ? "TRUTH!" : "LIE!"}
            </div>
            <p className="text-lg italic">{roastMessage}</p>
            <div className="pt-4">
              <Button onClick={handleNextPlayer}>Next Player</Button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-6">
            <h3 className="text-xl font-semibold">{question}</h3>
            
            {isGeneratingResult ? (
              <div className="flex justify-center items-center py-6">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="flex justify-center gap-4">
                <Button 
                  onClick={() => determineResult("yes")}
                  className="w-24 bg-green-500 hover:bg-green-600"
                >
                  Yes
                </Button>
                <Button 
                  onClick={() => determineResult("no")}
                  className="w-24 bg-red-500 hover:bg-red-600"
                >
                  No
                </Button>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default GameScreen;
