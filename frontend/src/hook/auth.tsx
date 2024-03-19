import {
  createContext,
  useCallback,
  useState,
  useContext,
  ReactNode,
} from "react";

import api from "../services/api";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

interface SignInCredencials {
  email: string;
  password: string;
}

interface AuthState {
  user: User | null;
}

interface AuthContextData {
  user: User | null;
  signIn(credencials: SignInCredencials): Promise<void>;
  signOut(): void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();
  const [data, setData] = useState<AuthState>(() => {
    const user = localStorage.getItem("@PizzaTiradentes:user");

    if (user) {
      return { user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  /* 
  sign in com api
  const signIn = useCallback(async ({ email, password }: SignInCredencials) => {
    const response = await api.post("sessions", {
      email,
      password,
    });

    const { user } = response.data;

    localStorage.setItem("@PizzaTiradentes:user", JSON.stringify(user));

    setData({
      user,
    });
  }, []); */

  //signin com json server
  const signIn = useCallback(async ({ email, password }: SignInCredencials) => {
    try {
      const response = await api.get<User[]>(`/usuarios?email=${email}`);

      if (response.data.length === 0) {
        throw new Error("Usuário não encontrado");
      }

      const user = response.data[0];
      if (user.password !== password) {
        throw new Error("Senha incorreta");
      }

      localStorage.setItem("@PizzaTiradentes:user", JSON.stringify(user));
      setData({ user });
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw new Error("Erro ao fazer login. Verifique suas credenciais.");
    }
  }, []);

  const signOut = useCallback(() => {
    localStorage.clear();
    navigate("/");
    setData({} as AuthState);
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}
