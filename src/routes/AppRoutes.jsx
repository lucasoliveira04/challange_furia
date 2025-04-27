import { BrowserRouter, Route, Routes } from "react-router";
import { HomePage } from "../pages/home";
import { UserPage } from "../pages/user-page";
import { ResultCardUser } from "../pages/result-card-user";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/form" element={<UserPage />} />
        <Route path="/result-card-user" element={<ResultCardUser />} />

        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};
