
import { useState } from "react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Menu, Home, Book } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border p-2">
      <div className="container flex items-center justify-between">
        <div className="text-xl font-bold">
          <Link to="/">Truth or Fib</Link>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-4">
            <Button 
              variant={location.pathname === "/" ? "default" : "ghost"}
              asChild
            >
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Link>
            </Button>
            <Button 
              variant={location.pathname === "/rules" ? "default" : "ghost"}
              asChild
            >
              <Link to="/rules">
                <Book className="h-4 w-4 mr-2" />
                Rules
              </Link>
            </Button>
          </div>
          
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild className="sm:hidden">
              <Button 
                variant="outline"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link to="/" className="w-full cursor-pointer flex items-center">
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/rules" className="w-full cursor-pointer flex items-center">
                  <Book className="h-4 w-4 mr-2" />
                  Rules
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
