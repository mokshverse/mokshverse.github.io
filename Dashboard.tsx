import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Sparkles, Upload, Layers } from "lucide-react";
import type { User } from "@supabase/supabase-js";
import { FileUpload } from "@/components/FileUpload";
import { FileList } from "@/components/FileList";

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check authentication
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user);
      } else {
        navigate("/auth");
      }
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUser(session.user);
      } else {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Signed Out",
        description: "You've been successfully signed out.",
      });
      navigate("/");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="glass border-b sticky top-0 z-50 neon-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary animate-glow-pulse" />
            <span className="text-xl font-bold neon-glow">MOKSHVERSE</span>
          </div>
          <Button
            variant="outline"
            onClick={handleSignOut}
            className="glass neon-border hover:scale-105 transition-transform"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2 neon-glow">
            Welcome to <span className="text-gradient">Mokshverse</span>, {user?.email?.split('@')[0]}!
          </h1>
          <p className="text-muted-foreground text-lg">
            Your premium dimension for file management and creation.
          </p>
        </div>

        {/* File Management Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="animate-fade-in">
            <FileUpload 
              user={user!} 
              onUploadComplete={() => setRefreshTrigger(prev => prev + 1)}
            />
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <FileList user={user!} refreshTrigger={refreshTrigger} />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="glass p-6 hover-lift animate-fade-in neon-border" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center neon-glow">
                <Upload className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Upload Center</h3>
                <p className="text-sm text-muted-foreground">
                  Drag and drop to upload files instantly
                </p>
              </div>
            </div>
          </Card>

          <Card className="glass p-6 hover-lift animate-fade-in neon-border" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center neon-glow">
                <Layers className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">File Library</h3>
                <p className="text-sm text-muted-foreground">
                  All your files organized in one place
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Info Card */}
        <Card className="glass p-8 text-center animate-fade-in neon-border" style={{ animationDelay: "0.4s" }}>
          <Sparkles className="w-12 h-12 mx-auto mb-4 text-primary neon-glow" />
          <h2 className="text-2xl font-bold mb-2 neon-glow">Welcome to Your Dimension</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Upload and manage your files with enterprise-grade security and lightning-fast performance. 
            Your data is encrypted and stored securely in Mokshverse.
          </p>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;