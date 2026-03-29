"use client";

import { useState, useEffect } from "react";

interface TypingTextProps {
  words: string[];
}

export default function TypingText({ words }: TypingTextProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState(words[0] || "");
  const [isDeleting, setIsDeleting] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);

  // Delay typing animation start by 2s so it doesn't compete with LCP
  useEffect(() => {
    const timer = setTimeout(() => setAnimationStarted(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!animationStarted) return;

    const currentWord = words[wordIndex];

    if (!isDeleting && text === currentWord) {
      const timeout = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && text === "") {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
      const timeout = setTimeout(() => {}, 500);
      return () => clearTimeout(timeout);
    }

    const speed = isDeleting ? 60 : 100;
    const timeout = setTimeout(() => {
      setText(
        isDeleting
          ? currentWord.substring(0, text.length - 1)
          : currentWord.substring(0, text.length + 1)
      );
    }, speed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, animationStarted]);

  return (
    <span className="text-brand-light">
      {text}
      <span className="animate-blink">|</span>
    </span>
  );
}
