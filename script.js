const sections = [
  {
    title: "REGRAS GERAIS",
    rules: [
      ["Respeito e Bom Senso", "Aja com educação, respeito e bom senso com todos os jogadores. Atitudes que prejudiquem a convivência ou o ambiente da cidade poderão ser punidas."],
      ["Amor à Vida", "É obrigatório valorizar a vida do próprio personagem e a vida de terceiros durante o RP."],
      ["Armas Permitidas no Sul", "No Sul, são permitidas exclusivamente as armas definidas pela administração da cidade."],
      ["Desce e Quebra", "A ação de Descer e Quebrar somente poderá ocorrer após o início de uma fuga."],
      ["Voz de Assalto", "Ao receber uma voz de assalto, o jogador deverá se render ou iniciar uma fuga coerente com a situação."],
      ["Voz de Assalto Fora de Veículo", "É proibido dar voz de assalto estando fora de um veículo quando a regra da situação exigir abordagem veicular."],
      ["Abuso de Poder", "O abuso de poder poderá resultar em banimento, conforme a gravidade da situação."],
      ["Zaralho / Atitudes Antirroleplay", "É proibido realizar zaralho ou qualquer atitude que prejudique, interrompa ou desvirtue o RP."],
      ["Toxicidade", "Xingamentos pesados, perseguição ou manifestações de conteúdo sensível poderão resultar em banimento."]
    ]
  },
  {
    title: "PROIBIÇÕES GERAIS",
    rules: [
      ["Dark RP", "É proibido qualquer forma de racismo, homofobia, assédio ou discriminação dentro da cidade."],
      ["Meta Gaming", "Não utilize informações obtidas fora do personagem para obter vantagem dentro do RP."],
      ["Power Gaming", "É proibido forçar ações impossíveis ou retirar a possibilidade de reação de outro jogador."],
      ["Combat Logging", "Sair do servidor para evitar uma abordagem, ação ou consequência do RP é proibido."]
    ]
  },
  {
    title: "AVISOS E AÇÕES MARCADAS",
    rules: [
      ["Ações Marcadas", "Ações especiais deverão respeitar horários, locais e regras definidos previamente pela administração."],
      ["Avisos da Administração", "Sempre siga os avisos oficiais publicados nos canais da cidade."]
    ]
  },
  {
    title: "RP LEGAL",
    rules: [
      ["Interpretação", "Mantenha a coerência do personagem e evite atitudes incompatíveis com o contexto da cidade."],
      ["Conflitos", "Conflitos entre personagens devem permanecer dentro das regras e limites estabelecidos."]
    ]
  },
  {
    title: "AÇÕES DE RUA",
    rules: [
      ["Abordagens", "Abordagens devem possuir contexto e respeitar as regras específicas de cada situação."],
      ["Assaltos", "Assaltos devem seguir os limites de participantes, locais e horários definidos pela administração."]
    ]
  },
  {
    title: "SEQUESTROS",
    rules: [
      ["Sequestro", "Sequestros precisam possuir contexto de RP e respeitar as regras de quantidade, negociação e duração."],
      ["Cativeiro", "É proibido utilizar cativeiros para impedir indefinidamente a participação de outro jogador."]
    ]
  },
  {
    title: "CONDUTA POLICIAL",
    rules: [
      ["Abordagem Policial", "A polícia deve realizar abordagens de forma coerente com o RP e respeitar os procedimentos da cidade."],
      ["Uso da Força", "O uso da força deve ser proporcional à ameaça e à situação apresentada."]
    ]
  },
  {
    title: "REGRAS DE FUGA",
    rules: [
      ["Início da Fuga", "Uma fuga deve possuir um motivo de RP e respeitar as regras específicas de perseguição."],
      ["Veículos", "Não utilize veículos ou mecânicas de forma abusiva para obter vantagem durante perseguições."]
    ]
  },
  {
    title: "ABORDAGENS POLICIAIS",
    rules: [
      ["Blitz", "Blitz e operações policiais devem seguir as áreas e procedimentos autorizados."],
      ["Revista", "Revistas devem possuir justificativa dentro do RP e respeitar as regras da cidade."]
    ]
  },
  {
    title: "ROUBO DE VEÍCULOS",
    rules: [
      ["Furto", "O roubo de veículos deve seguir as condições e limites estabelecidos para cada categoria."],
      ["Abandono", "Não utilize veículos roubados para gerar situações de anti-RP ou atrapalhar outros jogadores."]
    ]
  },
  {
    title: "REGRAS DE FACÇÃO",
    rules: [
      ["Hierarquia", "Membros devem respeitar a hierarquia e as normas internas da própria facção."],
      ["Conflitos", "Guerras e conflitos entre facções devem seguir as regras de guerra e os limites definidos."]
    ]
  },
  {
    title: "AÇÕES",
    rules: [
      ["Ações Oficiais", "Ações de grande escala precisam seguir os requisitos publicados pela administração."],
      ["Participação", "Respeite o limite de participantes e as regras específicas de cada ação."]
    ]
  }
];

