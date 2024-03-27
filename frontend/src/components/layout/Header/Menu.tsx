import { Link } from "react-router-dom";
import style from "./Header.module.css";
import { useAuth } from "../../../hook/auth";

export default function Menu() {
  const { signOut } = useAuth();
  const hasUser = () => {
    const user = localStorage.getItem("@PizzaTiradentes:user");
    return { user: user ? JSON.parse(user) : null };
  };

  return (
    <ul className={style.menu}>
      <li className={style.linkMenu}>Cardápio</li>
      <li className={style.linkMenu}>Mais pedidos</li>
      {hasUser != null ? <AuthenticatedMenu /> : <UnauthenticatedMenu />}
      {hasUser != null ? (
        <button className={style.btn} onClick={signOut}>
          Sair
        </button>
      ) : null}
    </ul>
  );
}

function AuthenticatedMenu() {
  return (
    <>
      <li>
        <Link to={"/fazer-pedido"} className={style.linkMenu}>
          Fazer pedido
        </Link>
      </li>
      <li>
        <Link to={"/pedidos"} className={style.linkMenu}>
          Meus pedidos
        </Link>
      </li>
      <li>
        <Link to={"/carrinho"} className={style.linkMenu}>
          Carrinho
        </Link>
      </li>
    </>
  );
}

function UnauthenticatedMenu() {
  return (
    <>
      <li>
        <Link to={"/"} className={style.linkMenu}>
          Entrar
        </Link>
      </li>
      <li>
        <Link to={"/cadastro"} className={style.linkMenu}>
          Cadastrar
        </Link>
      </li>
    </>
  );
}
