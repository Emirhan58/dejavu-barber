export function RetroCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`retro-card p-6 ${className}`}>
      {children}
    </div>
  );
}
