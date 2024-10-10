import { useContext } from "react"
import { CarrinhoContext } from "../context/CarrinhoContext"

export const useCarrinhoContext = () => {
  const { carrinho, setCarrinho } = useContext(CarrinhoContext);
  function adicionarProduto(novoProduto) {
    const temProduto = carrinho.some((itemCarrinho) => itemCarrinho.id === novoProduto.id);
    if (!temProduto) {
      novoProduto.quantidade = 1;
      return setCarrinho((carrinhoAnterior) => [
        ...carrinhoAnterior,
        novoProduto,
      ]);
    }
    setCarrinho((carrinhoAnterior) =>
      carrinhoAnterior.map((itemCarrinho) => {
        if (carrinhoAnterior.id === novoProduto.id)
          itemCarrinho.quantidade += 1;
        return itemCarrinho;
      })
    );
  }
  function removerProduto(id) {
    const produto = carrinho.find((itemDoCarrinho) => itemDoCarrinho.id === id);
    const ultimoProduto = produto.quantidade === 1;
    if (ultimoProduto) {
      return setCarrinho((carrinhoAnterior) =>
        carrinhoAnterior.filter((itemDoCarrinho) => itemDoCarrinho.id !== id)
      );
    }
    setCarrinho((carrinhoAnterior) =>
      carrinhoAnterior.map((itemDoCarrinho) => {
        if (itemDoCarrinho.id === id) itemDoCarrinho.quantidade -= 1;
        return itemDoCarrinho;
      })
    );
  }

  return {
    carrinho,
    setCarrinho,
    adicionarProduto,
    removerProduto,
  }
}