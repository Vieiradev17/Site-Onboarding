const searchInput = document.querySelector("#course-search");
const courseCards = [...document.querySelectorAll(".course-card")];
const emptyState = document.querySelector("#empty-state");
const toast = document.querySelector("#toast");
const completedCount = document.querySelector("#completed-count");
const courseDialog = document.querySelector("#course-dialog");
const lessonList = document.querySelector("#lesson-list");
const filterButtons = [...document.querySelectorAll(".filter-chip")];
const resourceGrid = document.querySelector("#resource-grid");
const libraryEmptyState = document.querySelector("#library-empty-state");
const pageViews = [...document.querySelectorAll("[data-page]")];
const taskInputs = [...document.querySelectorAll("[data-task]")];
const storageKey = "villelatech-training-progress-v1";
const themeStorageKey = "villelatech-training-theme-v1";
const themeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
const themeToggle = document.querySelector(".theme-toggle");
const profileMenu = document.querySelector("#profile-menu");
const profileMenuButton = document.querySelector(".more-button");
const savedThemePreference = localStorage.getItem(themeStorageKey);
let themePreference = ["system", "light", "dark"].includes(savedThemePreference) ? savedThemePreference : "system";

function createSystemCourse(systemName, description) {
  return {
    title: `Primeiros passos no ${systemName}`,
    category: "Ferramentas",
    description,
    duration: "15 min",
    lessons: [
      ["Acesso e primeiro contato", `Use o acesso fornecido pela equipe e consulte as orientações internas para entrar no ${systemName}.`, "5 min"],
      ["Navegação e rotina da equipe", `Conheça as áreas e tarefas do ${systemName} que fazem parte da sua função, seguindo o processo apresentado pelo seu time.`, "5 min"],
      ["Boas práticas e suporte", "Use apenas as permissões necessárias, não compartilhe suas credenciais e procure o canal oficial de suporte se tiver dúvidas.", "5 min"],
    ],
  };
}

const courses = {
  welcome: {
    title: "Boas-vindas à VillelaTech",
    category: "Onboarding",
    description: "Um roteiro para entender a empresa, conhecer as pessoas e se sentir em casa desde o primeiro dia.",
    duration: "35 min",
    lessons: [
      ["Nossa história e cultura", "Conheça os princípios, a missão e o jeito VillelaTech de trabalhar.", "8 min"],
      ["Pessoas e canais", "Descubra com quem falar e quais canais usar para cada tipo de assunto.", "9 min"],
      ["Como trabalhamos juntos", "Uma introdução à colaboração, comunicação e rotina da equipe.", "10 min"],
      ["Seu primeiro mês", "Alinhe expectativas e combine seus próximos passos com sua liderança.", "8 min"],
    ],
  },
  security: {
    title: "Segurança da informação",
    category: "Segurança",
    description: "Práticas essenciais para proteger sua conta, seus dispositivos e as informações da equipe.",
    duration: "50 min",
    lessons: [
      ["Contas e autenticação", "Use senhas únicas e siga as orientações da equipe para autenticação multifator.", "10 min"],
      ["E-mails e links suspeitos", "Como reconhecer tentativas de phishing e reportar mensagens suspeitas.", "10 min"],
      ["Dados e compartilhamento", "Cuidados ao armazenar, enviar e compartilhar informações de trabalho.", "10 min"],
      ["Dispositivos seguros", "Bloqueio de tela, atualizações e cuidados ao trabalhar fora do escritório.", "10 min"],
      ["O que fazer em caso de incidente", "Como agir rapidamente e avisar o time de TI se algo parecer errado.", "10 min"],
    ],
  },
  tools: {
    title: "Ferramentas do nosso dia a dia",
    category: "Ferramentas",
    description: "Um roteiro para configurar seu ambiente e encontrar os recursos de trabalho que você precisa.",
    duration: "40 min",
    lessons: [
      ["Seu computador de trabalho", "Cuidados básicos, atualizações e como pedir ajuda com o equipamento.", "8 min"],
      ["Acessos e contas", "Confira como validar seus acessos e solicitar permissões que estiverem faltando.", "8 min"],
      ["Comunicação e reuniões", "Dicas para organizar conversas, reuniões e arquivos compartilhados.", "8 min"],
      ["Suporte de TI", "O que informar ao abrir um pedido para facilitar e agilizar o atendimento.", "8 min"],
      ["Personalize seu espaço", "Ajustes simples para manter seu ambiente organizado e produtivo.", "8 min"],
    ],
  },
  callix: createSystemCourse("Cállix", "Plataforma de contact center na nuvem que reúne voz, discador, WhatsApp e URA, com histórico das interações com clientes."),
  flowly: createSystemCourse("Flowly", "Omnichannel de logística que centraliza canais como WhatsApp, Instagram e e-mail, além de CRM, TMS e ERP."),
  payflow: createSystemCourse("Payflow", "Conheça os recursos do Payflow usados pela equipe e as orientações internas para cada rotina."),
  expedit: createSystemCourse("Expedit", "Plataforma de gestão jurídica para monitorar processos, publicações, prazos, documentos e rotinas do escritório."),
  cpj: createSystemCourse("CPJ", "Sistema jurídico para acompanhar processos, prazos e fluxos de trabalho da operação."),
  hubspot: createSystemCourse("HubSpot", "CRM para organizar contatos, acompanhar negócios e registrar interações com clientes."),
  bitrix: createSystemCourse("Bitrix", "Espaço de trabalho que reúne CRM, tarefas e projetos, chats, chamadas e documentos."),
  zimbra: createSystemCourse("Zimbra", "Plataforma de e-mail e colaboração com recursos de agenda, contatos e calendário."),
  loyTrust: createSystemCourse("Loy Trust", "Gestão segura de certificados digitais e credenciais, com controle de acesso a portais e tribunais."),
  fmi: createSystemCourse("FMI", "App do franqueado para acessar informações e recursos disponibilizados pela rede."),
  wkRadar: createSystemCourse("WK Radar", "ERP que integra processos empresariais como finanças, vendas, suprimentos e controladoria."),
  goTo: createSystemCourse("GoTo Connect", "Telefonia em nuvem e comunicação empresarial com chamadas, mensagens e reuniões."),
};

