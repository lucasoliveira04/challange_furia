import { useState, useEffect, useContext } from "react";
import {
  FilterDataFollowersX,
  FilterDataProfileX,
} from "../services/filter-data-social-media";
import UserContext from "../context/UserContext";
import { salvarDadosUsuario } from "../services/saveDataFirebase";
import { useNavigate } from "react-router";

export const LoadingDataUserSocialMedia = () => {
  const [loading, setLoading] = useState(true);
  const [dataSocialMedia, setDataSocialMedia] = useState({
    followersData: 0,
    profileData: 0,
  });
  const [timer, setTimer] = useState(0);
  const navigate = useNavigate();
  const { userData, updateUserData } = useContext(UserContext);

  const usernameX = userData?.socialMediasOfUser?.twitter
    ? userData.socialMediasOfUser.twitter.split("/").pop()
    : "Não informado";

  const handleFetchData = async () => {
    const followersData = await FilterDataFollowersX(usernameX, 20);
    const profileData = await FilterDataProfileX(usernameX);

    setDataSocialMedia({ followersData, profileData });

    if (followersData.length > 0 || profileData.length > 0) {
      updateUserData({ isEngajamented: true });
      console.log("Dados salvos com sucesso no Firebase + " + usernameX);
    } else {
      console.log("0 engajamento encontrado");
    }

    salvarDadosUsuario(userData);
    setLoading(false);
  };

  useEffect(() => {
    if (usernameX !== "Não informado") {
      handleFetchData();
    }

    if (!loading || !usernameX) {
      navigate("/result-card-user");
    }

    const interval = setInterval(() => {
      if (loading) {
        setTimer((prevTime) => prevTime + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [usernameX, loading]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {loading && (
        <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center gap-4 w-96">
          {/* Spinner de carregamento */}
          <div className="w-12 h-12 border-4 border-t-transparent border-blue-600 rounded-full animate-spin" />
          <span className="text-gray-700 text-lg font-medium text-center">
            Salvando sua pesquisa e verificando sua conexão com a Fúria...
          </span>
          {/* Exibindo o cronômetro */}
          <p className="text-sm text-gray-500 mt-2">
            Tempo de carregamento: {formatTime(timer)}
          </p>
        </div>
      )}
    </div>
  );
};
