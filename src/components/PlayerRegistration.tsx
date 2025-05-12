
import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface PlayerRegistrationProps {
  onPlayerJoin: (name: string) => void;
}

const PlayerRegistration = ({ onPlayerJoin }: PlayerRegistrationProps) => {
  const [playerName, setPlayerName] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (playerName.trim().length < 2) {
      toast({
        title: "Name too short!",
        description: "Please enter a name with at least 2 characters.",
        variant: "destructive"
      });
      return;
    }
    
    onPlayerJoin(playerName.trim());
    setPlayerName("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-xs mx-auto">
      <h2 className="text-xl font-bold text-center">Join the Game!</h2>
      <Input
        placeholder="Enter your name"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        className="text-center focus-visible:ring-primary"
      />
      <Button 
        type="submit" 
        className="w-full bg-primary hover:bg-primary/80"
      >
        Join Game
      </Button>
    </form>
  );
};

export default PlayerRegistration;
