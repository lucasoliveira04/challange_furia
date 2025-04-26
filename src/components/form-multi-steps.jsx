import { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import { AnimatePresence, motion } from "framer-motion";
import { cpf } from "cpf-cnpj-validator";
import isEmail from "validator/lib/isEmail";

export const FormMultiSteps = () => {
  const { userData, updateUserData } = useContext(UserContext);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [isCpfImagemValid, setIsCpfImagemValid] = useState(false);
  const [eventInputs, setEventInputs] = useState([{ name: "", date: "" }]);
  const [buysLastYear, setBuysLastYear] = useState([
    {
      name: "",
      value: 0,
      date: "",
      typeProduct: "",
    },
  ]);

  const handleInputProductChange = (index, field, value) => {
    const newInputs = [...buysLastYear];
    newInputs[index][field] = value;
    setBuysLastYear(newInputs);
  };

  const handleAddProductInput = () => {
    const lastProduct = buysLastYear[buysLastYear.length - 1];

    if (!lastProduct.name || !lastProduct.date) {
      alert("Preencha o nome e a data do evento antes de adicionar um novo.");
      return;
    }

    const productDate = new Date(lastProduct.date);
    const today = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(today.getFullYear() - 1);

    if (productDate < oneYearAgo) {
      alert("A data do evento deve ser dentro do último ano.");
      return;
    }

    setBuysLastYear([...buysLastYear, { name: "", date: "" }]);
  };

  const handleRemoveProduct = (index) => {
    const updateProduct = buysLastYear.filter((_, i) => i !== index);
    setBuysLastYear(updateProduct);
  };

  const handleSaveProduct = () => {
    updateUserData({
      buysLastYear: buysLastYear,
    });
  };

  const handleInputEventChange = (index, field, value) => {
    const newInputs = [...eventInputs];
    newInputs[index][field] = value;
    setEventInputs(newInputs);
  };

  const handleAddEventInput = () => {
    const lastEvent = eventInputs[eventInputs.length - 1];

    if (!lastEvent.name || !lastEvent.date) {
      alert("Preencha o nome e a data do evento antes de adicionar um novo.");
      return;
    }

    const eventDate = new Date(lastEvent.date);
    const today = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(today.getFullYear() - 1);

    if (eventDate < oneYearAgo) {
      alert("A data do evento deve ser dentro do último ano.");
      return;
    }

    setEventInputs([...eventInputs, { name: "", date: "" }]);
  };

  const handleRemoveEvent = (index) => {
    const updateEvents = eventInputs.filter((_, i) => i !== index);
    setEventInputs(updateEvents);
  };

  const handleSaveEvent = () => {
    updateUserData({
      eventsParticipationsLastYear: eventInputs,
    });
  };

  const steps = [
    {
      label: "Qual seu nome completo?",
      name: "name",
      type: "text",
      validation: (value) => /^[A-Za-zÀ-ÿ\s]+$/.test(value),
    },
    {
      label: "Qual seu melhor e-mail?",
      name: "email",
      type: "email",
      validation: (value) => isEmail(value),
    },
    {
      label: "Informe seu CPF",
      name: "cpf",
      type: "text",
      validation: (value) => cpf.isValid(value),
    },
    {
      label: "Envie uma foto do seu CPF",
      name: "cpfImage",
      type: "file",
    },
    {
      label: "Qual seu endereço completo?",
      name: "address",
      type: "text",
    },
    {
      label: "Em quais jogos da FURIA você mais torce?",
      name: "interests",
      type: "button",
      options: [
        "Free Fire",
        "Pubg",
        "Valorant",
        "Rocket League",
        "Apex Legends",
        "CS GO",
        "Futebol de 7",
      ],
      validation: (value) => value.length > 0,
    },
    {
      label: "Quais redes sociais da FURIA você já segue?",
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
    {
      label: "Compartilhe suas redes sociais (Instagram e Twitter)",
      name: "socialMediasOfUser",
      type: "text",
    },
    {
      label: "Em quais eventos da FURIA você participou no último ano?",
      name: "eventsParticipationsLastYear",
      type: "text",
    },
    {
      label: "Você comprou produtos oficiais da FURIA no último ano? Quais?",
      name: "buysLastYear",
      type: "text",
    },
  ];

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("http://127.0.0.1:5000/upload/", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (response.ok) {
          const filterCpf = data.texto.cpf;
          const cleanCpf = filterCpf.replace(/\D/g, "");
          const cpfIsValid = cpf.isValid(cleanCpf) && cleanCpf === userData.cpf;

          if (cpfIsValid) {
            console.log("CPF válido:", cleanCpf);
            setIsCpfImagemValid(true);
            userData.cpfImage = true;
          } else {
            console.log("CPF inválido ou não bateu com o userData");
          }
        } else {
          setIsCpfImagemValid(false);
          console.log(data.message);
        }
      } catch (e) {
        setIsCpfImagemValid(false);
        console.log(e);
      }
    }
  };

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

    let isValid = currentStep.validation
      ? currentStep.validation(userData[currentStep.name])
      : true;

    if (currentStep.name === "cpfImage") {
      isValid = isValid && isCpfImagemValid;
    }

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
            ) : currentStep.name === "buysLastYear" ? (
              <div className="grid grid-cols-1 grid-rows-2 gap-4 mt-4">
                {buysLastYear.map((product, index) => (
                  <div key={index} className="flex gap-5 p-2 justify-center">
                    <div className="flex gap-5">
                      <input
                        type="text"
                        placeholder="Nome do Produto"
                        className="w-[300px] h-[40px] px-2 py-1 border border-black rounded-lg text-black bg-white placeholder-black focus:outline-none focus:ring-2 focus:ring-black"
                        onChange={(e) =>
                          handleInputProductChange(
                            index,
                            "name",
                            e.target.value
                          )
                        }
                      />

                      <input
                        type="text"
                        placeholder="Preço do Produto"
                        className="w-[150px] h-[40px] px-2 py-1 border border-black rounded-lg text-black bg-white placeholder-black focus:outline-none focus:ring-2 focus:ring-black"
                        value={product.price}
                        onChange={(e) =>
                          handleInputProductChange(
                            index,
                            "price",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="flex gap-5">
                      <input
                        type="date"
                        className="w-[200px] h-[40px] px-2 py-1 border border-black rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-black"
                        value={product.date}
                        onChange={(e) =>
                          handleInputProductChange(
                            index,
                            "date",
                            e.target.value
                          )
                        }
                      />

                      <select
                        name="typeProduct"
                        className="w-[200px] h-[40px] px-2 py-1 border border-black rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-black"
                        value={product.typeProduct}
                        onChange={(e) =>
                          handleInputProductChange(
                            index,
                            "typeProduct",
                            e.target.value
                          )
                        }
                      >
                        <option value="">Tipo do Produto</option>
                        <option value="eletronic">Eletrônico</option>
                        <option value="clothing">Vestuário</option>
                        <option value="food">Alimento</option>
                      </select>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveProduct(index)}
                      disabled={buysLastYear.length === 1}
                      className="px-4 py-2 border border-red-600 text-red-600 bg-white rounded-md hover:bg-red-600 hover:text-white transition-colors"
                    >
                      Remover
                    </button>
                  </div>
                ))}

                <div className="flex gap-5 justify-center mt-4">
                  <button
                    type="button"
                    onClick={handleAddProductInput}
                    className="px-4 py-2 border border-black text-black bg-white rounded-md hover:bg-black hover:text-white transition-colors"
                  >
                    + Adicionar Produto
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveProduct}
                    className="px-4 py-2 border border-green-600 text-green-600 bg-white rounded-md hover:bg-green-600 hover:text-white transition-colors"
                  >
                    Salvar Produtos
                  </button>
                </div>
              </div>
            ) : currentStep.name === "eventsParticipationsLastYear" ? (
              <div className="flex flex-col gap-4 mt-4">
                {eventInputs.map((event, index) => (
                  <div key={index} className="flex gap-5 p-2 justify-center">
                    <input
                      type="text"
                      placeholder="Nome do Evento"
                      className="w-[300px] h-[40px] px-2 py-1 border border-black rounded-lg text-black bg-white placeholder-black focus:outline-none focus:ring-2 focus:ring-black"
                      value={event.name}
                      onChange={(e) =>
                        handleInputEventChange(index, "name", e.target.value)
                      }
                    />

                    <input
                      type="date"
                      placeholder="Data do Evento"
                      className="w-[200px] h-[40px] px-2 py-1 border border-black rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-black"
                      value={event.date}
                      onChange={(e) =>
                        handleInputEventChange(index, "date", e.target.value)
                      }
                    />

                    <button
                      type="button"
                      onClick={() => handleRemoveEvent(index)}
                      disabled={eventInputs.length === 1}
                      className="px-4 py-2 border border-red-600 text-red-600 bg-white rounded-md hover:bg-red-600 hover:text-white transition-colors"
                    >
                      Remover
                    </button>
                  </div>
                ))}

                <div className="flex gap-5 justify-center mt-4">
                  <button
                    type="button"
                    onClick={handleAddEventInput}
                    className="px-4 py-2 border border-black text-black bg-white rounded-md hover:bg-black hover:text-white transition-colors"
                  >
                    + Adicionar Evento
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveEvent}
                    className="px-4 py-2 border border-green-600 text-green-600 bg-white rounded-md hover:bg-green-600 hover:text-white transition-colors"
                  >
                    Salvar Eventos
                  </button>
                </div>
              </div>
            ) : currentStep.name === "cpfImage" ? (
              <div>
                <input
                  type="file"
                  name="cpfImage"
                  onChange={handleImageChange}
                  className="file-input"
                />
              </div>
            ) : currentStep.name === "socialMediasOfUser" ? (
              <div className="grid grid-rows-2">
                <div className="flex flex-col">
                  <label>Instagram</label>
                  <input
                    type="text"
                    name="instagram"
                    className="w-[500px] h-[50px] px-4 py-2 border border-black rounded-lg text-black bg-white placeholder-black focus:outline-none focus:ring-2 focus:ring-black"
                    value={
                      userData.socialMediasOfUser.instagram ||
                      "https://instagram.com/"
                    }
                    placeholder="Coloque seu @ Aqui"
                    onChange={(e) =>
                      updateUserData({
                        socialMediasOfUser: {
                          ...userData.socialMediasOfUser,
                          [e.target.name]: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <label>Twitter</label>
                  <input
                    type="text"
                    name="twitter"
                    className="w-[500px] h-[50px] px-4 py-2 border border-black rounded-lg text-black bg-white placeholder-black focus:outline-none focus:ring-2 focus:ring-black"
                    value={
                      userData.socialMediasOfUser.twitter || "https://x.com/"
                    }
                    onChange={(e) =>
                      updateUserData({
                        socialMediasOfUser: {
                          ...userData.socialMediasOfUser,
                          [e.target.name]: e.target.value,
                        },
                      })
                    }
                  />
                </div>
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
                    value={userData.address.neighborhood || ""}
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
                    value={userData.address.city || ""}
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
                    value={userData.address.state || ""}
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

                <div className="flex flex-col">
                  <label>Número</label>
                  <input
                    type="text"
                    name="number"
                    className="w-[500px] h-[50px] px-4 py-2 border border-black rounded-lg text-black bg-white placeholder-black focus:outline-none focus:ring-2 focus:ring-black"
                    value={userData.address.number || ""}
                    onChange={(e) =>
                      updateUserData({
                        address: {
                          ...userData.address,
                          [e.target.name]: e.target.value,
                        },
                      })
                    }
                  />
                  {errors.number && <span>{errors.number}</span>}
                </div>
                <div className="flex flex-col">
                  <label>Complemento (Opcional)</label>
                  <input
                    type="text"
                    name="complement"
                    className="w-[500px] h-[50px] px-4 py-2 border border-black rounded-lg text-black bg-white placeholder-black focus:outline-none focus:ring-2 focus:ring-black"
                    value={userData.address.complement || ""}
                    onChange={(e) =>
                      updateUserData({
                        address: {
                          ...userData.address,
                          [e.target.name]: e.target.value,
                        },
                      })
                    }
                  />
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
