import style from "./Header.module.css";
export default function Menu() {
  return (
    <ul className={style.menu}>
      <li>Cardápio</li>
      <li>Mais pedidos</li>
      <li>Fazer pedido</li>
      <li>Meus pedidos</li>
      <li>Carrinho</li>
      <li>Entrar</li>
      <li>Cadastrar</li>
    </ul>
  );
}
