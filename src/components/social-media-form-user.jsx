export const SocialMediaUserForm = ({ userData, updateUserData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateUserData({
      socialMediasOfUser: {
        ...userData.socialMediasOfUser,
        [name]: value,
      },
    });
  };

  return (
    <div className="grid grid-rows-2">
      <div className="flex flex-col">
        <label>Instagram</label>
        <input
          type="text"
          name="instagram"
          className="w-[500px] h-[50px] px-4 py-2 border border-black rounded-lg text-black bg-white placeholder-black focus:outline-none focus:ring-2 focus:ring-black"
          value={
            userData.socialMediasOfUser.instagram || "https://instagram.com/"
          }
          placeholder="Coloque seu @ Aqui"
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col">
        <label>Twitter</label>
        <input
          type="text"
          name="twitter"
          className="w-[500px] h-[50px] px-4 py-2 border border-black rounded-lg text-black bg-white placeholder-black focus:outline-none focus:ring-2 focus:ring-black"
          value={userData.socialMediasOfUser.twitter || "https://x.com/"}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};
