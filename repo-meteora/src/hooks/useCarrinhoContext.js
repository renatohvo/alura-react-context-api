import { useContext } from "react";
import { CarrinhoContext } from "@/context/CarrinhoContext";

export const useCarrinhoContext = () => {
  const { carrinho, setCarrinho } = useContext(CarrinhoContext);

  function mudarQuantidade(id, quantidade) {
    return carrinho.map((itemCarrinho) => {
      if (itemCarrinho.id === id) { itemCarrinho.quantidade += quantidade; }
      return itemCarrinho;
    })
  }

  function adicionarProduto(novoProduto) {
    const temProduto = carrinho.some((itemCarrinho) => itemCarrinho.id === novoProduto.id);
    if (!temProduto) {
      novoProduto.quantidade = 1;
      return setCarrinho((carrinhoAnterior) => [
        ...carrinhoAnterior,
        novoProduto,
      ]);
    }
    const carrinhoAtualizado = mudarQuantidade(novoProduto.id, 1);
    setCarrinho([...carrinhoAtualizado]);
  }
  function removerProduto(id) {
    const produto = carrinho.find((itemDoCarrinho) => itemDoCarrinho.id === id);
    const ultimoProduto = produto.quantidade === 1;
    if (ultimoProduto) {
      return setCarrinho((carrinhoAnterior) =>
        carrinhoAnterior.filter((itemDoCarrinho) => itemDoCarrinho.id !== id)
      );
    }
    const carrinhoAtualizado = mudarQuantidade(id, -1);
    setCarrinho([...carrinhoAtualizado]);
  }

  return {
    carrinho,
    setCarrinho,
    adicionarProduto,
    removerProduto,
  }
}