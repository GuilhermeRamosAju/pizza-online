import { Link } from "react-router-dom";
import style from "./Header.module.css";
export default function Menu() {
  return (
    <ul className={style.menu}>
      <li className={style.linkMenu}>Cardápio</li>
      <li className={style.linkMenu}>Mais pedidos</li>
      {/* <li className={style.linkMenu}>Fazer pedido</li>
      <li className={style.linkMenu}>Meus pedidos</li>
      <li className={style.linkMenu}>Carrinho</li> */}
      <li>
        <Link to={"/"} className={style.linkMenu}>
          Entrar
        </Link>
      </li>
      <li className={style.linkMenu}>Cadastrar</li>
    </ul>
  );
}