const resources = [
  {
    id: "hubspot-video-overview",
    platform: "hubspot",
    platformName: "HubSpot",
    type: "video",
    title: "Primeiros passos no HubSpot",
    description: "Uma apresentação guiada do CRM, dos contatos e da navegação principal.",
    duration: "12 min",
    videoUrl: "",
    search: "hubspot crm introducao primeiros passos video aula navegacao",
  },
  {
    id: "hubspot-contacts",
    platform: "hubspot",
    platformName: "HubSpot",
    type: "guide",
    title: "Como encontrar e consultar um contato",
    description: "Localize registros, confira informações e entenda o histórico do contato.",
    duration: "4 passos",
    steps: [
      ["Abra Contatos", "No menu principal do HubSpot, acesse a área de Contatos. A organização do menu pode variar conforme seu acesso."],
      ["Pesquise o registro", "Use a busca por nome ou e-mail. Confira se selecionou o contato correto antes de abrir o registro."],
      ["Revise as informações", "Consulte os dados disponíveis e a linha do tempo para entender interações anteriores."],
      ["Mantenha os dados atualizados", "Edite somente os campos necessários e siga as orientações internas para uso de dados."],
    ],
    search: "hubspot contatos localizar consultar buscar atualizar crm",
  },
  {
    id: "hubspot-activity",
    platform: "hubspot",
    platformName: "HubSpot",
    type: "guide",
    title: "Como registrar uma atividade",
    description: "Registre notas, ligações e reuniões para manter o histórico do relacionamento atualizado.",
    duration: "4 passos",
    steps: [
      ["Abra o contato ou negócio", "Encontre o registro relacionado à interação que você deseja documentar."],
      ["Escolha o tipo de atividade", "Na linha do tempo, selecione a opção disponível, como nota, ligação ou reunião."],
      ["Escreva um resumo claro", "Inclua contexto e próximos passos relevantes. Evite registrar informações pessoais desnecessárias."],
      ["Salve e confira o histórico", "Salve a atividade e confirme que ela aparece no registro correto."],
    ],
    search: "hubspot registrar atividade nota ligacao reuniao linha do tempo",
  },
  {
    id: "hubspot-video-pipeline",
    platform: "hubspot",
    platformName: "HubSpot",
    type: "video",
    title: "Entendendo negócios e pipeline",
    description: "Veja como acompanhar negócios, etapas e próximos passos no CRM.",
    duration: "15 min",
    videoUrl: "",
    search: "hubspot pipeline negocios vendas etapas crm video",
  },
  {
    id: "hubspot-deal",
    platform: "hubspot",
    platformName: "HubSpot",
    type: "guide",
    title: "Como atualizar um negócio",
    description: "Encontre um negócio, confira a etapa e registre a próxima ação.",
    duration: "4 passos",
    steps: [
      ["Acesse Negócios", "Abra a área de Negócios no CRM e localize o registro correto pela busca ou pela visualização disponível."],
      ["Confira o pipeline", "Verifique se o negócio está no pipeline esperado antes de fazer alterações."],
      ["Atualize o que mudou", "Ajuste apenas os campos necessários e mova a etapa conforme o processo combinado pela equipe."],
      ["Registre a próxima ação", "Adicione uma tarefa ou nota com o próximo passo e a data combinada, quando aplicável."],
    ],
    search: "hubspot atualizar negocio pipeline etapa tarefa crm",
  },
  {
    id: "microsoft-teams",
    platform: "microsoft",
    platformName: "Microsoft 365",
    type: "video",
    title: "Primeiros passos no Microsoft Teams",
    description: "Conheça canais, conversas e reuniões para colaborar com a equipe.",
    duration: "10 min",
    videoUrl: "",
    search: "microsoft 365 teams equipes canais reunioes video",
  },
  {
    id: "microsoft-onedrive",
    platform: "microsoft",
    platformName: "Microsoft 365",
    type: "guide",
    title: "Como compartilhar um arquivo pelo OneDrive",
    description: "Compartilhe arquivos com atenção às permissões e às regras da equipe.",
    duration: "4 passos",
    steps: [
      ["Abra o arquivo no OneDrive", "Confirme que está usando sua conta corporativa e localize o arquivo correto."],
      ["Selecione Compartilhar", "Use a opção de compartilhamento do arquivo. As opções podem variar conforme as políticas da organização."],
      ["Revise quem terá acesso", "Escolha as pessoas e permissões necessárias. Evite links públicos ou acesso mais amplo que o necessário."],
      ["Envie e confirme", "Compartilhe com os destinatários corretos e confirme que eles conseguem acessar o material."],
    ],
    search: "microsoft onedrive compartilhar arquivo link permissao documentos",
  },
  {
    id: "security-email",
    platform: "security",
    platformName: "Segurança e TI",
    type: "guide",
    title: "Como identificar e reportar um e-mail suspeito",
    description: "Sinais para observar e o que fazer antes de clicar em links ou anexos.",
    duration: "4 passos",
    steps: [
      ["Confira o remetente", "Verifique o endereço completo e desconfie de domínios parecidos ou mensagens inesperadas."],
      ["Pare antes de clicar", "Não abra links ou anexos suspeitos nem informe sua senha por uma página acessada pela mensagem."],
      ["Confirme por outro canal", "Se a mensagem parecer vir de alguém conhecido, confirme a solicitação por um canal confiável."],
      ["Avise o time de TI", "Use o canal oficial de suporte da empresa e inclua a mensagem suspeita, seguindo as orientações internas."],
    ],
    search: "seguranca email phishing suspeito reportar link anexo ti",
  },
  {
    id: "it-support",
    platform: "security",
    platformName: "Segurança e TI",
    type: "guide",
    title: "Como pedir ajuda ao time de TI",
    description: "As informações que ajudam a equipe a entender e resolver seu chamado.",
    duration: "5 passos",
    steps: [
      ["Descreva o que você estava tentando fazer", "Informe o sistema ou equipamento e qual era o resultado esperado."],
      ["Explique o que aconteceu", "Copie a mensagem de erro ou descreva o comportamento sem incluir senhas ou dados sensíveis."],
      ["Informe quando começou", "Diga se o problema acontece sempre ou começou após alguma mudança."],
      ["Anexe evidências com cuidado", "Inclua uma captura de tela se for útil, removendo informações confidenciais que não sejam necessárias."],
      ["Use o canal oficial", "Envie o pedido para o canal indicado pela sua equipe. Em caso de dúvida, fale com sua liderança."],
    ],
    search: "ti suporte chamado ajuda erro computador solicitar atendimento",
  },
  {
    id: "orientation-seat-change",
    platform: "orientacoes",
    platformName: "Orientações e situações",
    type: "article",
    title: "Mudança de lugar: leve seus itens pessoais",
    description: "Orientação para mudanças de lugares no ambiente de trabalho.",
    duration: "2 min de leitura",
    steps: [
      ["O que levar", "Ao mudar de lugar, cada funcionário deve levar seus pertences pessoais e os fones de ouvido para casa."],
      ["Quando fazer", "Faça isso conforme a orientação comunicada pela equipe para a mudança de lugares."],
      ["Ficou com dúvida?", "Se não souber quando ocorrerá a mudança ou precisar de orientação sobre algum item, confirme com sua liderança ou com a equipe responsável."],
    ],
    search: "orientacao mudanca mudança lugares lugar pertences pessoais fones ouvido levar casa mesa escritorio comunicado",
  },
];

