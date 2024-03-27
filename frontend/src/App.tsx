import { BrowserRouter } from "react-router-dom";
import { Header } from "./components";
import "./style/global.css";
import { Routes } from "./routes";
import { AuthProvider } from "./hook/auth";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
