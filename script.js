const PRODUTOS = [
  { id: 1, nome: "Notebook Lenovo IdeaPad 3",    categoria: "notebooks",       preco: 2899.90, parcelas: 12, imagem: "https://placehold.co/300x200?text=Lenovo" },
  { id: 2, nome: "Notebook Dell Inspiron 15",     categoria: "notebooks",       preco: 3499.00, parcelas: 12, imagem: "https://placehold.co/300x200?text=Dell" },
  { id: 3, nome: "TV Samsung 50\" 4K QLED",       categoria: "tvs",             preco: 2799.00, parcelas: 12, imagem: "https://placehold.co/300x200?text=TV+Samsung" },
  { id: 4, nome: "TV LG 55\" OLED Smart",         categoria: "tvs",             preco: 4199.00, parcelas: 12, imagem: "https://placehold.co/300x200?text=TV+LG" },
  { id: 5, nome: "Mouse Logitech MX Master 3",    categoria: "perifericos",     preco: 479.90,  parcelas: 6,  imagem: "https://placehold.co/300x200?text=Mouse" },
  { id: 6, nome: "Teclado Mecânico Redragon",     categoria: "perifericos",     preco: 299.00,  parcelas: 6,  imagem: "https://placehold.co/300x200?text=Teclado" },
  { id: 7, nome: "Micro-ondas Electrolux 31L",    categoria: "eletrodomesticos",preco: 649.00,  parcelas: 10, imagem: "https://placehold.co/300x200?text=Micro-ondas" },
  { id: 8, nome: "Geladeira Brastemp Frost Free",  categoria: "eletrodomesticos",preco: 3299.00, parcelas: 12, imagem: "https://placehold.co/300x200?text=Geladeira" },
  { id: 9, nome: "Camiseta TechStore Preta P",    categoria: "camisetas",       preco: 59.90,   parcelas: 2,  imagem: "https://placehold.co/300x200?text=Camiseta+P" },
  { id: 10, nome: "Camiseta TechStore Branca M",  categoria: "camisetas",       preco: 59.90,   parcelas: 2,  imagem: "https://placehold.co/300x200?text=Camiseta+M" },
];

// --- CARRINHO ---

function getCarrinho() {
  return JSON.parse(localStorage.getItem("techstore_carrinho") || "[]");
}

function salvarCarrinho(carrinho) {
  localStorage.setItem("techstore_carrinho", JSON.stringify(carrinho));
  atualizarBadge();
}

function adicionarAoCarrinho(id) {
  const produto = PRODUTOS.find(p => p.id === id);
  if (!produto) return;
  const carrinho = getCarrinho();
  const item = carrinho.find(i => i.id === id);
  if (item) item.quantidade += 1;
  else carrinho.push({ ...produto, quantidade: 1 });
  salvarCarrinho(carrinho);
  mostrarToast(`"${produto.nome}" adicionado!`);
}

function removerDoCarrinho(id) {
  salvarCarrinho(getCarrinho().filter(i => i.id !== id));
  renderizarCarrinho();
}

function alterarQuantidade(id, delta) {
  const carrinho = getCarrinho();
  const item = carrinho.find(i => i.id === id);
  if (!item) return;
  item.quantidade += delta;
  if (item.quantidade <= 0) { removerDoCarrinho(id); return; }
  salvarCarrinho(carrinho);
  renderizarCarrinho();
}

function atualizarBadge() {
  const badge = document.getElementById("badgeCount");
  if (badge) badge.textContent = getCarrinho().reduce((s, i) => s + i.quantidade, 0);
}

// --- RENDERIZAÇÃO ---

function formatarPreco(v) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function criarCard(p) {
  return `
    <div class="card-produto">
      <img src="${p.imagem}" alt="${p.nome}" loading="lazy">
      <div class="card-produto-info">
        <h3>${p.nome}</h3>
        <p class="preco">${formatarPreco(p.preco)}</p>
        <p class="parcelado">ou ${p.parcelas}x de ${formatarPreco(p.preco / p.parcelas)}</p>
        <button onclick="adicionarAoCarrinho(${p.id})">🛒 Adicionar ao Carrinho</button>
      </div>
    </div>`;
}

