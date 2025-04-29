import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export const SocialMediaPieChart = ({ data }) => {
  const redesSeguidas = {};

  data.forEach((usuario) => {
    const redes = usuario.socialMediasFollow || [];
    redes.forEach((rede) => {
      redesSeguidas[rede] = (redesSeguidas[rede] || 0) + 1;
    });
  });

  const chartData = Object.entries(redesSeguidas).map(([rede, quantidade]) => ({
    name: rede,
    value: quantidade,
  }));

  const COLORS = ["#fbbf24", "#4caf50", "#2196f3", "#e91e63", "#ff5722"];

  return (
    <div className="w-full h-[400px] p-6">
      <h2 className="text-xl font-bold mb-4 text-center">
        Redes Sociais Mais Seguidas
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            label
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            layout="vertical"
            align="right"
            verticalAlign="middle"
            iconType="circle"
            wrapperStyle={{ padding: "10px" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
