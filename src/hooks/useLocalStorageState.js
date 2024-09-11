import { useEffect, useState } from "react";

export function useLocalStorageState(initialState, key) {
  const [lastConversion, setLastConversion] = useState(() => {
    const stored = JSON.parse(localStorage.getItem(key));
    return stored ? stored : initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(lastConversion));
  }, [lastConversion, key]);

  return [lastConversion, setLastConversion];
}