const nav = document.getElementById("sidebarNav");
const sectionsEl = document.getElementById("sections");
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

function slug(text) {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function render() {
  sections.forEach((section, index) => {
    const id = slug(section.title);
    const navItem = document.createElement("button");
    navItem.className = "nav-link";
    navItem.type = "button";
    navItem.dataset.target = id;
    navItem.innerHTML = `<span class="nav-arrow">›</span>${section.title.charAt(0) + section.title.slice(1).toLowerCase()}`;
    navItem.onclick = () => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      closeMobileMenu();
    };
    nav.appendChild(navItem);

    const sectionEl = document.createElement("section");
    sectionEl.className = "section";
    sectionEl.id = id;
    sectionEl.innerHTML = `
      <div class="section-head">
        <div class="section-number">${String(index + 1).padStart(2, "0")}</div>
        <div class="section-title">
          <h2>${section.title}</h2>
          <span>${section.rules.length} regras nesta seção</span>
        </div>
      </div>
      ${section.rules.map((rule, ruleIndex) => `
        <article class="rule" data-rule-index="${ruleIndex}">
          <div class="check">✓</div>
          <p><strong>${rule[0]}:</strong> ${rule[1]}</p>
        </article>
      `).join("")}
    `;
    sectionsEl.appendChild(sectionEl);
  });

  observeSections();
}

function observeSections() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      document.querySelectorAll(".nav-link").forEach(btn => btn.classList.remove("active"));
      document.querySelector(`.nav-link[data-target="${entry.target.id}"]`)?.classList.add("active");
    });
  }, { rootMargin: "-20% 0px -70% 0px" });

  document.querySelectorAll(".section").forEach(s => observer.observe(s));
}

function searchRules(term) {
  const q = term.trim().toLowerCase();
  if (!q) {
    searchResults.classList.add("hidden");
    document.querySelectorAll(".section").forEach(s => s.style.display = "");
    return;
  }

  const matches = [];
  sections.forEach((section, si) => {
    section.rules.forEach((rule, ri) => {
      const text = `${section.title} ${rule[0]} ${rule[1]}`.toLowerCase();
      if (text.includes(q)) matches.push({ section, si, ri, rule });
    });
  });

  document.querySelectorAll(".section").forEach(s => s.style.display = "none");
  searchResults.classList.remove("hidden");

  searchResults.innerHTML = `
    <h3>${matches.length} resultado(s) encontrado(s)</h3>
    ${matches.length ? matches.map(m => `
      <div class="result" onclick="goToResult(${m.si}, ${m.ri})">
        <b>${m.rule[0]}</b>
        <span>${m.section.title} — ${m.rule[1]}</span>
      </div>
    `).join("") : `<div class="result"><span>Nenhuma regra encontrada para “${term}”.</span></div>`}
  `;
}

function goToResult(sectionIndex, ruleIndex) {
  searchInput.value = "";
  searchRules("");
  const section = sections[sectionIndex];
  const el = document.getElementById(slug(section.title));
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
  setTimeout(() => {
    const rule = el?.querySelector(`[data-rule-index="${ruleIndex}"]`);
    rule?.scrollIntoView({ behavior: "smooth", block: "center" });
    rule?.animate([{ background: "rgba(139,92,246,.14)" }, { background: "transparent" }], { duration: 1000 });
  }, 450);
}

searchInput.addEventListener("input", e => searchRules(e.target.value));

const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
document.getElementById("menuBtn").addEventListener("click", () => {
  sidebar.classList.add("open");
  overlay.classList.add("open");
});
overlay.addEventListener("click", closeMobileMenu);

function closeMobileMenu() {
  sidebar.classList.remove("open");
  overlay.classList.remove("open");
}

const modal = document.getElementById("calculatorModal");
function openCalculator() {
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  overlay.classList.add("open");
  updateTotal();
}
function closeCalculator() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  overlay.classList.remove("open");
}
["calcQty", "calcPrice", "calcDiscount"].forEach(id => {
  document.getElementById(id).addEventListener("input", updateTotal);
});
function updateTotal() {
  const qty = Number(document.getElementById("calcQty").value) || 0;
  const price = Number(document.getElementById("calcPrice").value) || 0;
  const discount = Math.min(100, Math.max(0, Number(document.getElementById("calcDiscount").value) || 0));
  const total = qty * price * (1 - discount / 100);
  document.getElementById("calcTotal").textContent = total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

render();
