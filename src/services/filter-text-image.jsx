import { cpf } from "cpf-cnpj-validator";
import API_ENDPOINTS from "../constant/endpoints";

export const handleFilterTextInImage = async (
  e,
  userData,
  setIsCpfImagemValid
) => {
  const file = e.target.files[0];

  if (file) {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        `https://api-filter-text-images.onrender.com/upload/`,
        {
          method: "POST",
          body: formData,
        }
      );

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
