
import { Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-border py-6 bg-background text-center">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Truth or Fib Game. All rights reserved.
          </p>
          
          <div className="flex items-center gap-1 mt-2 md:mt-0">
            <span className="text-sm text-muted-foreground">Made with</span>
            <Heart className="h-4 w-4 text-red-500 animate-pulse" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
