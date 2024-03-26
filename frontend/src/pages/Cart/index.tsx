import { useState, useEffect } from "react";
import { IPizza, IDrink } from "../../interfaces/cardapio";

export default function Cart() {
  const [carrinhoPizzas, setCarrinhoPizzas] = useState<IPizza[]>([]);
  const [carrinhoBebidas, setCarrinhoBebidas] = useState<IDrink[]>([]);

  useEffect(() => {
    const carrinhoPizzasSalvo = localStorage.getItem(
      "@PizzaTiradentes:carrinho-pizza"
    );
    if (carrinhoPizzasSalvo) {
      setCarrinhoPizzas(JSON.parse(carrinhoPizzasSalvo));
    }

    const carrinhoBebidasSalvo = localStorage.getItem(
      "@PizzaTiradentes:carrinho-bebidas"
    );
    if (carrinhoBebidasSalvo) {
      setCarrinhoBebidas(JSON.parse(carrinhoBebidasSalvo));
    }
  }, []);

  const handleRemoverItemPizza = (index: number) => {
    const novoCarrinhoPizzas = [...carrinhoPizzas];
    novoCarrinhoPizzas.splice(index, 1);
    setCarrinhoPizzas(novoCarrinhoPizzas);
    localStorage.setItem(
      "@PizzaTiradentes:carrinho-pizza",
      JSON.stringify(novoCarrinhoPizzas)
    );
  };

  const handleRemoverItemBebida = (index: number) => {
    const novoCarrinhoBebidas = [...carrinhoBebidas];
    novoCarrinhoBebidas.splice(index, 1);
    setCarrinhoBebidas(novoCarrinhoBebidas);
    localStorage.setItem(
      "@PizzaTiradentes:carrinho-bebidas",
      JSON.stringify(novoCarrinhoBebidas)
    );
  };

  const totalPizzas = carrinhoPizzas.reduce(
    (acc, pizza) => acc + pizza.preco,
    0
  );
  const totalBebidas = carrinhoBebidas.reduce(
    (acc, bebida) => acc + bebida.preco,
    0
  );
  const total = totalPizzas + totalBebidas;

  return (
    <div>
      <h2>Carrinho</h2>
      <h3>Pizzas</h3>
      {carrinhoPizzas.map((pizza, index) => (
        <div key={index}>
          <p>
            {pizza.nome} - R${pizza.preco.toFixed(2)}
          </p>
          <button onClick={() => handleRemoverItemPizza(index)}>Remover</button>
        </div>
      ))}
      <h3>Bebidas</h3>
      {carrinhoBebidas.map((bebida, index) => (
        <div key={index}>
          <p>
            {bebida.nome} - R${bebida.preco.toFixed(2)}
          </p>
          <button onClick={() => handleRemoverItemBebida(index)}>
            Remover
          </button>
        </div>
      ))}
      <h3>Total: R${total.toFixed(2)}</h3>
    </div>
  );
}
