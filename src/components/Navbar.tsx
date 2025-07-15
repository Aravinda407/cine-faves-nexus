import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Film, Heart, LogOut } from "lucide-react";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  if (!user) return null;

  return (
    <nav className="bg-card border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Film className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">MovieApp</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          <Link to="/">
            <Button 
              variant={location.pathname === "/" ? "default" : "ghost"}
              size="sm"
            >
              Home
            </Button>
          </Link>
          <Link to="/favorites">
            <Button 
              variant={location.pathname === "/favorites" ? "default" : "ghost"}
              size="sm"
            >
              <Heart className="h-4 w-4 mr-2" />
              My Favorites
            </Button>
          </Link>
          <Button variant="ghost" size="sm" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;