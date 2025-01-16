"use client";
import React from "react";

interface CircularProgressProps {
  percentage: number; // Percentage value (0 to 100)
  size?: number; // Size of the SVG
  strokeWidth?: number; // Stroke width of the circle
}

const getColor = (percentage: number): string => {
  if (percentage <= 33) return "#08B150"; // 0-33%: Red
  if (percentage <= 66) return "#EDB03B"; // 34-66%: Yellow
  return "#F64549"; // 67-100%: Green
};

const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage,
  size = 15,
  strokeWidth = 3,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  const progressColor = getColor(percentage);

  return (
    <div className="flex  gap-1 items-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="circular-progress"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#8E9DAD" // Background circle color
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={progressColor} // Dynamic progress color
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition: "stroke-dashoffset 0.5s ease, stroke 0.5s ease",
          }}
        />
      </svg>
      <p className="text-xs text-[var(--foreground-two)]">{percentage}%</p>
    </div>
  );
};

export default CircularProgress;
