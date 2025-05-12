
import { useState } from "react";
import { Card } from "@/components/ui/card";
import PlayerRegistration from "@/components/PlayerRegistration";
import GameScreen from "@/components/GameScreen";
import GameHeader from "@/components/GameHeader";

interface PlayerScore {
  name: string;
  truths: number;
  lies: number;
}

const Index = () => {
  const [playerScores, setPlayerScores] = useState<PlayerScore[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  const handlePlayerJoin = (name: string) => {
    // Check if player already exists
    if (playerScores.some(p => p.name === name)) {
      const newName = `${name} ${playerScores.filter(p => p.name.startsWith(name)).length + 1}`;
      setPlayerScores([...playerScores, { name: newName, truths: 0, lies: 0 }]);
    } else {
      setPlayerScores([...playerScores, { name, truths: 0, lies: 0 }]);
    }
  };

  const handleNextPlayer = () => {
    setCurrentPlayerIndex((prev) => (prev + 1) % playerScores.length);
  };

  const updatePlayerScore = (isTrue: boolean) => {
    setPlayerScores(prevScores => prevScores.map((player, idx) => 
      idx === currentPlayerIndex 
        ? { 
            ...player, 
            truths: isTrue ? player.truths + 1 : player.truths,
            lies: !isTrue ? player.lies + 1 : player.lies
          }
        : player
    ));
  };

  const showAddPlayerForm = () => {
    // This will show the player registration form without clearing existing players
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/10 p-4">
      <div className="container max-w-md mx-auto">
        <GameHeader />
        
        <Card className="p-6 my-6 shadow-lg">
          {playerScores.length === 0 ? (
            <div className="space-y-6">
              <p className="text-center text-lg mb-4">
                Welcome to the most hilarious lie detector party game!
              </p>
              <PlayerRegistration onPlayerJoin={handlePlayerJoin} />
            </div>
          ) : (
            <div className="space-y-6">
              {playerScores.length < 2 ? (
                <div className="space-y-4">
                  <div className="text-center py-2">
                    <p className="text-lg font-bold">Players ({playerScores.length}):</p>
                    <ul className="my-2">
                      {playerScores.map((player, idx) => (
                        <li key={idx} className="text-md">{player.name}</li>
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
                  currentPlayer={playerScores[currentPlayerIndex].name}
                  currentPlayerScore={playerScores[currentPlayerIndex]}
                  allPlayers={playerScores}
                  onNextPlayer={handleNextPlayer}
                  onUpdateScore={updatePlayerScore}
                />
              )}
            </div>
          )}
        </Card>
        
        {playerScores.length > 0 && (
          <div className="text-center mt-4">
            <PlayerRegistration onPlayerJoin={handlePlayerJoin} buttonLabel="Add Another Player" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
