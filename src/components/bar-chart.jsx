import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export const FanBarChart = ({ data, width, height }) => {
  const fansPorTempo = {};

  data.forEach((usuario) => {
    const tempo = parseInt(usuario.timeFan);
    if (!isNaN(tempo)) {
      fansPorTempo[tempo] = (fansPorTempo[tempo] || 0) + 1;
    }
  });

  const chartData = Object.entries(fansPorTempo).map(([tempo, quantidade]) => ({
    tempo: `${tempo} anos`,
    quantidade,
  }));

  return (
    <div className="w-full h-[400px] p-6">
      <h2 className="text-xl font-bold mb-4 text-center">
        Número de Fãs por Tempo de Fã
      </h2>
      <ResponsiveContainer width={width} height={height}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="tempo" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="quantidade" fill="#fbbf24" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
