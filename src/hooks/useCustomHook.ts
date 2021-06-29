import { useState, useCallback } from 'react'

export function useCustomHook() {
  const [randomNumber, setRandomNumber] = useState(0);

  const generateRandomNumber = useCallback(async () => {
    setRandomNumber(randomNumber + 1);
  }, [randomNumber])

  return { randomNumber, generateRandomNumber }
}
