import { Link } from "react-router-dom";
import style from "./Header.module.css";
/* import { useAuth } from "../../../hook/auth"; */
import { useEffect, useState } from "react";

export default function Menu() {
  /* const { signOut } = useAuth(); */
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("@PizzaTiradentes:user");
    setIsAuthenticated(!!storedUser);
  }, [isAuthenticated]);

  return (
    <ul className={style.menu}>
      <li className={style.linkMenu}>Cardápio</li>
      <li className={style.linkMenu}>Mais pedidos</li>
      {isAuthenticated ? (
        <>
          <li className={style.linkMenu}>Fazer pedido</li>
          <li className={style.linkMenu}>Meus pedidos</li>
          <li className={style.linkMenu}>Carrinho</li>
          {/* <button className={style.btn} onClick={signOut}>Sair</button> */}
        </>
      ) : (
        <>
          <li>
            <Link to={"/"} className={style.linkMenu}>
              Entrar
            </Link>
          </li>
          <li className={style.linkMenu}>
            <Link to={"/cadastro"} className={style.linkMenu}>
              Cadastrar
            </Link>
          </li>
        </>
      )}
    </ul>
  );
}
