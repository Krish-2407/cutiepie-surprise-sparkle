export const BuntingDecoration = () => {
  const flags = [
    { colorHsl: 'var(--neon-pink)', left: '5%' },
    { colorHsl: 'var(--neon-cyan)', left: '15%' },
    { colorHsl: 'var(--neon-yellow)', left: '25%' },
    { colorHsl: 'var(--neon-green)', left: '35%' },
    { colorHsl: 'var(--neon-purple)', left: '45%' },
    { colorHsl: 'var(--neon-pink)', left: '55%' },
    { colorHsl: 'var(--neon-cyan)', left: '65%' },
    { colorHsl: 'var(--neon-yellow)', left: '75%' },
    { colorHsl: 'var(--neon-green)', left: '85%' },
    { colorHsl: 'var(--neon-purple)', left: '95%' },
  ];

  return (
    <div className="fixed top-0 left-0 w-full h-24 pointer-events-none z-50">
      {/* String/rope */}
      <svg className="absolute top-0 w-full h-full" preserveAspectRatio="none">
        <path
          d="M 0,20 Q 25,15 50,20 T 100,20"
          stroke="hsl(var(--neon-purple))"
          strokeWidth="2"
          fill="none"
          vectorEffect="non-scaling-stroke"
          className="drop-shadow-[0_0_5px_hsl(var(--neon-purple))]"
          style={{ strokeDasharray: '100%' }}
        />
      </svg>

      {/* Wavy side ribbons */}
      <div className="absolute left-0 top-0 w-6 h-96 bg-gradient-to-b from-neon-purple to-transparent opacity-40 blur-sm" 
           style={{ clipPath: 'path("M 0,0 Q 10,50 0,100 T 0,200 T 0,300 T 0,400")' }} />
      <div className="absolute right-0 top-0 w-6 h-96 bg-gradient-to-b from-neon-cyan to-transparent opacity-40 blur-sm" 
           style={{ clipPath: 'path("M 24,0 Q 14,50 24,100 T 24,200 T 24,300 T 24,400")' }} />

      {/* Triangular flags */}
      {flags.map((flag, index) => (
        <div
          key={index}
          className="absolute opacity-90"
          style={{
            left: flag.left,
            top: '20px',
            width: '0',
            height: '0',
            borderLeft: '30px solid transparent',
            borderRight: '30px solid transparent',
            borderTop: `50px solid hsl(${flag.colorHsl})`,
            transform: 'translateX(-50%)',
            filter: `drop-shadow(0 0 8px hsl(${flag.colorHsl}))`,
            animation: `float 3s ease-in-out infinite`,
            animationDelay: `${index * 0.1}s`,
          }}
        />
      ))}
    </div>
  );
};
