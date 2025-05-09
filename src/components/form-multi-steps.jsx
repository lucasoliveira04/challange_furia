import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import { AnimatePresence, motion } from "framer-motion";
import { steps } from "../constant/step-form";
import { buscarEnderecoPorCEP } from "../services/cep-services";
import { handleFilterTextInImage } from "../services/filter-text-image";
import { AddressForm } from "./address-form";
import { SocialMediaUserForm } from "./social-media-form-user";
import { useNavigate } from "react-router";
import { Alert } from "./alert-message";

export const FormMultiSteps = () => {
  const { userData, updateUserData } = useContext(UserContext);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [isCpfImagemValid, setIsCpfImagemValid] = useState(false);
  const [eventInputs, setEventInputs] = useState([{ name: "", date: "" }]);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [buysLastYear, setBuysLastYear] = useState([
    {
      name: "",
      value: 0,
      date: "",
      typeProduct: "",
    },
  ]);

  const navigate = useNavigate();

  const showAlert = (msg, type = "success") => {
    setAlertMessage(msg);
    setAlertType(type);
    setTimeout(() => {
      setAlertMessage("");
    }, 3000);
  };

  const handleInputProductChange = (index, field, value) => {
    const newInputs = [...buysLastYear];
    newInputs[index][field] = value;
    setBuysLastYear(newInputs);
  };

  const handleDataChangeProduct = (e, index) => {
    const inputDate = new Date(e.target.value);
    const today = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(today.getFullYear() - 1);

    inputDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    oneYearAgo.setHours(0, 0, 0, 0);

    if (inputDate >= oneYearAgo && inputDate <= today) {
      handleInputProductChange(index, "date", e.target.value);
    } else {
      showAlert("Por favor, selecione uma data dentro do último ano.", "error");
    }
  };

  const handleAddProductInput = () => {
    const lastProduct = buysLastYear[buysLastYear.length - 1];

    if (!lastProduct.name || !lastProduct.date) {
      showAlert(
        "Preencha o nome e a data do evento antes de adicionar um novo.",
        "error"
      );
      return;
    }

    const productDate = new Date(lastProduct.date);
    const today = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(today.getFullYear() - 1);

    if (productDate < oneYearAgo) {
      showAlert("A data do evento deve ser dentro do último ano.", "error");
      return;
    }

    setBuysLastYear([...buysLastYear, { name: "", date: "" }]);
  };

  const handleRemoveProduct = (index) => {
    const updateProduct = buysLastYear.filter((_, i) => i !== index);
    setBuysLastYear(updateProduct);
    showAlert("Produto removido com sucesso.", "warning");
  };

  const handleSaveProduct = () => {
    updateUserData({
      buysLastYear: buysLastYear,
    });
    showAlert("Produtos salvos com sucesso.");
  };

  const handleInputEventChange = (index, field, value) => {
    const newInputs = [...eventInputs];
    newInputs[index][field] = value;
    setEventInputs(newInputs);
  };

  const handleDataChangeEvent = (e, index) => {
    const inputDate = new Date(e.target.value);
    const today = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(today.getFullYear() - 1);

    inputDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    oneYearAgo.setHours(0, 0, 0, 0);

    if (inputDate >= oneYearAgo && inputDate <= today) {
      handleInputEventChange(index, "date", e.target.value);
    } else {
      showAlert("Por favor, selecione uma data dentro do último ano.", "error");
    }
  };

  const handleAddEventInput = () => {
    const lastEvent = eventInputs[eventInputs.length - 1];

    if (!lastEvent.name || !lastEvent.date) {
      showAlert(
        "Preencha o nome e a data do evento antes de adicionar um novo.",
        "error"
      );
      return;
    }

    const eventDate = new Date(lastEvent.date);
    const today = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(today.getFullYear() - 1);

    if (eventDate < oneYearAgo) {
      showAlert("A data do evento deve ser dentro do último ano.", "error");
      return;
    }

    setEventInputs([...eventInputs, { name: "", date: "" }]);
  };

  const handleRemoveEvent = (index) => {
    const updateEvents = eventInputs.filter((_, i) => i !== index);
    setEventInputs(updateEvents);
    showAlert("Evento removido com sucesso.", "warning");
  };

  const handleSaveEvent = () => {
    updateUserData({
      eventsParticipationsLastYear: eventInputs,
    });
    showAlert("Eventos salvos com sucesso.");
  };

  const handleChange = (value, field) => {
    const updatedValues = userData[field].includes(value)
      ? userData[field].filter((item) => item !== value)
      : [...userData[field], value];

    updateUserData({ [field]: updatedValues });
  };

  const onFileChange = (e) => {
    handleFilterTextInImage(e, userData, setIsCpfImagemValid, setLoading);
  };

  const onCepBlur = (e) => {
    buscarEnderecoPorCEP(e.target.value, userData, setErrors, updateUserData);
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

  const handlePrevious = async (e) => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleNext();
      }
    };

    window.addEventListener("keypress", handleKeyPress);
    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [steps, step, userData, isCpfImagemValid, errors]);

  const currentStep = steps[step - 1];

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const getOneYearAgoDate = () => {
    const today = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(today.getFullYear() - 1);
    return oneYearAgo.toISOString().split("T")[0];
  };

  return (
    <div className="flex justify-center place-items-center w-full h-screen mx-auto bg-white p-6 rounded-lg shadow-md">
      <Alert
        message={alertMessage}
        type={alertType}
        onClose={() => setAlertMessage("")}
      />
      <form>
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
              {currentStep.label.split("<br/>").map((part, index) => (
                <span key={index}>
                  {part}
                  {index < currentStep.label.split("<br/>").length - 1 && (
                    <br />
                  )}
                </span>
              ))}
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
            ) : currentStep.name === "timeFan" ? (
              <div className="flex flex-col items-center">
                <select
                  name="timeFan"
                  id="timeFan"
                  value={userData.timeFan}
                  onChange={(e) => updateUserData({ timeFan: e.target.value })}
                  className="w-[300px] sm:w-[400px] md:w-[500px] h-[50px] px-4 py-2 border border-black rounded-lg text-black bg-white placeholder-black focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="" disabled>
                    Selecione...
                  </option>
                  <option value="1">1 Ano</option>
                  <option value="2">2 Anos</option>
                  <option value="3">3 Anos</option>
                  <option value="4">4 Anos</option>
                  <option value="5">5 Anos</option>
                  <option value="6">6 Anos</option>
                  <option value="7">7 Anos</option>
                  <option value="8">8 Anos</option>
                </select>
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
                        onChange={(e) => handleDataChangeProduct(e, index)}
                        min={getOneYearAgoDate()}
                        max={getTodayDate()}
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
                      onChange={(e) => handleDataChangeEvent(e, index)}
                      min={getOneYearAgoDate()}
                      max={getTodayDate()}
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
              <div className="flex flex-col items-center justify-center p-4">
                {loading && (
                  <p className="text-gray-600 font-medium mb-4 animate-pulse">
                    Carregando...
                  </p>
                )}
                <input
                  type="file"
                  name="cpfImage"
                  onChange={onFileChange}
                  className="file-input p-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ) : currentStep.name === "socialMediasOfUser" ? (
              <SocialMediaUserForm
                userData={userData}
                updateUserData={updateUserData}
              />
            ) : currentStep.name === "address" ? (
              <AddressForm
                userData={userData}
                updateUserData={updateUserData}
                errors={errors}
                onCepBlur={onCepBlur}
              />
            ) : (
              <input
                type={currentStep.type}
                id={currentStep.name}
                name={currentStep.name}
                value={userData[currentStep.name]}
                placeholder={currentStep.placeholder}
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
              disabled={currentStep.name === "cpfImage" && loading}
              onClick={handleNext}
              className={`ml-auto px-4 py-2 border border-black text-black bg-white rounded-md hover:bg-black hover:text-white transition-colors ${
                currentStep.name === "cpfImage" && loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-black"
              } text-black`}
            >
              Próximo
            </button>
          ) : (
            <button
              type="button"
              onClick={(e) => navigate("/loading")}
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
