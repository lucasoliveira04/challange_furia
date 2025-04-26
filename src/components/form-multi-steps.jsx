import { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import { AnimatePresence, motion } from "framer-motion";
import { cpf } from "cpf-cnpj-validator";
import isEmail from "validator/lib/isEmail";

export const FormMultiSteps = () => {
  const { userData, updateUserData } = useContext(UserContext);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});

  const steps = [
    {
      label: "Nome completo",
      name: "name",
      type: "text",
      validation: (value) => /^[A-Za-zÀ-ÿ\s]+$/.test(value),
    },
    {
      label: "CPF",
      name: "cpf",
      type: "text",
      validation: (value) => cpf.isValid(value),
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      validation: (value) => isEmail(value),
    },
    {
      label: "Endereço",
      name: "address",
      type: "text",
    },
    {
      label: "Jogos de Interesse",
      name: "interests",
      type: "button",
      options: [
        "Free Fire",
        "Pubg",
        "Valorant",
        "Rocket League",
        "Apex Legends",
        "Futebol de 7",
      ],
      validation: (value) => value.length > 0,
    },

    {
      label: "Redes Sociais",
      name: "socialMediasFollow",
      type: "button",
      options: [
        "Facebook",
        "Instagram",
        "Twitter",
        "LinkedIn",
        "TikTok",
        "YouTube",
      ],
      validation: (value) => value.length > 0,
    },
  ];

  const handleChange = (value, field) => {
    const updatedValues = userData[field].includes(value)
      ? userData[field].filter((item) => item !== value)
      : [...userData[field], value];

    updateUserData({ [field]: updatedValues });
  };

  const buscarEnderecoPorCEP = async (cepValue) => {
    const cepLimpo = cepValue.replace(/\D/g, "");

    if (cepLimpo.length !== 8) return;

    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${cepLimpo}/json/`
      );
      const data = await response.json();

      if (!data.erro) {
        updateUserData({
          address: {
            ...userData.address,
            cep: cepLimpo,
            street: data.logradouro,
            neighborhood: data.bairro,
            city: data.localidade,
            state: data.uf,
          },
        });
      } else {
        setErrors((prev) => ({ ...prev, cep: "CEP não encontrado." }));
      }
    } catch (error) {
      setErrors((prev) => ({ ...prev, cep: "Erro ao buscar o CEP." }));
    }
  };

  const handleNext = () => {
    const currentStep = steps[step - 1];
    const isValid = currentStep.validation
      ? currentStep.validation(userData[currentStep.name])
      : true;

    if (!isValid) {
      setErrors((prevErros) => ({
        ...prevErros,
        [currentStep.name]: `${currentStep.label} é obrigatório e precisa ser válido.`,
      }));
    } else {
      setErrors((prevErrors) => {
        const { [currentStep.name]: removed, ...rest } = prevErrors;
        return rest;
      });
      setStep((prev) => Math.min(prev + 1, steps.length));
    }
  };

  const handlePrevious = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userData);
  };

  const currentStep = steps[step - 1];

  return (
    <div className="flex justify-center place-items-center w-full h-screen mx-auto bg-white p-6 rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <label
              htmlFor={currentStep.name}
              className="block text-3xl font-bold text-black mb-2"
            >
              {currentStep.label}
            </label>

            {currentStep.type === "button" ? (
              <div className="grid grid-cols-3 gap-4">
                {currentStep.options.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleChange(option, currentStep.name)}
                    className={`px-4 py-2 rounded-lg border-2 text-black ${
                      userData[currentStep.name].includes(option)
                        ? "bg-zinc-600 text-white"
                        : "bg-white border-black hover:bg-gray-200"
                    } transition-colors`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            ) : currentStep.name === "address" ? (
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label>CEP</label>
                  <input
                    type="text"
                    name="cep"
                    className="w-[500px] h-[50px] px-4 py-2 border border-black rounded-lg text-black bg-white placeholder-black focus:outline-none focus:ring-2 focus:ring-black"
                    value={userData.address.cep || ""}
                    onChange={(e) =>
                      updateUserData({
                        address: {
                          ...userData.address,
                          [e.target.name]: e.target.value,
                        },
                      })
                    }
                    onBlur={(e) => buscarEnderecoPorCEP(e.target.value)}
                  />
                  {errors.cep && <span>{errors.cep}</span>}
                </div>

                <div className="flex flex-col">
                  <label>Bairro</label>
                  <input
                    type="text"
                    name="neighborhood"
                    className="w-[500px] h-[50px] px-4 py-2 border border-black rounded-lg text-black bg-white placeholder-black focus:outline-none focus:ring-2 focus:ring-black"
                    value={userData.neighborhood || ""}
                    onChange={(e) =>
                      updateUserData({
                        address: {
                          ...userData.address,
                          [e.target.name]: e.target.value,
                        },
                      })
                    }
                  />
                  {errors.neighborhood && <span>{errors.neighborhood}</span>}
                </div>

                <div className="flex flex-col">
                  <label>Cidade</label>
                  <input
                    type="text"
                    name="city"
                    className="w-[500px] h-[50px] px-4 py-2 border border-black rounded-lg text-black bg-white placeholder-black focus:outline-none focus:ring-2 focus:ring-black"
                    value={userData.city || ""}
                    onChange={(e) =>
                      updateUserData({
                        address: {
                          ...userData.address,
                          [e.target.name]: e.target.value,
                        },
                      })
                    }
                  />
                  {errors.city && <span>{errors.city}</span>}
                </div>

                <div className="flex flex-col">
                  <label>Estado</label>
                  <input
                    type="text"
                    name="state"
                    className="w-[500px] h-[50px] px-4 py-2 border border-black rounded-lg text-black bg-white placeholder-black focus:outline-none focus:ring-2 focus:ring-black"
                    value={userData.state || ""}
                    onChange={(e) =>
                      updateUserData({
                        address: {
                          ...userData.address,
                          [e.target.name]: e.target.value,
                        },
                      })
                    }
                  />
                  {errors.state && <span>{errors.state}</span>}
                </div>
              </div>
            ) : (
              <input
                type={currentStep.type}
                id={currentStep.name}
                name={currentStep.name}
                value={userData[currentStep.name]}
                onChange={(e) =>
                  updateUserData({ [e.target.name]: e.target.value })
                }
                className="w-[500px] h-[50px] px-4 py-2 border border-black rounded-lg text-black bg-white placeholder-black focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            )}

            {errors[currentStep.name] && (
              <p className="text-red-500 text-sm mt-2">
                {errors[currentStep.name]}
              </p>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between mt-4">
          {step > 1 && (
            <button
              type="button"
              onClick={handlePrevious}
              className="bg-gray-300 text-black px-4 py-2 rounded"
            >
              Voltar
            </button>
          )}
          {step < steps.length ? (
            <button
              type="button"
              onClick={handleNext}
              className="ml-auto px-4 py-2 border border-black text-black bg-white rounded-md hover:bg-black hover:text-white transition-colors"
            >
              Próximo
            </button>
          ) : (
            <button
              type="submit"
              className="ml-auto px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              Finalizar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
