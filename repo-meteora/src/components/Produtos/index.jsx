import React, { useContext } from "react";
import Produto from "./Produto";
import produtos from "@/mocks/produtos.json";
import Titulo from "@/components/Titulo";
import { CarrinhoContext } from "@/context/CarrinhoContext";

const Produtos = () => {
  const { carrinho, setCarrinho } = useContext(CarrinhoContext);
  function adicionarProduto(novoProduto) {
    const temProduto = carrinho.some((itemCarrinho) => {
      itemCarrinho.id === novoProduto.id;
    });
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
    // encontra o produto em questão
    const produto = carrinho.find((itemDoCarrinho) => itemDoCarrinho.id === id);
    // verifica se a quantidade é igual a um. Isso significa que este é o último
    // produto do tipo no carrinho
    const ehOUltimo = produto.quantidade === 1;
    // Com o if faz a verificação do último produto do tipo no carrinho e atualiza o estado do carrinho
    if (ehOUltimo) {
      return setCarrinho((carrinhoAnterior) =>
        carrinhoAnterior.filter((itemDoCarrinho) => itemDoCarrinho.id !== id)
      );
    }
    // Se não é o último produto do carrinho, só atualizamos a quantidade, removendo um item
    setCarrinho((carrinhoAnterior) =>
      carrinhoAnterior.map((itemDoCarrinho) => {
        if (itemDoCarrinho.id === id) itemDoCarrinho.quantidade -= 1;
        return itemDoCarrinho;
      })
    );
  }

  return (
    <section role="produtos" aria-label="Produtos que estão bombando!">
      <Titulo>Produtos que estão bombando!</Titulo>
      <div className="container row mx-auto">
        {produtos.map((produto) => (
          <Produto
            key={produto.id}
            {...produto}
            adicionarProduto={adicionarProduto}
          />
        ))}
      </div>
    </section>
  );
};

export default Produtos;
