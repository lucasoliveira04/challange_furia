import { isEmail } from "validator";
import { cpf } from "cpf-cnpj-validator";

export const validateName = (value) => /^[A-Za-zÀ-ÿ\s]+$/.test(value);
export const validateEmail = (value) => isEmail(value);
export const validateCPF = (value) => cpf.isValid(value);
