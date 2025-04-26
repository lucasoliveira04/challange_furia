import { UserProvider } from "./context/UserContext";
import { AppRoutes } from "./routes/AppRoutes";

function App() {
  return (
    <div>
      <UserProvider>
        <AppRoutes />
      </UserProvider>
    </div>
  );
}

export default App;
