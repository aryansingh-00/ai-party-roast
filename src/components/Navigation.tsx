
import { useState } from "react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Menu, Info, Settings, Users } from "lucide-react";
import { useTheme } from "next-themes";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();
  
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border p-2">
      <div className="container max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold tracking-tight">TruthOrFib</span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link to="/">Home</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/rules">Rules</Link>
            </Button>
          </div>
          
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
              <Button 
                size="icon" 
                variant="ghost" 
                className="sm:hidden"
                aria-label="Navigation Menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link to="/" className="w-full cursor-pointer">Home</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/rules" className="w-full cursor-pointer">Rules</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
