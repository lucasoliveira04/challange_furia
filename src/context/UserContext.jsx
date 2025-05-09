import { createContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setuserData] = useState({
    name: "",
    cpf: "",
    email: "",
    address: {
      cep: "",
      street: "",
      neighborhood: "",
      city: "",
      state: "",
      number: "",
    },
    timeFan: 0,
    interests: "",
    socialMediasFollow: "",
    cpfImage: "",
    socialMediasOfUser: {
      instagram: "",
      twitter: "",
    },
    buysLastYear: [],
    eventsParticipationsLastYear: [],
    isEngajamented: false,
  });

  const updateUserData = (newData) => {
    setuserData((prevState) => ({
      ...prevState,
      ...newData,
    }));
  };

  return (
    <UserContext.Provider value={{ userData, updateUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
