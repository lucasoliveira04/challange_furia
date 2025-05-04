import { cpf } from "cpf-cnpj-validator";
import API_ENDPOINTS from "../constant/endpoints";

export const handleFilterTextInImage = async (
  e,
  userData,
  setIsCpfImagemValid,
  setLoading
) => {
  const file = e.target.files[0];

  if (file) {
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`http://127.0.0.1:5000/verificar-cpf`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        const filterCpf = data.cpf_encontrado;

        const cleanCpf = filterCpf.replace(/\D/g, "");
        const cpfIsValid = cpf.isValid(cleanCpf) && cleanCpf === userData.cpf;

        if (cpfIsValid) {
          setIsCpfImagemValid(true);
          userData.cpfImage = true;
        } else {
          setIsCpfImagemValid(false);
        }
      } else {
        setIsCpfImagemValid(false);
        console.log(data.message);
      }
    } catch (e) {
      setIsCpfImagemValid(false);
      console.log(e);
    } finally {
      setLoading(false);
    }
  }
};
