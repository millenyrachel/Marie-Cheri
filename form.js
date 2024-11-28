document.addEventListener("DOMContentLoaded", function () {
  // Obtém os elementos do formulário e do botão
  const form = document.querySelector("form");
  const confirmarButton = document.querySelector('form button[type="submit"]');

  // Função que exibe a mensagem de pedido confirmado
  function confirmarPedido(e) {
    e.preventDefault(); // Impede o envio do formulário para evitar recarregar a página

    // Exibe a mensagem de confirmação
    const mensagem = document.createElement("div");
    mensagem.innerHTML =
      "<h3>Pedido Confirmado para Entrega!</h3><p>Obrigado pela compra. Assim que verificarmos seu pagamento ele será preparado!.</p>";
    mensagem.style.textAlign = "center";
    mensagem.style.marginTop = "20px";
    mensagem.style.padding = "20px";
    mensagem.style.backgroundColor = "#4f346e";
    mensagem.style.color = "#fff";
    mensagem.style.borderRadius = "10px";
    mensagem.style.fontFamily = "Lato, Helvetica, Arial";

    // Insere a mensagem no corpo da página
    document.body.appendChild(mensagem);

    // Simula o redirecionamento após 3 segundos
    setTimeout(function () {
      // Redireciona para a página principal da loja
      window.location.href = "index.html";
    }, 3000); // Redirecionamento após 3 segundos
  }

  // Adiciona o evento de clique no botão de confirmação
  confirmarButton.addEventListener("click", confirmarPedido);
});
