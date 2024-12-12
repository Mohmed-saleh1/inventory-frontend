"use client";

import { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function ReportsPage() {
  const [activePeriod, setActivePeriod] = useState("Week"); // State to track active period

  // Sample data for the chart (replace with your actual data fetching logic)
  const chartData = {
    Week: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], // Days of the week
      datasets: [
        {
          label: "Revenue",
          data: [10000, 20000, 25000, 30000, 35000, 40000, 45000], // Daily revenue data for the week
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          fill: true,
        },
      ],
    },
    Month: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], // Months of the year
      datasets: [
        {
          label: "Revenue",
          data: [120000, 130000, 150000, 140000, 160000, 170000, 180000, 190000, 210000, 230000, 240000, 250000], // Monthly revenue data
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          fill: true,
        },
      ],
    },
    Year: {
      labels: ["2020", "2021", "2022", "2023"], // Years for historical data
      datasets: [
        {
          label: "Revenue",
          data: [1000000, 1100000, 1200000, 1300000], // Yearly revenue data
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          fill: true,
        },
      ],
    },
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: "Time Period",
        },
      },
      y: {
        title: {
          display: true,
          text: "Revenue",
        },
        ticks: {
          callback: function (value) {
            return `$${value / 1000}k`; // Format y-axis as 'k' values (e.g., 20k)
          },
          stepSize: 20000, // Step size of 20k for y-axis
        },
      },
    },
  };

  // Get the active chart data based on the selected period
  const activeChartData = chartData[activePeriod];

  return (
    <div className="mt-6 shadow-lg flex flex-col px-10 pt-4 w-full rounded-2xl relative h-fit bg-white">
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[{ label: "Total sales", value: "$52.6k", change: "+3.4%", bg: "bg-green-100" },
          { label: "Total Man", value: "$12.87k", change: "-2.5%", bg: "bg-blue-100" },
          { label: "Total Woman", value: "$12.87k", change: "+4.5%", bg: "bg-green-100" },
          { label: "Total kids", value: "$52.6k", change: "+3.4%", bg: "bg-blue-50" },
          { label: "Total Shoes", value: "$12.87k", change: "-2.5%", bg: "bg-red-100" },
          { label: "Total Accessories", value: "$12.87k", change: "+4.5%", bg: "bg-blue-50" }]
          .map((card, index) => (
            <div key={index} className={`px-5 py-6 rounded-lg shadow-md ${card.bg}`}>
              <h4 className="text-sm font-medium text-gray-400 mb-1">{card.label}</h4>
              <div className="flex items-center justify-between">
                <p className="text-xl font-semibold text-gray-900">{card.value}</p>
                <p className={`text-sm ${card.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>{card.change}</p>
              </div>
            </div>
          ))}
      </div>

      {/* Revenue Summary and Graph */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-10">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Revenue</h3>
            <div className="flex items-center justify-center gap-20">
              <p className="text-3xl">$11.642</p>
              <p className="text-sm text-green-600">+3.4% <span className="text-gray-500">from last period</span></p>
            </div>
          </div>
          <div className="flex gap-2">
            {["Week", "Month", "Year"].map((period) => (
              <button
                key={period}
                onClick={() => setActivePeriod(period)}
                className={`text-sm font-medium px-3 py-1 rounded-md ${activePeriod === period ? "text-blue-10" : "text-gray-500 hover:text-blue-10 transition-all duration-500"}`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        {/* Line Chart */}
        <div className="h-[300px] bg-gradient-to-t from-blue-200 to-white rounded-lg">
          {activeChartData ? (
            <Line data={activeChartData} options={chartOptions} />
          ) : (
            <p>Loading chart data...</p>
          )}
        </div>
      </div>
    </div>
  );
}