let activeFilter = "all";
let currentPage = "inicio";
let currentQuery = "";
let currentCourseId = null;
let toastTimeout;

function applyThemePreference() {
  const resolvedTheme = themePreference === "system"
    ? (themeMediaQuery.matches ? "dark" : "light")
    : themePreference;
  document.documentElement.dataset.theme = resolvedTheme;

  const nextThemeLabel = resolvedTheme === "dark" ? "Ativar tema claro" : "Ativar tema escuro";
  themeToggle.setAttribute("aria-label", nextThemeLabel);
  themeToggle.title = nextThemeLabel;
  document.querySelectorAll("[data-theme-choice]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.themeChoice === themePreference));
  });
}

function setThemePreference(preference) {
  themePreference = preference;
  localStorage.setItem(themeStorageKey, preference);
  applyThemePreference();
}

function readProgress() {
  const savedProgress = localStorage.getItem(storageKey);
  if (!savedProgress) return { tasks: [], completedCourses: [] };

  try {
    const progress = JSON.parse(savedProgress);
    return {
      tasks: Array.isArray(progress.tasks) ? progress.tasks : [],
      completedCourses: Array.isArray(progress.completedCourses) ? progress.completedCourses : [],
    };
  } catch (error) {
    console.error("Não foi possível ler o progresso salvo da VillelaTech Training.", error);
    return { tasks: [], completedCourses: [] };
  }
}