function renderizarProdutos(lista) {
  const el = document.getElementById("listaProdutos");
  if (!el) return;
  el.innerHTML = lista.length ? lista.map(criarCard).join("") : "<p>Nenhum produto encontrado.</p>";
}

// --- FILTROS ---

let categoriaAtiva = "todos";

function filtrar(categoria, botao) {
  categoriaAtiva = categoria;
  document.querySelectorAll(".btn-filtro").forEach(b => b.classList.remove("ativo"));
  if (botao) botao.classList.add("ativo");
  renderizarProdutos(PRODUTOS.filter(p => categoriaAtiva === "todos" || p.categoria === categoriaAtiva));
}

// --- CARRINHO PAGE ---

function renderizarCarrinho() {
  const el = document.getElementById("itensCarrinho");
  if (!el) return;
  const carrinho = getCarrinho();
  if (!carrinho.length) {
    el.innerHTML = `<div class="carrinho-vazio"><p>🛒 Seu carrinho está vazio.</p><a href="index.html" class="btn-principal">Voltar</a></div>`;
    atualizarResumo(0, 0);
    return;
  }
  el.innerHTML = carrinho.map(item => `
    <div class="item-carrinho">
      <img src="${item.imagem}" alt="${item.nome}">
      <div class="item-info">
        <h4>${item.nome}</h4>
        <p class="preco-item">${formatarPreco(item.preco)} × ${item.quantidade} = <strong>${formatarPreco(item.preco * item.quantidade)}</strong></p>
      </div>
      <div class="item-controles">
        <button onclick="alterarQuantidade(${item.id}, -1)">−</button>
        <span class="qtd">${item.quantidade}</span>
        <button onclick="alterarQuantidade(${item.id}, +1)">+</button>
      </div>
      <button class="btn-remover" onclick="removerDoCarrinho(${item.id})">🗑️</button>
    </div>`).join("");
  const subtotal = carrinho.reduce((s, i) => s + i.preco * i.quantidade, 0);
  atualizarResumo(subtotal, subtotal >= 500 ? 0 : 29.90);
}

function atualizarResumo(subtotal, frete) {
  const s = document.getElementById("subtotal");
  const f = document.getElementById("frete");
  const t = document.getElementById("total");
  if (s) s.textContent = formatarPreco(subtotal);
  if (f) f.textContent = frete === 0 ? "Grátis 🎉" : formatarPreco(frete);
  if (t) t.textContent = formatarPreco(subtotal + frete);
}

function finalizarCompra() {
  if (!getCarrinho().length) { alert("Carrinho vazio!"); return; }
  if (confirm("Confirmar a compra?")) {
    localStorage.removeItem("techstore_carrinho");
    atualizarBadge();
    alert("Compra realizada! Obrigado 🎉");
    window.location.href = "index.html";
  }
}

// --- MEMBRO ---

function cadastrarMembro() {
  const nome  = document.getElementById("membroNome")?.value.trim();
  const email = document.getElementById("membroEmail")?.value.trim();
  if (!nome || !email) { alert("Preencha nome e e-mail!"); return; }
  alert(`Bem-vindo, ${nome}! Cadastro realizado com sucesso.`);
}

// --- TOAST ---

let toastTimeout;
function mostrarToast(msg) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast"; toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add("visivel");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("visivel"), 3000);
}

// --- INIT ---

document.addEventListener("DOMContentLoaded", () => {
  atualizarBadge();
  const pagina = window.location.pathname.split("/").pop() || "index.html";
  const mapa = { "tvs.html": "tvs", "perifericos.html": "perifericos", "eletro.html": "eletrodomesticos", "camisetas.html": "camisetas" };
  if (mapa[pagina]) filtrar(mapa[pagina], null);
  if (pagina === "carrinho.html") renderizarCarrinho();
});