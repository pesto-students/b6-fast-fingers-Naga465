import { useCallback, useState } from "react";

export default function useCounter(initialCounter = 0) {
  const [counter, setCounter] = useState(initialCounter);
  const resetCounter = useCallback(() => {
    setCounter(initialCounter);
  }, [initialCounter]);

  return { counter, setCounter, resetCounter };
}
