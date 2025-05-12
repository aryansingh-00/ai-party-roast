
import React from "react";

const GameHeader = () => {
  return (
    <header className="text-center py-6">
      <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        AI Party Lie Detector
      </h1>
      <p className="text-muted-foreground mt-2">
        Can you fool the lie detector? Probably not!
      </p>
    </header>
  );
};

export default GameHeader;
