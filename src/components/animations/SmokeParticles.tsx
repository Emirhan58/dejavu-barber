export function SmokeParticles() {
  return (
    <div className="hidden md:block absolute bottom-0 left-0 right-0 h-[70%] overflow-hidden pointer-events-none z-[1]">
      {Array.from({ length: 16 }).map((_, i) => (
        <div
          key={i}
          className="smoke-particle"
          style={{
            left: `${3 + i * 6}%`,
            bottom: `${(i * 4) % 12}%`,
            animationDelay: `${i * 0.4}s`,
            animationDuration: `${5 + (i % 4) * 1}s`,
            width: `${100 + (i % 5) * 20}px`,
            height: `${100 + (i % 5) * 20}px`,
          }}
        />
      ))}
    </div>
  );
}
