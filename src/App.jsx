import React, { useState, useEffect, useCallback } from 'react';
import { Heart, Stars, MapPin, Music, ArrowRight, Home, Sparkles, Coffee, Utensils, Smartphone } from 'lucide-react';

const App = () => {
  const [stage, setStage] = useState('question'); // question, message, journey, video
  const [noButtonState, setNoButtonState] = useState({
    x: 0,
    y: 0,
    scale: 1,
    text: "No",
    count: 0,
    isFixed: false
  });
  const [progress, setProgress] = useState(0);
const [celebrated, setCelebrated] = useState([]);

  // Phrases for the stubborn "No" button
  const noPhrases = [
    "No",
    "Are you sure?",
    "Really??",
    "Think again! 🥺",
    "Last chance...",
    "You're clicking the wrong one!",
    "Error 404: No not found",
    "Nice try!",
    "Wait, look up! ⬆️",
    "Don't do this to me...",
    "I'm shy! 👉👈"
  ];

  // Milestones for the journey
  const milestones = [
    { id: 1, label: "Started", icon: <Home size={14} />, threshold: 20, memory: "That first spark..." },
    { id: 2, label: "Dates", icon: <Coffee size={14} />, threshold: 40, memory: "When I knew you were special." },
    { id: 3, label: "Laughter", icon: <Utensils size={14} />, threshold: 60, memory: "Every moment is a gift." },
    { id: 4, label: "Forever", icon: <Sparkles size={14} />, threshold: 80, memory: "I love you more every day." },
  ];

  const handleNoInteraction = useCallback(() => {
    const nextCount = noButtonState.count + 1;
    
    setNoButtonState({
      text: noPhrases[nextCount % noPhrases.length],
      count: nextCount,
    });
  }, [noButtonState]);

  const currentMilestone = milestones
  .filter(m => progress >= m.threshold)
  .slice(-1)[0];

const handleProgress = (value) => {
  setProgress(prev => Math.max(prev, value));
};
  useEffect(() => {
  milestones.forEach(m => {
    if (progress >= m.threshold && !celebrated.includes(m.id)) {
      setCelebrated(prev => [...prev, m.id]);
    }
  });

  if (progress >= 100) {
    setTimeout(() => setStage("video"), 1000);
  }
}, [progress]);



  const FloatingHearts = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${3 + Math.random() * 2}s`,
            opacity: 0.15,
          }}
        >
          <Heart size={16 + Math.random() * 12} fill="#ff4d6d" color="#ff4d6d" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fff5f7] flex flex-col items-center justify-center p-4 sm:p-6 font-sans text-slate-800 overflow-hidden relative">
      <FloatingHearts />
      
      <div className="z-10 w-full max-w-sm sm:max-w-md bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-2xl p-6 sm:p-10 text-center border border-pink-50 transition-all duration-500">
        
        {/* STAGE 1: THE QUESTION */}
        {stage === 'question' && (
          <div className="space-y-8 animate-in fade-in zoom-in duration-500">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-pink-100 blur-2xl rounded-full opacity-60 animate-pulse"></div>
                <Heart size={80} fill="#ff4d6d" className="text-pink-500 relative z-10 animate-bounce" />
                <Stars className="absolute -top-2 -right-2 z-50 text-yellow-400 animate-spin" style={{ animationDuration: '6s' }} />
              </div>
            </div>
            
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-pink-500 to-rose-600">
                Will you be my Valentine?
              </h1>
              <p className="text-slate-500 text-sm font-medium">I promise it'll be worth it! ✨</p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 min-h-[120px]">
              <button
                onClick={() => setStage('message')}
                className="w-full sm:w-auto px-12 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-2xl shadow-xl shadow-pink-100 hover:scale-105 active:scale-95 transition-all"
              >
                YES! ❤️
              </button>
              
              <button
                onClick={handleNoInteraction}
              
                className={`w-full sm:w-auto px-8 py-4 bg-slate-50 text-slate-400 font-bold rounded-2xl border border-slate-100 shadow-sm whitespace-nowrap overflow-hidden transition-all duration-300 ${noButtonState.count > 5 ? 'opacity-80' : ''}`}
              >
                {noButtonState.text}
              </button>
            </div>
          </div>
        )}

        {/* STAGE 2: THE MESSAGE */}
        {stage === 'message' && (
          <div className="space-y-6 animate-in slide-in-from-bottom duration-500">
            <h2 className="text-5xl">💖</h2>
            <h1 className="text-3xl font-bold text-pink-600 italic">"I knew you'd say yes!"</h1>
            <div className="bg-pink-100/50 p-6 rounded-2xl text-lg leading-relaxed text-slate-700 border-l-4 border-pink-400">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur minima nostrum, harum iste iure numquam quod praesentium quae sunt reprehenderit. Optio totam voluptatibus deleniti ad a quas voluptatem atque voluptatum?
            </div>
            <button
              onClick={() => setStage('journey')}
              className="flex items-center justify-center gap-2 w-full py-4 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-2xl shadow-lg group transition-all"
            >
              See our journey
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

        {/* STAGE 3: THE JOURNEY (MOBILE OPTIMIZED) */}
        {stage === 'journey' && (
  <div className="space-y-8 animate-in fade-in duration-700">

    <div className="text-center space-y-1">
      <h2 className="text-2xl font-black text-pink-600">Our Love Trail</h2>
      <p className="text-sm text-slate-500 italic">
        From me… to you ❤️
      </p>
    </div>

    <div className="relative h-[360px] bg-pink-50/60 rounded-[2.5rem] border-2 border-pink-100 p-6 overflow-hidden">

      {/* Path */}
      <svg className="absolute inset-0 w-full h-full p-10 opacity-25" viewBox="0 0 100 200">
        <path
          d="M50,180 C10,140 90,100 50,60 C30,40 70,20 50,10"
          stroke="#ff4d6d"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="8 8"
          fill="none"
        />
      </svg>

      {/* Moving Heart */}
      <div
        className="absolute left-1/2 -translate-x-1/2 transition-all duration-700 z-20"
        style={{ bottom: `${progress}%` }}
      >
        <Heart
          size={30}
          fill="#ff4d6d"
          className="animate-pulse drop-shadow-xl"
        />
      </div>

      {/* Milestones */}
      {milestones.map(m => (
        <div
          key={m.id}
          className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3 transition-all duration-500"
          style={{ bottom: `${m.threshold}%`, opacity: progress >= m.threshold ? 1 : 0.3 }}
        >
          {progress >= m.threshold && (
            <span className="bg-white px-3 py-1 rounded-full text-[11px] font-bold text-pink-600 shadow-md animate-in fade-in">
              {m.label}
            </span>
          )}

          <div
            className={`p-2 rounded-full ${
              progress >= m.threshold
                ? "bg-pink-100 text-pink-600 ring-4 ring-pink-300/40 shadow-lg animate-pulse"
                : "bg-white text-slate-300 border border-dashed"
            }`}
          >
            {m.icon}
          </div>
        </div>
      ))}

      {/* Start & End */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-400">
        ME
      </div>

      <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs font-bold text-pink-600">
        YOU
      </div>

      {/* Slider */}
      <input
        type="range"
        min="0"
        max="100"
        step="1"
        value={progress}
        onChange={(e) => handleProgress(+e.target.value)}
        disabled={progress >= 100}
        className="absolute right-3 top-10 h-[80%] w-1 appearance-none bg-pink-200 rounded-full accent-pink-500 cursor-pointer"
        style={{ writingMode: 'bt-lr', WebkitAppearance: 'slider-vertical' }}
      />
    </div>

    {/* Memory Bubble */}
    <div className="h-16 flex justify-center items-center">
      {progress === 0 && (
        <p className="text-slate-400 italic text-sm">
          Slide the bar to move my heart…
        </p>
      )}

      {currentMilestone && (
        <div className="relative bg-white px-5 py-3 rounded-2xl shadow-lg border border-pink-100 animate-in zoom-in">
          <p className="text-pink-600 italic font-medium">
            "{currentMilestone.memory}"
          </p>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-b border-r border-pink-100" />
        </div>
      )}
    </div>

    {/* Mobile Button */}
    <button
      onClick={() => handleProgress(progress + 20)}
      disabled={progress >= 100}
      className="w-full py-3 bg-pink-500 hover:bg-pink-600 disabled:opacity-40 text-white font-bold rounded-full shadow-md transition"
    >
      Continue ❤️
    </button>

  </div>
)}


        {/* STAGE 4: VIDEO REVEAL */}
        {stage === 'video' && (
          <div className="space-y-6 animate-in zoom-in duration-1000">
            <div className="flex justify-center items-center gap-3">
              <Music className="text-pink-400 animate-bounce" />
              <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-600 uppercase tracking-tight">
                For You, My Love
              </h2>
              <Music className="text-pink-400 animate-bounce" style={{ animationDelay: '0.3s'}} />
            </div>

            <div className="relative aspect-video bg-slate-900 rounded-[2rem] overflow-hidden shadow-2xl border-[6px] border-white ring-1 ring-pink-100">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&controls=0&modestbranding=1" 
                title="Valentine's Surprise"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <div className="absolute inset-0 pointer-events-none border-[12px] border-white/10 rounded-[1.5rem]"></div>
            </div>

            <div className="p-4 space-y-4">
              <p className="text-slate-700 italic text-lg leading-relaxed">
                "I hope this brought a smile to your face. You're my favorite adventure."
              </p>
              
              <div className="flex justify-center gap-2">
                {[...Array(3)].map((_, i) => (
                  <Heart key={i} size={16} fill="#ff4d6d" className="text-pink-500 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
            </div>
            
            <button
              onClick={() => {
                setStage('question');
                setProgress(0);
                setNoButtonState({ x: 0, y: 0, scale: 1, text: "No", count: 0, isFixed: false });
              }}
              className="px-6 py-2 text-pink-400 hover:text-pink-600 text-xs font-bold uppercase tracking-widest transition-colors hover:bg-pink-50 rounded-full"
            >
            Do it again!
            </button>
          </div>
        )}
      </div>

      <div className="mt-8 flex flex-col items-center gap-1 z-10 opacity-50">
        <span className="text-[13px] font-bold uppercase tracking-widest text-pink-400">Made with ❤️ just for you</span>
      </div>
    </div>
  );
};

export default App;