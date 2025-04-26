import { BrowserRouter, Route, Routes } from "react-router";
import { HomePage } from "../pages/home";
import { UserPage } from "../pages/user-page";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/form" element={<UserPage />} />

        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};
