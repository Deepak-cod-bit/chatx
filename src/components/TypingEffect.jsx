import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

const TypingEffect = ({ texts, speed = 0.05 }) => {
  const [index, setIndex] = useState(0);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) => texts[index].slice(0, latest));

  useEffect(() => {
    const controls = animate(count, texts[index].length, {
      duration: texts[index].length * speed,
      ease: "linear",
      onComplete: () => {
        setTimeout(() => {
          setIndex((prev) => (prev + 1) % texts.length);
          count.set(0);
        }, 1500);
      },
    });
    return controls.stop;
  }, [index, texts, speed, count]);

  return (
    <div className="text-darkgreen text-xl font-mono h-8">
      <motion.span>{displayText}</motion.span>
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="ml-1 inline-block w-[3px] h-[1em] bg-darkgreen align-middle"
      />
    </div>
  );
};

export default TypingEffect;