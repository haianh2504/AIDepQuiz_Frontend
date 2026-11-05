"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { SubmitQuizResponse } from "@/lib/api-types";

interface ResultSessionValue {
  result: SubmitQuizResponse | null;
  setResult: (result: SubmitQuizResponse) => void;
  clearResult: () => void;
}

const ResultSessionContext = createContext<ResultSessionValue | null>(null);

export function ResultSessionProvider({ children }: { children: ReactNode }) {
  const [result, setResultState] = useState<SubmitQuizResponse | null>(null);

  const value = useMemo<ResultSessionValue>(
    () => ({
      result,
      setResult: setResultState,
      clearResult: () => setResultState(null),
    }),
    [result],
  );

  return (
    <ResultSessionContext.Provider value={value}>
      {children}
    </ResultSessionContext.Provider>
  );
}

export function useResultSession() {
  const context = useContext(ResultSessionContext);

  if (!context) {
    throw new Error("useResultSession must be used within ResultSessionProvider");
  }

  return context;
}