let progress = readProgress();

function saveProgress() {
  localStorage.setItem(storageKey, JSON.stringify(progress));
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => toast.classList.remove("visible"), 3000);
}

function normalizeText(text) {
  return text.toLocaleLowerCase("pt-BR").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function updateCourseCards() {
  const query = normalizeText(searchInput.value.trim());
  let visibleCards = 0;

  courseCards.forEach((card) => {
    const matchesSearch = normalizeText(`${card.dataset.search} ${card.innerText}`).includes(query);
    const matchesFilter = activeFilter === "all" || card.dataset.category === activeFilter;
    const isVisible = matchesSearch && matchesFilter;
    card.hidden = !isVisible;
    if (isVisible) visibleCards += 1;
  });

  emptyState.hidden = visibleCards > 0;
  updateLibrary();
}

function renderResources() {
  resources.forEach((resource) => {
    document.querySelectorAll("[data-platform-grid]").forEach((grid) => {
      const gridPlatform = grid.dataset.platformGrid;
      const isAllMaterialsGrid = gridPlatform === "all";
      if (isAllMaterialsGrid && resource.platform === "orientacoes") return;
      const matchesPlatform = gridPlatform.startsWith(`${resource.platform}-`);
      const matchesType = gridPlatform === `${resource.platform}-${resource.type}`;
      if (!isAllMaterialsGrid && !(matchesPlatform && matchesType)) return;
      grid.append(createResourceCard(resource));
    });
  });

  document.querySelectorAll("[data-count]").forEach((count) => {
    const total = resources.filter((resource) => resource.platform === count.dataset.count && resource.platform !== "orientacoes").length;
    count.textContent = `${total} ${total === 1 ? "material" : "materiais"}`;
  });

  const platformResources = resources.filter((resource) => resource.platform !== "orientacoes");
  document.querySelector("#library-total").textContent = `${platformResources.length} materiais`;
  document.querySelectorAll("[data-platform-total]").forEach((total) => {
    const count = resources.filter((resource) => resource.platform === total.dataset.platformTotal).length;
    total.textContent = `${count} ${count === 1 ? "material" : "materiais"}`;
  });
  document.querySelectorAll("[data-group-count]").forEach((total) => {
    const [platform, type] = total.dataset.groupCount.split("-");
    const count = resources.filter((resource) => resource.platform === platform && resource.type === type).length;
    const typeLabel = type === "video"
      ? count === 1 ? "aula" : "aulas"
      : type === "article"
        ? count === 1 ? "orientação" : "orientações"
        : count === 1 ? "tutorial" : "tutoriais";
    total.textContent = `${count} ${typeLabel}`;
  });
}

function createResourceCard(resource) {
  const card = document.createElement("article");
  card.className = "resource-card-item";
  card.dataset.resourceId = resource.id;
  card.dataset.platform = resource.platform;
  card.dataset.search = resource.search;

  const icon = document.createElement("span");
  icon.className = `resource-type-icon ${resource.type}`;
  icon.setAttribute("aria-hidden", "true");
  icon.textContent = resource.type === "video" ? "▶" : resource.type === "article" ? "i" : "≡";

  const copy = document.createElement("span");
  copy.className = "resource-card-copy";
  const meta = document.createElement("span");
  meta.className = "resource-card-meta";
  const platform = document.createElement("span");
  platform.textContent = resource.platformName;
  const kind = document.createElement("span");
  kind.className = "resource-kind";
  kind.textContent = resource.type === "video" ? "VÍDEO" : resource.type === "article" ? "ORIENTAÇÃO" : "TUTORIAL";
  meta.append(platform, kind);

  const title = document.createElement("strong");
  title.textContent = resource.title;
  const description = document.createElement("small");
  description.textContent = resource.description;
  const state = document.createElement("span");
  state.className = `resource-state ${resource.type === "video" && !resource.videoUrl ? "in-production" : ""}`;
  state.textContent = resource.type === "video" && !resource.videoUrl ? "Vídeo em produção" : resource.duration;
  copy.append(meta, title, description);

  const action = document.createElement("span");
  action.className = "resource-card-action";
  action.append(state);
  const button = document.createElement("button");
  button.className = "resource-open-button";
  button.type = "button";
  button.dataset.resourceId = resource.id;
  button.setAttribute("aria-label", `Abrir ${resource.title}`);
  button.innerHTML = 'Abrir <span aria-hidden="true">→</span>';
  action.append(button);
  card.append(icon, copy, action);
  return card;
}

function updateLibrary() {
  const query = normalizeText(currentQuery);
  let visibleCards = 0;
  let visibleOrientationCards = 0;

  document.querySelectorAll(".resource-card-item").forEach((card) => {
    const isVisible = normalizeText(`${card.dataset.search} ${card.innerText}`).includes(query);
    card.hidden = !isVisible;
    if (card.parentElement === resourceGrid && isVisible) visibleCards += 1;
    if (card.dataset.platform === "orientacoes" && isVisible) visibleOrientationCards += 1;
  });

  document.querySelectorAll(".material-group").forEach((group) => {
    const visibleInGroup = group.querySelectorAll(".resource-card-item:not([hidden])").length;
    group.hidden = visibleInGroup === 0;
  });

  const isSearching = currentPage === "materiais" && Boolean(currentQuery);
  const isSearchingOrientations = currentPage === "orientacoes" && Boolean(currentQuery);
  document.querySelector("#platform-grid").hidden = isSearching;
  document.querySelector("#search-results-heading").hidden = !isSearching;
  resourceGrid.hidden = !isSearching;
  libraryEmptyState.hidden = !isSearching || visibleCards > 0;
  document.querySelector("#orientation-search-heading").hidden = !isSearchingOrientations;
  document.querySelector("#orientation-empty-state").hidden = currentPage !== "orientacoes" || !currentQuery || visibleOrientationCards > 0;
}

function renderRoute(hash, preserveSearch = false) {
  const [routePath, queryString = ""] = hash.replace(/^#\/?/, "").split("?");
  const parts = routePath.split("/").filter(Boolean);
  const requestedPage = parts[0] === "materiais" && parts[1] ? parts[1] : parts[0];
  const validPages = ["inicio", "trilhas", "materiais", "hubspot", "microsoft", "seguranca", "orientacoes", "ajuda"];
  currentPage = validPages.includes(requestedPage) ? requestedPage : "inicio";
  const parameters = new URLSearchParams(queryString);
  currentQuery = ["materiais", "orientacoes"].includes(currentPage) ? (parameters.get("busca") || "") : "";
  const helpResourceId = currentPage === "ajuda" ? parameters.get("conteudo") : null;

  if (!preserveSearch) searchInput.value = currentQuery;
  pageViews.forEach((view) => {
    view.hidden = view.dataset.page !== currentPage;
  });

  const activeSection = ["hubspot", "microsoft", "seguranca"].includes(currentPage) ? "materiais" : currentPage;
  document.querySelectorAll("[data-route-link]").forEach((link) => {
    const isActive = link.dataset.routeLink === activeSection;
    link.classList.toggle("active", isActive);
    if (isActive) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });

  const labels = {
    inicio: "Visão geral",
    trilhas: "Trilhas de treinamento",
    materiais: currentQuery ? "Resultados da busca" : "Materiais",
    hubspot: "HubSpot",
    microsoft: "Microsoft 365",
    seguranca: "Segurança e TI",
    orientacoes: currentQuery ? "Busca em orientações" : "Orientações",
    ajuda: "Central de ajuda",
  };
  document.querySelector(".breadcrumb strong").textContent = labels[currentPage];
  updateCourseCards();
  updateLibrary();
  if (helpResourceId) openResource(helpResourceId);
}

function navigateToSearch(query) {
  const searchPage = currentPage === "orientacoes" ? "orientacoes" : "materiais";
  const nextHash = query
    ? `#/${searchPage}?busca=${encodeURIComponent(query)}`
    : `#/${searchPage}`;
  if (location.hash === nextHash) {
    renderRoute(nextHash, true);
  } else {
    history.replaceState(null, "", nextHash);
    renderRoute(nextHash, true);
  }
}

function updateProgressUI() {
  const checkedTasks = new Set(progress.tasks);
  taskInputs.forEach((input) => {
    input.checked = checkedTasks.has(input.dataset.task);
    input.closest(".checklist-item").classList.toggle("completed", input.checked);
  });

  const completedTasks = taskInputs.filter((input) => input.checked).length;
  document.querySelector("#steps-progress").textContent = `${completedTasks} de ${taskInputs.length} concluídos`;
  document.querySelector("#steps-progress-bar").style.width = `${(completedTasks / taskInputs.length) * 100}%`;
  completedCount.textContent = String(progress.completedCourses.length).padStart(2, "0");
  document.querySelector("#available-course-count").textContent = String(courseCards.length).padStart(2, "0");
  document.querySelector("#courses-total").textContent = `${courseCards.length} trilhas para começar`;

  courseCards.forEach((card) => {
    const isComplete = progress.completedCourses.includes(card.dataset.courseId);
    card.classList.toggle("course-complete", isComplete);
    const button = card.querySelector(".start-button");
    button.innerHTML = isComplete
      ? 'Rever trilha <span aria-hidden="true">↗</span>'
      : 'Ver trilha <span aria-hidden="true">→</span>';
    button.setAttribute("aria-label", `${isComplete ? "Rever" : "Ver"} ${courses[card.dataset.courseId].title}`);
  });
}

function openCourse(courseId) {
  const course = courses[courseId];
  if (!course) return;

  currentCourseId = courseId;
  document.querySelector("#dialog-category").textContent = course.category;
  document.querySelector("#dialog-title").textContent = course.title;
  document.querySelector("#dialog-description").textContent = course.description;
  document.querySelector("#dialog-duration").textContent = `◷ ${course.duration}`;
  document.querySelector("#dialog-lessons").textContent = `${course.lessons.length} aulas`;
  lessonList.replaceChildren();

  course.lessons.forEach(([title, description, duration]) => {
    const item = document.createElement("li");
    const lessonCopy = document.createElement("span");
    const lessonTitle = document.createElement("strong");
    const lessonDescription = document.createElement("small");
    const lessonDuration = document.createElement("span");

    lessonTitle.textContent = title;
    lessonDescription.textContent = description;
    lessonDuration.textContent = duration;
    lessonCopy.append(lessonTitle, lessonDescription);
    item.append(lessonCopy, lessonDuration);
    lessonList.append(item);
  });

  const isComplete = progress.completedCourses.includes(courseId);
  document.querySelector("#dialog-status").textContent = isComplete ? "Trilha concluída" : "No seu ritmo · salve seu progresso neste dispositivo";
  document.querySelector("#complete-course").textContent = isComplete ? "Desfazer conclusão" : "Marcar trilha como concluída";
  document.querySelector("#complete-course").hidden = false;
  document.querySelector("#resource-link").hidden = true;
  document.querySelector("#content-note").innerHTML = "<span aria-hidden=\"true\">✦</span> Os vídeos e materiais serão adicionados pela equipe. Enquanto isso, use este roteiro como guia de consulta.";
  if (!courseDialog.open) courseDialog.showModal();
}

function openResource(resourceId) {
  const resource = resources.find((item) => item.id === resourceId);
  if (!resource) return;

  currentCourseId = null;
  document.querySelector("#dialog-category").textContent = `${resource.platformName} · ${resource.type === "video" ? "Aula em vídeo" : "Tutorial escrito"}`;
  if (resource.type === "article") {
    document.querySelector("#dialog-category").textContent = `${resource.platformName} · Orientação`;
  }
  document.querySelector("#dialog-title").textContent = resource.title;
  document.querySelector("#dialog-description").textContent = resource.description;
  document.querySelector("#dialog-duration").textContent = resource.type === "video"
    ? "▶ Aula em vídeo"
    : resource.type === "article" ? "▤ Comunicado interno" : "≡ Passo a passo";
  document.querySelector("#dialog-lessons").textContent = resource.duration;
  document.querySelector("#dialog-section-title").textContent = resource.type === "article"
    ? "Orientação"
    : resource.type === "video" ? "Sobre esta aula" : "Passo a passo";
  lessonList.replaceChildren();

  const steps = resource.steps || [[
    resource.videoUrl ? "Vídeo disponível" : "Vídeo ainda não publicado",
    resource.videoUrl
      ? "Abra o material no link abaixo. O vídeo será exibido em uma nova aba."
      : "Esta sessão já está reservada para este assunto. O time de TI pode adicionar aqui o link do vídeo e os materiais complementares.",
  ]];

  steps.forEach((step, index) => {
    const [title, description] = step;
    const item = document.createElement("li");
    const lessonCopy = document.createElement("span");
    const lessonTitle = document.createElement("strong");
    const lessonDescription = document.createElement("small");
    const stepNumber = document.createElement("span");

    lessonTitle.textContent = title;
    lessonDescription.textContent = description;
    stepNumber.textContent = resource.type === "article"
      ? `0${index + 1}`
      : resource.steps ? `PASSO ${index + 1}` : resource.duration;
    lessonCopy.append(lessonTitle, lessonDescription);
    item.append(lessonCopy, stepNumber);
    lessonList.append(item);
  });

  const resourceLink = document.querySelector("#resource-link");
  const contentNote = document.querySelector("#content-note");
  document.querySelector("#dialog-status").textContent = resource.type === "video" && !resource.videoUrl
    ? "Sessão reservada · aguardando o vídeo da equipe"
    : `${resource.platformName} · material de consulta`;
  document.querySelector("#complete-course").hidden = true;
  resourceLink.hidden = true;
  if (resource.type === "video" && resource.videoUrl) {
    resourceLink.href = resource.videoUrl;
    resourceLink.hidden = false;
  }
  contentNote.innerHTML = resource.type === "video" && !resource.videoUrl
    ? '<span aria-hidden="true">✦</span> O espaço da aula está pronto. Envie o vídeo ou link para a equipe de TI publicar nesta sessão.'
    : resource.type === "article"
      ? '<span aria-hidden="true">✦</span> Consulte também as comunicações oficiais da equipe para datas e detalhes específicos de cada mudança.'
    : '<span aria-hidden="true">✦</span> Este guia é uma orientação geral. Siga os processos e as permissões definidos pela sua equipe.';
  if (!courseDialog.open) courseDialog.showModal();
}

searchInput.addEventListener("input", () => {
  if (currentPage === "trilhas") {
    updateCourseCards();
    return;
  }
  navigateToSearch(searchInput.value.trim());
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });
    updateCourseCards();
  });
});

