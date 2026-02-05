"use client";

import { useEffect, useRef, useState } from "react";
import { STATS } from "@/lib/constants";

function useCountUp(end: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration, start]);

  return count;
}

function StatItem({ label, value, suffix }: { label: string; value: string; suffix: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const numericValue = parseInt(value.replace(/[^0-9]/g, ""));
  const count = useCountUp(numericValue, 2000, isVisible);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const displayValue = value.includes("+")
    ? `${count.toLocaleString()}+`
    : count.toLocaleString();

  return (
    <div ref={ref} className="text-center">
      <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-accent-400 mb-1">
        {displayValue}
        {suffix}
      </p>
      <p className="text-primary-200 text-xs sm:text-sm">{label}</p>
    </div>
  );
}

export function StatsSection() {
  return (
    <section className="py-6 sm:py-10 md:py-12 bg-primary-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {STATS.map((stat, index) => (
            <StatItem key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
