
import { motion } from "framer-motion";

const GameHeader = () => {
  return (
    <motion.div 
      className="text-center py-2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        Truth or Fib
      </h1>
      <p className="text-muted-foreground mt-2">
        The ultimate party game of truths and lies
      </p>
    </motion.div>
  );
};

export default GameHeader;
