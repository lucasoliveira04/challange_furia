import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import { FilterDataX } from "../services/filter-data-x";

export const SocialMedias = () => {
  const [userData, setUserData] = useState(null);
  const [typeFan, setTypeFan] = useState("");
  const [points, setPoints] = useState(0);
  const [followersData, setFollowersData] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
      setUserData(JSON.parse(userDataString));
    }
  }, []);

  useEffect(() => {
    const fetchFollowersData = async () => {
      if (userData && userData.socialMediasOfUser.twitter) {
        try {
          const usernameX = userData.socialMediasOfUser.twitter
            ? userData.socialMediasOfUser.twitter.split("/").pop()
            : "Não informado";

          const data = await FilterDataX({
            username: usernameX,
            qntdFollowing: 10,
            onProgress: (progress) => setLoadingProgress(progress),
          });
          setFollowersData(data);
        } catch (error) {
          console.error("Erro ao buscar dados dos seguidores:", error);
        }
      }
    };

    fetchFollowersData();
  }, [userData]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  const usernameX = userData.socialMediasOfUser.twitter
    ? userData.socialMediasOfUser.twitter.split("/").pop()
    : "Não informado";

  const usernameInstagram = userData.socialMediasOfUser.instagram
    ? userData.socialMediasOfUser.instagram.split("/").pop()
    : "Não informado";

  return (
    <div>
      <p>{userData.name}</p>
      <span className="ml-2 text-blue-500">{usernameX}</span>
      <span className="ml-2 text-blue-500">{usernameInstagram}</span>
      {followersData ? (
        <div>
          <p>Pessoas relacionadas a Furia encontradas: {followersData.total}</p>
        </div>
      ) : (
        <div>
          <p>Carregando dados de seguidores...</p>
          <progress value={loadingProgress} max={100} />
        </div>
      )}
    </div>
  );
};
