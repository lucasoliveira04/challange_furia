import { useEffect, useMemo, useState } from "react";
import { db } from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";
import { FanBarChart } from "../components/bar-chart";
import { SocialMediaPieChart } from "../components/pie-char";

export const DashboardAdmin = () => {
  const [data, setData] = useState([]);

  const mediaTempoFa = useMemo(() => {
    if (data.length === 0) return 0;
    const soma = data.reduce((total, usuario) => {
      const tempo = parseInt(usuario.timeFan);
      return total + (isNaN(tempo) ? 0 : tempo);
    }, 0);
    return parseFloat((soma / data.length).toFixed(2));
  }, [data]);

  const mediaEventosPorPessoa = useMemo(() => {
    if (data.length === 0) return 0;
    const totalParticipantes = data.reduce((total, usuario) => {
      const eventos = usuario.eventsParticipationsLastYear || [];
      return total + eventos.length;
    }, 0);
    return parseFloat((totalParticipantes / data.length).toFixed(2));
  }, [data]);

  const redeMaisSeguida = useMemo(() => {
    if (data.length === 0) return null;
    const contagem = data.reduce((acc, usuario) => {
      usuario.socialMediasFollow?.forEach((rede) => {
        acc[rede] = (acc[rede] || 0) + 1;
      });
      return acc;
    }, {});
    return Object.entries(contagem).reduce(
      (max, [rede, quantidade]) =>
        quantidade > max[1] ? [rede, quantidade] : max,
      ["", 0]
    )[0];
  }, [data]);

  const estadoPredominante = useMemo(() => {
    if (data.length === 0) return null;

    const contagemEstados = data.reduce((acc, usuario) => {
      const estado = usuario.address?.state;
      if (estado) {
        acc[estado] = (acc[estado] || 0) + 1;
      }
      return acc;
    }, {});

    const [estadoMaisSeguido] = Object.entries(contagemEstados).reduce(
      (max, [estado, quantidade]) =>
        quantidade > max[1] ? [estado, quantidade] : max,
      ["", 0]
    );

    return estadoMaisSeguido;
  }, [data]);

  const cardObject = [
    { title: "Total de Pessoas", description: data.length },
    { title: "Média de tempo como fã", description: mediaTempoFa },
    {
      title: "Média de participantes por evento",
      description: mediaEventosPorPessoa,
    },
    { title: "Rede mais seguida", description: redeMaisSeguida },
    {
      title: "Estado Predominante",
      description: estadoPredominante || "Não disponível",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "data"));
        const lista = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(lista);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };
    fetchData();
  }, []);

  if (data.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        Carregando...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-6 min-h-screen bg-gray-100">
      <h1 className="font-bold mb-6 font-winky text-4xl">
        Dashboard de Usuários
      </h1>

      <div className="flex flex-col w-full max-w-screen-xl">
        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 justify-center gap-6">
          {cardObject.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>

        {/* Gráficos */}
        <div className="flex flex-wrap justify-center gap-6 mt-6">
          <div className="flex flex-1 justify-center">
            <FanBarChart data={data} width={500} height={300} />
          </div>
          <div className="flex flex-1 justify-center">
            <SocialMediaPieChart data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

const Card = ({ title, description }) => {
  return (
    <div className="flex flex-col p-6 bg-white rounded-lg shadow-md w-[250px] h-[150px] border border-gray-300">
      <h2 className="font-semibold text-lg text-gray-800">{title}</h2>
      <p className="text-2xl font-bold text-blue-600">{description}</p>
    </div>
  );
};
