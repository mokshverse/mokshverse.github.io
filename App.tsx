import React, { useState, useCallback, useEffect } from 'react';
import LoginScreen from './components/LoginScreen';
import Portfolio from './components/FileVault';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const handleLogin = useCallback(() => {
    setIsTransitioning(true);
  }, []);
  
  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsLoggedIn(true);
        setIsTransitioning(false);
      }, 500); // Duration of the transition animation
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  return (
    <div className="min-h-screen w-full bg-transparent text-gray-200 font-sans flex items-center justify-center p-4">
      {isTransitioning && <TransitionEffect />}
      {!isLoggedIn ? (
        <LoginScreen onLogin={handleLogin} />
      ) : (
        <Portfolio onLogout={handleLogout} />
      )}
    </div>
  );
};

const TransitionEffect: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-[var(--neon-cyan)] z-50 animate-data-stream">
       <style>{`
        @keyframes data-stream {
          from {
            transform: scale(0);
            border-radius: 50%;
          }
          to {
            transform: scale(1);
            border-radius: 0;
          }
        }
        .animate-data-stream {
          animation: data-stream 0.5s cubic-bezier(0.76, 0, 0.24, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default App;