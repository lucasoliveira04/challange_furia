import { useEffect } from "react";
import { FormMultiSteps } from "../components/form-multi-steps";

export const UserPage = () => {
  useEffect(() => {
    const activateAPIS = async () => {
      await StartApiFilterCpfImage();
      await StartApiFilterDatas();
    };
    activateAPIS();

    const intervalId = setInterval(() => {
      activateAPIS();
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="w-full h-screen">
      <FormMultiSteps />
    </div>
  );
};
