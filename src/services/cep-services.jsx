export const buscarEnderecoPorCEP = async (
  cepValue,
  userData,
  setErrors,
  updateUserData
) => {
  const cepLimpo = cepValue.replace(/\D/g, "");

  if (cepLimpo.length !== 8) return;

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
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
