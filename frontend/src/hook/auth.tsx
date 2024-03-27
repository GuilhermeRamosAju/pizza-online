import {
  createContext,
  useCallback,
  useState,
  useContext,
  ReactNode,
} from "react";

import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { IUser } from "../interfaces/IUser";

interface SignInCredencials {
  email: string;
  password: string;
}

interface AuthState {
  user: IUser | null;
}

interface AuthContextData {
  user: IUser | null;
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
    return { user: user ? JSON.parse(user) : null };
  });

  const signIn = useCallback(async ({ email, password }: SignInCredencials) => {
    try {
      const response = await api.get<IUser[]>(`/usuarios?email=${email}`);

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
    console.log('dentro signout')
    try {
      setData({ user: null });
      localStorage.removeItem("@PizzaTiradentes:user"); 
      navigate("/login"); 
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      throw new Error("Erro ao fazer logout.");
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}
