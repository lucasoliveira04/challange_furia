export const FilterDataProfileX = async (username) => {
  const response = await fetch(
    `http://localhost:3000/x/api/scraper/profile/${username}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data;
};

export const FilterDataFollowersX = async (username, qntdFollowers) => {
  const response = await fetch(
    `http://localhost:3000/x/api/scraper/followers/${username}/${qntdFollowers}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data;
};
