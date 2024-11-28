// Aula 05
// Criar a variável modalKey será global
let modalKey = 0;

// Variável para controlar a quantidade inicial de pizzas na modal
let quantPizzas = 1;

let cart = []; // Carrinho

// Funções auxiliares ou úteis
const seleciona = (elemento) => document.querySelector(elemento);
const selecionaTodos = (elemento) => document.querySelectorAll(elemento);

const formatoReal = (valor) => {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

const abrirModal = () => {
  seleciona(".pizzaWindowArea").style.opacity = 0; // Transparente
  seleciona(".pizzaWindowArea").style.display = "flex";
  setTimeout(() => (seleciona(".pizzaWindowArea").style.opacity = 1), 150);
};

const fecharModal = () => {
  seleciona(".pizzaWindowArea").style.opacity = 0; // Transparente
  setTimeout(() => (seleciona(".pizzaWindowArea").style.display = "none"), 500);
};

const botoesFechar = () => {
  // Botões fecha modal
  selecionaTodos(
    ".pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton"
  ).forEach((item) => item.addEventListener("click", fecharModal));
};

const preencheDadosDasPizzas = (pizzaItem, item, index) => {
  // Aula 05
  // Setar um atributo para identificar qual elemento foi clicado
  pizzaItem.setAttribute("data-key", index);
  pizzaItem.querySelector(".pizza-item--img img").src = item.img;
  pizzaItem.querySelector(".pizza-item--price").innerHTML = formatoReal(
    item.price[2]
  );
  pizzaItem.querySelector(".pizza-item--name").innerHTML = item.name;
  pizzaItem.querySelector(".pizza-item--desc").innerHTML = item.description;
};

const preencheDadosModal = (item) => {
  seleciona(".pizzaBig img").src = item.img;
  seleciona(".pizzaInfo h1").innerHTML = item.name;
  seleciona(".pizzaInfo--desc").innerHTML = item.description;
  seleciona(".pizzaInfo--actualPrice").innerHTML = formatoReal(item.price[2]);
};

// Aula 05
const pegarKey = (e) => {
  // Closest retorna o elemento mais próximo que tem na classe que passamos
  // Do .pizza-item ele vai pegar o valor do atributo data-key
  let key = e.target.closest(".pizza-item").getAttribute("data-key");
  console.log("Pizza clicada " + key);
  console.log(pizzaJson[key]);

  // Garantir que a quantidade inicial de pizzas é 1
  quantPizzas = 1;

  // Para manter a informação de qual pizza foi clicada
  modalKey = key;

  return key;
};

const preencherTamanhos = (key) => {
  // Tirar a seleção de tamanho atual e selecionar o tamanho grande
  seleciona(".pizzaInfo--size.selected").classList.remove("selected");

  // Selecionar todos os tamanhos
  selecionaTodos(".pizzaInfo--size").forEach((size, sizeIndex) => {
    // Selecionar o tamanho grande
    sizeIndex == 2 ? size.classList.add("selected") : "";
    size.querySelector("span").innerHTML = pizzaJson[key].sizes[sizeIndex];
  });
};

const escolherTamanhoPreco = (key) => {
  // Ações nos botões de tamanho
  // Selecionar todos os tamanhos
  selecionaTodos(".pizzaInfo--size").forEach((size, sizeIndex) => {
    size.addEventListener("click", (e) => {
      // Clicou em um item, tirar a seleção dos outros e marca o que você clicou
      // Tirar a seleção de tamanho atual e selecionar o tamanho grande
      seleciona(".pizzaInfo--size.selected").classList.remove("selected");
      // Marcar o que você clicou, ao invés de usar e.target use size, pois ele é nosso item dentro do loop
      size.classList.add("selected");

      // Mudar o preço de acordo com o tamanho
      seleciona(".pizzaInfo--actualPrice").innerHTML = formatoReal(
        pizzaJson[key].price[sizeIndex]
      );
    });
  });
};

const mudarQuantidade = () => {
  // Ações nos botões + e - da janela modal
  seleciona(".pizzaInfo--qtmais").addEventListener("click", () => {
    quantPizzas++;
    seleciona(".pizzaInfo--qt").innerHTML = quantPizzas;
  });

  seleciona(".pizzaInfo--qtmenos").addEventListener("click", () => {
    if (quantPizzas > 1) {
      quantPizzas--;
      seleciona(".pizzaInfo--qt").innerHTML = quantPizzas;
    }
  });
};
// /Aula 05

// Aula 06
const adicionarNoCarrinho = () => {
  seleciona(".pizzaInfo--addButton").addEventListener("click", () => {
    console.log("Adicionar no carrinho");

    // Pegar dados da janela modal atual
    // Qual pizza? Pegue o modalKey para usar pizzaJson[modalKey]
    console.log("Pizza " + modalKey);
    // Tamanho
    let size = seleciona(".pizzaInfo--size.selected").getAttribute("data-key");
    console.log("Tamanho " + size);
    // Quantidade
    console.log("Quant. " + quantPizzas);
    // Preço
    let price = seleciona(".pizzaInfo--actualPrice").innerHTML.replace(
      "R$&nbsp;",
      ""
    );

    // Crie um identificador que junte id e tamanho
    // Concatene as duas informações separadas por um símbolo, você escolhe
    let identificador = pizzaJson[modalKey].id + "t" + size;

    // Antes de adicionar, verifique se já tem aquele código e tamanho
    // Para adicionarmos a quantidade
    let key = cart.findIndex((item) => item.identificador === identificador);
    console.log(key);

    if (key > -1) {
      // Se encontrar, aumente a quantidade
      cart[key].qt += quantPizzas;
    } else {
      // Adicionar objeto pizza no carrinho
      let pizza = {
        identificador,
        id: pizzaJson[modalKey].id,
        size, // size: size
        qt: quantPizzas,
        price: parseFloat(price), // price: price
      };
      cart.push(pizza);
      console.log(pizza);
      console.log("Sub total R$ " + (pizza.qt * pizza.price).toFixed(2));
    }

    fecharModal();
    abrirCarrinho();
    atualizarCarrinho();
  });
};

const abrirCarrinho = () => {
  console.log("Qtd de itens no carrinho " + cart.length);
  if (cart.length > 0) {
    seleciona("aside").classList.add("show");
    seleciona("header").style.display = "flex"; // Mostrar barra superior
  }

  seleciona(".menu-openner").addEventListener("click", () => {
    if (cart.length > 0) {
      seleciona("aside").classList.add("show");
      seleciona("aside").style.left = "0";
    }
  });
};

// Fechar o carrinho ao clicar no "X"
const fecharCarrinho = () => {
  seleciona(".cart--finalizar").addEventListener("click", () => {
    seleciona("aside").style.left = "100vw"; // Esconde o carrinho
    seleciona("header").style.display = "flex"; // Exibe o cabeçalho
  });
};

const atualizarCarrinho = () => {
  seleciona(".menu-openner span").innerHTML = cart.length;

  if (cart.length > 0) {
    seleciona("aside").classList.add("show");

    seleciona(".cart").innerHTML = "";

    let subtotal = 0;
    let desconto = 0;
    let total = 0;

    for (let i in cart) {
      let pizzaItem = pizzaJson.find((item) => item.id == cart[i].id);
      console.log(pizzaItem);

      subtotal += cart[i].price * cart[i].qt;

      let cartItem = seleciona(".models .cart--item").cloneNode(true);
      seleciona(".cart").append(cartItem);

      let pizzaSizeName = cart[i].size;

      let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;

      cartItem.querySelector("img").src = pizzaItem.img;
      cartItem.querySelector(".cart--item-nome").innerHTML = pizzaName;
      cartItem.querySelector(".cart--item--qt").innerHTML = cart[i].qt;

      cartItem
        .querySelector(".cart--item-qtmais")
        .addEventListener("click", () => {
          console.log("Clicou no botão mais");

          cart[i].qt++;

          atualizarCarrinho();
        });

      cartItem
        .querySelector(".cart--item-qtmenos")
        .addEventListener("click", () => {
          console.log("Clicou no botão menos");
          if (cart[i].qt > 1) {
            cart[i].qt--;
          } else {
            cart.splice(i, 1);
          }

          cart.length < 1 ? (seleciona("header").style.display = "flex") : "";

          atualizarCarrinho();
        });

      seleciona(".cart").append(cartItem);
    }
    desconto= 10;
    total = subtotal + desconto;

    seleciona(".subtotal span:last-child").innerHTML = formatoReal(subtotal);
    seleciona(".desconto span:last-child").innerHTML = formatoReal(desconto);
    seleciona(".total span:last-child").innerHTML = formatoReal(total);
  } else {
    seleciona("aside").classList.remove("show");
    seleciona("aside").style.left = "100vw";
  }
};
const iniciarPagamento = () => {
  seleciona("botao-pagamento").addEventListener("click", () => {
    console.log("Iniciar pagamento");
    seleciona("aside").classList.remove("show");
    seleciona("aside").style.left = "100vw";
    seleciona("header").style.display = "flex";
    alert("Redirecionando para o pagamento...");
    window.location.href = "/pag.html";
  });
};
const finalizarCompra = () => {
  seleciona(".cart--finalizar").addEventListener("click", () => {
    console.log("Finalizar compra");
    seleciona("aside").classList.remove("show");
    seleciona("aside").style.left = "100vw";
    seleciona("header").style.display = "flex";
    alert("Pedido Feito");
    window.location.href= "/form.html"
  });
};

pizzaJson.map((item, index) => {
  let pizzaItem = document.querySelector(".models .pizza-item").cloneNode(true);

  seleciona(".pizza-area").append(pizzaItem);

  preencheDadosDasPizzas(pizzaItem, item, index);

  pizzaItem.querySelector(".pizza-item a").addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Clicou na pizza");

    let chave = pegarKey(e);

    abrirModal();

    preencheDadosModal(item);

    preencherTamanhos(chave);

    seleciona(".pizzaInfo--qt").innerHTML = quantPizzas;

    escolherTamanhoPreco(chave);
  });

  botoesFechar();
});

mudarQuantidade();

adicionarNoCarrinho();
atualizarCarrinho();
fecharCarrinho(); // Chamar a função para fechar o carrinho
finalizarCompra();
