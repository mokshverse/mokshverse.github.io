import React, { useState } from 'react';
import { LockIcon, UserIcon } from './IconComponents';

interface LoginScreenProps {
  onLogin: () => void;
}

const USERNAME = "mokshverse";
const PASSWORD = "Ekanshkushwah1";

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === USERNAME && password === PASSWORD) {
      setError('');
      onLogin();
    } else {
      setError('Access Denied: Invalid Credentials.');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };
  
  const handleSkip = () => {
    setError('');
    onLogin();
  };

  return (
    <div className="w-full max-w-sm animate-fade-scale-in">
       <style>{`
        @keyframes fade-scale-in {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-scale-in { animation: fade-scale-in 0.5s ease-out forwards; }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .animate-shake { animation: shake 0.5s ease-in-out; }
        
        .input-glow:focus-within {
          border-color: var(--neon-cyan);
          box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
        }
        .btn-glow {
          box-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
        }
        .btn-glow:hover {
          box-shadow: 0 0 25px rgba(0, 255, 255, 0.6);
        }
      `}</style>

      <div className={`glass-console rounded-xl p-8 ${isShaking ? 'animate-shake' : ''}`}>
        <h1 className="font-mono text-2xl text-center text-gray-200 mb-2">MokshVerse</h1>
        <h2 className="font-mono text-sm text-center text-[var(--neon-cyan)] mb-8">// System Access</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative border-b-2 border-gray-600 focus-within:border-[var(--neon-cyan)] transition-colors duration-300">
             <UserIcon className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-transparent border-none py-2 pl-8 pr-2 text-white placeholder-gray-500 focus:outline-none focus:placeholder-cyan-400"
            />
          </div>
          <div className="relative border-b-2 border-gray-600 focus-within:border-[var(--neon-cyan)] transition-colors duration-300">
            <LockIcon className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-none py-2 pl-8 pr-2 text-white placeholder-gray-500 focus:outline-none focus:placeholder-cyan-400"
            />
          </div>
          {error && <p className="text-red-400 text-sm font-mono text-center pt-2">{error}</p>}
          <button
            type="submit"
            className="w-full bg-[var(--neon-cyan)] text-black font-bold py-3 rounded-lg hover:bg-white btn-glow transition-all duration-300 transform hover:scale-105 active:scale-100"
          >
            Access
          </button>
        </form>
      </div>
      <div className="text-center mt-6">
         <button onClick={handleSkip} className="font-mono text-sm text-gray-500 hover:text-[var(--neon-cyan)] transition-colors duration-300">
            [ Skip to Portfolio ]
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;