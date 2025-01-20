// components/ChartComponent.tsx
import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
);

const ChartComponent: React.FC = () => {
  // Generate random data
  const generateRandomData = () => {
    return Array.from({ length: 6 }, () => Math.floor(Math.random() * 100));
  };

  // Memoize chart data to generate it only once
  const data = useMemo(() => ({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Dataset 1",
        data: generateRandomData(),
        borderColor: "#3b82f6",
        backgroundColor: "transparent",
        borderWidth: 3,
        tension: 0.4,
        fill: false,
        pointRadius: 0,
        pointHoverRadius: 0,
      },
      {
        label: "Dataset 2",
        data: generateRandomData(),
        borderColor: "#52525b",
        borderWidth: 3,
        tension: 0.4,
        fill: false,
        pointRadius: 0,
        pointHoverRadius: 0,
      },
    ],
  }), []); // Empty dependency array ensures it runs only once

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Ensures labels are not cut off
    plugins: {
      legend: {
        display: false, // Hide legend
      },
      tooltip: {
        enabled: true, // Enable tooltips
      },
    },
    layout: {
      padding: 10, // Add padding around the chart
    },
    scales: {
      x: {
        ticks: {
          display: false, // Hide X-axis labels
        },
        grid: {
          drawBorder: false, // Remove the X-axis line
          color: "#1f2937", // Subtle dark grid lines
        },
        title: {
          display: true,
          text: "Activity Patterns",
          color: "#9ca3af",
          font: {
            size: 16,
          },
        },
      },
      y: {
        ticks: {
          display: false, // Hide Y-axis labels
        },
        grid: {
          color: "#1f2937", // Subtle dark grid lines
          borderColor: "#4b5563", // Keep the Y-axis line visible
          borderWidth: 2, // Width of the Y-axis border
        },
        title: {
          display: true,
          text: "Message Count",
          color: "#9ca3af",
          font: {
            size: 16,
          },
        },
      },
    },
  };

  return (
    <div
      style={{
        
        border: "1px solid #e5e7eb",
      }}

      className="p-3 h-full rounded-md"
    >
      <Line data={data} options={options} />
    </div>
  );
};

export default ChartComponent;
