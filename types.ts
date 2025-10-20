export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
  tags: string[];
}

// Fix: Add FileInfo interface to resolve import error in FileItem.tsx.
export interface FileInfo {
  id: string;
  name: string;
  size: number;
  uploadDate: Date;
  url: string;
}
