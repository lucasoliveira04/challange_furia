import {
  validateCPF,
  validateEmail,
  validateName,
} from "../utils/validation-utils";

export const steps = [
  {
    label: "Qual seu nome completo?",
    name: "name",
    type: "text",
    validation: validateName,
  },
  {
    label: "Qual seu melhor e-mail?",
    name: "email",
    type: "email",
    validation: (value) => validateEmail,
  },
  {
    label: "Informe seu CPF",
    name: "cpf",
    type: "text",
    validation: (value) => validateCPF,
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
    label: "Há quanto tempo você é torcedor da FURIA?",
    name: "timeFan",
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