document.querySelectorAll("[data-platform-grid]").forEach((grid) => {
  grid.addEventListener("click", (event) => {
    const button = event.target.closest(".resource-open-button");
    if (button) openResource(button.dataset.resourceId);
  });
});

document.querySelector("#clear-search").addEventListener("click", () => {
  searchInput.value = "";
  navigateToSearch("");
  searchInput.focus();
});

document.querySelector("#clear-orientation-search").addEventListener("click", () => {
  searchInput.value = "";
  navigateToSearch("");
  searchInput.focus();
});

taskInputs.forEach((input) => {
  input.addEventListener("change", () => {
    const tasks = new Set(progress.tasks);
    if (input.checked) tasks.add(input.dataset.task);
    else tasks.delete(input.dataset.task);
    progress.tasks = [...tasks];
    saveProgress();
    updateProgressUI();
    showToast(input.checked ? "Boa! Etapa adicionada ao seu progresso." : "Etapa removida do checklist.");
  });
});

document.querySelectorAll(".start-button").forEach((button) => {
  button.addEventListener("click", () => openCourse(button.closest(".course-card").dataset.courseId));
});

document.querySelector(".dialog-close").addEventListener("click", () => courseDialog.close());
courseDialog.addEventListener("click", (event) => {
  if (event.target === courseDialog) courseDialog.close();
});

