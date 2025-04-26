import React from "react";

export const AddressForm = ({
  userData,
  updateUserData,
  errors,
  onCepBlur,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateUserData({
      address: {
        ...userData.address,
        [name]: value,
      },
    });
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col">
        <label>CEP</label>
        <input
          type="text"
          name="cep"
          className="w-[500px] h-[50px] px-4 py-2 border border-black rounded-lg text-black bg-white placeholder-black focus:outline-none focus:ring-2 focus:ring-black"
          value={userData.address.cep || ""}
          onChange={handleChange}
          onBlur={onCepBlur}
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
          onChange={handleChange}
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
          onChange={handleChange}
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
          onChange={handleChange}
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
          onChange={handleChange}
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
          onChange={handleChange}
        />
      </div>
    </div>
  );
};
