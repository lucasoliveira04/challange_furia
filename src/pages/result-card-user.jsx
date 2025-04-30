import { useEffect, useRef, useState } from "react";
import logo from "../../public/imgs/home/logo.png";
import html2canvas from "html2canvas";

export const ResultCardUser = () => {
  const [userData, setUserData] = useState(null);
  const [typeFan, setTypeFan] = useState("");
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
      setUserData(JSON.parse(userDataString));
    }
  }, []);

  useEffect(() => {
    if (userData) {
      getTypeOfFan();
    }
  }, [userData]);

  const getTypeOfFan = () => {
    let totalPoints = 0;

    if (userData.timeFan > 0 && userData.timeFan <= 3) {
      totalPoints += 2;
    } else if (userData.timeFan > 3 && userData.timeFan <= 5) {
      totalPoints += 4;
    } else {
      totalPoints += 6;
    }

    if (userData.interests) {
      totalPoints += userData.interests.length * 2;
    }

    if (userData.socialMediasFollow) {
      totalPoints += userData.socialMediasFollow.length * 2;
    }

    if (userData.eventsParticipationsLastYear) {
      totalPoints += userData.eventsParticipationsLastYear.length * 2;
    }

    if (userData.buysLastYear) {
      totalPoints += userData.buysLastYear.length * 2.5;
    }

    if (userData.isEngajamented) {
      totalPoints += 5;
    }

    setPoints(totalPoints);

    if (totalPoints >= 30) {
      setTypeFan("Fanático");
    } else if (totalPoints >= 20) {
      setTypeFan("Apaixonado");
    } else {
      setTypeFan("Iniciante");
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div
        className={`w-full max-w-4xl p-10 rounded-2xl shadow-lg border
          ${
            typeFan === "Fanático"
              ? "border-fanatico"
              : typeFan === "Apaixonado"
              ? "border-apaixonado"
              : "border-iniciante"
          }
        `}
      >
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col items-start">
            <h2 className="text-4xl font-bold text-[#bfa355]">
              Torcedor FURIA
            </h2>
            <p className="text-sm text-gray-400 mt-2">Tipo de Fã: {typeFan}</p>
            {userData.isEngajamented && (
              <p className="text-sm text-gray-400 mt-2">
                Você é um torcedor engajado!
              </p>
            )}
            <p className="text-white">
              <span className="font-semibold text-xl">Instagram:</span>
              <span className="ml-2 text-blue-500">
                {userData.socialMediasOfUser?.instagram
                  ? userData.socialMediasOfUser.instagram.split("/").pop()
                  : "Não informado"}
              </span>
            </p>
            <p className="text-white">
              <span className="font-semibold text-xl">X:</span>
              <span className="ml-2 text-blue-500">
                {userData.socialMediasOfUser?.twitter
                  ? userData.socialMediasOfUser.twitter.split("/").pop()
                  : "Não informado"}
              </span>
            </p>
          </div>

          <img src={logo} alt="Logo FURIA" width={90} className="mb-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-gray-100 mt-10">
          <div className="space-y-6">
            <Info label="Nome" value={userData.name || "Não informado"} />
            <Info
              label="Estado"
              value={userData.address?.state || "Não informado"}
            />
            <Info
              label="Cidade"
              value={userData.address?.city || "Não informado"}
            />
            <Info
              label="Tempo de Torcedor"
              value={userData.timeFan ? `${userData.timeFan} anos` : "0 anos"}
            />
          </div>

          <div className="space-y-6">
            <Info
              label="Interesses"
              value={
                Array.isArray(userData.interests)
                  ? userData.interests.join(" | ")
                  : userData.interests || "Não informado"
              }
            />
            <Info
              label="Segue a FURIA em"
              value={
                Array.isArray(userData.socialMediasFollow)
                  ? userData.socialMediasFollow.join(" | ")
                  : userData.socialMediasFollow || "Nenhuma rede seguida"
              }
            />
            <Info
              label="Eventos Participados"
              value={`${userData.eventsParticipationsLastYear.length} evento(s)`}
            />
            <Info
              label="Compras Realizadas"
              value={`${userData.buysLastYear.length} compra(s)`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Info = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-sm text-gray-400">{label}</span>
    <span className="text-lg font-medium break-words">{value}</span>
  </div>
);
