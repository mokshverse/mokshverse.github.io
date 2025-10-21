import React from 'react';

export const LockIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
    />
  </svg>
);

export const UserIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

export const LogoutIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
);

export const MailIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

export const MessageIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
);

export const JSIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>JavaScript</title><path d="M0 0h24v24H0V0zm22.034 18.262H1.964V5.738h20.07v12.524zM11.106 14.13v-1.398h2.836v1.398zm-.002-2.822V9.91h3.998v1.398zm0 4.242V14.13h3.998v1.42z" fill="currentColor"/></svg>
);

export const PythonIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Python</title><path d="M11.252 18.42c.813.002 1.442.062 1.914.154.67.128 1.253.393 1.715.786.492.42.845.98 1.03 1.632.187.653.278 1.41.278 2.228v.91h-2.915v-.91c0-.853-.08-1.54-.24-2.032-.16-.492-.44-.89-.82-1.165-.378-.276-.86-.42-1.42-.42h-.76v3.617H7.11v-9.42h4.142zm-5.46 0h2.91v-3.617h-2.91zm.002-4.528h2.91v-2.91h.91v-2.855c0-.818-.09-1.575-.27-2.25-.18-.675-.497-1.226-.92-1.616C7.03 2.78 6.47 2.49 5.76 2.36c-.47-.087-.905-.13-1.31-.13H0v2.91h4.45c.853 0 1.54.08 2.032.24s.89.44 1.165.82c.276.378.42.86.42 1.42v.76h-3.617v9.42h2.91v-2.91zm13.685 4.528v-.91c0-.818.09-1.575.27-2.25.18-.675.497-1.226.92-1.616.424-.39.983-.67 1.688-.8.472-.088.905-.132 1.312-.132h4.45v2.91h-4.45c-.853 0-1.54.08-2.032.24s-.89.44-1.165.82c-.276.378-.42.86-.42 1.42v.76h3.617v3.617h-2.91v2.91h-.91v2.855c0 .818.09 1.575.27 2.25s.497 1.226.92 1.616c.423.39.983.67 1.688.8.47.088.905.132 1.31.132h4.45v-2.91h-4.45c-.853 0-1.54-.08-2.032-.24s-.89.44-1.165.82c-.276-.378-.42-.86-.42-1.42v-.76h3.617v-3.617Z" fill="currentColor"/></svg>
);

export const ReactIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="-11.5 -10.23174 23 20.46348"><title>React</title><circle cx="0" cy="0" r="2.05" fill="currentColor"></circle><g stroke="currentColor" strokeWidth="1" fill="none"><ellipse rx="11" ry="4.2"></ellipse><ellipse rx="11" ry="4.2" transform="rotate(60)"></ellipse><ellipse rx="11" ry="4.2" transform="rotate(120)"></ellipse></g></svg>
);

export const FigmaIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Figma</title><path d="M12 0c-3.31 0-6 2.69-6 6v6c0 3.31 2.69 6 6 6s6-2.69 6-6V6c0-3.31-2.69-6-6-6Zm0 15c-1.66 0-3-1.34-3-3V9c0-1.66 1.34-3 3-3s3 1.34 3 3v3c0 1.66-1.34 3-3 3Z" fill="currentColor"/><path d="M6 18H3a3 3 0 0 0 3 3v-3Zm0-12V3a3 3 0 0 0-3 3h3Zm0 6H0v3c0 3.31 2.69 6 6 6V12Zm12-6h3a3 3 0 0 0-3-3v3Z" fill="currentColor"/></svg>
);

// Fix: Add FileIcon, DownloadIcon, and TrashIcon to resolve import errors in FileItem.tsx.
export const FileIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);

export const DownloadIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

export const TrashIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);