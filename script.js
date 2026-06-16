const PRODUTOS = [
  { id: 1, nome: "Notebook Lenovo IdeaPad 3",    categoria: "notebooks",       preco: 2899.90, parcelas: 12, imagem: "https://imgs.search.brave.com/h78A0GfovhiteBkgZ7NK4rd-8wsxb4_OiAsX8nmne3s/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wb3J0/YXRpbGNoaWxlLmNv/bS8yMjkyMS1tZWRp/dW1fZGVmYXVsdC9u/b3RlYm9vay1sZW5v/dm8taWRlYXBhZC0z/LmpwZw" },
  { id: 2, nome: "Notebook Dell Inspiron 15",     categoria: "notebooks",       preco: 3499.00, parcelas: 12, imagem: "https://imgs.search.brave.com/g8YLsLhLfKM7vqBeJTbiE6JLmaDk7RBTsu3oBQFVhIk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWdz/LnBvbnRvZnJpby5j/b20uYnIvMTU2MzI0/ODY5Ny8xeGcuanBn" },
  { id: 3, nome: "TV Samsung 50\" 4K QLED",       categoria: "tvs",             preco: 2799.00, parcelas: 12, imagem: "https://imgs.search.brave.com/yZsINAqORSj7Oj6m8p8y__4GtjKCUWlWJtfRG_UfxMY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWdz/LnBvbnRvZnJpby5j/b20uYnIvMTU3NjA3/MDIyNC8xeGcuanBn" },
  { id: 4, nome: "TV LG 55\" OLED Smart",         categoria: "tvs",             preco: 4199.00, parcelas: 12, imagem: "https://imgs.search.brave.com/dwpCMLLf30Xk3w6VaMwUr99Q9O8E7zeQxLf4HGfRswQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/b2x4LmNvbS5ici90/aHVtYnM3MDB4NTAw/LzQ3LzQ3NDY2MzE1/NDkyODk3NS53ZWJw" },
  { id: 5, nome: "Mouse Logitech MX Master 3",    categoria: "perifericos",     preco: 479.90,  parcelas: 6,  imagem: "https://imgs.search.brave.com/16VYocqkyKWwe07Zn0ChOrNBVhMzfyyfM0fG1QmMFss/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kMzB1/OXdpbTFiYXJmNi5j/bG91ZGZyb250Lm5l/dC9DdXN0b20vQ29u/dGVudC9Qcm9kdWN0/cy8xMC8wMC8xMDAw/OTc5X25hYzAxMTEy/MV9tNF82MzgwNjYz/NzEzODQyNTgxNTEu/d2VicA" },
  { id: 6, nome: "Teclado Mecânico Redragon",     categoria: "perifericos",     preco: 299.00,  parcelas: 6,  imagem: "https://imgs.search.brave.com/yQ109NoFoJqh3n6aMIbBjJguMlc12UM8zDGWWiYFofU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/XzczMDQ1My1NTEEx/MDAwMjgxMzIzODdf/MTIyMDI1LUUud2Vi/cA" },
  { id: 7, nome: "Micro-ondas Electrolux 31L",    categoria: "eletrodomesticos",preco: 649.00,  parcelas: 10, imagem: "https://imgs.search.brave.com/I4O0CgltUKoLzUahTh4vzglal82txK1t6kbBOUy63HA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9OUV9OUF85/NjI2NzQtTUxBNTI0/MTgxNDAyMThfMTEy/MDIyLU8ud2VicA" },
  { id: 8, nome: "Geladeira Brastemp Frost Free",  categoria: "eletrodomesticos",preco: 3299.00, parcelas: 12, imagem: "https://imgs.search.brave.com/HC6YihbPy4qyA7wZoZOQjqPGD_85FpRNRl8c6W98aG0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZnJpZ2VsYXIuY29t/LmJyL2Njc3RvcmUv/djEvaW1hZ2VzLz9z/b3VyY2U9L2ZpbGUv/djc5NTcyMDc0Nzk2/Mzg1Mzg2MzcvcHJv/ZHVjdHMva2l0Mjkw/N18xMC5qcGcmaGVp/Z2h0PTQ3NSZ3aWR0/aD00NzU" },
  { id: 9, nome: "Camiseta TechStore Preta P",    categoria: "camisetas",       preco: 59.90,   parcelas: 2,  imagem: "tomixMulher.jpeg" },
  { id: 10, nome: "Camiseta TechStore Branca M",  categoria: "camisetas",       preco: 59.90,   parcelas: 2,  imagem: "tomixHomem.jpeg" },
];

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

let categoriaAtiva = "todos";

function filtrar(categoria, botao) {
  categoriaAtiva = categoria;
  document.querySelectorAll(".btn-filtro").forEach(b => b.classList.remove("ativo"));
  if (botao) botao.classList.add("ativo");
  renderizarProdutos(PRODUTOS.filter(p => categoriaAtiva === "todos" || p.categoria === categoriaAtiva));
}

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

function cadastrarMembro() {
  const nome  = document.getElementById("membroNome")?.value.trim();
  const email = document.getElementById("membroEmail")?.value.trim();
  if (!nome || !email) { alert("Preencha nome e e-mail!"); return; }
  alert(`Bem-vindo, ${nome}! Cadastro realizado com sucesso.`);
}

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

document.addEventListener("DOMContentLoaded", () => {
  atualizarBadge();
  const pagina = window.location.pathname.split("/").pop() || "index.html";
  const mapa = { "tvs.html": "tvs", "perifericos.html": "perifericos", "eletro.html": "eletrodomesticos", "camisetas.html": "camisetas" };
  if (mapa[pagina]) filtrar(mapa[pagina], null);
  if (pagina === "carrinho.html") renderizarCarrinho();
});