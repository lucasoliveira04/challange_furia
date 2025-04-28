export const FilterDataX = async ({ username, qntdFollowing }) => {
  let endPoint = `http://localhost:3000/api/scraper/${username}/${qntdFollowing}`;

  try {
    const response = await fetch(endPoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar dados do Instagram");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Erro ao buscar dados do Instagram:", error);
    return null;
  }
};
