"use client";

import { useState } from "react";

const currencies = [
  { name: "Florin", baseValue: 1.1 },
  { name: "Livre tournois", baseValue: 0.6 },
  { name: "Gros de Prague", baseValue: 0.08 },
];

const clientProfiles = [
  { type: "Naïf", tolerance: 0.8 },
  { type: "Normal", tolerance: 0.9 },
  { type: "Radin", tolerance: 0.97 },
];

export function useGame() {
  // STATE
  const [started, setStarted] = useState(false);
  const [ducats, setDucats] = useState(100);
  const [offer, setOffer] = useState("");
  const [gameOver, setGameOver] = useState(false);

  const [score, setScore] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [streak, setStreak] = useState(0);
  const [wallet, setWallet] = useState(0);
  const [lastGain, setLastGain] = useState<number | null>(null);

  const [client, setClient] = useState(generateClient());

  const [feedback, setFeedback] = useState<{
    message: string;
    type: "success" | "error" | "";
  }>({
    message: "",
    type: "",
  });

  // LOGIQUE
  function generateClient() {
    const currency = currencies[Math.floor(Math.random() * currencies.length)];

    const profile =
      clientProfiles[Math.floor(Math.random() * clientProfiles.length)];

    return {
      name: "Client " + Math.floor(Math.random() * 1000),
      currency: currency.name,
      amount: Math.floor(Math.random() * 10) + 10,
      tolerance: 0.85 + Math.random() * 0.1,
      profile: profile.type,
      baseValue: currency.baseValue,
    };
  }

  function handleStart() {
    setStarted(true);
  }

  function handlePropose() {
    if (offer === "") return;

    const numericOffer = Number(offer);

    const realValue = client.amount * client.baseValue;

    const minAcceptable = realValue * client.tolerance;
    const maxAcceptable = realValue * 1.2;

    const epsilon = 0.0001;

    const accepted =
      numericOffer >= minAcceptable - epsilon &&
      numericOffer <= maxAcceptable + epsilon;

    const profit = realValue - numericOffer;

    let profitRatio = profit / realValue;
    let scoreDelta = profitRatio * 100;

    // CLAMP
    scoreDelta = Math.max(-20, Math.min(20, scoreDelta));
    scoreDelta = Math.round(scoreDelta);

    if (accepted) {
      setDucats((prev) => {
        const newValue = Math.floor(prev - numericOffer);

        if (newValue <= 0) {
          const gain = score / 100;

          setWallet((prev) => prev + gain);
          setLastGain(gain);
          setGameOver(true);
        }

        return newValue;
      });

      const newStreak = streak + 1;
      setStreak(newStreak);

      const newMultiplier = Math.min(3, 1 + newStreak * 0.5);
      setMultiplier(newMultiplier);

      scoreDelta = Math.max(1, scoreDelta);

      const finalScore = Math.round(scoreDelta * newMultiplier);

      setScore((prev) => prev + finalScore);

      setFeedback({
        message: `Accepté !`,
        type: "success",
      });

      setClient(generateClient());
    } else {
      scoreDelta = -Math.abs(scoreDelta || 5);

      setScore((prev) => prev + scoreDelta);

      setStreak(0);
      setMultiplier(1);

      setFeedback({
        message: `Refusé !`,
        type: "error",
      });
    }

    setClient(generateClient());

    setOffer("");
  }

  function resetGame() {
    setStarted(false);
    setDucats(100);
    setOffer("");
    setClient(generateClient());
    setGameOver(false);
    setScore(0);
    setMultiplier(1);
    setStreak(0);
    setLastGain(null);
  }

  return {
    // States
    started,
    ducats,
    offer,
    gameOver,
    client,
    score,
    multiplier,
    streak,
    currencies,
    feedback,
    wallet,
    lastGain,

    // Utiles UI
    setOffer,

    // Actions
    handleStart,
    handlePropose,
    resetGame,
  };
}
