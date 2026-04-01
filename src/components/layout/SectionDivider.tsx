export function SectionDivider() {
  return (
    <div className="h-2 w-full overflow-hidden" aria-hidden="true">
      <div
        className="h-full w-[200%] animate-barber-slide"
        style={{
          background:
            "repeating-linear-gradient(120deg, #E11D48 0px, #E11D48 20px, #FAFAF9 20px, #FAFAF9 40px, #3B82F6 40px, #3B82F6 60px)",
        }}
      />
    </div>
  );
}
