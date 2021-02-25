import { useCallback, useState } from "react";

export default function useScore(initialScore = 0) {
  const [score, updateScore] = useState(initialScore);
  const resetScore = useCallback(() => {
    updateScore(initialScore);
  }, [initialScore]);
  return { score, updateScore, resetScore };
}
