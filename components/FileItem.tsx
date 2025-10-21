import React from 'react';
import type { FileInfo } from '../types';
import { FileIcon, DownloadIcon, TrashIcon } from './IconComponents';

interface FileItemProps {
  file: FileInfo;
  onDelete: (fileId: string) => void;
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const FileItem: React.FC<FileItemProps> = ({ file, onDelete }) => {
  return (
    <div className="bg-black/20 p-4 rounded-lg flex items-center justify-between hover:bg-black/40 transition-colors duration-300 animate-fade-in">
      <div className="flex items-center gap-4 truncate">
        <FileIcon className="h-8 w-8 text-[#D4AF37] flex-shrink-0" />
        <div className="truncate">
          <p className="text-white font-medium truncate" title={file.name}>{file.name}</p>
          <p className="text-gray-400 text-sm">
            {formatFileSize(file.size)} &bull; {file.uploadDate.toLocaleString()}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0 ml-4">
        <a
          href={file.url}
          download={file.name}
          className="p-2 rounded-full text-gray-300 hover:bg-[#D4AF37] hover:text-[#1C0B2B] transition-colors duration-300"
          aria-label={`Download ${file.name}`}
          title="Retrieve Asset"
        >
          <DownloadIcon className="h-5 w-5" />
        </a>
        <button
          onClick={() => onDelete(file.id)}
          className="p-2 rounded-full text-gray-300 hover:bg-[#DC143C] hover:text-white transition-colors duration-300"
          aria-label={`Delete ${file.name}`}
          title="Delete"
        >
            <TrashIcon className="h-5 w-5" />
        </button>
      </div>
      {/* Fix: The 'jsx' prop is not a standard attribute for the <style> tag in React and causes a type error. This syntax is specific to libraries like Next.js's styled-jsx. Removing it allows the styles to be applied correctly via a standard style tag. */}
      <style>{`
        @keyframes fade-in {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default FileItem;
