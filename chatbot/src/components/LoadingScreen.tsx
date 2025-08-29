import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 flex items-center justify-center z-50">
      <div className="relative">
        {/* Circular Progress Background */}
        <div className="w-32 h-32 sm:w-40 sm:h-40 relative">
          {/* Background Circle */}
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="rgba(139, 92, 246, 0.2)"
              strokeWidth="3"
              fill="none"
            />
            {/* Progress Circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="url(#gradient)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
              className="transition-all duration-300 ease-out"
            />
            {/* Gradient Definition */}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="50%" stopColor="#A855F7" />
                <stop offset="100%" stopColor="#C084FC" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Central Shell Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Scallop Shell Icon - Tourism & Hospitality Theme */}
              <svg 
                className="w-16 h-16 sm:w-20 sm:h-20 text-white drop-shadow-lg"
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                {/* Scallop Shell Shape */}
                <path d="M12 2C8 2 5 5 5 9C5 12 7 15 10 17C8 16 6 14 6 12C6 9 8 7 11 7C14 7 16 9 16 12C16 14 14 16 12 17C15 15 17 12 17 9C17 5 14 2 12 2Z"/>
                {/* Shell Details */}
                <path d="M12 4C10 4 8 6 8 8C8 10 9 11 11 11C13 11 14 10 14 8C14 6 12 4 12 4Z" fill="rgba(255,255,255,0.3)"/>
              </svg>
              
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-white rounded-full blur-xl opacity-30 animate-pulse"></div>
            </div>
          </div>
        </div>
        
        {/* Loading Text */}
        <div className="text-center mt-8">
          <h2 className="text-2xl sm:text-3xl font-futuristic font-bold text-white mb-2 glow-text">
            Hestia AI
          </h2>
          <p className="text-purple-200 text-sm sm:text-base">
            Tourism & Hospitality Assistant
          </p>
          <div className="mt-4">
            <div className="w-32 h-1 bg-purple-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-purple-300 text-xs mt-2">{progress}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
