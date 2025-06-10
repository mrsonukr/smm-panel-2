import React from "react";
import { Clock, Users, Ticket } from "lucide-react";

// Individual Stat Component
const StatItem = ({ icon: Icon, value, label }) => { // eslint-disable-line no-unused-vars
  return (
    <div className="flex bg-white p-6 rounded-2xl items-center gap-8 max-w-4xl mx-auto my-4">
      <div className="flex items-center justify-center bg-slate-100 rounded-full w-16 h-16 mr-4">
        <Icon className="text-slate-700 w-8 h-8" />
      </div>
      <div>
        <h3 className="text-3xl font-extrabold text-slate-800">{value.toLocaleString()}</h3>
        <p className="text-slate-500 text-lg font-medium">{label}</p>
      </div>
    </div>
  );
};

// Main StatsBar Component
const StatsBar = () => {
  const stats = [
    { icon: Clock, value: 785454, label: "Total Orders" },
    { icon: Users, value: 72361, label: "Total Users" },
    { icon: Ticket, value: 5236, label: "Total Tickets" },
  ];

  return (
    <>
      {stats.map((stat, index) => (
        <StatItem
          key={index}
          icon={stat.icon}
          value={stat.value}
          label={stat.label}
        />
      ))}
    </>
  );
};

export default StatsBar;