document.querySelector("#complete-course").addEventListener("click", () => {
  const completedCourses = new Set(progress.completedCourses);
  const wasComplete = completedCourses.has(currentCourseId);
  if (wasComplete) completedCourses.delete(currentCourseId);
  else completedCourses.add(currentCourseId);
  progress.completedCourses = [...completedCourses];
  saveProgress();
  updateProgressUI();
  courseDialog.close();
  showToast(wasComplete ? "Conclusão desfeita. Você pode continuar quando quiser." : "Trilha concluída! Parabéns por mais essa etapa.");
});

document.querySelector(".notification-button").addEventListener("click", () => {
  showToast("Você está em dia! Suas próximas etapas estão no checklist de chegada.");
});

themeToggle.addEventListener("click", () => {
  setThemePreference(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
});

document.querySelectorAll("[data-theme-choice]").forEach((button) => {
  button.addEventListener("click", () => setThemePreference(button.dataset.themeChoice));
});

profileMenuButton.addEventListener("click", () => {
  profileMenu.hidden = !profileMenu.hidden;
  profileMenuButton.setAttribute("aria-expanded", String(!profileMenu.hidden));
});

document.addEventListener("click", (event) => {
  if (!profileMenu.hidden && !event.target.closest(".profile")) {
    profileMenu.hidden = true;
    profileMenuButton.setAttribute("aria-expanded", "false");
  }
});

document.querySelector("#clear-progress").addEventListener("click", () => {
  if (!window.confirm("Tem certeza de que deseja apagar todo o progresso salvo neste dispositivo?")) return;
  progress = { tasks: [], completedCourses: [] };
  saveProgress();
  updateProgressUI();
  profileMenu.hidden = true;
  profileMenuButton.setAttribute("aria-expanded", "false");
  showToast("Seu progresso foi limpo.");
});

window.addEventListener("hashchange", () => {
  renderRoute(location.hash);
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !profileMenu.hidden) {
    profileMenu.hidden = true;
    profileMenuButton.setAttribute("aria-expanded", "false");
    profileMenuButton.focus();
  }
  if (event.key === "/" && document.activeElement !== searchInput && !courseDialog.open) {
    event.preventDefault();
    searchInput.focus();
  }
});

