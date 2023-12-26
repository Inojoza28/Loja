var carrinho = [];

function comprar(produto, preco) {
    carrinho.push({ produto, preco });
    
    atualizarCarrinho();
    atualizarNotificacaoCarrinho();
}

function fecharCarrinho() {
    var cart = document.getElementById("cart");
    cart.style.right = "-250px";
}

function excluirItem(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
    atualizarNotificacaoCarrinho();
}

function atualizarCarrinho() {
    var cartList = document.getElementById("cart-list");
    var totalElement = document.getElementById("total");
    var total = 0;

    // Limpa o conteúdo atual do carrinho
    cartList.innerHTML = "";

    // Adiciona os itens do carrinho
    carrinho.forEach((item, index) => {
        var listItem = document.createElement("li");
        listItem.className = "cart-item list-group-item";
        listItem.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <span>${item.produto}</span>
                <span>R$ ${item.preco.toFixed(2)}</span>
                <button class="btn btn-danger btn-sm" onclick="excluirItem(${index})">Excluir</button>
            </div>
        `;
        cartList.appendChild(listItem);

        total += item.preco;
    });

    // Atualiza o total
    totalElement.textContent = `Total: R$ ${total.toFixed(2)}`;

    // Atualiza a visibilidade do botão "Comprar no WhatsApp"
    var comprarBtn = document.getElementById("comprarBtn");
    comprarBtn.style.display = (carrinho.length > 0) ? "block" : "none";
}

function atualizarNotificacaoCarrinho() {
    var cartBadge = document.getElementById("cart-badge");
    cartBadge.textContent = carrinho.length.toString();
    cartBadge.style.display = (carrinho.length > 0) ? "block" : "none";
}

function mostrarCarrinho() {
    var cart = document.getElementById("cart");

    // Altera a posição da aba de carrinho
    if (cart.style.right === "-250px") {
        cart.style.right = "0";
    } else {
        cart.style.right = "-250px";
    }

    // Atualiza a visibilidade do botão "Comprar no WhatsApp"
    var comprarBtn = document.getElementById("comprarBtn");
    comprarBtn.style.display = (carrinho.length > 0) ? "block" : "none";
}

function comprarNoWhatsApp() {
    // Substitua 'seu_numero' pelo seu número de WhatsApp
    var numeroWhatsApp = '+55(81)997002880';

    // Monta a mensagem com os itens do carrinho
    var mensagem = 'Gostaria de comprar os seguintes itens:';
    carrinho.forEach(item => {
        mensagem += '\n- ' + item.produto + ' (R$ ' + item.preco.toFixed(2) + ')';
    });

    // Monta o link do WhatsApp com a mensagem
    var linkWhatsApp = 'https://api.whatsapp.com/send?phone=' + numeroWhatsApp + '&text=' + encodeURIComponent(mensagem);

    // Redireciona para o link do WhatsApp
    window.location.href = linkWhatsApp;
}
