import furiaLogo from "../../public/imgs/home/furiaLogo.webp";
import { Link } from "react-router";

export const HomePage = () => {
  return (
    <div className="relative bg-zinc-200 w-full h-screen overflow-hidden">
      <div className="w-full h-[600px]">
        <img
          src={furiaLogo}
          alt="Furia"
          className="w-full h-full object-[position]"
        />
      </div>

      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-45"></div>

      <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center z-20">
        <h2 className="text-white text-3xl font-winky text-center mb-6 drop-shadow-lg">
          Queremos te conhecer melhor, <br /> para te proporcionar uma
          experiência única!
        </h2>
      </div>

      <div className="absolute bottom-16 left-0 right-0 flex justify-center z-20">
        <Link to="/form">
          <button className="px-8 py-3 bg-white text-black font-semibold text-lg rounded-full hover:bg-zinc-300 transition duration-300 shadow-xl">
            Vamos começar?
          </button>
        </Link>
      </div>
    </div>
  );
};
