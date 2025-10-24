import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Trash2, Download, FileIcon, Image, Video, FileText } from "lucide-react";
import type { User } from "@supabase/supabase-js";
import type { FileObject as SupabaseFileObject } from "@supabase/storage-js";

interface FileListProps {
  user: User;
  refreshTrigger: number;
}

export const FileList = ({ user, refreshTrigger }: FileListProps) => {
  const [files, setFiles] = useState<SupabaseFileObject[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const loadFiles = async () => {
    try {
      const { data, error } = await supabase.storage
        .from('user-files')
        .list(user.id, {
          sortBy: { column: 'created_at', order: 'desc' }
        });

      if (error) throw error;
      setFiles(data || []);
    } catch (error: any) {
      toast({
        title: "Failed to load files",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFiles();
  }, [refreshTrigger]);

  const handleDelete = async (fileName: string) => {
    try {
      const { error } = await supabase.storage
        .from('user-files')
        .remove([`${user.id}/${fileName}`]);

      if (error) throw error;

      toast({
        title: "File deleted",
        description: "File has been removed from Mokshverse",
      });

      loadFiles();
    } catch (error: any) {
      toast({
        title: "Delete failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDownload = async (fileName: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('user-files')
        .download(`${user.id}/${fileName}`);

      if (error) throw error;

      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error: any) {
      toast({
        title: "Download failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getFileIcon = (mimetype?: string) => {
    if (!mimetype) return <FileIcon className="w-5 h-5 text-muted-foreground" />;
    if (mimetype.startsWith('image/')) return <Image className="w-5 h-5 text-accent" />;
    if (mimetype.startsWith('video/')) return <Video className="w-5 h-5 text-secondary" />;
    if (mimetype.includes('pdf') || mimetype.includes('document')) return <FileText className="w-5 h-5 text-primary" />;
    return <FileIcon className="w-5 h-5 text-muted-foreground" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  if (loading) {
    return (
      <Card className="glass p-6 neon-border">
        <div className="text-center py-8">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading files...</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="glass p-6 neon-border">
      <h3 className="text-xl font-bold mb-4 neon-glow">Manage Files</h3>
      
      {files.length === 0 ? (
        <div className="text-center py-8">
          <FileIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">No files uploaded yet</p>
        </div>
      ) : (
        <div className="space-y-2">
          {files.map((file) => (
            <div
              key={file.name}
              className="flex items-center gap-3 p-4 glass rounded-lg hover-lift neon-border"
            >
              {getFileIcon(file.metadata?.mimetype)}
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{file.name}</p>
                <p className="text-sm text-muted-foreground">
                  {formatFileSize((file.metadata as any)?.size || 0)} • {new Date(file.created_at || '').toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownload(file.name)}
                  className="glass neon-border hover:scale-105 transition-transform"
                >
                  <Download className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(file.name)}
                  className="glass neon-border hover:scale-105 transition-transform text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
