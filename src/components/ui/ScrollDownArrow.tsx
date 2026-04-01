"use client";

export function ScrollDownArrow() {
  return (
    <button
      type="button"
      tabIndex={-1}
      aria-hidden="true"
      onClick={() =>
        document
          .getElementById("hakkimizda")
          ?.scrollIntoView({ behavior: "smooth" })
      }
      className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-gold cursor-pointer border-none bg-transparent p-2"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-8 w-8"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </button>
  );
}
