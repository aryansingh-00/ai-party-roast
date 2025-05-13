
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Rules = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/10 p-4 pt-20">
      <div className="container max-w-4xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">How to Play: Truth or Fib</CardTitle>
            <CardDescription className="text-center text-lg">
              A party game of truths, lies, and everything in between
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Game Setup</h2>
              <p>Start by registering all players. You'll need at least 2 players to begin the game.</p>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Game Play</h2>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Each player takes turns sharing a statement about themselves.</li>
                <li>The statement can be either completely true or a creative fib.</li>
                <li>Other players try to guess if the statement is a truth or a fib.</li>
                <li>After all guesses, the player reveals the answer.</li>
                <li>Players earn points for fooling others or for correct guesses.</li>
              </ol>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Scoring</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Truth:</strong> 1 point for each person fooled into thinking it was a fib.</li>
                <li><strong>Fib:</strong> 1 point for each person fooled into thinking it was the truth.</li>
                <li>Other players get 1 point for correctly guessing truth or fib.</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Tips</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>Mix specific details with your statements to make fibs more believable.</li>
                <li>When fibbing, include some truth to make it more convincing.</li>
                <li>Pay attention to others' patterns of truths and fibs.</li>
                <li>Have fun and be creative with your stories!</li>
              </ul>
            </div>
            
            <div className="p-4 bg-primary/10 rounded-lg">
              <p className="text-center font-medium">
                The player with the most points at the end of the game wins!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Rules;
