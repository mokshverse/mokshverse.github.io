import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Shield, Zap, Upload, Layers, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-glow-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-glow-pulse" />
      </div>

      <nav className="glass border-b sticky top-0 z-50 neon-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary animate-glow-pulse" />
            <span className="text-xl font-bold neon-glow">MOKSHVERSE</span>
          </div>
          <Link to="/auth">
            <Button className="gradient-primary neon-border">Enter <ArrowRight className="w-4 h-4 ml-2" /></Button>
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-20">
        <div className="text-center mb-20 animate-fade-in">
          <div className="w-24 h-24 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-8 neon-border animate-glow-pulse">
            <Sparkles className="w-12 h-12 text-primary-foreground" />
          </div>
          <h1 className="text-7xl md:text-8xl font-bold mb-6 neon-glow">MOKSHVERSE</h1>
          <p className="text-2xl text-gradient mb-4 font-semibold">A New Dimension of Creation</p>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Upload, manage, and organize your files in an ultra-premium environment.
          </p>
          <Link to="/auth">
            <Button size="lg" className="gradient-primary neon-border text-lg">
              Enter Mokshverse <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-20">
          <Card className="glass p-8 hover-lift neon-border">
            <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-6 neon-glow">
              <Upload className="w-7 h-7 text-primary-foreground" />
            </div>
            <h3 className="text-2xl font-bold mb-4">File Upload</h3>
            <p className="text-muted-foreground">Seamless file uploads with progress tracking.</p>
          </Card>
          <Card className="glass p-8 hover-lift neon-border">
            <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-6 neon-glow">
              <Layers className="w-7 h-7 text-primary-foreground" />
            </div>
            <h3 className="text-2xl font-bold mb-4">File Management</h3>
            <p className="text-muted-foreground">Organize all your files in one place.</p>
          </Card>
          <Card className="glass p-8 hover-lift neon-border">
            <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-6 neon-glow">
              <Shield className="w-7 h-7 text-primary-foreground" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Ultra Secure</h3>
            <p className="text-muted-foreground">Enterprise-grade security and encryption.</p>
          </Card>
          <Card className="glass p-8 hover-lift neon-border">
            <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-6 neon-glow">
              <Zap className="w-7 h-7 text-primary-foreground" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Lightning Fast</h3>
            <p className="text-muted-foreground">Blazing fast with optimized infrastructure.</p>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Landing;