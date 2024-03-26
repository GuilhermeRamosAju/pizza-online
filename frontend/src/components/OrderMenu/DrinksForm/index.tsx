import { useEffect, useState } from "react";
import style from "./DrinksForm.module.css";
import api from "../../../services/api";
import { IDrink } from "../../../interfaces/cardapio";


export default function DrinksForm() {
  const [bebidaSelecionada, setBebidaSelecionada] = useState<number>(0);
  const [bebidas, setBebidas] = useState<IDrink[]>([]);

  useEffect(() => {
    const fetchBebidas = async () => {
      try {
        const response = await api.get<IDrink[]>("/bebidas");
        setBebidas(response.data);
      } catch (error) {
        console.error("Erro ao buscar bebidas:", error);
      }
    };

    fetchBebidas();
  }, []);

  const handleBebidaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBebidaSelecionada(Number(event.target.value));
  };

  const handleAddToCart = () => {
    const bebida = bebidas.find((item) => item.id === bebidaSelecionada);
    if (bebida) {
      const carrinho = localStorage.getItem("@PizzaTiradentes:carrinho-bebidas");
      let novoCarrinho: IDrink[] = [];

      if (carrinho) {
        novoCarrinho = JSON.parse(carrinho);
      }

      novoCarrinho.push(bebida);

      localStorage.setItem(
        "@PizzaTiradentes:carrinho-bebidas",
        JSON.stringify(novoCarrinho)
      );

      setBebidaSelecionada(0);
    }
  };

  return (
    <>
      <div>
        <label>Bebidas:</label>
        <select
          className={style.select}
          value={bebidaSelecionada}
          onChange={handleBebidaChange}
        >
          <option value={0}>Selecione uma opção</option>
          {bebidas.map((bebida) => (
            <option key={bebida.id} value={bebida.id}>
              {bebida.nome} - R${bebida.preco.toFixed(2)}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleAddToCart}
        disabled={bebidaSelecionada === 0}
        className={!bebidaSelecionada ? style["btn-disable"] : style.btn}
      >
        Adicionar ao Carrinho
      </button>
    </>
  );
}
