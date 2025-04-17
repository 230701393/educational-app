
import { 
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip
} from "recharts";

export function SkillsRadar() {
  const data = [
    { subject: "Programming", A: 90, fullMark: 100 },
    { subject: "Statistics", A: 75, fullMark: 100 },
    { subject: "Data Viz", A: 85, fullMark: 100 },
    { subject: "ML", A: 60, fullMark: 100 },
    { subject: "UI Design", A: 80, fullMark: 100 },
    { subject: "Research", A: 70, fullMark: 100 },
  ];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis angle={30} domain={[0, 100]} />
        <Radar
          name="Skill Level"
          dataKey="A"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
        <Tooltip formatter={(value) => [`${value}%`, "Proficiency"]} />
      </RadarChart>
    </ResponsiveContainer>
  );
}
