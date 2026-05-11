import { useState, useEffect } from "react";

export function useRateLimiter(key: string, maxSubmits = 3) {
  const stored = typeof window !== "undefined" ? sessionStorage.getItem(key) : null;
  const [submitCount, setSubmitCount] = useState(() =>
    stored ? JSON.parse(stored).count : 0
  );
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(key, JSON.stringify({ count: submitCount }));
    }
  }, [submitCount, key]);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(c => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const increment = () => {
    setSubmitCount((c: number) => c + 1);
    setCooldown(15);
  };

  return { 
    submitCount, 
    cooldown, 
    increment, 
    isBlocked: submitCount >= maxSubmits || cooldown > 0 
  };
}