if (typeof themeMediaQuery.addEventListener === "function") {
  themeMediaQuery.addEventListener("change", () => {
    if (themePreference === "system") applyThemePreference();
  });
} else {
  themeMediaQuery.addListener(() => {
    if (themePreference === "system") applyThemePreference();
  });
}

const cursorLightMedia = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
if (cursorLightMedia.matches) {
  let cursorLightFrame = 0;
  let cursorPosition = null;
  let activeGlowCard = null;
  const glowCardSelector = ".course-card, .resource-card-item, .resource-card, .platform-card, .stat-card, .quote-card, .first-steps, .quick-help, .home-shortcut, .help-card, .help-contact-card, .help-topic-grid a";

  document.addEventListener("pointermove", (event) => {
    if (event.pointerType !== "mouse") return;
    cursorPosition = { x: event.clientX, y: event.clientY };
    document.body.classList.add("cursor-light-active");

    const glowCard = event.target instanceof Element ? event.target.closest(glowCardSelector) : null;
    if (activeGlowCard !== glowCard) {
      activeGlowCard?.classList.remove("cursor-glow-card");
      activeGlowCard = glowCard;
      activeGlowCard?.classList.add("cursor-glow-card");
    }

    if (activeGlowCard) {
      const bounds = activeGlowCard.getBoundingClientRect();
      activeGlowCard.style.setProperty("--card-cursor-x", `${event.clientX - bounds.left}px`);
      activeGlowCard.style.setProperty("--card-cursor-y", `${event.clientY - bounds.top}px`);
      document.body.classList.add("cursor-on-card");
    } else {
      document.body.classList.remove("cursor-on-card");
    }

    if (cursorLightFrame) return;
    cursorLightFrame = window.requestAnimationFrame(() => {
      document.documentElement.style.setProperty("--cursor-x", `${cursorPosition.x}px`);
      document.documentElement.style.setProperty("--cursor-y", `${cursorPosition.y}px`);
      cursorLightFrame = 0;
    });
  }, { passive: true });

  document.addEventListener("pointerleave", (event) => {
    if (event.pointerType === "mouse") {
      document.body.classList.remove("cursor-light-active", "cursor-on-card");
      activeGlowCard?.classList.remove("cursor-glow-card");
      activeGlowCard = null;
    }
  });
}

applyThemePreference();
updateProgressUI();
renderResources();
renderRoute(location.hash || "#/inicio");
