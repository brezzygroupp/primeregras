const catalog = {
  legal: {
    placeholder: "Buscar em legal...",
    groups: [
      {
        title: "MEDICAMENTOS",
        items: [
          ["Adrenalina", 200000],
          ["Bandagens", 5000],
          ["Atadura", 15000],
          ["Analgésico", 15000]
        ]
      },
      {
        title: "ATENDIMENTOS",
        items: [
          ["Reanimar no HP", 50000],
          ["Tratamento no HP", 10000],
          ["Atendimento Sul", 15000],
          ["Atendimento Norte", 20000]
        ]
      }
    ]
  },
  ilegal: {
    placeholder: "Buscar em ilegal...",
    groups: [
      {
        title: "ITENS ILEGAIS",
        items: [
          ["Kit de arrombamento", 25000],
          ["Lockpick", 18000],
          ["Pacote clandestino", 45000],
          ["Documento falso", 30000]
        ]
      }
    ]
  },
  hospital: {
    placeholder: "Buscar em hospital...",
    groups: [
      {
        title: "MEDICAMENTOS",
        items: [
          ["Adrenalina", 200000],
          ["Bandagens", 5000],
          ["Atadura", 15000],
          ["Analgésico", 15000]
        ]
      },
      {
        title: "ATENDIMENTOS",
        items: [
          ["Reanimar no HP", 50000],
          ["Tratamento no HP", 10000],
          ["Atendimento Sul", 15000],
          ["Atendimento Norte", 20000]
        ]
      }
    ]
  },
  mecanica: {
    placeholder: "Buscar em mecânica...",
    groups: [
      {
        title: "SERVIÇOS",
        items: [
          ["Reparo básico", 15000],
          ["Reparo completo", 35000],
          ["Troca de pneus", 10000],
          ["Blindagem", 120000]
        ]
      }
    ]
  },
  tuning: {
    placeholder: "Buscar em tuning...",
    groups: [
      {
        title: "CUSTOMIZAÇÃO",
        items: [
          ["Motor", 75000],
          ["Freios", 30000],
          ["Suspensão", 25000],
          ["Turbo", 90000],
          ["Pintura", 20000]
        ]
      }
    ]
  }
};

let currentCategory = "legal";
let discountPercent = 0;
const quantities = {};

const money = value => value.toLocaleString("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0
});

function keyFor(name, category = currentCategory) {
  return `${category}::${name}`;
}

function getItems(category = currentCategory) {
  return catalog[category].groups.flatMap(group => group.items);
}

function getItemPrice(name, category = currentCategory) {
  const item = getItems(category).find(x => x[0] === name);
  return item ? item[1] : 0;
}

function renderProducts() {
  const data = catalog[currentCategory];
  const q = document.getElementById("productSearch").value.trim().toLowerCase();
  const root = document.getElementById("productList");
  let html = "";

  data.groups.forEach(group => {
    const items = group.items.filter(([name]) => name.toLowerCase().includes(q));
    if (!items.length) return;

    html += `<section class="product-group"><h2>${group.title}</h2><div class="product-grid">`;
    items.forEach(([name, price]) => {
      const key = keyFor(name);
      const qty = quantities[key] || 0;
      html += `
        <article class="product-card">
          <div>
            <div class="product-name">${name}</div>
            <div class="product-price">${money(price)}</div>
          </div>
          <div class="qty-controls">
            <button class="qty-btn" data-action="minus" data-name="${encodeURIComponent(name)}">−</button>
            <div class="qty-value">${qty}</div>
            <button class="qty-btn" data-action="plus" data-name="${encodeURIComponent(name)}">+</button>
          </div>
        </article>`;
    });
    html += `</div></section>`;
  });

  root.innerHTML = html || `<div class="no-results">Nenhum item encontrado.</div>`;
}

function addQuantity(name, delta) {
  const key = keyFor(name);
  quantities[key] = Math.max(0, (quantities[key] || 0) + delta);
  if (quantities[key] === 0) delete quantities[key];
  renderProducts();
  renderCart();
}

function renderCart() {
  const cart = document.getElementById("cartItems");
  const entries = Object.entries(quantities).filter(([, qty]) => qty > 0);

  document.getElementById("emptyCart").style.display = entries.length ? "none" : "grid";

  let subtotal = 0;
  cart.innerHTML = entries.map(([key, qty]) => {
    const [category, name] = key.split("::");
    const price = getItemPrice(name, category);
    const line = price * qty;
    subtotal += line;
    return `
      <div class="cart-line">
        <div>
          <strong>${name}</strong>
          <span>${qty} × ${money(price)}</span>
        </div>
        <span class="cart-line-total">${money(line)}</span>
      </div>`;
  }).join("");

  const total = subtotal * (1 - discountPercent / 100);
  document.getElementById("subtotal").textContent = money(subtotal);
  document.getElementById("total").textContent = money(total);
  document.getElementById("copyBtn").disabled = entries.length === 0;
}

function setCategory(category) {
  currentCategory = category;
  document.querySelectorAll(".calc-tab").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.category === category);
  });
  document.getElementById("productSearch").value = "";
  document.getElementById("productSearch").placeholder = catalog[category].placeholder;
  renderProducts();
}

document.getElementById("categoryTabs").addEventListener("click", e => {
  const btn = e.target.closest(".calc-tab");
  if (btn) setCategory(btn.dataset.category);
});

document.getElementById("productSearch").addEventListener("input", renderProducts);

document.getElementById("productList").addEventListener("click", e => {
  const btn = e.target.closest(".qty-btn");
  if (!btn) return;
  const name = decodeURIComponent(btn.dataset.name);
  addQuantity(name, btn.dataset.action === "plus" ? 1 : -1);
});

document.querySelectorAll(".discount").forEach(btn => {
  btn.addEventListener("click", () => {
    discountPercent = Number(btn.dataset.discount);
    document.querySelectorAll(".discount").forEach(x => x.classList.remove("active"));
    btn.classList.add("active");
    renderCart();
  });
});

document.getElementById("clearBtn").addEventListener("click", () => {
  Object.keys(quantities).forEach(k => delete quantities[k]);
  discountPercent = 0;
  document.querySelectorAll(".discount").forEach(x => x.classList.toggle("active", x.dataset.discount === "0"));
  renderProducts();
  renderCart();
  document.getElementById("copyStatus").textContent = "";
});

document.getElementById("copyBtn").addEventListener("click", async () => {
  const entries = Object.entries(quantities).filter(([, qty]) => qty > 0);
  if (!entries.length) return;

  let subtotal = 0;
  const lines = ["LISTA DE VENDA", ""];

  entries.forEach(([key, qty]) => {
    const [category, name] = key.split("::");
    const price = getItemPrice(name, category);
    const line = price * qty;
    subtotal += line;
    lines.push(`${qty}x ${name} — ${money(line)}`);
  });

  const total = subtotal * (1 - discountPercent / 100);
  lines.push("");
  lines.push(`Subtotal: ${money(subtotal)}`);
  lines.push(`Desconto: ${discountPercent}%`);
  lines.push(`Total: ${money(total)}`);

  const text = lines.join("\n");

  try {
    await navigator.clipboard.writeText(text);
    document.getElementById("copyStatus").textContent = "Lista copiada!";
  } catch {
    const area = document.createElement("textarea");
    area.value = text;
    document.body.appendChild(area);
    area.select();
    document.execCommand("copy");
    area.remove();
    document.getElementById("copyStatus").textContent = "Lista copiada!";
  }

  setTimeout(() => document.getElementById("copyStatus").textContent = "", 2500);
});

renderProducts();
renderCart();
