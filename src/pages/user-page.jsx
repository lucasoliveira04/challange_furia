import { useEffect } from "react";
import { FormMultiSteps } from "../components/form-multi-steps";
import {
  StartApiFilterCpfImage,
  StartApiFilterDatas,
} from "../services/start-apis";

export const UserPage = () => {
  useEffect(() => {
    const activateAPIS = async () => {
      await StartApiFilterCpfImage();
      await StartApiFilterDatas();
    };
    activateAPIS();
  }, []);

  return (
    <div className="w-full h-screen">
      <FormMultiSteps />
    </div>
  );
};
