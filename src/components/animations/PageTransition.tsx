"use client";

import { useContext, useRef, ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useSelectedLayoutSegment } from "next/navigation";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";

function usePreviousValue<T>(value: T): T | undefined {
  const prevRef = useRef<T | undefined>(undefined);
  const currentRef = useRef<T>(value);

  if (currentRef.current !== value) {
    prevRef.current = currentRef.current;
    currentRef.current = value;
  }

  return prevRef.current;
}

function FrozenRouter({ children }: { children: ReactNode }) {
  const context = useContext(LayoutRouterContext);
  const prevContext = usePreviousValue(context) ?? context;

  return (
    <LayoutRouterContext.Provider value={prevContext}>
      {children}
    </LayoutRouterContext.Provider>
  );
}

export function PageTransition({ children }: { children: ReactNode }) {
  const segment = useSelectedLayoutSegment();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={segment}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <FrozenRouter>{children}</FrozenRouter>
      </motion.div>
    </AnimatePresence>
  );
}
