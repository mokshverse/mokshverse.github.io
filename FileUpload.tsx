import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Upload, X, FileIcon } from "lucide-react";
import type { User } from "@supabase/supabase-js";

interface FileUploadProps {
  user: User;
  onUploadComplete: () => void;
}

export const FileUpload = ({ user, onUploadComplete }: FileUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    setProgress(0);

    try {
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const { error } = await supabase.storage
        .from('user-files')
        .upload(fileName, selectedFile, {
          cacheControl: '3600',
          upsert: false
        });

      clearInterval(progressInterval);
      setProgress(100);

      if (error) throw error;

      toast({
        title: "Upload successful!",
        description: `${selectedFile.name} has been uploaded to Mokshverse`,
      });

      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      onUploadComplete();
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <Card className="glass p-6 neon-border">
      <h3 className="text-xl font-bold mb-4 neon-glow">Upload Files</h3>
      
      <div className="space-y-4">
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-primary/50 rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors neon-border hover:bg-primary/5"
        >
          <Upload className="w-12 h-12 mx-auto mb-4 text-primary" />
          <p className="text-lg font-semibold mb-2">
            {selectedFile ? selectedFile.name : "Choose a file or drag it here"}
          </p>
          <p className="text-sm text-muted-foreground">
            Supports: PDF, DOCX, Images, Videos, ZIP, and more
          </p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileSelect}
          className="hidden"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.webp,.mp4,.mov,.txt,.zip"
        />

        {selectedFile && (
          <div className="flex items-center gap-2 p-3 glass rounded-lg">
            <FileIcon className="w-5 h-5 text-primary" />
            <span className="flex-1 truncate">{selectedFile.name}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedFile(null);
                if (fileInputRef.current) {
                  fileInputRef.current.value = '';
                }
              }}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}

        {uploading && (
          <div className="space-y-2">
            <Progress value={progress} className="neon-border" />
            <p className="text-sm text-center text-muted-foreground">
              Uploading... {progress}%
            </p>
          </div>
        )}

        <Button
          onClick={handleUpload}
          disabled={!selectedFile || uploading}
          className="w-full gradient-primary neon-border hover:scale-105 transition-transform"
        >
          {uploading ? "Uploading..." : "Upload to Mokshverse"}
        </Button>
      </div>
    </Card>
  );
};
