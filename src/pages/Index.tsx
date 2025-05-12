
import { useState } from "react";
import { Card } from "@/components/ui/card";
import PlayerRegistration from "@/components/PlayerRegistration";
import GameScreen from "@/components/GameScreen";
import GameHeader from "@/components/GameHeader";

const Index = () => {
  const [players, setPlayers] = useState<string[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  const handlePlayerJoin = (name: string) => {
    // Check if player already exists
    if (players.includes(name)) {
      // Could show a toast here, but let's just add the name with a number
      setPlayers([...players, `${name} ${players.filter(p => p.startsWith(name)).length + 1}`]);
    } else {
      setPlayers([...players, name]);
    }
  };

  const handleNextPlayer = () => {
    setCurrentPlayerIndex((prev) => (prev + 1) % players.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/10 p-4">
      <div className="container max-w-md mx-auto">
        <GameHeader />
        
        <Card className="p-6 my-6 shadow-lg">
          {players.length === 0 ? (
            <div className="space-y-6">
              <p className="text-center text-lg mb-4">
                Welcome to the most hilarious lie detector party game!
              </p>
              <PlayerRegistration onPlayerJoin={handlePlayerJoin} />
            </div>
          ) : (
            <div className="space-y-6">
              {players.length < 2 ? (
                <div className="space-y-4">
                  <div className="text-center py-2">
                    <p className="text-lg font-bold">Players ({players.length}):</p>
                    <ul className="my-2">
                      {players.map((player, idx) => (
                        <li key={idx} className="text-md">{player}</li>
                      ))}
                    </ul>
                    <p className="text-sm text-muted-foreground mt-4">
                      Add at least one more player to start the fun!
                    </p>
                  </div>
                  <PlayerRegistration onPlayerJoin={handlePlayerJoin} />
                </div>
              ) : (
                <GameScreen
                  currentPlayer={players[currentPlayerIndex]}
                  allPlayers={players}
                  onNextPlayer={handleNextPlayer}
                />
              )}
            </div>
          )}
        </Card>
        
        {players.length > 0 && (
          <div className="text-center mt-4">
            <button
              onClick={() => handlePlayerJoin("")}
              className="text-sm text-primary underline hover:text-primary/80"
            >
              Add Another Player
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
