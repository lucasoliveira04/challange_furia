import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "./firebase";

export const salvarDadosUsuario = async (dados) => {
  try {
    const docRef = await addDoc(collection(db, "data"), dados);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Erro ao salvar dados do usuário:", error);
    return { success: false, error };
  }
};
