
import React from "react";
import { 
  BarChart as RechartBar,
  LineChart as RechartLine,
  PieChart as RechartPie,
  Bar,
  Line,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from "recharts";

export function BarChart() {
  const data = [
    { day: "Mon", hours: 1.5 },
    { day: "Tue", hours: 2.3 },
    { day: "Wed", hours: 1.8 },
    { day: "Thu", hours: 2.7 },
    { day: "Fri", hours: 2.2 },
    { day: "Sat", hours: 3.5 },
    { day: "Sun", hours: 2.1 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartBar data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip formatter={(value) => [`${value} hrs`, "Learning Time"]} />
        <Bar dataKey="hours" fill="#8884d8" radius={[4, 4, 0, 0]} />
      </RechartBar>
    </ResponsiveContainer>
  );
}

export function LineChart() {
  const data = [
    { month: "Jan", courses: 2 },
    { month: "Feb", courses: 3 },
    { month: "Mar", courses: 4 },
    { month: "Apr", courses: 3 },
    { month: "May", courses: 5 },
    { month: "Jun", courses: 7 },
    { month: "Jul", courses: 6 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartLine data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip formatter={(value) => [`${value} courses`, "Completed"]} />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="courses" 
          stroke="#8884d8" 
          activeDot={{ r: 8 }} 
          strokeWidth={2}
        />
      </RechartLine>
    </ResponsiveContainer>
  );
}

export function PieChart() {
  const data = [
    { name: "90-100%", value: 7, color: "#4ade80" },
    { name: "80-89%", value: 12, color: "#a78bfa" },
    { name: "70-79%", value: 5, color: "#facc15" },
    { name: "Below 70%", value: 3, color: "#f87171" },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartPie>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={true}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`${value} quizzes`, ""]} />
        <Legend />
      </RechartPie>
    </ResponsiveContainer>
  );
}
