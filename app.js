// ELEMENTOS E CONFIGURACAO: seletores da pagina e chaves de armazenamento.
const searchInput = document.querySelector("#course-search");
const courseCards = [...document.querySelectorAll(".course-card")];
const platformCards = [...document.querySelectorAll(".platform-card")];
const platformSearchResults = document.querySelector("#platform-search-results");
const platformSearchGrid = document.querySelector("#platform-search-grid");
const courseSearchResults = document.querySelector("#course-search-results");
const courseSearchGrid = document.querySelector("#course-search-grid");
const notificationButton = document.querySelector(".notification-button");
const notificationPanel = document.querySelector("#notification-panel");
const notificationList = document.querySelector("#notification-list");
const notificationDot = document.querySelector(".notification-dot");
const notificationMarkAllButton = document.querySelector(".notification-mark-all");
const emptyState = document.querySelector("#empty-state");
const toast = document.querySelector("#toast");
const whatsappFloat = document.querySelector(".whatsapp-float");
const courseDialog = document.querySelector("#course-dialog");
const lessonList = document.querySelector("#lesson-list");
const filterButtons = [...document.querySelectorAll(".filter-chip")];
const resourceGrid = document.querySelector("#resource-grid");
const libraryEmptyState = document.querySelector("#library-empty-state");
const pageViews = [...document.querySelectorAll("[data-page]")];
const storageKey = "villelatech-training-progress-v1";
const themeStorageKey = "villelatech-training-theme-v1";
const themeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
const themeToggle = document.querySelector(".theme-toggle");
const profileMenu = document.querySelector("#profile-menu");
const profileMenuButton = document.querySelector(".more-button");
const appShell = document.querySelector("#app-shell");
const sessionLoading = document.querySelector("#session-loading");
const demoLoginScreen = document.querySelector("#demo-login-screen");
const demoLoginForm = document.querySelector("#demo-login-form");
const demoLoginError = document.querySelector("#demo-login-error");
const demoAdminLinks = [...document.querySelectorAll("[data-admin-only]")];
const adminTabButtons = [...document.querySelectorAll("[data-admin-tab-button]")];
const adminTabPanels = [...document.querySelectorAll("[data-admin-panel]")];
const supabaseEnabled = true;
const sectorsStorageKey = "villelatech-training-demo-sectors-v1";
const sectorRosterSeedKey = "villelatech-training-demo-sector-roster-v5";
const auditSectorNameFixKey = "villelatech-training-demo-audit-sector-name-v1";
const assignmentsStorageKey = "villelatech-training-demo-assignments-v1";
const assignmentNamesStorageKey = "villelatech-training-demo-assignment-names-v1";
const deletedBuiltInsStorageKey = "villelatech-training-demo-deleted-builtins-v1";
const courseDescriptionsStorageKey = "villelatech-training-demo-course-descriptions-v1";
const courseDetailsStorageKey = "villelatech-training-demo-course-details-v1";
const activeSectorStorageKey = "villelatech-training-demo-active-sector-v1";
const usersStorageKey = "villelatech-training-demo-users-v1";
const courseContentStorageKey = "villelatech-training-demo-course-content-v1";
const courseModulesStorageKey = "villelatech-training-demo-course-modules-v1";
const videoProgressStorageKey = "villelatech-training-video-progress-v1";
const orientationStorageKey = "villelatech-training-demo-orientations-v1";
const helpContentStorageKey = "villelatech-training-demo-help-content-v1";
const helpContactStorageKey = "villelatech-training-demo-help-contacts-v1";
const homeSettingsStorageKey = "villelatech-training-demo-home-settings-v1";
const homeOverridesStorageKey = "villelatech-training-demo-home-overrides-v1";
const courseFileDatabaseName = "villelatech-training-course-videos-v1";
const courseFileStoreName = "videos";
const systemAdminSectorId = "ti";
const savedThemePreference = localStorage.getItem(themeStorageKey);
let themePreference = ["system", "light", "dark"].includes(savedThemePreference) ? savedThemePreference : "system";

// PAGINA INICIAL: campos de texto editaveis sem alterar IDs do checklist ou destinos.
const homeFields = [
  { key: "welcomeKicker", group: "Boas-vindas", label: "Chamada", selector: "#home-welcome-kicker", maxLength: 100 },
  { key: "welcomeTitle", group: "Boas-vindas", label: "Título", selector: "#home-welcome-title", maxLength: 100 },
  { key: "welcomeSubtitle", group: "Boas-vindas", label: "Subtítulo", selector: "#home-welcome-subtitle", maxLength: 100 },
  { key: "welcomeDescription", group: "Boas-vindas", label: "Mensagem", selector: ".welcome-copy", maxLength: 500, multiline: true },
  { key: "checklistTitle", group: "Checklist", label: "Título do checklist", selector: "#first-steps-title", maxLength: 120 },
  { key: "checklistKicker", group: "Checklist", label: "Chamada", selector: ".steps-heading .section-kicker", maxLength: 100 },
  ...["profile", "access", "security", "tools"].flatMap((id, index) => [
    { key: `task${index + 1}Title`, group: "Checklist", label: `Item ${index + 1}: título`, selector: `[data-task-row="${id}"] .task-copy strong`, maxLength: 120 },
    { key: `task${index + 1}Description`, group: "Checklist", label: `Item ${index + 1}: descrição`, selector: `[data-task-row="${id}"] .task-copy small`, maxLength: 300, multiline: true },
  ]),
  { key: "helpTitle", group: "Ajuda rápida", label: "Título", selector: ".quick-help h3", maxLength: 120 },
  { key: "helpDescription", group: "Ajuda rápida", label: "Mensagem", selector: ".quick-help > p:not(.section-kicker)", maxLength: 500, multiline: true },
  { key: "helpKicker", group: "Ajuda rápida", label: "Chamada", selector: ".quick-help .section-kicker", maxLength: 100 },
  { key: "helpIcon", group: "Ajuda rápida", label: "Símbolo", selector: ".quick-help-icon", maxLength: 8 },
  { key: "helpButton", group: "Ajuda rápida", label: "Texto do botão", selector: ".help-cta", maxLength: 120 },
  { key: "helpDestination", group: "Ajuda rápida", label: "Destino do botão (#/página, link, mailto ou tel)", selector: ".help-cta", attribute: "href", maxLength: 2000 },
  { key: "helpResponse", group: "Ajuda rápida", label: "Mensagem complementar", selector: ".help-response", maxLength: 200 },
  ...["trilhas", "materiais", "orientacoes"].flatMap((route, index) => [
    { key: `shortcut${index + 1}Title`, group: "Atalhos", label: `Atalho ${index + 1}: título`, selector: `.home-shortcut[href="#/${route}"] strong`, maxLength: 100 },
    { key: `shortcut${index + 1}Description`, group: "Atalhos", label: `Atalho ${index + 1}: descrição`, selector: `.home-shortcut[href="#/${route}"] small`, maxLength: 200 },
  ]),
];
const defaultHomeSettings = Object.fromEntries(homeFields.map((field) => [field.key, field.attribute
  ? document.querySelector(field.selector).getAttribute(field.attribute)
  : document.querySelector(field.selector).textContent.trim()]));
const defaultHomeVisual = createHomeDefaults();
let homeSettings = { ...defaultHomeSettings };
let globalHomeSettings = { ...defaultHomeSettings };
let homeSessionSectorId = null;
let homeSessionSectorOverride = {};
let homeSessionUserOverride = {};
let homeEditorData = null;
let homeEditorRequest = 0;
let homeEditorSectorId = "";
let homeEditorUserId = "";
let homeEditorRenderedValues = null;
let homeSettingsSaving = false;

function validateHomeContent(settings) {
  if (!settings || typeof settings !== "object" || Array.isArray(settings)) throw new Error("Os textos da página inicial estão inválidos.");
  const values = {};
  for (const field of homeFields) {
    if (settings[field.key] !== undefined && (typeof settings[field.key] !== "string" || !settings[field.key].trim() || settings[field.key].length > field.maxLength)) {
      throw new Error(`O campo ${field.label} da página inicial está inválido.`);
    }
    if (field.key === "helpDestination" && settings[field.key] !== undefined && !homeSafeDestination(settings[field.key])) {
      throw new Error("O destino da ajuda rápida é inválido.");
    }
    if (settings[field.key] !== undefined) values[field.key] = settings[field.key];
  }
  return { ...values, ...validateHomeVisual(settings) };
}

function applyHomeSettings(settings, visual) {
  homeSettings = { ...defaultHomeSettings, ...validateHomeContent(settings) };
  homeFields.filter((field) => !/^(task|shortcut)\d/.test(field.key)).forEach((field) => {
    const element = document.querySelector(field.selector);
    if (field.attribute) element.setAttribute(field.attribute, homeSettings[field.key]);
    else element.textContent = homeSettings[field.key];
  });
  renderHomeVisual(visual);
}

function applySessionHomeSettings() {
  applyHomeSettings(
    { ...globalHomeSettings, ...homeSessionSectorOverride, ...homeSessionUserOverride },
    resolveHomeVisual(globalHomeSettings, homeSessionSectorOverride, homeSessionUserOverride),
  );
  updateProgressUI();
}

function renderHomeSettingsForm(values) {
  homeEditorRenderedValues = structuredClone(values);
  const container = document.querySelector("#admin-home-fields");
  const openSections = new Set([...container.querySelectorAll(".home-editor-section[open]")].map((section) => section.dataset.homeSection));
  const itemKey = (item) => `${item.closest("[data-home-list]").dataset.homeList}:${item.dataset.homeId}`;
  const openItems = new Set([...container.querySelectorAll(".home-builder-item[open]")].map(itemKey));
  container.replaceChildren();
  const sections = Object.fromEntries([
    ["Boas-vindas", "Textos e imagem principal", "✦"],
    ["Indicadores", "Cards e informações em destaque", "◫"],
    ["Checklist", "Título e etapas de chegada", "✓"],
    ["Ajuda rápida", "Mensagem e contato de suporte", "?"],
    ["Atalhos", "Cards, imagens e destinos", "↗"],
  ].map(([name, description, icon]) => [name, createHomeEditorSection(container, name, description, icon)]));
  const groups = {};
  homeFields.forEach((field) => {
    if (/^(task|shortcut)\d/.test(field.key)) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = field.key;
      input.value = values[field.key];
      container.append(input);
      return;
    }
    if (!groups[field.group]) {
      groups[field.group] = document.createElement("fieldset");
      groups[field.group].className = "admin-form-grid";
      groups[field.group].setAttribute("aria-label", `Textos de ${field.group}`);
      sections[field.group].append(groups[field.group]);
    }
    const label = document.createElement("label");
    label.textContent = field.label;
    if (field.multiline) label.className = "admin-field-wide";
    const input = document.createElement(field.multiline ? "textarea" : "input");
    input.name = field.key;
    input.maxLength = field.maxLength;
    input.required = true;
    input.value = values[field.key];
    if (field.multiline) input.rows = 3;
    label.append(input);
    groups[field.group].append(label);
  });
  renderHomeVisualEditor(sections, groups, values);
  container.querySelectorAll(".home-editor-section").forEach((section) => { section.open = openSections.has(section.dataset.homeSection); });
  container.querySelectorAll(".home-builder-item").forEach((item) => { item.open = openItems.has(itemKey(item)); });
}

function homeEditorBaseValues() {
  const user = homeEditorData.users.find((item) => item.id === homeEditorUserId);
  const sector = user?.sectorId ? homeEditorData.sectorOverrides[user.sectorId] : {};
  return {
    ...globalHomeSettings,
    ...sector,
    ...resolveHomeVisual(globalHomeSettings, sector),
  };
}

function homeEditorValues() {
  const user = homeEditorData.users.find((item) => item.id === homeEditorUserId);
  const sector = user?.sectorId ? homeEditorData.sectorOverrides[user.sectorId] : homeEditorData.sectorOverrides[homeEditorSectorId];
  const individual = homeEditorData.userOverrides[homeEditorUserId];
  return {
    ...globalHomeSettings, ...sector, ...individual,
    ...resolveHomeVisual(globalHomeSettings, sector, individual),
  };
}

function closeUserPicker(select, search, menu, status) {
  menu.hidden = true;
  search.setAttribute("aria-expanded", "false");
  search.removeAttribute("aria-activedescendant");
  search.value = select.selectedOptions[0]?.textContent || "";
  status.textContent = "";
}

function setupUserPicker(select, search, menu, list, status) {
  function setActive(index) {
    const options = [...list.children];
    options.forEach((option, optionIndex) => {
      option.dataset.active = String(optionIndex === index);
    });
    if (options[index]) {
      search.setAttribute("aria-activedescendant", options[index].id);
      const top = options[index].offsetTop;
      const bottom = top + options[index].offsetHeight;
      if (top < menu.scrollTop) menu.scrollTop = top;
      else if (bottom > menu.scrollTop + menu.clientHeight) menu.scrollTop = bottom - menu.clientHeight;
    } else {
      search.removeAttribute("aria-activedescendant");
    }
  }

  function renderOptions(query) {
    list.replaceChildren();
    [...select.options].filter((option) => !query || matchesSearch(option.textContent, query))
      .forEach((option, index) => {
        const item = document.createElement("div");
        item.id = `${list.id}-option-${index}`;
        item.className = "admin-user-picker-option";
        item.setAttribute("role", "option");
        item.setAttribute("aria-selected", String(option.selected));
        item.dataset.value = option.value;
        item.textContent = option.textContent;
        list.append(item);
      });
    status.textContent = list.children.length ? "" : "Nenhum usuário encontrado.";
    setActive(list.children.length ? 0 : -1);
  }

  function open() {
    menu.hidden = false;
    search.setAttribute("aria-expanded", "true");
    renderOptions("");
    search.select();
  }

  function choose(item) {
    select.value = item.dataset.value;
    select.dispatchEvent(new Event("change", { bubbles: true }));
    closeUserPicker(select, search, menu, status);
  }

  search.addEventListener("focus", open);
  search.addEventListener("click", () => { if (menu.hidden) open(); });
  search.addEventListener("input", () => {
    menu.hidden = false;
    search.setAttribute("aria-expanded", "true");
    renderOptions(search.value.trim());
  });
  search.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !menu.hidden) {
      event.preventDefault();
      closeUserPicker(select, search, menu, status);
      return;
    }
    if (!["ArrowDown", "ArrowUp", "Enter"].includes(event.key)) return;
    if (menu.hidden) {
      if (event.key !== "Enter") {
        event.preventDefault();
        open();
      }
      return;
    }
    event.preventDefault();
    const options = [...list.children];
    const activeIndex = options.findIndex((option) => option.dataset.active === "true");
    if (event.key === "Enter") {
      if (options[activeIndex]) choose(options[activeIndex]);
    } else if (options.length) {
      const offset = event.key === "ArrowDown" ? 1 : -1;
      setActive(Math.max(0, Math.min(options.length - 1, activeIndex + offset)));
    }
  });
  search.addEventListener("blur", () => closeUserPicker(select, search, menu, status));
  list.addEventListener("mousedown", (event) => {
    if (event.target.closest('[role="option"]')) event.preventDefault();
  });
  list.addEventListener("click", (event) => {
    const item = event.target.closest('[role="option"]');
    if (item && list.contains(item)) choose(item);
  });
}

function populateUserSelect(select, search, menu, status, users, selectedId, defaultLabel) {
  const selected = users.find((user) => user.id === selectedId);
  select.replaceChildren(new Option(defaultLabel, ""));
  users.forEach((user) => select.add(new Option(`${user.name || "Sem nome"} · ${user.email}`, user.id)));
  select.value = selected ? selectedId : "";
  closeUserPicker(select, search, menu, status);
}

function populateHomeUserSelect() {
  const matchingUsers = homeEditorData.users.filter((user) => (
    !homeEditorSectorId || (user.sectorId || "__no_sector__") === homeEditorSectorId
  ));
  populateUserSelect(
    document.querySelector("#admin-home-user"),
    document.querySelector("#admin-home-user-search"),
    document.querySelector("#admin-home-user-menu"),
    document.querySelector("#admin-home-user-search-status"),
    matchingUsers,
    homeEditorUserId,
    homeEditorSectorId === "__no_sector__" ? "Selecione um usuário" : homeEditorSectorId ? "Todos os usuários do setor" : "Padrão geral",
  );
}

function renderHomeEditor() {
  const sectorSelect = document.querySelector("#admin-home-sector");
  sectorSelect.replaceChildren(new Option("Todos os setores", ""));
  [...homeEditorData.sectors].sort((a, b) => a.name.localeCompare(b.name, "pt-BR"))
    .forEach((sector) => sectorSelect.add(new Option(sector.name, sector.id)));
  if (homeEditorData.users.some((user) => !user.sectorId)) sectorSelect.add(new Option("Sem setor", "__no_sector__"));
  sectorSelect.value = homeEditorSectorId;
  populateHomeUserSelect();
  const user = homeEditorData.users.find((item) => item.id === homeEditorUserId);
  const sector = homeEditorData.sectors.find((item) => item.id === homeEditorSectorId);
  document.querySelector("#admin-home-status").textContent = user
    ? `Editando a página de ${user.name || user.email}. Campos e listas iguais aos herdados acompanham o setor ou padrão geral.`
    : sector
      ? `Editando a página do setor ${sector.name}. Personalizações individuais têm prioridade; campos e listas iguais ao padrão geral acompanham alterações gerais.`
      : homeEditorSectorId
        ? "Selecione um usuário sem setor para editar seus textos."
        : "Editando o padrão geral de todos os usuários.";
  document.querySelector("#admin-home-form").hidden = homeEditorSectorId === "__no_sector__" && !homeEditorUserId;
  document.querySelector("#admin-home-restore").hidden = !homeEditorSectorId && !homeEditorUserId;
  document.querySelector("#admin-home-error").hidden = true;
  renderHomeSettingsForm(homeEditorValues());
}

function homeEditorHasChanges() {
  if (!homeEditorRenderedValues) return false;
  if (homeFields.some((field) => (
    document.querySelector("#admin-home-form").elements.namedItem(field.key).value !== homeEditorRenderedValues[field.key]
  ))) return true;
  try {
    const { visual, uploads } = readHomeVisualEditor();
    return uploads.length > 0 || homeVisualKeys.some((key) => !homeValuesEqual(visual[key], homeEditorRenderedValues[key]));
  } catch {
    return true;
  }
}

async function loadHomeEditor() {
  if (!isSuperAdmin()) return;
  const requestId = ++homeEditorRequest;
  const sessionId = demoSession.userId;
  const status = document.querySelector("#admin-home-status");
  const loadError = document.querySelector("#admin-home-load-error");
  const sectorSelect = document.querySelector("#admin-home-sector");
  const userSelect = document.querySelector("#admin-home-user");
  document.querySelector("#admin-home-form").hidden = true;
  document.querySelector("#admin-home-retry").hidden = true;
  document.querySelector("#admin-home-refresh").hidden = true;
  loadError.hidden = true;
  sectorSelect.disabled = true;
  userSelect.disabled = true;
  closeUserPicker(userSelect, document.querySelector("#admin-home-user-search"),
    document.querySelector("#admin-home-user-menu"), document.querySelector("#admin-home-user-search-status"));
  document.querySelector("#admin-home-user-search").disabled = true;
  status.textContent = "Carregando setores, usuários e textos...";
  try {
    let data;
    if (supabaseEnabled) {
      data = assertSupabaseResult(await window.trainingSupabase.rpc("get_home_settings_editor_data"), "carregar o editor da visão geral");
    } else {
      const saved = localStorage.getItem(homeOverridesStorageKey);
      const overrides = saved ? JSON.parse(saved) : { sectors: {}, users: {} };
      data = { global: globalHomeSettings, sectors, users, sectorOverrides: overrides.sectors, userOverrides: overrides.users };
    }
    if (requestId !== homeEditorRequest || demoSession?.userId !== sessionId || !isSuperAdmin()) return;
    if (!data || !Array.isArray(data.sectors) || !Array.isArray(data.users)
      || !data.sectorOverrides || typeof data.sectorOverrides !== "object" || Array.isArray(data.sectorOverrides)
      || !data.userOverrides || typeof data.userOverrides !== "object" || Array.isArray(data.userOverrides)) {
      throw new Error("Os dados do editor da visão geral estão inválidos.");
    }
    globalHomeSettings = { ...defaultHomeSettings, ...validateHomeContent(data.global === null ? {} : data.global) };
    data.sectorOverrides = Object.fromEntries(Object.entries(data.sectorOverrides).map(([id, value]) => [id, validateHomeContent(value)]));
    data.userOverrides = Object.fromEntries(Object.entries(data.userOverrides).map(([id, value]) => [id, validateHomeContent(value)]));
    homeEditorData = data;
    homeSessionSectorOverride = data.sectorOverrides[homeSessionSectorId] || {};
    homeSessionUserOverride = data.userOverrides[sessionId] || {};
    applySessionHomeSettings();
    homeEditorSectorId = "";
    homeEditorUserId = "";
    sectorSelect.disabled = false;
    userSelect.disabled = false;
    document.querySelector("#admin-home-user-search").disabled = false;
    document.querySelector("#admin-home-refresh").hidden = false;
    renderHomeEditor();
  } catch (error) {
    if (requestId !== homeEditorRequest || demoSession?.userId !== sessionId || !isSuperAdmin()) return;
    console.error("Não foi possível carregar o editor da visão geral.", error);
    homeEditorData = null;
    status.textContent = "";
    loadError.textContent = "Não foi possível carregar os públicos. Verifique a conexão e se a migração da visão geral foi aplicada.";
    loadError.hidden = false;
    document.querySelector("#admin-home-retry").hidden = false;
  }
}

// CATALOGO INICIAL: trilhas, plataformas e tutoriais incorporados.
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

const materialPlatforms = {
  hubspot: { name: "HubSpot", page: "hubspot" },
  microsoft: { name: "Microsoft 365", page: "microsoft" },
  security: { name: "Segurança e TI", page: "seguranca" },
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

// ESTADO INICIAL: setores, acessos, conteudos e dados da previa local.
const sectorRosterElement = document.querySelector("#sector-roster-data");
if (!sectorRosterElement) throw new Error("A lista de setores do HTML não está disponível.");
const parsedSectorRoster = JSON.parse(sectorRosterElement.textContent);
if (!Array.isArray(parsedSectorRoster)) throw new Error("A lista de setores do HTML está inválida.");
const initialSectors = parsedSectorRoster.map((sector) => ({ ...sector, teams: [] }));

function readStoredJson(key, fallback) {
  const savedValue = localStorage.getItem(key);
  if (!savedValue) return fallback;

  try {
    return JSON.parse(savedValue);
  } catch (error) {
    console.error(`Não foi possível ler os dados de demonstração (${key}).`, error);
    return fallback;
  }
}

const allMaterialPlatforms = { ...materialPlatforms };
let deletedBuiltIns = supabaseEnabled ? { course: [], resource: [], platform: [] } : readStoredJson(deletedBuiltInsStorageKey, {});
if (!deletedBuiltIns || typeof deletedBuiltIns !== "object" || Array.isArray(deletedBuiltIns)) deletedBuiltIns = {};
["course", "resource", "platform"].forEach((type) => {
  if (!Array.isArray(deletedBuiltIns[type])) deletedBuiltIns[type] = [];
});
deletedBuiltIns.course.forEach((id) => {
  delete courses[id];
  const index = courseCards.findIndex((card) => card.dataset.courseId === id);
  if (index >= 0) courseCards.splice(index, 1)[0].remove();
});
const storedCourseDescriptions = supabaseEnabled ? {} : readStoredJson(courseDescriptionsStorageKey, {});
if (storedCourseDescriptions && typeof storedCourseDescriptions === "object" && !Array.isArray(storedCourseDescriptions)) {
  Object.entries(storedCourseDescriptions).forEach(([id, description]) => {
    if (courses[id] && typeof description === "string") {
      courses[id].description = description;
      const card = courseCards.find((item) => item.dataset.courseId === id);
      if (card) card.querySelector(".course-info > p").textContent = description;
    }
  });
} else {
  console.error("As descrições de trilhas salvas têm formato inválido.");
}
const storedCourseDetails = supabaseEnabled ? {} : readStoredJson(courseDetailsStorageKey, {});
if (storedCourseDetails && typeof storedCourseDetails === "object" && !Array.isArray(storedCourseDetails)) {
  Object.entries(storedCourseDetails).forEach(([id, details]) => {
    if (!courses[id] || !details || typeof details !== "object" || Array.isArray(details)) return;
    if (typeof details.title === "string") courses[id].title = details.title;
    if (typeof details.description === "string") courses[id].description = details.description;
    if (typeof details.imageFileId === "string") courses[id].imageFileId = details.imageFileId;
    const card = courseCards.find((item) => item.dataset.courseId === id);
    if (card) {
      card.querySelector(".course-info h3").textContent = courses[id].title;
      card.querySelector(".course-info > p").textContent = courses[id].description;
    }
  });
} else {
  console.error("Os dados salvos das trilhas têm formato inválido.");
}
deletedBuiltIns.platform.forEach((id) => {
  delete materialPlatforms[id];
  document.querySelector(`[data-count="${id}"]`)?.closest(".platform-card")?.remove();
});
for (let index = resources.length - 1; index >= 0; index -= 1) {
  if (deletedBuiltIns.resource.includes(resources[index].id) || deletedBuiltIns.platform.includes(resources[index].platform)) {
    resources.splice(index, 1);
  }
}

const previewUserSeed = [{
  id: "preview-super-admin",
  name: "Super Admin (Prévia)",
  email: "preview@villelatech.local",
  role: "super-admin",
  sectorId: systemAdminSectorId,
  team: "",
  accessBlocked: false,
}];
let users = readStoredJson(usersStorageKey, previewUserSeed);
if (!Array.isArray(users)) users = [...previewUserSeed];
if (!users.some((user) => user.role === "super-admin")) users.unshift(...previewUserSeed);
if (!supabaseEnabled) localStorage.setItem(usersStorageKey, JSON.stringify(users));
let demoSession = null;
function isSystemAdminUser(user) {
  return Boolean(user && demoSession && user.id === demoSession.userId);
}

let sectors = readStoredJson(sectorsStorageKey, initialSectors);
if (!Array.isArray(sectors) || sectors.length === 0) sectors = initialSectors;
let systemAdminSector = sectors.find((sector) => sector.id === systemAdminSectorId)
  || sectors.find((sector) => sector.name?.trim().toLocaleLowerCase("pt-BR") === "ti");
if (!systemAdminSector) {
  systemAdminSector = { ...initialSectors.find((sector) => sector.id === systemAdminSectorId) };
  sectors.push(systemAdminSector);
} else {
  systemAdminSector.name = "TI";
  systemAdminSector.vps = ["Márcio"];
  if (!Array.isArray(systemAdminSector.teams)) systemAdminSector.teams = [];
}
if (localStorage.getItem(sectorRosterSeedKey) !== "done") {
  const allowedSectorIds = new Set(initialSectors.map((sector) => sector.id));
  initialSectors.forEach((seed) => {
    const sector = sectors.find((item) => item.id === seed.id);
    if (sector) {
      sector.name = seed.name;
      sector.vps = [...seed.vps];
      if (!Array.isArray(sector.teams)) sector.teams = [];
    } else {
      sectors.push({ ...seed, teams: [] });
    }
  });
  sectors = sectors.filter((sector) => allowedSectorIds.has(sector.id));
  users.forEach((user) => {
    if (!allowedSectorIds.has(user.sectorId)) {
      user.sectorId = systemAdminSectorId;
      user.team = "";
    }
  });
  if (!supabaseEnabled) {
    localStorage.setItem(usersStorageKey, JSON.stringify(users));
    localStorage.setItem(sectorRosterSeedKey, "done");
  }
}
if (!supabaseEnabled && localStorage.getItem(auditSectorNameFixKey) !== "done") {
  const internalAudit = sectors.find((sector) => sector.id === "auditoria-interna");
  if (internalAudit?.name === "Auditoria") internalAudit.name = "Auditoria Interna";
  localStorage.setItem(auditSectorNameFixKey, "done");
}
if (!supabaseEnabled) localStorage.setItem(sectorsStorageKey, JSON.stringify(sectors));

const defaultSectorAssignment = {
  courseIds: ["welcome", "security", "tools"].filter((id) => courses[id]),
  resourceIds: ["security-email", "it-support", "orientation-seat-change"].filter((id) => resources.some((item) => item.id === id)),
  platformIds: Object.keys(materialPlatforms),
};
let sectorAssignments = readStoredJson(assignmentsStorageKey, {});
if (!sectorAssignments || typeof sectorAssignments !== "object" || Array.isArray(sectorAssignments)) {
  sectorAssignments = {};
}
Object.keys(sectorAssignments).forEach((sectorId) => {
  if (!sectors.some((sector) => sector.id === sectorId)) delete sectorAssignments[sectorId];
});
if (!supabaseEnabled) localStorage.setItem(assignmentsStorageKey, JSON.stringify(sectorAssignments));
sectors.forEach((sector) => {
  const assignment = sectorAssignments[sector.id];
  if (!assignment || !Array.isArray(assignment.courseIds) || !Array.isArray(assignment.resourceIds)) {
    sectorAssignments[sector.id] = {
      courseIds: [...defaultSectorAssignment.courseIds],
      resourceIds: [...defaultSectorAssignment.resourceIds],
      platformIds: [...defaultSectorAssignment.platformIds],
    };
  } else if (!Array.isArray(assignment.platformIds)) {
    assignment.platformIds = Object.keys(materialPlatforms).filter((platformId) => (
      assignment.courseIds.includes(platformId)
      || resources.some((resource) => resource.platform === platformId && assignment.resourceIds.includes(resource.id))
    ));
  }
});

let courseMaterials = readStoredJson(courseContentStorageKey, []);
if (!Array.isArray(courseMaterials)) courseMaterials = [];
let courseModules = readStoredJson(courseModulesStorageKey, []);
if (!Array.isArray(courseModules)) courseModules = [];
const legacyCourseIds = [...new Set(courseMaterials.filter((item) => !item.moduleId).map((item) => item.courseId))];
legacyCourseIds.forEach((courseId) => {
  let moduleId = `legacy-${courseId}`;
  let suffix = 2;
  while (courseModules.some((module) => module.id === moduleId)) moduleId = `legacy-${courseId}-${suffix++}`;
  courseModules.push({ id: moduleId, courseId, title: "Materiais publicados anteriormente" });
  courseMaterials.filter((item) => item.courseId === courseId && !item.moduleId)
    .forEach((item) => { item.moduleId = moduleId; });
});
if (legacyCourseIds.length) {
  if (!supabaseEnabled) {
    localStorage.setItem(courseModulesStorageKey, JSON.stringify(courseModules));
    localStorage.setItem(courseContentStorageKey, JSON.stringify(courseMaterials));
  }
}
let publishedOrientations = readStoredJson(orientationStorageKey, []);
if (!Array.isArray(publishedOrientations)) publishedOrientations = [];
let helpContents = supabaseEnabled ? [] : readStoredJson(helpContentStorageKey, []);
if (!Array.isArray(helpContents)) helpContents = [];
const defaultHelpContacts = [
  { id: "support-email", title: "E-mail do suporte", summary: "suporte@grupovillela.com", url: "mailto:suporte@grupovillela.com?subject=Ajuda%20VillelaTech%20Training" },
  { id: "support-whatsapp", title: "WhatsApp", summary: "+55 (51) 98985-2847", url: "https://wa.me/5551989852847" },
];
let helpContacts = supabaseEnabled ? [] : readStoredJson(helpContactStorageKey, defaultHelpContacts);
if (!Array.isArray(helpContacts)) helpContacts = [...defaultHelpContacts];
if (!supabaseEnabled && helpContents.some((item) => item.url)) {
  const migratedContacts = [...helpContacts];
  helpContents.forEach((item) => {
    if (item.url && !migratedContacts.some((contact) => contact.id === item.id)) {
      migratedContacts.push({ id: item.id, title: item.title, summary: item.summary, url: item.url });
    }
  });
  const migratedContents = helpContents
    .filter((item) => item.body?.trim() || (Array.isArray(item.steps) && item.steps.length))
    .map((item) => ({ ...item, url: "" }));
  localStorage.setItem(helpContactStorageKey, JSON.stringify(migratedContacts));
  localStorage.setItem(helpContentStorageKey, JSON.stringify(migratedContents));
  helpContacts = migratedContacts;
  helpContents = migratedContents;
}
let editingHelpContentId = null;
let helpContentSaving = false;
let editingHelpContactId = null;
let helpContactSaving = false;
function createOrientationResource(orientation) {
  return {
    id: orientation.id,
    platform: "orientacoes",
    platformName: "Orientações e situações",
    type: "article",
    title: orientation.title,
    description: orientation.body.slice(0, 140),
    duration: "1 min de leitura",
    steps: [["Orientação", orientation.body]],
    articleUrl: orientation.url,
    fileId: orientation.fileId || "",
    fileName: orientation.fileName || "",
    fileType: orientation.fileType || "",
    search: `${orientation.title} ${orientation.body} ${orientation.fileName || ""}`,
  };
}
publishedOrientations.forEach((orientation) => {
  resources.push(createOrientationResource(orientation));
  (orientation.sectorIds || []).forEach((sectorId) => {
    const assignment = sectorAssignments[sectorId];
    if (assignment && !assignment.resourceIds.includes(orientation.id)) assignment.resourceIds.push(orientation.id);
  });
});

const savedActiveSectorId = localStorage.getItem(activeSectorStorageKey);
let activeSectorId = sectors.some((sector) => sector.id === savedActiveSectorId)
  ? savedActiveSectorId
  : sectors[0].id;
const previewUser = users.find((user) => user.role === "super-admin");
if (previewUser && sectors.some((sector) => sector.id === previewUser.sectorId)) {
  activeSectorId = previewUser.sectorId;
}
if (!supabaseEnabled) {
  demoSession = { email: previewUser.email.toLocaleLowerCase("pt-BR"), role: "super-admin", userId: previewUser.id };
}
let activeFilter = "all";
let currentPage = "inicio";
let currentQuery = "";
let userNotifications = [];
let notificationsChannel = null;
let cloudUserState = {
  theme_preference: "system",
  active_sector_id: null,
  progress: { tasks: [], completedCourses: [] },
  video_progress: {},
};
let cloudUserStateWriteQueue = Promise.resolve();
let currentCourseId = null;
let currentResourceId = null;
let activeCourseFileUrls = [];
let activePlatformFileUrls = [];
let activePlatformVideo = null;
let videoProgressStorageFailed = false;
let activeAdminTabId = "users";
let adminSectorPage = 1;
const adminSectorPageSize = 9;
let adminUserPage = 1;
let adminUserPageSize = 25;
let modulePage = 1;
let modulePageSize = 5;
let courseContentPage = 1;
let courseContentPageSize = 5;
let courseContentPlatform = "";
let orientationPage = 1;
let orientationPageSize = 10;
let editingUserId = null;
let userAccessSaving = false;
let editingModuleId = null;
let editingCourseContentId = null;
let editingOrientationId = null;
let editingCourseId = null;
let editingCourseImageFile = null;
let editingCourseImageRemoved = false;
let courseProfilePreviewUrl = null;
const courseProfileImageUrls = new Map();
let toastTimeout;
let whatsappReturnTimeout;
let requestControlTimeout;
let requestActionTimeout;
// FEEDBACK DE REQUISICOES: estado visual dos controles durante carregamento e salvamento.
let requestActionControl = null;
let requestActionFeedbackLabel = null;
let requestActionHasSemanticLabel = false;
let activeRequestControl = null;
let activeRequestControlState = null;

function getRequestActionFeedbackLabel(control) {
  const action = (control.getAttribute("aria-label")
    || (control instanceof HTMLInputElement ? control.value : control.textContent)
    || "").trim();
  if (/^(excluir|deletar|apagar)\b/i.test(action)) return "Excluindo...";
  if (/^remover\b/i.test(action)) return "Removendo...";
  if (/^publicar\b/i.test(action)) return "Publicando...";
  if (/^(enviar|upload)\b/i.test(action)) return "Enviando...";
  if (/^(bloquear|desbloquear)\b/i.test(action)) return "Atualizando acesso...";
  if (/^(criar|adicionar|salvar|alterar|atualizar|concluir|marcar|limpar)\b/i.test(action)) return "Salvando...";
  return null;
}

function isThemeControl(control) {
  return control.matches(".theme-toggle, [data-theme-choice]");
}

function rememberRequestAction(event) {
  const control = event.type === "submit"
    ? event.submitter
    : event.target instanceof Element
      ? event.target.closest("button, input[type='submit'], input[type='button']")
      : null;
  if (!control) return;
  if (isThemeControl(control)) {
    window.clearTimeout(requestActionTimeout);
    requestActionControl = null;
    requestActionFeedbackLabel = null;
    requestActionHasSemanticLabel = false;
    return;
  }
  requestActionControl = control;
  requestActionFeedbackLabel = getRequestActionFeedbackLabel(control);
  requestActionHasSemanticLabel = Boolean(requestActionFeedbackLabel);
  window.clearTimeout(requestActionTimeout);
  requestActionTimeout = window.setTimeout(() => {
    if (activeRequestControl) return;
    requestActionControl = null;
    requestActionFeedbackLabel = null;
    requestActionHasSemanticLabel = false;
  }, 2000);
}

function restoreRequestControl() {
  if (!activeRequestControl || !activeRequestControlState) return;
  if (activeRequestControl instanceof HTMLInputElement) {
    activeRequestControl.value = activeRequestControlState.value;
  } else {
    activeRequestControl.replaceChildren(...activeRequestControlState.children);
  }
  activeRequestControl.disabled = activeRequestControlState.disabled;
  if (activeRequestControlState.ariaLabel === null) activeRequestControl.removeAttribute("aria-label");
  else activeRequestControl.setAttribute("aria-label", activeRequestControlState.ariaLabel);
  activeRequestControl.removeAttribute("aria-busy");
  activeRequestControl = null;
  activeRequestControlState = null;
}

function finishRequestControl() {
  window.clearTimeout(requestControlTimeout);
  window.clearTimeout(requestActionTimeout);
  restoreRequestControl();
  requestActionControl = null;
  requestActionFeedbackLabel = null;
  requestActionHasSemanticLabel = false;
}

function updateRequestControl(kind) {
  if (activeRequestControl) return;
  const control = requestActionControl instanceof HTMLButtonElement || requestActionControl instanceof HTMLInputElement
    ? requestActionControl
    : document.activeElement instanceof HTMLButtonElement || document.activeElement instanceof HTMLInputElement
      ? document.activeElement
      : null;
  if (!control || isThemeControl(control) || control.disabled || control.hasAttribute("aria-busy")) return;
  activeRequestControl = control;
  activeRequestControlState = control instanceof HTMLInputElement
    ? { value: control.value, disabled: control.disabled, ariaLabel: control.getAttribute("aria-label") }
    : {
      children: [...control.childNodes].map((node) => node.cloneNode(true)),
      disabled: control.disabled,
      ariaLabel: control.getAttribute("aria-label"),
    };

  const label = requestActionFeedbackLabel || (kind === "saving" ? "Salvando..." : "Carregando...");
  requestActionFeedbackLabel = label;
  if (activeRequestControl instanceof HTMLInputElement) activeRequestControl.value = label;
  else activeRequestControl.textContent = label;
  activeRequestControl.setAttribute("aria-label", label);
  activeRequestControl.setAttribute("aria-busy", "true");
  activeRequestControl.disabled = true;
  requestControlTimeout = window.setTimeout(finishRequestControl, 60000);
}

document.addEventListener("click", rememberRequestAction, true);
document.addEventListener("submit", rememberRequestAction, true);

window.addEventListener("training:request-start", (event) => {
  const kind = event.detail?.kind;
  if (kind !== "loading" && kind !== "saving") return;
  if (activeRequestControl) return;
  window.clearTimeout(requestControlTimeout);
  updateRequestControl(kind);
});

window.addEventListener("training:request-end", (event) => {
  const kind = event.detail?.kind;
  if (kind !== "loading" && kind !== "saving") return;
  if (!activeRequestControl || requestActionHasSemanticLabel) return;
  window.clearTimeout(requestControlTimeout);
  requestControlTimeout = window.setTimeout(finishRequestControl, 350);
});

document.querySelectorAll("dialog").forEach((dialog) => {
  dialog.addEventListener("close", () => {
    if (activeRequestControl && dialog.contains(activeRequestControl)) finishRequestControl();
  });
});

// PREFERENCIAS E PROGRESSO: tema, checklist e trilhas concluidas.
function applyThemePreference() {
  const resolvedTheme = themePreference === "system"
    ? (themeMediaQuery.matches ? "dark" : "light")
    : themePreference;
  document.documentElement.dataset.theme = resolvedTheme;

  const nextThemeLabel = resolvedTheme === "dark" ? "Ativar tema claro" : "Ativar tema escuro";
  themeToggle.setAttribute("aria-label", nextThemeLabel);
  document.querySelectorAll("[data-theme-choice]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.themeChoice === themePreference));
  });
}

function setThemePreference(preference) {
  themePreference = preference;
  applyThemePreference();
  localStorage.setItem(themeStorageKey, preference);
  if (!supabaseEnabled) {
    return Promise.resolve();
  }
  return persistCloudUserState({ theme_preference: preference });
}

function readProgress() {
  const savedProgress = localStorage.getItem(progressStorageKey());
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

function progressStorageKey() {
  return supabaseEnabled && demoSession?.userId
    ? `${storageKey}:${encodeURIComponent(demoSession.userId)}`
    : storageKey;
}

let progress = supabaseEnabled ? { tasks: [], completedCourses: [] } : readProgress();

function saveProgress() {
  if (!supabaseEnabled) {
    localStorage.setItem(progressStorageKey(), JSON.stringify(progress));
    return Promise.resolve();
  }
  return persistCloudUserState({
    progress: {
      tasks: [...progress.tasks],
      completedCourses: [...progress.completedCourses],
    },
  });
}

function showToast(message) {
  finishRequestControl();
  toast.textContent = message;
  if (typeof toast.showPopover === "function" && !toast.matches(":popover-open")) {
    toast.showPopover();
  }
  toast.classList.add("visible");
  whatsappFloat.classList.add("is-obscured");
  window.clearTimeout(toastTimeout);
  window.clearTimeout(whatsappReturnTimeout);
  toastTimeout = window.setTimeout(() => {
    toast.classList.remove("visible");
    whatsappReturnTimeout = window.setTimeout(() => {
      if (!toast.classList.contains("visible")) {
        if (typeof toast.hidePopover === "function" && toast.matches(":popover-open")) {
          toast.hidePopover();
        }
        whatsappFloat.classList.remove("is-obscured");
      }
    }, 200);
  }, 3000);
}

// PERMISSOES E PERSISTENCIA: setor ativo, acesso e dados compartilhados.
function getActiveSector() {
  return sectors.find((sector) => sector.id === activeSectorId) || sectors[0];
}

function getSectorVpLabel(sector) {
  const vps = sector?.vps || [];
  return `VP${vps.length === 1 ? "" : "s"}: ${vps.length ? vps.join(", ") : "Não informado"}`;
}

function getCurrentUser() {
  return users.find((user) => user.email.toLocaleLowerCase("pt-BR") === demoSession?.email) || null;
}

function hasAdminAccess() {
  return ["admin", "super-admin"].includes(demoSession?.role);
}

function isSuperAdmin() {
  return demoSession?.role === "super-admin";
}

function getActiveAssignment() {
  return sectorAssignments[activeSectorId] || (supabaseEnabled
    ? { courseIds: [], resourceIds: [], platformIds: [] }
    : defaultSectorAssignment);
}

function saveSectorData() {
  if (supabaseEnabled) return;
  localStorage.setItem(sectorsStorageKey, JSON.stringify(sectors));
  localStorage.setItem(assignmentsStorageKey, JSON.stringify(sectorAssignments));
  localStorage.setItem(activeSectorStorageKey, activeSectorId);
}

function saveUsers() {
  if (supabaseEnabled) return;
  localStorage.setItem(usersStorageKey, JSON.stringify(users));
}

async function persistCloudSectors(nextSectors = sectors) {
  if (!supabaseEnabled) return;
  const client = window.trainingSupabase;
  if (!client) throw new Error("A conexão com o Supabase não está disponível.");
  assertSupabaseResult(await client.from("sectors").upsert(nextSectors.map((sector) => ({
    id: sector.id,
    name: sector.name,
    vps: sector.vps || [],
    teams: sector.teams || [],
  }))), "salvar os setores");
}

async function persistCloudAssignments(nextAssignments = sectorAssignments) {
  if (!supabaseEnabled) return;
  const client = window.trainingSupabase;
  if (!client) throw new Error("A conexão com o Supabase não está disponível.");
  assertSupabaseResult(await client.from("sector_assignments").upsert(
    Object.entries(nextAssignments).map(([sectorId, assignment]) => ({
      sector_id: sectorId,
      course_ids: assignment.courseIds || [],
      resource_ids: assignment.resourceIds || [],
      platform_ids: assignment.platformIds || [],
    })),
  ), "salvar as permissões dos setores");
}

async function persistCloudContent({
  modules = courseModules,
  materials = courseMaterials,
  orientations = publishedOrientations,
} = {}) {
  if (!supabaseEnabled) return;
  const client = window.trainingSupabase;
  if (!client) throw new Error("A conexão com o Supabase não está disponível.");
  const syncRows = async (table, rows, label) => {
    const savedRows = assertSupabaseResult(await client.from(table).select("id"), `consultar ${label}`);
    const savedIds = savedRows.map((row) => row.id);
    const retainedIds = new Set(rows.map((row) => row.id));
    const removedIds = savedIds.filter((id) => !retainedIds.has(id));
    if (removedIds.length) {
      assertSupabaseResult(await client.from(table).delete().in("id", removedIds), `remover ${label}`);
    }
    if (rows.length) {
      assertSupabaseResult(await client.from(table).upsert(rows), `salvar ${label}`);
    }
  };
  await syncRows("course_modules", modules.map((module, index) => ({
    id: module.id,
    course_id: module.courseId,
    title: module.title,
    description: module.description || "",
    position: index,
  })), "os módulos");
  await syncRows("course_materials", materials.map((item, index) => ({
    id: item.id,
    course_id: item.courseId,
    module_id: item.moduleId,
    type: item.type,
    title: item.title,
    description: item.description || "",
    url: item.url || "",
    file_path: item.fileId || null,
    file_name: item.fileName || "",
    position: index,
  })), "os materiais");
  await syncRows("orientations", orientations.map((orientation) => ({
    id: orientation.id,
    title: orientation.title,
    body: orientation.body,
    url: orientation.url || "",
    file_path: orientation.fileId || null,
    file_name: orientation.fileName || "",
    file_type: orientation.fileType || "",
  })), "as orientações");

  for (const orientation of orientations) {
    assertSupabaseResult(
      await client.from("orientation_sectors").delete().eq("orientation_id", orientation.id),
      "atualizar os setores das orientações",
    );
    if (orientation.sectorIds?.length) {
      assertSupabaseResult(await client.from("orientation_sectors").insert(orientation.sectorIds.map((sectorId) => ({
        orientation_id: orientation.id,
        sector_id: sectorId,
      }))), "atualizar os setores das orientações");
    }
  }
}

// ARQUIVOS: envio, leitura e exclusao no Supabase ou na previa local.
function openCourseFileDatabase() {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error("O armazenamento de arquivos não está disponível neste navegador."));
      return;
    }

    const request = window.indexedDB.open(courseFileDatabaseName, 1);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(courseFileStoreName)) {
        request.result.createObjectStore(courseFileStoreName);
      }
    };
    request.onerror = () => reject(request.error || new Error("Não foi possível abrir o armazenamento de arquivos."));
    request.onsuccess = () => resolve(request.result);
  });
}

async function storeCourseFile(fileId, file) {
  if (!supabaseEnabled) {
    const database = await openCourseFileDatabase();
    return new Promise((resolve, reject) => {
      const transaction = database.transaction(courseFileStoreName, "readwrite");
      transaction.objectStore(courseFileStoreName).put(file, fileId);
      transaction.oncomplete = () => {
        database.close();
        resolve(fileId);
      };
      transaction.onabort = () => {
        database.close();
        reject(transaction.error || new Error("Não foi possível salvar o arquivo neste navegador."));
      };
      transaction.onerror = () => {
        database.close();
        reject(transaction.error || new Error("Não foi possível salvar o arquivo neste navegador."));
      };
    });
  }
  const client = window.trainingSupabase;
  if (!client || !demoSession?.userId) throw new Error("Entre novamente para enviar arquivos.");
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
  const path = fileId.includes("/") ? fileId : `${demoSession.userId}/${fileId}-${safeName}`;
  const { error } = await client.storage.from("course-media").upload(path, file, {
    upsert: true,
    contentType: file.type,
  });
  if (error) throw error;
  return path;
}

async function getCourseFile(filePath) {
  if (!supabaseEnabled) {
    const database = await openCourseFileDatabase();
    return new Promise((resolve, reject) => {
      const request = database.transaction(courseFileStoreName, "readonly")
        .objectStore(courseFileStoreName)
        .get(filePath);
      request.onsuccess = () => {
        database.close();
        resolve(request.result || null);
      };
      request.onerror = () => {
        database.close();
        reject(request.error || new Error("Não foi possível carregar o arquivo deste navegador."));
      };
    });
  }
  const client = window.trainingSupabase;
  if (!client) throw new Error("A conexão com o armazenamento não está disponível.");
  const { data, error } = await client.storage.from("course-media").createSignedUrl(filePath, 86400);
  if (error) throw error;
  return data.signedUrl;
}

async function deleteCourseFile(filePath) {
  if (!supabaseEnabled) {
    const database = await openCourseFileDatabase();
    return new Promise((resolve, reject) => {
      const transaction = database.transaction(courseFileStoreName, "readwrite");
      transaction.objectStore(courseFileStoreName).delete(filePath);
      transaction.oncomplete = () => {
        database.close();
        resolve();
      };
      transaction.onabort = () => {
        database.close();
        reject(transaction.error || new Error("Não foi possível remover o arquivo deste navegador."));
      };
      transaction.onerror = () => {
        database.close();
        reject(transaction.error || new Error("Não foi possível remover o arquivo deste navegador."));
      };
    });
  }
  const client = window.trainingSupabase;
  if (!client) throw new Error("A conexão com o armazenamento não está disponível.");
  const { error } = await client.storage.from("course-media").remove([filePath]);
  if (error) throw error;
}

// EXIBICAO DO CATALOGO: perfil, busca, cartoes e biblioteca.
function updateDemoProfile() {
  const user = getCurrentUser();
  const activeSector = getActiveSector();
  const profileSector = isSystemAdminUser(user)
    ? sectors.find((sector) => sector.id === user.sectorId) || activeSector
    : activeSector;
  const roleLabel = demoSession?.role === "super-admin"
    ? "Super Admin"
    : demoSession?.role === "admin" ? "Admin" : "Colaborador";
  document.querySelector(".profile-copy strong").textContent = user?.name || roleLabel;
  document.querySelector(".profile-copy span").textContent = hasAdminAccess()
    ? `${roleLabel} · ${profileSector?.name || "Todos os setores"}${isSystemAdminUser(user) && profileSector?.vps?.length ? ` · VP ${profileSector.vps.join(", ")}` : ""}`
    : `${user?.team ? `${user.team} · ` : ""}${activeSector?.name || "Equipe"}`;
}

function normalizeText(text) {
  return text.toLocaleLowerCase("pt-BR").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function matchesSearch(text, query) {
  const normalizedText = normalizeText(text);
  const normalizedQuery = normalizeText(query).trim();
  return normalizedText.includes(normalizedQuery)
    || normalizedText.replace(/\s+/g, "").includes(normalizedQuery.replace(/\s+/g, ""));
}

function updateCourseCards() {
  const query = normalizeText(searchInput.value.trim());
  const assignedCourseIds = new Set(getActiveAssignment().courseIds);
  let visibleCards = 0;

  courseCards.forEach((card) => {
    const courseId = card.dataset.courseId;
    const hasPlatformAccess = materialPlatforms[courseId] && (getActiveAssignment().platformIds || []).includes(courseId);
    const count = hasPlatformAccess ? getPlatformModuleData(courseId).modules.length : 0;
    card.querySelector(".course-meta span:last-child").textContent = `${count} ${count === 1 ? "MÓDULO" : "MÓDULOS"}`;
    card.querySelector(".duration").hidden = true;
    const matchesSearch = normalizeText(`${card.dataset.search} ${card.innerText}`).includes(query);
    const matchesFilter = activeFilter === "all" || card.dataset.category === activeFilter;
    const isVisible = matchesSearch && matchesFilter && assignedCourseIds.has(card.dataset.courseId);
    card.hidden = !isVisible;
    if (isVisible) visibleCards += 1;
  });

  emptyState.hidden = visibleCards > 0;
  updateLibrary();
}

function renderResources() {
  document.querySelectorAll("[data-platform-grid]").forEach((grid) => grid.replaceChildren());
  resources.forEach((resource) => {
    if (materialPlatforms[resource.platform] && resource.type === "video" && !resource.videoUrl) return;
    document.querySelectorAll("[data-platform-grid]").forEach((grid) => {
      const gridPlatform = grid.dataset.platformGrid;
      const isAllMaterialsGrid = gridPlatform === "all";
      if (isAllMaterialsGrid && resource.platform === "orientacoes") return;
      const matchesPlatform = gridPlatform.startsWith(`${resource.platform}-`);
      const matchesType = gridPlatform === `${resource.platform}-${resource.type}`;
      if (!isAllMaterialsGrid && !(matchesPlatform && matchesType)) return;
      const card = createResourceCard(resource);
      if (materialPlatforms[resource.platform]) {
        const link = createModuleLessonLink(resource, { id: `builtin-guides-${resource.platform}` }, resource.platform, "Abrir módulo →");
        link.className = "resource-open-button";
        card.querySelector(".resource-open-button").replaceWith(link);
        card.dataset.moduleResource = "true";
      }
      grid.append(card);
    });
  });
  courseMaterials.forEach((item) => {
    const platform = materialPlatforms[item.courseId];
    const module = courseModules.find((entry) => entry.id === item.moduleId && entry.courseId === item.courseId);
    if (!platform || !module) return;
    const card = createResourceCard({
      id: item.id,
      platform: item.courseId,
      platformName: platform.name,
      type: item.type === "video" ? "video" : "guide",
      title: item.title,
      description: item.type === "text" ? (item.description || "").slice(0, 140) : item.description || module.title,
      duration: module.title,
      videoUrl: item.type === "video" ? "published" : "",
      search: `${platform.name} ${module.title} ${item.title} ${item.description || ""}`,
    });
    card.dataset.publishedId = item.id;
    card.querySelector(".resource-kind").textContent = getCourseContentTypeLabel(item.type).toLocaleUpperCase("pt-BR");
    const link = document.createElement("a");
    link.className = "resource-open-button";
    link.href = `#/materiais/${platform.page}?${new URLSearchParams({ modulo: module.id, aula: item.id })}`;
    link.textContent = "Abrir módulo →";
    card.querySelector(".resource-open-button").replaceWith(link);
    resourceGrid.append(card);
  });

  updateResourceCounts();
}

function updateResourceCounts() {
  const assignedResourceIds = new Set(getActiveAssignment().resourceIds);
  const platformIds = getActiveAssignment().platformIds || [];
  const publishedCount = (platformId) => platformIds.includes(platformId)
    ? courseMaterials.filter((item) => item.courseId === platformId
      && courseModules.some((module) => module.id === item.moduleId && module.courseId === platformId)).length
    : 0;
  const availableResources = resources.filter((resource) => resource.type !== "video" || resource.videoUrl);
  document.querySelectorAll("[data-count]").forEach((count) => {
    const total = availableResources.filter((resource) => assignedResourceIds.has(resource.id)
      && platformIds.includes(resource.platform)
      && resource.platform === count.dataset.count && resource.platform !== "orientacoes").length
      + publishedCount(count.dataset.count);
    count.textContent = `${total} ${total === 1 ? "material" : "materiais"}`;
  });

  const platformResources = availableResources.filter((resource) => assignedResourceIds.has(resource.id)
    && platformIds.includes(resource.platform) && resource.platform !== "orientacoes");
  const publishedTotal = Object.keys(materialPlatforms).reduce((total, platformId) => total + publishedCount(platformId), 0);
  document.querySelector("#library-total").textContent = `${platformResources.length + publishedTotal} materiais`;
  document.querySelectorAll("[data-platform-total]").forEach((total) => {
    const count = availableResources.filter((resource) => assignedResourceIds.has(resource.id)
      && (resource.platform === "orientacoes" || platformIds.includes(resource.platform))
      && resource.platform === total.dataset.platformTotal).length + publishedCount(total.dataset.platformTotal);
    total.textContent = `${count} ${count === 1 ? "material" : "materiais"}`;
  });
  document.querySelectorAll("[data-group-count]").forEach((total) => {
    const [platform, type] = total.dataset.groupCount.split("-");
    const count = resources.filter((resource) => assignedResourceIds.has(resource.id)
      && resource.platform === platform && resource.type === type).length;
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
  const assignedResourceIds = new Set(getActiveAssignment().resourceIds);
  let visibleCards = 0;
  let visibleOrientationCards = 0;

  document.querySelectorAll(".resource-card-item").forEach((card) => {
    const hasAccess = card.dataset.publishedId
      ? (getActiveAssignment().platformIds || []).includes(card.dataset.platform)
      : assignedResourceIds.has(card.dataset.resourceId)
        && (!card.dataset.moduleResource || (getActiveAssignment().platformIds || []).includes(card.dataset.platform));
    const isVisible = hasAccess && matchesSearch(`${card.dataset.search} ${card.innerText}`, query);
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
  let visiblePlatforms = 0;
  platformSearchGrid.replaceChildren();
  if (isSearching) {
    platformCards.forEach((card) => {
      if (!matchesSearch(card.innerText, query)) return;
      platformSearchGrid.append(card.cloneNode(true));
      visiblePlatforms += 1;
    });
  }
  platformSearchResults.hidden = !isSearching || visiblePlatforms === 0;
  let visibleCourses = 0;
  courseSearchGrid.replaceChildren();
  if (isSearching) {
    const assignedCourseIds = new Set(getActiveAssignment().courseIds);
    courseCards.forEach((card) => {
      if (!assignedCourseIds.has(card.dataset.courseId)
        || !matchesSearch(`${card.dataset.search} ${card.innerText}`, query)) return;
      const result = card.cloneNode(true);
      result.hidden = false;
      courseSearchGrid.append(result);
      visibleCourses += 1;
    });
  }
  courseSearchResults.hidden = !isSearching || visibleCourses === 0;
  document.querySelector("#platform-grid").hidden = isSearching;
  document.querySelector("#search-results-heading").hidden = !isSearching;
  resourceGrid.hidden = !isSearching;
  libraryEmptyState.hidden = !isSearching || visibleCards > 0 || visibleCourses > 0 || visiblePlatforms > 0;
  document.querySelector("#orientation-search-heading").hidden = !isSearchingOrientations;
  document.querySelector("#orientation-empty-state").hidden = currentPage !== "orientacoes" || !currentQuery || visibleOrientationCards > 0;
}

// NOTIFICACOES: consulta, atualizacao em tempo real e leitura.
function renderNotifications(message = "") {
  notificationList.replaceChildren();
  const unreadCount = userNotifications.filter((item) => !item.read_at).length;
  notificationDot.hidden = unreadCount === 0;
  notificationButton.setAttribute("aria-label", unreadCount
    ? `Notificações, ${unreadCount} não lidas`
    : "Notificações");
  notificationMarkAllButton.hidden = unreadCount === 0;
  if (message) {
    const error = document.createElement("p");
    error.className = "notification-empty";
    error.textContent = message;
    notificationList.append(error);
    return;
  }
  if (!userNotifications.length) {
    const empty = document.createElement("p");
    empty.className = "notification-empty";
    empty.textContent = "Tudo em dia! Novas notificações aparecerão aqui.";
    notificationList.append(empty);
    return;
  }
  userNotifications.forEach((notification) => {
    const link = document.createElement("a");
    link.className = `notification-item${notification.read_at ? "" : " unread"}`;
    link.href = notification.link || "#/materiais";
    link.dataset.notificationId = notification.id;
    const title = document.createElement("strong");
    title.textContent = notification.title;
    const body = document.createElement("small");
    body.textContent = notification.body;
    const time = document.createElement("time");
    time.dateTime = notification.created_at;
    time.textContent = new Date(notification.created_at).toLocaleString("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
    });
    link.append(title, body, time);
    notificationList.append(link);
  });
}

async function refreshNotifications(showError = false) {
  if (!demoSession?.userId || !window.trainingSupabase) return;
  try {
    const result = await window.trainingSupabase
      .from("notifications")
      .select("id, title, body, link, created_at, read_at")
      .eq("user_id", demoSession.userId)
      .is("read_at", null)
      .order("created_at", { ascending: false })
      .limit(30);
    userNotifications = assertSupabaseResult(result, "carregar as notificações") || [];
    renderNotifications();
  } catch (error) {
    console.error("Não foi possível carregar as notificações.", error);
    renderNotifications("Não foi possível carregar as notificações. Tente novamente.");
    if (showError) showToast("Não foi possível carregar as notificações.");
  }
}

function initializeNotifications() {
  const client = window.trainingSupabase;
  if (notificationsChannel) client.removeChannel(notificationsChannel);
  userNotifications = [];
  renderNotifications();
  void refreshNotifications();
  notificationsChannel = client
    .channel(`notifications-${demoSession.userId}`)
    .on("postgres_changes", {
      event: "INSERT",
      schema: "public",
      table: "notifications",
      filter: `user_id=eq.${demoSession.userId}`,
    }, (payload) => {
      showToast(payload.new.title || "Você recebeu uma nova notificação.");
      void refreshNotifications();
    })
    .subscribe((status, error) => {
      if (["CHANNEL_ERROR", "TIMED_OUT"].includes(status)) {
        console.error("Não foi possível acompanhar novas notificações em tempo real.", error || status);
      }
    });
}

async function markNotificationRead(notificationId) {
  const notification = userNotifications.find((item) => String(item.id) === notificationId);
  if (!notification || notification.read_at) return;
  try {
    assertSupabaseResult(await window.trainingSupabase
      .from("notifications")
      .update({ read_at: new Date().toISOString() })
      .eq("id", notification.id)
      .eq("user_id", demoSession.userId), "marcar a notificação como lida");
    userNotifications = userNotifications.filter((item) => item.id !== notification.id);
    renderNotifications();
  } catch (error) {
    console.error("Não foi possível marcar a notificação como lida.", error);
    showToast("Não foi possível atualizar a notificação.");
  }
}

// NAVEGACAO: rotas, busca e atualizacao do progresso na interface.
function renderRoute(hash, preserveSearch = false) {
  const [routePath, queryString = ""] = hash.replace(/^#\/?/, "").split("?");
  const parts = routePath.split("/").filter(Boolean);
  const requestedPage = parts[0] === "materiais" && parts[1] ? parts[1] : parts[0];
  const validPages = ["inicio", "trilhas", "materiais", "hubspot", "microsoft", "seguranca", "orientacoes", "ajuda", "admin"];
  currentPage = validPages.includes(requestedPage) ? requestedPage : "inicio";
  if (Object.values(allMaterialPlatforms).some((platform) => platform.page === currentPage)
    && !Object.values(materialPlatforms).some((platform) => platform.page === currentPage)) currentPage = "materiais";
  if (currentPage === "admin" && !hasAdminAccess()) currentPage = "inicio";
  const parameters = new URLSearchParams(queryString);
  currentQuery = ["materiais", "orientacoes"].includes(currentPage) ? (parameters.get("busca") || "") : "";
  const helpResourceId = currentPage === "ajuda" ? parameters.get("conteudo") : null;
  const helpContentId = currentPage === "ajuda" ? parameters.get("topico") : null;

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
    admin: "Administração",
  };
  document.querySelector(".breadcrumb strong").textContent = labels[currentPage];
  if (currentPage === "admin") renderAdminPanel();
  updateCourseCards();
  updateResourceCounts();
  updateLibrary();
  renderPlatformModules();
  if (helpResourceId) openResource(helpResourceId);
  if (helpContentId) openHelpContent(helpContentId);
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
  const taskInputs = [...document.querySelectorAll(".checklist [data-task]")];
  taskInputs.forEach((input) => {
    input.checked = checkedTasks.has(input.dataset.task);
    input.closest(".checklist-item").classList.toggle("completed", input.checked);
  });

  const completedTasks = taskInputs.filter((input) => input.checked).length;
  document.querySelector("#steps-progress").textContent = `${completedTasks} de ${taskInputs.length} concluídos`;
  document.querySelector("#steps-progress-bar").style.width = `${taskInputs.length ? (completedTasks / taskInputs.length) * 100 : 0}%`;
  const assignedCourseCount = courseCards.filter((card) => getActiveAssignment().courseIds.includes(card.dataset.courseId)).length;
  document.querySelectorAll('[data-home-metric="completed"]').forEach((value) => { value.textContent = String(progress.completedCourses.length).padStart(2, "0"); });
  document.querySelectorAll('[data-home-metric="available"]').forEach((value) => { value.textContent = String(assignedCourseCount).padStart(2, "0"); });
  document.querySelector("#courses-total").textContent = `${assignedCourseCount} ${assignedCourseCount === 1 ? "trilha disponível" : "trilhas disponíveis"}`;

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

// ADMINISTRACAO: componentes compartilhados e opcoes de disponibilidade.
function renderAdminOptions(container, items, selectedIds, idPrefix) {
  container.replaceChildren();
  items.forEach((item) => {
    const row = document.createElement("div");
    row.className = "admin-assignment-option-row";
    const option = document.createElement("label");
    option.className = "admin-option";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = item.id;
    checkbox.dataset.assignmentType = idPrefix;
    checkbox.checked = selectedIds.includes(item.id);

    const copy = document.createElement("span");
    const title = document.createElement("strong");
    title.textContent = item.title;
    copy.append(title);
    option.append(checkbox, copy);
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "admin-secondary-button admin-danger-button";
    remove.textContent = "Excluir";
    remove.dataset.deleteAssignmentType = idPrefix;
    remove.dataset.itemId = item.id;
    remove.setAttribute("aria-label", `Excluir ${item.title}`);
    row.append(option);
    if (idPrefix === "course" && courses[item.id]) {
      const edit = document.createElement("button");
      edit.type = "button";
      edit.className = "admin-secondary-button";
      edit.textContent = "Editar";
      edit.dataset.editCourse = item.id;
      edit.setAttribute("aria-label", `Editar trilha ${item.title}`);
      row.append(edit);
    }
    row.append(remove);
    container.append(row);
  });
}

function getRoleLabel(role) {
  return role === "super-admin" ? "Super Admin" : role === "admin" ? "Admin" : "Colaborador";
}

function createAdminEntry(titleText, detailText, id, actionAttribute) {
  const entry = document.createElement("article");
  entry.className = "admin-list-entry";
  const copy = document.createElement("div");
  copy.className = "admin-list-copy";
  const title = document.createElement("strong");
  title.textContent = titleText;
  const detail = document.createElement("small");
  detail.textContent = detailText;
  copy.append(title, detail);

  const actions = document.createElement("div");
  actions.className = "admin-list-actions";
  const edit = document.createElement("button");
  edit.type = "button";
  edit.className = "admin-secondary-button";
  edit.textContent = "Editar";
  edit.dataset[actionAttribute] = "edit";
  edit.dataset.itemId = id;
  const remove = document.createElement("button");
  remove.type = "button";
  remove.className = "admin-secondary-button admin-danger-button";
  remove.textContent = "Excluir";
  remove.dataset[actionAttribute] = "delete";
  remove.dataset.itemId = id;
  actions.append(edit, remove);
  entry.append(copy, actions);
  return entry;
}

// CENTRAL DE AJUDA: cartoes de contato, tutoriais e editor de passos.
function renderHelpContents() {
  const section = document.querySelector("#help-published-section");
  const list = document.querySelector("#help-published-list");
  list.replaceChildren();
  section.hidden = !helpContents.length;
  helpContents.forEach((item) => {
    const link = document.createElement("a");
    link.href = `#/ajuda?topico=${encodeURIComponent(item.id)}`;
    link.dataset.helpContentId = item.id;
    const icon = document.createElement("span");
    icon.className = "help-topic-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = "?";
    const title = document.createElement("strong");
    title.textContent = item.title;
    const summary = document.createElement("small");
    summary.textContent = item.summary;
    const arrow = document.createElement("b");
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "→";
    link.append(icon, title, summary, arrow);
    list.append(link);
  });
}

function renderHelpContacts() {
  const list = document.querySelector("#help-contact-list");
  list.replaceChildren();
  helpContacts.forEach((item) => {
    let url;
    try {
      url = parseHelpContactUrl(item.url);
    } catch (error) {
      console.error("O link do contato da central de ajuda é inválido.", item.id, error);
      const message = document.createElement("p");
      message.textContent = `Contato indisponível: ${item.title}. Avise um superadministrador.`;
      list.append(message);
      return;
    }
    const link = document.createElement("a");
    link.className = "help-contact-card";
    link.href = url.href;
    if (["http:", "https:"].includes(url.protocol)) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
    const icon = document.createElement("span");
    icon.className = "help-contact-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = url.protocol === "mailto:" ? "✉" : "◉";
    const copy = document.createElement("span");
    const title = document.createElement("strong");
    title.textContent = item.title;
    const summary = document.createElement("small");
    summary.textContent = item.summary;
    copy.append(title, summary);
    const arrow = document.createElement("b");
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "↗";
    link.append(icon, copy, arrow);
    list.append(link);
  });
}

function renderAdminHelpContacts() {
  const list = document.querySelector("#admin-help-contact-list");
  list.replaceChildren();
  helpContacts.forEach((item) => {
    list.append(createAdminEntry(item.title, item.summary, item.id, "helpContactAction"));
  });
  if (!helpContacts.length) list.textContent = "Ainda não há contatos cadastrados.";
}

function renderAdminHelpContents() {
  const list = document.querySelector("#admin-help-content-list");
  list.replaceChildren();
  helpContents.forEach((item) => {
    list.append(createAdminEntry(item.title, item.summary, item.id, "helpContentAction"));
  });
  if (!helpContents.length) list.textContent = "Ainda não há conteúdos publicados na central de ajuda.";
}

function validHelpSteps(steps) {
  return Array.isArray(steps) && steps.every((step) => (
    step && typeof step.title === "string" && typeof step.description === "string"
  ));
}

function parseHelpContactUrl(value) {
  const url = new URL(value);
  if (!["http:", "https:", "mailto:", "tel:"].includes(url.protocol)) {
    throw new Error("Protocolo de contato não permitido.");
  }
  if (url.protocol === "mailto:" && !/^[^@\s]+@[^@\s]+$/.test(url.pathname)) {
    throw new Error("Endereço de e-mail inválido.");
  }
  if (url.protocol === "tel:" && (!/^[+0-9().-]+$/.test(url.pathname) || !/\d/.test(url.pathname))) {
    throw new Error("Número de telefone inválido.");
  }
  return url;
}

function openHelpContent(id) {
  const item = helpContents.find((content) => content.id === id);
  if (!item) {
    showToast("Conteúdo de ajuda não encontrado.");
    return;
  }
  const steps = item.steps || [];
  if (!validHelpSteps(steps)) {
    console.error("Os passos do conteúdo de ajuda estão inválidos.", item.id);
    showToast("Não foi possível exibir os passos deste conteúdo. Avise um superadministrador.");
    return;
  }
  openResource(item.id, {
    id: item.id,
    platformName: "Central de ajuda",
    type: "guide",
    title: item.title,
    description: [item.summary, item.body].filter(Boolean).join("\n\n"),
    duration: `${steps.length} ${steps.length === 1 ? "passo" : "passos"}`,
    steps: steps.map((step) => [step.title, step.description]),
  });
  if (!steps.length) {
    document.querySelector("#dialog-category").textContent = "Central de ajuda · Conteúdo";
    document.querySelector("#dialog-duration").hidden = true;
    document.querySelector("#dialog-lessons").textContent = "";
    document.querySelector("#dialog-section-title").hidden = true;
    document.querySelector("#content-note").hidden = true;
  }
}

function updateHelpStepLabels() {
  document.querySelectorAll("[data-help-step]").forEach((row, index) => {
    const number = index + 1;
    row.querySelector("[data-help-step-heading]").textContent = `Passo ${number}`;
    row.querySelector("[data-help-step-title-label]").textContent = `Título do passo ${number}`;
    row.querySelector("[data-help-step-description-label]").textContent = `Descrição do passo ${number}`;
    row.querySelector("[data-remove-help-step]").setAttribute("aria-label", `Remover passo ${number}`);
  });
}

function addHelpContentStep(step = {}) {
  const row = document.createElement("div");
  row.className = "help-content-step";
  row.dataset.helpStep = "";
  const heading = document.createElement("strong");
  heading.dataset.helpStepHeading = "";
  const titleLabel = document.createElement("label");
  const titleLabelText = document.createElement("span");
  titleLabelText.dataset.helpStepTitleLabel = "";
  const title = document.createElement("input");
  title.type = "text";
  title.maxLength = 120;
  title.value = step.title || "";
  title.dataset.helpStepTitle = "";
  titleLabel.append(titleLabelText, title);
  const descriptionLabel = document.createElement("label");
  const descriptionLabelText = document.createElement("span");
  descriptionLabelText.dataset.helpStepDescriptionLabel = "";
  const description = document.createElement("textarea");
  description.rows = 3;
  description.maxLength = 2000;
  description.value = step.description || "";
  description.dataset.helpStepDescription = "";
  descriptionLabel.append(descriptionLabelText, description);
  const remove = document.createElement("button");
  remove.type = "button";
  remove.className = "admin-secondary-button admin-danger-button";
  remove.dataset.removeHelpStep = "";
  remove.textContent = "Remover passo";
  row.append(heading, titleLabel, descriptionLabel, remove);
  document.querySelector("#help-content-steps").append(row);
  updateHelpStepLabels();
  return title;
}

function resetHelpContentForm() {
  document.querySelector("#help-content-form").reset();
  document.querySelector("#help-content-steps").replaceChildren();
  document.querySelector("#help-content-error").hidden = true;
  editingHelpContentId = null;
  document.querySelector("#save-help-content").textContent = "Publicar conteúdo";
}

function resetHelpContactForm() {
  document.querySelector("#help-contact-form").reset();
  document.querySelector("#help-contact-error").hidden = true;
  editingHelpContactId = null;
}

// ADMINISTRACAO: listas de acessos, publicacoes, modulos e resumo.
function setUserActionIcon(button, label, pathData) {
  button.classList.add("admin-user-action-button");
  button.title = label;
  button.setAttribute("aria-label", label);
  button.replaceChildren();

  const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  icon.setAttribute("viewBox", "0 0 24 24");
  icon.setAttribute("aria-hidden", "true");
  icon.setAttribute("focusable", "false");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", pathData);
  icon.append(path);
  button.append(icon);
}

function setUserActionText(button, label, text) {
  button.classList.add("admin-user-action-button", "admin-password-action");
  button.title = label;
  button.setAttribute("aria-label", label);
  button.textContent = text;
}

function renderAdminUsers() {
  const container = document.querySelector("#admin-user-list");
  container.replaceChildren();
  document.querySelector("#admin-user-count").textContent = `${users.length} acessos`;
  const totalPages = Math.max(1, Math.ceil(users.length / adminUserPageSize));
  adminUserPage = Math.min(adminUserPage, totalPages);
  const startIndex = (adminUserPage - 1) * adminUserPageSize;
  const visibleUsers = users.slice(startIndex, startIndex + adminUserPageSize);

  document.querySelector("#admin-user-page-size").value = String(adminUserPageSize);
  document.querySelector("#admin-user-page-status").textContent = users.length
    ? `Exibindo ${startIndex + 1}-${Math.min(startIndex + adminUserPageSize, users.length)} de ${users.length} usuários · Página ${adminUserPage} de ${totalPages}`
    : "Nenhum usuário cadastrado.";
  document.querySelector("#admin-user-page-previous").disabled = adminUserPage === 1;
  document.querySelector("#admin-user-page-next").disabled = adminUserPage === totalPages;

  visibleUsers.forEach((user) => {
    const sector = sectors.find((item) => item.id === user.sectorId);
    const isImmutableAccount = isSystemAdminUser(user);
    const sectorVp = sector ? ` · ${getSectorVpLabel(sector)}` : "";
    const entry = createAdminEntry(
      user.name,
      `${user.email} · ${getRoleLabel(user.role)} · ${sector?.name || "Sem setor"}${sectorVp}${user.team ? ` · ${user.team}` : ""}${isImmutableAccount ? " · Sessão atual protegida" : ""}${user.accessBlocked ? " · Acesso bloqueado" : ""}`,
      user.id,
      "userAction",
    );
    const actions = entry.querySelector(".admin-list-actions");
    const edit = actions.querySelector('[data-user-action="edit"]');
    const remove = actions.querySelector('[data-user-action="delete"]');
    const currentUserEmail = demoSession?.email.toLocaleLowerCase("pt-BR");
    const isCurrentUser = user.email.toLocaleLowerCase("pt-BR") === currentUserEmail;
    const cannotManage = !isSuperAdmin() && user.role === "super-admin";

    setUserActionIcon(edit, `Editar usuário ${user.name}`, "M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z");
    setUserActionIcon(remove, `Excluir usuário ${user.name}`, "M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v5M14 11v5");

    const accessButton = document.createElement("button");
    accessButton.type = "button";
    accessButton.className = `admin-secondary-button${user.accessBlocked ? "" : " admin-danger-button"}`;
    accessButton.dataset.userAction = "toggle-access";
    accessButton.dataset.itemId = user.id;
    setUserActionIcon(
      accessButton,
      `${user.accessBlocked ? "Desbloquear" : "Bloquear"} acesso de ${user.name}`,
      user.accessBlocked
        ? "M6 10V7a6 6 0 0 1 11.6-2M5 10h14v11H5zM12 14v3"
        : "M6 10V7a6 6 0 0 1 12 0v3M5 10h14v11H5zM12 14v3",
    );

    const passwordButton = document.createElement("button");
    passwordButton.type = "button";
    passwordButton.className = "admin-secondary-button";
    passwordButton.dataset.userAction = "password";
    passwordButton.dataset.itemId = user.id;
    setUserActionText(passwordButton, `Alterar senha de ${user.name}`, "***");
    passwordButton.hidden = !supabaseEnabled;
    actions.append(accessButton, passwordButton);

    entry.classList.toggle("admin-list-entry--blocked", Boolean(user.accessBlocked));
    edit.disabled = isImmutableAccount || cannotManage;
    remove.disabled = isImmutableAccount || cannotManage || isCurrentUser;
    accessButton.disabled = isImmutableAccount || cannotManage || isCurrentUser;
    passwordButton.disabled = isImmutableAccount || cannotManage;
    container.append(entry);
  });
}

function renderPublishedContent() {
  const courseList = document.querySelector("#published-course-content-list");
  const filteredContent = courseContentPlatform
    ? courseMaterials.filter((item) => item.courseId === courseContentPlatform)
    : courseMaterials;
  const totalPages = Math.max(1, Math.ceil(filteredContent.length / courseContentPageSize));
  courseContentPage = Math.min(courseContentPage, totalPages);
  const startIndex = (courseContentPage - 1) * courseContentPageSize;
  document.querySelector("#course-content-page-size").value = String(courseContentPageSize);
  document.querySelector("#course-content-page-status").textContent = filteredContent.length
    ? `Exibindo ${startIndex + 1}-${Math.min(startIndex + courseContentPageSize, filteredContent.length)} de ${filteredContent.length} conteúdos · Página ${courseContentPage} de ${totalPages}`
    : "Nenhum conteúdo nesta seleção.";
  document.querySelector("#course-content-page-previous").disabled = courseContentPage === 1;
  document.querySelector("#course-content-page-next").disabled = courseContentPage === totalPages;
  courseList.replaceChildren();
  filteredContent.slice(startIndex, startIndex + courseContentPageSize).forEach((item) => {
    const platformName = materialPlatforms[item.courseId]?.name || `${courses[item.courseId]?.title || item.courseId} (sem página em Materiais)`;
    const module = courseModules.find((entry) => entry.id === item.moduleId && entry.courseId === item.courseId);
    const entry = createAdminEntry(
      item.title,
      `${platformName} · ${module?.title || "Módulo indisponível"} · ${getCourseContentTypeLabel(item.type)}${item.fileId ? ` · ${supabaseEnabled ? "Arquivo no Supabase" : "Arquivo neste navegador"}${item.fileName ? `: ${item.fileName}` : ""}` : ""}`,
      item.id,
      "courseContentAction",
    );
    entry.querySelectorAll(".admin-list-copy strong, .admin-list-copy small").forEach((element) => {
      element.title = element.textContent;
    });
    setUserActionIcon(entry.querySelector('[data-course-content-action="edit"]'), `Editar ${item.title}`, "M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z");
    setUserActionIcon(entry.querySelector('[data-course-content-action="delete"]'), `Excluir ${item.title}`, "M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v5M14 11v5");
    courseList.append(entry);
  });
  if (!filteredContent.length) {
    courseList.textContent = courseContentPlatform
      ? "Esta plataforma ainda não tem conteúdos publicados."
      : "Ainda não há vídeos ou materiais publicados nos módulos.";
  }

  const orientationList = document.querySelector("#published-orientation-list");
  const orientationTotalPages = Math.max(1, Math.ceil(publishedOrientations.length / orientationPageSize));
  orientationPage = Math.min(orientationPage, orientationTotalPages);
  const orientationStartIndex = (orientationPage - 1) * orientationPageSize;
  document.querySelector("#orientation-page-size").value = String(orientationPageSize);
  document.querySelector("#orientation-page-status").textContent = publishedOrientations.length
    ? `Exibindo ${orientationStartIndex + 1}-${Math.min(orientationStartIndex + orientationPageSize, publishedOrientations.length)} de ${publishedOrientations.length} orientações · Página ${orientationPage} de ${orientationTotalPages}`
    : "Nenhuma orientação publicada.";
  document.querySelector("#orientation-page-previous").disabled = orientationPage === 1;
  document.querySelector("#orientation-page-next").disabled = orientationPage === orientationTotalPages;
  orientationList.replaceChildren();
  publishedOrientations.slice(orientationStartIndex, orientationStartIndex + orientationPageSize).forEach((item) => {
    const sectorCount = (item.sectorIds || [])
      .filter((id) => sectors.some((sector) => sector.id === id))
      .length;
    const sectorSummary = sectorCount
      ? `${sectorCount} ${sectorCount === 1 ? "setor" : "setores"}`
      : "Nenhum setor selecionado";
    orientationList.append(createAdminEntry(
      item.title,
      `${sectorSummary}${item.fileId ? " · Com anexo" : ""}`,
      item.id,
      "orientationAction",
    ));
  });
  if (!publishedOrientations.length) orientationList.textContent = "Ainda não há orientações publicadas.";
  document.querySelector("#admin-stat-publications").textContent = String(courseMaterials.length + publishedOrientations.length + helpContents.length);
}

function getCourseContentTypeLabel(type) {
  return type === "video" ? "Vídeo" : type === "pdf" ? "PDF" : type === "image" ? "Imagem" : type === "text" || type === "guide" ? "Texto" : "Link externo";
}

function renderAdminSummary() {
  document.querySelector("#admin-stat-sectors").textContent = String(sectors.length);
  document.querySelector("#admin-stat-users").textContent = String(users.length);
  document.querySelector("#admin-stat-courses").textContent = String(Object.keys(courses).length);
  document.querySelector("#admin-stat-publications").textContent = String(courseMaterials.length + publishedOrientations.length + helpContents.length);
}

function renderAdminInsights() {
  const container = document.querySelector("#admin-insights");
  container.replaceChildren();
  const metrics = [
    ["Acessos ativos", users.filter((user) => !user.accessBlocked).length],
    ["Acessos bloqueados", users.filter((user) => user.accessBlocked).length],
    ["Setores cadastrados", sectors.length],
    ["Trilhas cadastradas", Object.keys(courses).length],
    ["Módulos publicados", courseModules.length],
    ["Materiais publicados", courseMaterials.length],
    ["Orientações publicadas", publishedOrientations.length],
    ["Tutoriais da central de ajuda", helpContents.length],
    ["Contatos da central de ajuda", helpContacts.length],
  ];
  metrics.forEach(([label, count]) => {
    const card = document.createElement("article");
    card.className = "admin-summary-card";
    const name = document.createElement("span");
    name.textContent = label;
    const value = document.createElement("strong");
    value.textContent = String(count);
    card.append(name, value);
    container.append(card);
  });
}

// INDICADORES: consulta, filtros e exportacao do relatorio por usuario.
let insightsReportRows = null;
let insightsReportRequest = 0;
let insightsReportPage = 1;
const insightsReportPageSize = 5;

function getReportProgress(row) {
  if (row.progress === null) return null;
  const saved = row.progress;
  if (!saved || !Array.isArray(saved.tasks) || !Array.isArray(saved.completedCourses)
    || !saved.tasks.every((id) => typeof id === "string")
    || !saved.completedCourses.every((id) => typeof id === "string")) {
    throw new Error(`O progresso de ${row.name || row.email} está em formato inválido.`);
  }
  const taskIds = new Set(row.taskItems.map((item) => item.id));
  return {
    tasks: [...new Set(saved.tasks)].filter((id) => taskIds.has(id)),
    courses: [...new Set(saved.completedCourses)],
  };
}

function reportSectorName(row) {
  if (!row.sectorName) return row.sectorId ? `Setor não encontrado (${row.sectorId})` : "Sem setor";
  return `${row.sectorName} · ${getSectorVpLabel({ vps: row.sectorVps })} · ${row.sectorId}`;
}

function populateReportFilters() {
  const sectorSelect = document.querySelector("#admin-report-sector");
  const userSelect = document.querySelector("#admin-report-user");
  const selectedSector = sectorSelect.value;
  const selectedUser = userSelect.value;
  const sectorOptions = new Map(sectors.map((sector) => [
    sector.id, sector.name,
  ]));
  insightsReportRows.forEach((row) => {
    sectorOptions.set(row.sectorId || "__no_sector__", row.sectorName || reportSectorName(row));
  });
  sectorSelect.replaceChildren(new Option("Todos os setores", ""));
  [...sectorOptions].sort((a, b) => a[1].localeCompare(b[1], "pt-BR"))
    .forEach(([id, name]) => sectorSelect.add(new Option(name, id)));
  sectorSelect.value = [...sectorSelect.options].some((option) => option.value === selectedSector) ? selectedSector : "";
  const matchingUsers = insightsReportRows.filter((row) => (
    !sectorSelect.value || (row.sectorId || "__no_sector__") === sectorSelect.value
  ));
  populateUserSelect(
    userSelect,
    document.querySelector("#admin-report-user-search"),
    document.querySelector("#admin-report-user-menu"),
    document.querySelector("#admin-report-user-search-status"),
    matchingUsers,
    selectedUser,
    sectorSelect.value ? "Relatório geral do setor (todos os usuários)" : "Todos os usuários",
  );
}

function filteredReportRows() {
  const sectorId = document.querySelector("#admin-report-sector").value;
  const userId = document.querySelector("#admin-report-user").value;
  return insightsReportRows.filter((row) => (
    (!sectorId || (row.sectorId || "__no_sector__") === sectorId)
    && (!userId || row.id === userId)
  ));
}

function reportCourseNames(courseIds) {
  return courseIds.map((id) => courses[id]?.title || `Trilha removida (${id})`);
}

function renderReport() {
  if (!insightsReportRows) return;
  populateReportFilters();
  const rows = filteredReportRows();
  const knownRows = rows.filter((row) => row.reportProgress !== null);
  const summary = document.querySelector("#admin-report-summary");
  summary.replaceChildren();
  [
    ["Usuários encontrados", rows.length],
    ["Acessos ativos", rows.filter((row) => !row.accessBlocked).length],
    ["Acessos bloqueados", rows.filter((row) => row.accessBlocked).length],
    ["Itens do checklist concluídos", knownRows.reduce((total, row) => total + row.reportProgress.tasks.length, 0)],
    ["Trilhas concluídas", knownRows.reduce((total, row) => total + row.reportProgress.courses.length, 0)],
  ].forEach(([label, count]) => {
    const card = document.createElement("article");
    card.className = "admin-summary-card";
    const name = document.createElement("span");
    name.textContent = label;
    const value = document.createElement("strong");
    value.textContent = String(count);
    card.append(name, value);
    summary.append(card);
  });

  const body = document.querySelector("#admin-report-rows");
  body.replaceChildren();
  const totalPages = Math.max(1, Math.ceil(rows.length / insightsReportPageSize));
  insightsReportPage = Math.min(insightsReportPage, totalPages);
  const startIndex = (insightsReportPage - 1) * insightsReportPageSize;
  document.querySelector("#admin-report-pagination").hidden = !rows.length;
  document.querySelector("#admin-report-page-status").textContent = rows.length
    ? `Exibindo ${startIndex + 1}-${Math.min(startIndex + insightsReportPageSize, rows.length)} de ${rows.length} usuários · Página ${insightsReportPage} de ${totalPages}`
    : "";
  document.querySelector("#admin-report-page-previous").disabled = insightsReportPage === 1;
  document.querySelector("#admin-report-page-next").disabled = insightsReportPage === totalPages;
  rows.slice(startIndex, startIndex + insightsReportPageSize).forEach((row) => {
    const tr = document.createElement("tr");
    const user = document.createElement("td");
    const name = document.createElement("strong");
    name.textContent = row.name || "Sem nome";
    const email = document.createElement("small");
    email.textContent = row.email;
    user.append(name, email);
    tr.append(user);
    const details = [
      reportSectorName(row),
      row.accessBlocked ? "Bloqueado" : "Ativo",
      row.reportProgress ? `${row.reportProgress.tasks.length} de ${row.taskItems.length}` : "Indisponível",
      row.reportProgress ? (reportCourseNames(row.reportProgress.courses).join(", ") || "Nenhuma") : "Indisponível",
    ];
    details.forEach((text) => {
      const cell = document.createElement("td");
      cell.textContent = text;
      tr.append(cell);
    });
    body.append(tr);
  });
  const unknownCount = rows.length - knownRows.length;
  document.querySelector("#admin-report-status").textContent = rows.length
    ? `${rows.length} ${rows.length === 1 ? "usuário encontrado" : "usuários encontrados"}.${unknownCount ? ` Progresso indisponível para ${unknownCount} na prévia local; os totais consideram apenas os demais.` : ""}`
    : "Nenhum usuário encontrado para os filtros selecionados.";
  const exportButton = document.querySelector("#admin-report-export");
  exportButton.disabled = !rows.length;
  exportButton.textContent = document.querySelector("#admin-report-user").value
    ? "Baixar relatório do usuário (CSV)"
    : document.querySelector("#admin-report-sector").value
      ? "Baixar relatório do setor (CSV)"
      : "Baixar relatório geral (CSV)";
}

async function loadAdminInsightsReport() {
  if (!isSuperAdmin()) return;
  const requestId = ++insightsReportRequest;
  const sessionId = demoSession.userId;
  insightsReportRows = null;
  const status = document.querySelector("#admin-report-status");
  const errorElement = document.querySelector("#admin-report-error");
  const refresh = document.querySelector("#admin-report-refresh");
  document.querySelector("#admin-report-export").disabled = true;
  closeUserPicker(document.querySelector("#admin-report-user"), document.querySelector("#admin-report-user-search"),
    document.querySelector("#admin-report-user-menu"), document.querySelector("#admin-report-user-search-status"));
  document.querySelector("#admin-report-user-search").disabled = true;
  document.querySelector("#admin-report-summary").replaceChildren();
  document.querySelector("#admin-report-rows").replaceChildren();
  document.querySelector("#admin-report-pagination").hidden = true;
  errorElement.hidden = true;
  status.textContent = "Carregando relatório...";
  refresh.disabled = true;
  try {
    let rows;
    let settings;
    if (supabaseEnabled) {
      const [reportResult, settingsResult] = await Promise.all([
        window.trainingSupabase.rpc("get_indicators_report"),
        window.trainingSupabase.rpc("get_home_settings_editor_data"),
      ]);
      rows = assertSupabaseResult(reportResult, "carregar o relatório de indicadores");
      settings = assertSupabaseResult(settingsResult, "carregar os checklists por público");
    } else {
      rows = users.map((user) => ({
        ...user,
        sectorName: sectors.find((sector) => sector.id === user.sectorId)?.name || null,
        sectorVps: sectors.find((sector) => sector.id === user.sectorId)?.vps || [],
        progress: user.id === demoSession.userId ? progress : null,
      }));
      const stored = localStorage.getItem(homeOverridesStorageKey);
      const overrides = stored ? JSON.parse(stored) : { sectors: {}, users: {} };
      settings = { global: globalHomeSettings, sectorOverrides: overrides.sectors, userOverrides: overrides.users };
    }
    if (requestId !== insightsReportRequest || demoSession?.userId !== sessionId || !isSuperAdmin()) return;
    if (!Array.isArray(rows) || !settings || !settings.sectorOverrides || !settings.userOverrides) throw new Error("O relatório retornou dados inválidos.");
    insightsReportRows = rows.map((row) => {
      const taskItems = resolveHomeVisual(
        validateHomeContent(settings.global || {}),
        validateHomeContent(settings.sectorOverrides[row.sectorId] || {}),
        validateHomeContent(settings.userOverrides[row.id] || {}),
      ).homeTasks;
      const reportRow = { ...row, taskItems };
      return { ...reportRow, reportProgress: getReportProgress(reportRow) };
    });
    document.querySelector("#admin-report-user-search").disabled = false;
    renderReport();
  } catch (error) {
    if (requestId !== insightsReportRequest || demoSession?.userId !== sessionId || !isSuperAdmin()) return;
    console.error("Não foi possível carregar o relatório de indicadores.", error);
    insightsReportRows = null;
    status.textContent = "";
    errorElement.textContent = "Não foi possível carregar o relatório. Verifique a conexão e se a migração de indicadores foi aplicada.";
    errorElement.hidden = false;
  } finally {
    if (requestId === insightsReportRequest) refresh.disabled = false;
  }
}

function csvCell(value) {
  let text = String(value ?? "");
  if (/^[\u0000-\u0020]*[=+\-@]/.test(text) || /^[\t\r\n]/.test(text)) text = `'${text}`;
  return `"${text.replace(/"/g, '""')}"`;
}

function exportAdminInsightsReport() {
  if (!isSuperAdmin() || !insightsReportRows) return;
  const rows = filteredReportRows();
  if (!rows.length) return;
  document.querySelector("#admin-report-error").hidden = true;
  const header = ["Usuário", "E-mail", "Setor", "Equipe", "Perfil", "Situação", "Checklist concluído", "Itens concluídos (ID e título)", "Trilhas concluídas", "Nomes das trilhas concluídas"];
  const lines = rows.map((row) => {
    const saved = row.reportProgress;
    const taskNames = saved ? saved.tasks.map((id) => `${id}: ${row.taskItems.find((item) => item.id === id).title}`) : [];
    return [
      row.name, row.email, reportSectorName(row), row.team, getRoleLabel(row.role),
      row.accessBlocked ? "Bloqueado" : "Ativo",
      saved ? `${saved.tasks.length}/${row.taskItems.length}` : "Indisponível",
      saved ? taskNames.join(" | ") : "Indisponível",
      saved ? saved.courses.length : "Indisponível",
      saved ? reportCourseNames(saved.courses).join(" | ") : "Indisponível",
    ].map(csvCell).join(";");
  });
  try {
    const blob = new Blob([`\uFEFF${header.map(csvCell).join(";")}\r\n${lines.join("\r\n")}\r\n`], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "relatorio-indicadores.csv";
    document.body.append(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  } catch (error) {
    console.error("Não foi possível gerar o relatório CSV.", error);
    const errorElement = document.querySelector("#admin-report-error");
    errorElement.textContent = "Não foi possível gerar o CSV. Tente novamente.";
    errorElement.hidden = false;
  }
}

function renderModuleOptions(selectedModuleId = document.querySelector("#content-module").value) {
  const courseId = document.querySelector("#content-course").value;
  const select = document.querySelector("#content-module");
  select.replaceChildren();
  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = "Selecione um módulo";
  select.append(placeholder);
  courseModules.filter((module) => module.courseId === courseId).forEach((module) => {
    const option = document.createElement("option");
    option.value = module.id;
    option.textContent = module.title;
    select.append(option);
  });
  select.value = [...select.options].some((option) => option.value === selectedModuleId) ? selectedModuleId : "";
}

function renderCourseModules() {
  const list = document.querySelector("#course-module-list");
  const courseId = document.querySelector("#module-list-course").value;
  const modules = courseModules.filter((module) => module.courseId === courseId);
  const totalPages = Math.max(1, Math.ceil(modules.length / modulePageSize));
  modulePage = Math.min(modulePage, totalPages);
  const startIndex = (modulePage - 1) * modulePageSize;
  const visibleModules = modules.slice(startIndex, startIndex + modulePageSize);
  list.replaceChildren();
  document.querySelector("#module-page-size").value = String(modulePageSize);
  document.querySelector("#course-module-page-status").textContent = modules.length
    ? `Exibindo ${startIndex + 1}-${Math.min(startIndex + modulePageSize, modules.length)} de ${modules.length} módulos · Página ${modulePage} de ${totalPages}`
    : "Nenhum módulo cadastrado nesta plataforma.";
  document.querySelector("#course-module-page-previous").disabled = modulePage === 1;
  document.querySelector("#course-module-page-next").disabled = modulePage === totalPages;

  visibleModules.forEach((module, index) => {
    const count = courseMaterials.filter((item) => item.courseId === courseId && item.moduleId === module.id).length;
    list.append(createAdminEntry(
      `${String(startIndex + index + 1).padStart(2, "0")} · ${module.title}`,
      `${count} ${count === 1 ? "conteúdo" : "conteúdos"}`,
      module.id,
      "courseModuleAction",
    ));
  });
  if (!modules.length) list.textContent = "Esta plataforma ainda não tem módulos.";
  if (!materialPlatforms[courseId]) {
    const warning = document.createElement("p");
    warning.textContent = "Esta trilha não tem página em Materiais. Edite o módulo e escolha uma plataforma para disponibilizá-lo.";
    list.prepend(warning);
  }
}

// ADMINISTRACAO: abas, dialogos, setores, equipes e formularios.
function activateAdminTab(tabId) {
  const selectedTab = adminTabButtons.find((button) => (
    button.dataset.adminTabButton === tabId
    && !button.hidden
    && (isSuperAdmin() || !["content", "orientations", "help", "home", "insights"].includes(tabId))
  ));
  if (!selectedTab) return;

  if (tabId === "home" && !homeEditorData) loadHomeEditor();
  if (tabId === "insights") {
    renderAdminInsights();
    if (activeAdminTabId !== "insights" || !insightsReportRows) loadAdminInsightsReport();
  }
  activeAdminTabId = tabId;
  adminTabButtons.forEach((button) => {
    const isActive = button === selectedTab;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
    button.tabIndex = isActive ? 0 : -1;
  });
  adminTabPanels.forEach((panel) => {
    const isRestricted = !isSuperAdmin() && ["content", "orientations", "help", "home", "insights"].includes(panel.dataset.adminPanel);
    panel.hidden = panel.dataset.adminPanel !== tabId || isRestricted;
  });
}

function openAdminDialog(dialogId, title, focusSelector) {
  const dialog = document.querySelector(dialogId);
  if (!dialog || dialog.hidden) return;
  dialog.querySelector("h2").textContent = title;
  if (!dialog.open) dialog.showModal();
  if (focusSelector) {
    const focusTarget = dialog.querySelector(focusSelector);
    if (focusTarget) focusTarget.focus();
  }
}

function bindAdminDialog(dialogId, onClose, canClose = () => true) {
  const dialog = document.querySelector(dialogId);
  dialog.querySelector("[data-admin-modal-close]").addEventListener("click", () => {
    if (canClose()) dialog.close();
  });
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog && canClose()) dialog.close();
  });
  dialog.addEventListener("cancel", (event) => {
    if (!canClose()) event.preventDefault();
  });
  dialog.addEventListener("close", onClose);
}

function renderAdminSectorList() {
  const list = document.querySelector("#admin-sector-list");
  const totalPages = Math.max(1, Math.ceil(sectors.length / adminSectorPageSize));
  adminSectorPage = Math.min(adminSectorPage, totalPages);
  const startIndex = (adminSectorPage - 1) * adminSectorPageSize;
  list.replaceChildren();

  document.querySelector("#admin-sector-page-status").textContent = sectors.length
    ? `Exibindo ${startIndex + 1}-${Math.min(startIndex + adminSectorPageSize, sectors.length)} de ${sectors.length} setores · Página ${adminSectorPage} de ${totalPages}`
    : "Nenhum setor cadastrado.";
  document.querySelector("#admin-sector-page-previous").disabled = adminSectorPage === 1;
  document.querySelector("#admin-sector-page-next").disabled = adminSectorPage === totalPages;

  sectors.slice(startIndex, startIndex + adminSectorPageSize).forEach((sector) => {
    const card = document.createElement("article");
    card.className = "admin-sector-card";
    card.setAttribute("role", "listitem");

    const heading = document.createElement("div");
    heading.className = "admin-sector-card-heading";
    const identity = document.createElement("div");
    const name = document.createElement("h3");
    name.textContent = sector.name;
    const teamCount = document.createElement("span");
    teamCount.className = "admin-sector-team-count";
    teamCount.textContent = `${sector.teams.length} ${sector.teams.length === 1 ? "equipe" : "equipes"}`;
    identity.append(name, teamCount);

    const editButton = document.createElement("button");
    editButton.className = "admin-secondary-button";
    editButton.type = "button";
    editButton.dataset.editSector = sector.id;
    editButton.setAttribute("aria-label", `Editar setor ${sector.name}`);
    editButton.textContent = "Editar";
    heading.append(identity, editButton);

    const vps = document.createElement("p");
    vps.className = "admin-sector-vps";
    const vpsLabel = document.createElement("span");
    vpsLabel.textContent = "VPs";
    const vpsNames = document.createElement("strong");
    vpsNames.textContent = sector.vps.length ? sector.vps.join(", ") : "Não informado";
    vps.append(vpsLabel, vpsNames);

    card.append(heading, vps);
    list.append(card);
  });
}

function updateSectorTeamSelection(selectedRow = null) {
  const rows = [...document.querySelectorAll("#admin-sector-teams .admin-team-row")];
  const select = document.querySelector("#admin-sector-team-select");
  select.replaceChildren();

  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = rows.length ? "Selecione uma equipe" : "Nenhuma equipe cadastrada";
  select.append(placeholder);

  rows.forEach((row, index) => {
    const option = document.createElement("option");
    option.value = String(index);
    option.textContent = row.querySelector("[data-team-name]").value.trim() || "Nova equipe";
    select.append(option);
    row.hidden = row !== selectedRow;
  });
  select.value = selectedRow ? String(rows.indexOf(selectedRow)) : "";
}

function addSectorTeamRow(team = { name: "", leader: "" }) {
  const row = document.createElement("div");
  row.className = "admin-team-row";

  const nameLabel = document.createElement("label");
  nameLabel.textContent = "Equipe";
  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.value = team.name;
  nameInput.dataset.teamName = "";
  nameLabel.append(nameInput);

  const leaderLabel = document.createElement("label");
  leaderLabel.textContent = "Líder";
  const leaderInput = document.createElement("input");
  leaderInput.type = "text";
  leaderInput.value = team.leader || "";
  leaderInput.dataset.teamLeader = "";
  leaderLabel.append(leaderInput);

  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.className = "admin-secondary-button admin-danger-button";
  removeButton.textContent = "Remover";
  removeButton.setAttribute("aria-label", team.name ? `Remover equipe ${team.name}` : "Remover equipe");
  nameInput.addEventListener("input", () => {
    const name = nameInput.value.trim();
    removeButton.setAttribute("aria-label", name ? `Remover equipe ${name}` : "Remover equipe");
    if (name) document.querySelector("#admin-sector-team-error").hidden = true;
    updateSectorTeamSelection(row);
  });
  removeButton.addEventListener("click", () => {
    row.remove();
    document.querySelector("#admin-sector-team-error").hidden = true;
    updateSectorTeamSelection();
    document.querySelector("#add-sector-team").focus();
  });

  row.append(nameLabel, leaderLabel, removeButton);
  document.querySelector("#admin-sector-teams").append(row);
  return nameInput;
}

function readSectorTeamRows() {
  const teams = [];
  const error = document.querySelector("#admin-sector-team-error");
  error.hidden = true;
  for (const row of document.querySelectorAll("#admin-sector-teams .admin-team-row")) {
    const nameInput = row.querySelector("[data-team-name]");
    const name = nameInput.value.trim();
    if (!name) {
      error.textContent = "Informe o nome da equipe ou remova a linha vazia.";
      error.hidden = false;
      updateSectorTeamSelection(row);
      nameInput.focus();
      return null;
    }
    teams.push({ name, leader: row.querySelector("[data-team-leader]").value.trim() });
  }
  return teams;
}

function renderAdminPanel() {
  if (!demoSession || !sectors.length) return;

  const superAdmin = isSuperAdmin();
  document.querySelector("#admin-intro").textContent = superAdmin
    ? "Gerencie os setores, as lideranças e os conteúdos disponíveis para cada equipe."
    : "Gerencie os setores, equipes e acessos dos usuários.";
  document.querySelector(".admin-summary-grid").classList.toggle("admin-summary-grid--limited", !superAdmin);
  document.querySelectorAll("[data-super-admin-only]").forEach((element) => {
    element.hidden = !superAdmin;
  });
  document.querySelector("[data-super-admin-role]").hidden = !isSuperAdmin();
  adminTabButtons.forEach((button) => {
    button.hidden = !superAdmin && ["content", "orientations", "help", "home", "insights"].includes(button.dataset.adminTabButton);
  });
  renderAdminSummary();
  if (!adminTabButtons.some((button) => button.dataset.adminTabButton === activeAdminTabId && !button.hidden)) {
    activeAdminTabId = "users";
  }
  activateAdminTab(activeAdminTabId);

  const contentSectorSelect = document.querySelector("#content-sector-select");
  if (!sectors.some((sector) => sector.id === activeSectorId)) activeSectorId = sectors[0].id;
  contentSectorSelect.replaceChildren();
  sectors.forEach((sector) => {
    const option = document.createElement("option");
    option.value = sector.id;
    option.textContent = `${sector.name} · ${getSectorVpLabel(sector)}`;
    contentSectorSelect.append(option);
  });
  contentSectorSelect.value = activeSectorId;

  const sector = getActiveSector();
  document.querySelector("#admin-sector-name").value = sector.name;
  document.querySelector("#admin-sector-vps").value = sector.vps.join(", ");
  document.querySelector("#admin-sector-teams").replaceChildren();
  document.querySelector("#admin-sector-team-error").hidden = true;
  sector.teams.forEach((team) => addSectorTeamRow(team));
  updateSectorTeamSelection();
  document.querySelector("#admin-sector-count").textContent = `${sectors.length} setores`;
  renderAdminSectorList();

  const managedUserSector = document.querySelector("#managed-user-sector");
  const contentCourseSelect = document.querySelector("#content-course");
  const moduleCourseSelect = document.querySelector("#module-course");
  const moduleListCourseSelect = document.querySelector("#module-list-course");
  const courseContentPlatformFilter = document.querySelector("#course-content-platform-filter");
  const orientationSectorList = document.querySelector("#orientation-sector-list");
  const selectedOrientationSectorIds = new Set(
    [...orientationSectorList.querySelectorAll('input[type="checkbox"]:checked')].map((input) => input.value),
  );
  const selectedContentCourse = contentCourseSelect.value;
  const selectedModuleCourse = moduleCourseSelect.value;
  const selectedModuleListCourse = moduleListCourseSelect.value;
  const selectedUserSector = managedUserSector.value;
  const selectedUserTeam = document.querySelector("#managed-user-team").value;
  [managedUserSector, contentCourseSelect, moduleCourseSelect].forEach((select) => select.replaceChildren());
  moduleListCourseSelect.replaceChildren();
  courseContentPlatformFilter.replaceChildren(new Option("Todas as plataformas", ""));
  orientationSectorList.replaceChildren();
  sectors.forEach((item) => {
    const userOption = document.createElement("option");
    userOption.value = item.id;
    userOption.textContent = `${item.name} · ${getSectorVpLabel(item)}`;
    managedUserSector.append(userOption);

    const orientationLabel = document.createElement("label");
    orientationLabel.className = "admin-option";
    const orientationCheckbox = document.createElement("input");
    orientationCheckbox.type = "checkbox";
    orientationCheckbox.name = "orientation-sector";
    orientationCheckbox.value = item.id;
    orientationCheckbox.checked = selectedOrientationSectorIds.has(item.id);
    const orientationName = document.createElement("strong");
    orientationName.textContent = item.name;
    const orientationCopy = document.createElement("span");
    orientationCopy.append(orientationName);
    orientationLabel.append(orientationCheckbox, orientationCopy);
    orientationSectorList.append(orientationLabel);
  });
  updateOrientationSelectAllButton();
  if ([...managedUserSector.options].some((option) => option.value === selectedUserSector)) {
    managedUserSector.value = selectedUserSector;
  }
  renderManagedUserTeams(selectedUserTeam);
  const legacyIds = [...new Set([...courseModules, ...courseMaterials].map((item) => item.courseId))]
    .filter((id) => !materialPlatforms[id]);
  [...Object.keys(materialPlatforms), ...legacyIds].forEach((id) => {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = materialPlatforms[id]?.name || `${courses[id]?.title || id} (sem página em Materiais)`;
    contentCourseSelect.append(option);
    moduleCourseSelect.append(option.cloneNode(true));
    moduleListCourseSelect.append(option.cloneNode(true));
    courseContentPlatformFilter.append(option.cloneNode(true));
  });
  if (![...courseContentPlatformFilter.options].some((option) => option.value === courseContentPlatform)) {
    courseContentPlatform = "";
    courseContentPage = 1;
  }
  courseContentPlatformFilter.value = courseContentPlatform;
  if ([...contentCourseSelect.options].some((option) => option.value === selectedContentCourse)) contentCourseSelect.value = selectedContentCourse;
  if ([...moduleCourseSelect.options].some((option) => option.value === selectedModuleCourse)) moduleCourseSelect.value = selectedModuleCourse;
  if ([...moduleListCourseSelect.options].some((option) => option.value === selectedModuleListCourse)) {
    moduleListCourseSelect.value = selectedModuleListCourse;
  }
  renderModuleOptions();
  renderCourseModules();

  const assignment = getActiveAssignment();
  const savedAssignmentNames = supabaseEnabled ? customAssignmentNames : readStoredJson(assignmentNamesStorageKey, []);
  const customNames = Array.isArray(savedAssignmentNames) ? savedAssignmentNames : [];
  const customFor = (type) => customNames.filter((item) => item.type === type);
  const courseOptions = Object.entries(courses).map(([id, course]) => ({ id, title: course.title }));
  const resourceOptions = resources.map((resource) => ({
    id: resource.id,
    title: resource.title,
  }));
  renderAdminOptions(document.querySelector("#admin-course-options"), [...courseOptions, ...customFor("course")], assignment.courseIds, "course");
  renderAdminOptions(document.querySelector("#admin-resource-options"), [...resourceOptions, ...customFor("resource")], assignment.resourceIds, "resource");
  const platformOptions = Object.entries(materialPlatforms).map(([id, platform]) => ({ id, title: platform.name }));
  renderAdminOptions(document.querySelector("#admin-platform-options"), [...platformOptions, ...customFor("platform")], assignment.platformIds || [], "platform");
  renderAdminUsers();
  renderPublishedContent();
  renderAdminHelpContents();
  renderAdminHelpContacts();
  updateDemoProfile();
}

function updateOrientationSelectAllButton() {
  const checkboxes = [...document.querySelectorAll('#orientation-sector-list input[type="checkbox"]')];
  const button = document.querySelector("#orientation-select-all");
  const allSelected = checkboxes.length > 0 && checkboxes.every((input) => input.checked);
  button.textContent = allSelected ? "Desmarcar todos" : "Selecionar todos";
  button.disabled = checkboxes.length === 0;
}

function renderManagedUserTeams(selectedTeam = "") {
  const sectorId = document.querySelector("#managed-user-sector").value;
  const sector = sectors.find((item) => item.id === sectorId);
  const select = document.querySelector("#managed-user-team");
  select.replaceChildren();

  const noTeam = document.createElement("option");
  noTeam.value = "";
  noTeam.textContent = "Sem equipe";
  select.append(noTeam);
  (sector?.teams || []).forEach((team) => {
    const option = document.createElement("option");
    option.value = team.name;
    option.textContent = team.leader ? `${team.name} · Líder: ${team.leader}` : team.name;
    select.append(option);
  });

  const editingUser = users.find((user) => user.id === editingUserId);
  if (selectedTeam && ![...select.options].some((option) => option.value === selectedTeam)
      && editingUser?.sectorId === sectorId && editingUser.team === selectedTeam) {
    const existing = document.createElement("option");
    existing.value = selectedTeam;
    existing.textContent = `${selectedTeam} (não cadastrada neste setor)`;
    select.append(existing);
  }
  select.value = [...select.options].some((option) => option.value === selectedTeam) ? selectedTeam : "";
}

function resetUserForm() {
  document.querySelector("#admin-user-form").reset();
  document.querySelector("#admin-user-error").hidden = true;
  editingUserId = null;
  document.querySelector("#managed-user-sector").value = activeSectorId;
  renderManagedUserTeams();
  document.querySelector("#managed-user-password").required = supabaseEnabled;
  document.querySelector(".admin-password-field").hidden = !supabaseEnabled;
  document.querySelector("#managed-user-password-label").textContent = "Senha inicial";
  document.querySelector("#managed-user-password-help").textContent = supabaseEnabled
    ? "Obrigatória ao criar a conta. O usuário fará login com este e-mail e senha."
    : "A criação de contas reais será configurada depois.";
  document.querySelector("#save-user-access").textContent = "Criar acesso";
  document.querySelector("#cancel-user-edit").hidden = true;
}

function prepareUserEdit(user, changePassword = false) {
  if (isSystemAdminUser(user) || (!isSuperAdmin() && user.role === "super-admin")) return;
  editingUserId = user.id;
  document.querySelector("#managed-user-name").value = user.name;
  document.querySelector("#managed-user-email").value = user.email;
  document.querySelector("#managed-user-role").value = user.role;
  document.querySelector("#managed-user-sector").value = user.sectorId;
  renderManagedUserTeams(user.team || "");
  const passwordInput = document.querySelector("#managed-user-password");
  passwordInput.value = "";
  passwordInput.required = supabaseEnabled && changePassword;
  document.querySelector(".admin-password-field").hidden = !supabaseEnabled;
  document.querySelector("#managed-user-password-label").textContent = changePassword ? "Nova senha" : "Senha inicial";
  document.querySelector("#managed-user-password-help").textContent = changePassword
    ? "Informe uma senha nova com pelo menos 8 caracteres."
    : "Opcional. Preencha somente para definir uma nova senha.";
  document.querySelector("#save-user-access").textContent = changePassword ? "Alterar senha" : "Salvar alterações";
  document.querySelector("#cancel-user-edit").hidden = false;
  openAdminDialog(
    "#user-edit-dialog",
    changePassword ? "Alterar senha" : "Editar acesso",
    changePassword ? "#managed-user-password" : "#managed-user-name",
  );
}

function resetCourseContentForm() {
  const courseId = document.querySelector("#content-course").value;
  const moduleId = document.querySelector("#content-module").value;
  document.querySelector("#course-content-form").reset();
  document.querySelector("#content-course").value = courseId;
  editingCourseContentId = null;
  renderModuleOptions(moduleId);
  document.querySelector("#content-file").value = "";
  document.querySelector("#content-current-file").hidden = true;
  document.querySelector("#content-current-file").textContent = "";
  updateCourseContentSourceFields();
  document.querySelector("#publish-course-content").textContent = "Publicar em Materiais";
  document.querySelector("#cancel-course-content-edit").hidden = true;
}

function updateCourseContentSourceFields() {
  const type = document.querySelector("#content-type").value;
  const supportsFile = ["video", "pdf", "image"].includes(type);
  const isText = type === "text";
  const description = document.querySelector("#content-description");
  document.querySelector("#content-description-label").textContent = isText ? "Texto do material" : "Descrição";
  description.maxLength = isText ? 10000 : 500;
  description.required = isText;
  const fileInput = document.querySelector("#content-file");
  fileInput.disabled = !supportsFile;
  document.querySelector("#content-file-field").hidden = !supportsFile;
  fileInput.accept = type === "video" ? "video/*,.mp4,.webm,.mov,.m4v,.ogv"
    : type === "pdf" ? "application/pdf,.pdf" : "image/*";
  document.querySelector("#content-file-field").firstChild.textContent = `Enviar ${type === "video" ? "vídeo" : type === "pdf" ? "PDF" : "imagem"} deste computador`;
  document.querySelector("#content-file-help").textContent = type === "video"
    ? supabaseEnabled
      ? "MP4 ou WebM são recomendados. O arquivo ficará no armazenamento compartilhado do Supabase."
      : "MP4 ou WebM são recomendados. O arquivo ficará salvo neste navegador."
    : supabaseEnabled
      ? "O arquivo ficará no armazenamento compartilhado do Supabase."
      : "O arquivo ficará salvo neste navegador.";
  const urlInput = document.querySelector("#content-url");
  document.querySelector("#content-url-field").hidden = isText;
  urlInput.disabled = isText;
  urlInput.required = false;
  urlInput.placeholder = supportsFile ? "https://... (opcional se enviar arquivo)" : "https://...";
  document.querySelector("#content-url-field").firstChild.textContent = supportsFile
    ? "Link externo (opcional para arquivo)"
    : "Link externo";
  document.querySelector("#content-source-help").textContent = supportsFile
    ? supabaseEnabled
      ? "Envie um arquivo de até 50 MB ou informe um link externo."
      : "Envie um arquivo para salvar neste navegador ou informe um link externo."
    : "Informe o endereço do material que deseja publicar.";
  if (!supportsFile && fileInput.files.length) fileInput.value = "";
}

function isSupportedCourseFile(file, type) {
  const extensionMatches = {
    video: /\.(mp4|webm|mov)$/i,
    pdf: /\.pdf$/i,
    image: /\.(jpe?g|png|webp)$/i,
  };
  const allowedMimeTypes = {
    video: ["video/mp4", "video/webm", "video/quicktime"],
    pdf: ["application/pdf"],
    image: ["image/jpeg", "image/png", "image/webp"],
  };
  const mimeMatches = allowedMimeTypes[type].includes(file.type);
  return mimeMatches || (!file.type || file.type === "application/octet-stream") && extensionMatches[type].test(file.name);
}

function resetOrientationForm() {
  document.querySelector("#orientation-form").reset();
  document.querySelectorAll('#orientation-sector-list input[type="checkbox"]')
    .forEach((input) => { input.checked = false; });
  updateOrientationSelectAllButton();
  document.querySelector("#orientation-file").value = "";
  const currentFile = document.querySelector("#orientation-current-file");
  currentFile.textContent = "";
  currentFile.hidden = true;
  document.querySelector("#orientation-file-help").textContent = supabaseEnabled
    ? "O anexo ficará salvo no armazenamento compartilhado."
    : "O anexo ficará salvo neste navegador nesta prévia local.";
  editingOrientationId = null;
  document.querySelector("#publish-orientation").textContent = "Publicar orientação";
  document.querySelector("#cancel-orientation-edit").hidden = true;
}

bindAdminDialog("#sector-edit-dialog", renderAdminPanel);
bindAdminDialog("#sector-add-dialog", () => {
  document.querySelector("#new-sector-name").value = "";
  document.querySelector("#new-sector-vps").value = "";
  document.querySelector("#new-sector-teams").value = "";
});
let pendingAssignmentNames = [];
let customAssignmentNames = [];
function clearCourseProfilePreview() {
  if (courseProfilePreviewUrl) URL.revokeObjectURL(courseProfilePreviewUrl);
  courseProfilePreviewUrl = null;
  document.querySelector("#course-profile-image-preview-img").removeAttribute("src");
  document.querySelector("#course-profile-image-preview-img").hidden = true;
  document.querySelector("#course-profile-image-placeholder").hidden = false;
}

function showCourseProfilePreview(fileOrUrl) {
  clearCourseProfilePreview();
  const image = document.querySelector("#course-profile-image-preview-img");
  image.src = fileOrUrl instanceof Blob ? URL.createObjectURL(fileOrUrl) : fileOrUrl;
  courseProfilePreviewUrl = fileOrUrl instanceof Blob ? image.src : null;
  image.hidden = false;
  document.querySelector("#course-profile-image-placeholder").hidden = true;
}

function applyCourseProfileImage(courseId, file) {
  const card = courseCards.find((item) => item.dataset.courseId === courseId);
  if (!card) return;
  const cover = card.querySelector(".course-cover");
  let image = cover.querySelector(".course-cover-image");
  if (!image) {
    image = document.createElement("img");
    image.className = "course-cover-image";
    cover.prepend(image);
  }
  const previousUrl = courseProfileImageUrls.get(courseId);
  if (previousUrl) URL.revokeObjectURL(previousUrl);
  const imageUrl = file instanceof Blob ? URL.createObjectURL(file) : file;
  if (file instanceof Blob) courseProfileImageUrls.set(courseId, imageUrl);
  else courseProfileImageUrls.delete(courseId);
  image.src = imageUrl;
  image.alt = `Imagem de perfil da trilha ${courses[courseId].title}`;
  cover.classList.add("course-cover--custom-image");
}

function removeCourseProfileImageFromCard(courseId) {
  const card = courseCards.find((item) => item.dataset.courseId === courseId);
  const imageUrl = courseProfileImageUrls.get(courseId);
  if (imageUrl) URL.revokeObjectURL(imageUrl);
  courseProfileImageUrls.delete(courseId);
  if (!card) return;
  card.querySelector(".course-cover-image")?.remove();
  card.querySelector(".course-cover").classList.remove("course-cover--custom-image");
}

async function loadCourseProfileImage(courseId) {
  const course = courses[courseId];
  if (!course?.imageFileId) return;
  try {
    const file = await getCourseFile(course.imageFileId);
    if (courses[courseId]?.imageFileId !== course.imageFileId) return;
    applyCourseProfileImage(courseId, file);
  } catch (error) {
    console.error(`Não foi possível carregar a imagem de perfil da trilha "${course.title}".`, error);
  }
}

async function loadCourseProfilePreview(courseId) {
  const course = courses[courseId];
  if (!course?.imageFileId) return;
  try {
    const file = await getCourseFile(course.imageFileId);
    if (editingCourseId !== courseId || editingCourseImageFile || editingCourseImageRemoved) return;
    showCourseProfilePreview(file);
  } catch (error) {
    console.error(`Não foi possível carregar a prévia da imagem da trilha "${course.title}".`, error);
    const message = document.querySelector("#course-edit-error");
    message.textContent = "Não foi possível carregar a imagem atual da trilha.";
    message.hidden = false;
  }
}

function resetCourseEditForm() {
  editingCourseId = null;
  editingCourseImageFile = null;
  editingCourseImageRemoved = false;
  document.querySelector("#course-edit-form").reset();
  document.querySelector("#course-profile-image-input").value = "";
  document.querySelector("#course-edit-error").hidden = true;
  document.querySelector("#remove-course-profile-image").hidden = true;
  document.querySelector("#remove-course-profile-image").textContent = "Remover imagem atual";
  clearCourseProfilePreview();
}

function resetAssignmentNameForms() {
  pendingAssignmentNames = [];
  document.querySelectorAll("[data-assignment-name-form]").forEach((form) => {
    form.hidden = true;
    form.querySelector("[data-assignment-name-input]").value = "";
    form.querySelector(".admin-assignment-name-error").hidden = true;
  });
  document.querySelector("#admin-assignment-save-error").hidden = true;
}

bindAdminDialog("#sector-assignment-dialog", () => {
  resetAssignmentNameForms();
  renderAdminPanel();
});
bindAdminDialog("#course-edit-dialog", resetCourseEditForm);
bindAdminDialog("#user-edit-dialog", resetUserForm, () => !userAccessSaving);
bindAdminDialog("#course-module-dialog", resetCourseModuleForm);
bindAdminDialog("#course-content-dialog", resetCourseContentForm);
bindAdminDialog("#orientation-dialog", resetOrientationForm);
bindAdminDialog("#help-content-edit-dialog", resetHelpContentForm, () => !helpContentSaving);
bindAdminDialog("#help-contact-dialog", resetHelpContactForm, () => !helpContactSaving);

// AUTENTICACAO E CARREGAMENTO: previa local, sessao e dados do Supabase.
async function refreshPublishedContent() {
  if (!supabaseEnabled) {
    localStorage.setItem(courseContentStorageKey, JSON.stringify(courseMaterials));
    localStorage.setItem(courseModulesStorageKey, JSON.stringify(courseModules));
    localStorage.setItem(orientationStorageKey, JSON.stringify(publishedOrientations));
  }
  saveSectorData();
  if (isSuperAdmin()) {
    try {
      await persistCloudContent();
      await persistCloudAssignments();
    } catch (error) {
      if (supabaseEnabled) {
        try {
          await reloadSupabaseWorkspace();
        } catch (reloadError) {
          console.error("Não foi possível restaurar o estado após a falha ao publicar conteúdo.", reloadError);
        }
      }
      throw error;
    }
  }
  renderResources();
  updateCourseCards();
  updateLibrary();
  updateResourceCounts();
  renderPlatformModules();
  if (currentPage === "admin") renderAdminPanel();
  if (courseDialog.open && currentCourseId && courses[currentCourseId]) openCourse(currentCourseId);
}

function refreshSectorViews() {
  updateDemoProfile();
  updateCourseCards();
  updateResourceCounts();
  updateLibrary();
  updateProgressUI();
  renderPlatformModules();
}

function initializeLocalPreview() {
  const savedHomeSettings = localStorage.getItem(homeSettingsStorageKey);
  const savedHomeOverrides = localStorage.getItem(homeOverridesStorageKey);
  const overrides = savedHomeOverrides ? JSON.parse(savedHomeOverrides) : { sectors: {}, users: {} };
  if (!overrides || !overrides.sectors || !overrides.users) throw new Error("As personalizações da página inicial estão inválidas.");
  globalHomeSettings = { ...defaultHomeSettings, ...validateHomeContent(savedHomeSettings ? JSON.parse(savedHomeSettings) : {}) };
  homeSessionSectorId = previewUser.sectorId;
  homeSessionSectorOverride = validateHomeContent(overrides.sectors[homeSessionSectorId] || {});
  homeSessionUserOverride = validateHomeContent(overrides.users[demoSession.userId] || {});
  applySessionHomeSettings();
  sessionLoading.hidden = true;
  demoLoginScreen.hidden = true;
  appShell.hidden = false;
  appShell.setAttribute("aria-hidden", "false");
  demoAdminLinks.forEach((link) => { link.hidden = !hasAdminAccess(); });
  document.querySelector("#demo-logout").hidden = true;
  document.querySelector(".admin-password-field").hidden = true;
  document.querySelector("#managed-user-password").required = false;
  document.querySelector("#managed-user-password-help").textContent = "A criação de contas reais será configurada depois.";
  renderHelpContents();
  renderHelpContacts();
  renderResources();
  renderAdminPanel();
  refreshSectorViews();
  updateDemoProfile();
  renderRoute(location.hash || "#/inicio");
}

function showLoginScreen(message = "") {
  if (notificationsChannel && window.trainingSupabase) {
    window.trainingSupabase.removeChannel(notificationsChannel);
    notificationsChannel = null;
  }
  notificationPanel.hidden = true;
  notificationButton.setAttribute("aria-expanded", "false");
  homeEditorRequest += 1;
  homeEditorData = null;
  homeEditorRenderedValues = null;
  homeSessionSectorId = null;
  homeSessionSectorOverride = {};
  homeSessionUserOverride = {};
  document.querySelector("#admin-home-fields").replaceChildren();
  document.querySelector("#admin-home-form").hidden = true;
  document.querySelector("#admin-home-sector").replaceChildren(new Option("Todos os setores", ""));
  document.querySelector("#admin-home-user").replaceChildren(new Option("Padrão geral", ""));
  closeUserPicker(document.querySelector("#admin-home-user"), document.querySelector("#admin-home-user-search"),
    document.querySelector("#admin-home-user-menu"), document.querySelector("#admin-home-user-search-status"));
  document.querySelector("#admin-home-user-search").value = "";
  document.querySelector("#admin-home-user-search").disabled = true;
  document.querySelector("#admin-home-user-search-status").textContent = "";
  insightsReportRequest += 1;
  insightsReportRows = null;
  insightsReportPage = 1;
  document.querySelector("#admin-report-summary").replaceChildren();
  document.querySelector("#admin-report-rows").replaceChildren();
  document.querySelector("#admin-report-pagination").hidden = true;
  document.querySelector("#admin-report-sector").replaceChildren(new Option("Todos os setores", ""));
  document.querySelector("#admin-report-user").replaceChildren(new Option("Todos os usuários", ""));
  closeUserPicker(document.querySelector("#admin-report-user"), document.querySelector("#admin-report-user-search"),
    document.querySelector("#admin-report-user-menu"), document.querySelector("#admin-report-user-search-status"));
  document.querySelector("#admin-report-user-search").value = "";
  document.querySelector("#admin-report-user-search").disabled = true;
  document.querySelector("#admin-report-user-search-status").textContent = "";
  document.querySelector("#admin-report-status").textContent = "";
  document.querySelector("#admin-report-error").hidden = true;
  document.querySelector("#admin-report-export").disabled = true;
  demoSession = null;
  document.querySelectorAll("dialog[open]").forEach((dialog) => dialog.close());
  releaseCourseFileUrls();
  sessionLoading.hidden = true;
  demoLoginScreen.hidden = false;
  appShell.hidden = true;
  appShell.setAttribute("aria-hidden", "true");
  demoAdminLinks.forEach((link) => { link.hidden = true; });
  document.querySelector("#demo-password").value = "";
  demoLoginError.textContent = message;
  demoLoginError.hidden = !message;
}

function assertSupabaseResult({ data, error }, operation) {
  if (error) {
    console.error(`Erro ao ${operation}.`, error);
    throw new Error(error.message || `Não foi possível ${operation}.`);
  }
  return data;
}

function persistCloudUserState(patch) {
  if (!supabaseEnabled) return Promise.resolve();
  if (!window.trainingSupabase || !demoSession?.userId) {
    return Promise.reject(new Error("Entre novamente para salvar suas preferências."));
  }
  const userId = demoSession.userId;
  const write = cloudUserStateWriteQueue.catch(() => {}).then(async () => {
    if (demoSession?.userId !== userId) throw new Error("A sessão mudou antes de salvar suas preferências.");
    const changes = typeof patch === "function" ? patch(cloudUserState) : patch;
    const nextState = { ...cloudUserState, ...changes };
    assertSupabaseResult(await window.trainingSupabase.from("user_state").upsert({
      user_id: userId,
      theme_preference: nextState.theme_preference,
      active_sector_id: nextState.active_sector_id,
      progress: nextState.progress,
      video_progress: nextState.video_progress,
      updated_at: new Date().toISOString(),
    }, { onConflict: "user_id" }), "salvar suas preferências e seu progresso");
    if (demoSession?.userId === userId) cloudUserState = nextState;
  });
  cloudUserStateWriteQueue = write;
  return write;
}

async function loadSupabaseWorkspace(session) {
  const client = window.trainingSupabase;
  if (!client) throw new Error("A conexão com o Supabase não foi configurada.");

  const profile = assertSupabaseResult(
    await client.from("profiles").select("*").eq("id", session.user.id).single(),
    "carregar o perfil",
  );
  if (profile.access_blocked) {
    const { error } = await client.auth.signOut();
    if (error) throw error;
    showLoginScreen("Seu acesso está bloqueado. Consulte um administrador.");
    return;
  }
  if (!["collaborator", "admin", "super-admin"].includes(profile.role)) {
    throw new Error("Seu perfil de acesso é inválido. Consulte um administrador.");
  }

  demoSession = { email: profile.email.toLocaleLowerCase("pt-BR"), role: profile.role, userId: profile.id };
  const [
    profileResult,
    sectorResult,
    assignmentResult,
    moduleResult,
    materialResult,
    orientationResult,
    orientationSectorResult,
    userStateResult,
    courseOverrideResult,
    assignmentOptionResult,
    deletedCatalogResult,
    helpContentResult,
    helpContactResult,
    homeSettingsResult,
    homeSectorSettingsResult,
    homeUserSettingsResult,
  ] = await Promise.all([
    client.from("profiles").select("*"),
    client.from("sectors").select("*").order("name"),
    client.from("sector_assignments").select("*"),
    client.from("course_modules").select("*").order("position"),
    client.from("course_materials").select("*").order("position"),
    client.from("orientations").select("*").order("created_at"),
    client.from("orientation_sectors").select("*"),
    client.from("user_state").select("*").eq("user_id", session.user.id).maybeSingle(),
    client.from("course_overrides").select("*"),
    client.from("assignment_options").select("*").order("created_at"),
    client.from("deleted_catalog_items").select("*"),
    client.from("help_contents").select("*").order("created_at"),
    client.from("help_contacts").select("*").order("created_at"),
    client.from("home_settings").select("content").eq("id", "home").maybeSingle(),
    profile.sector_id
      ? client.from("home_sector_settings").select("content").eq("sector_id", profile.sector_id).maybeSingle()
      : Promise.resolve({ data: null, error: null }),
    client.from("home_user_settings").select("content").eq("user_id", profile.id).maybeSingle(),
  ]);

  const savedHomeSettings = assertSupabaseResult(homeSettingsResult, "carregar os textos da página inicial");
  const savedSectorSettings = assertSupabaseResult(homeSectorSettingsResult, "carregar os textos do setor");
  const savedUserSettings = assertSupabaseResult(homeUserSettingsResult, "carregar os textos do usuário");
  globalHomeSettings = { ...defaultHomeSettings, ...validateHomeContent(savedHomeSettings ? savedHomeSettings.content : {}) };
  homeSessionSectorId = profile.sector_id;
  homeSessionSectorOverride = validateHomeContent(savedSectorSettings ? savedSectorSettings.content : {});
  homeSessionUserOverride = validateHomeContent(savedUserSettings ? savedUserSettings.content : {});
  homeEditorData = null;
  applySessionHomeSettings();
  helpContents = assertSupabaseResult(helpContentResult, "carregar os conteúdos da central de ajuda");
  helpContacts = assertSupabaseResult(helpContactResult, "carregar os contatos da central de ajuda");
  renderHelpContents();
  renderHelpContacts();
  users = assertSupabaseResult(profileResult, "carregar os acessos").map((row) => ({
    id: row.id,
    name: row.name,
    email: row.email.toLocaleLowerCase("pt-BR"),
    role: row.role,
    sectorId: row.sector_id,
    team: row.team || "",
    accessBlocked: row.access_blocked,
  }));
  sectors = assertSupabaseResult(sectorResult, "carregar os setores").map((row) => ({
    id: row.id,
    name: row.name,
    vps: row.vps || [],
    teams: row.teams || [],
  }));
  if (!sectors.length) throw new Error("O projeto Supabase ainda não tem setores cadastrados.");

  sectorAssignments = {};
  assertSupabaseResult(assignmentResult, "carregar as permissões dos setores").forEach((row) => {
    sectorAssignments[row.sector_id] = {
      courseIds: row.course_ids || [],
      resourceIds: row.resource_ids || [],
      platformIds: row.platform_ids || [],
    };
  });
  courseModules = assertSupabaseResult(moduleResult, "carregar os módulos").map((row) => ({
    id: row.id,
    courseId: row.course_id,
    title: row.title,
    description: row.description || "",
    position: row.position,
  }));
  courseMaterials = assertSupabaseResult(materialResult, "carregar os materiais").map((row) => ({
    id: row.id,
    courseId: row.course_id,
    moduleId: row.module_id,
    type: row.type,
    title: row.title,
    description: row.description || "",
    url: row.url || "",
    fileId: row.file_path || "",
    fileName: row.file_name || "",
    position: row.position,
  }));

  cloudUserState = assertSupabaseResult(userStateResult, "carregar suas preferências") || {
    theme_preference: "system",
    active_sector_id: null,
    progress: { tasks: [], completedCourses: [] },
    video_progress: {},
  };
  themePreference = ["system", "light", "dark"].includes(cloudUserState.theme_preference)
    ? cloudUserState.theme_preference
    : "system";
  localStorage.setItem(themeStorageKey, themePreference);
  applyThemePreference();
  const savedProgress = cloudUserState.progress;
  progress = {
    tasks: Array.isArray(savedProgress?.tasks) ? savedProgress.tasks : [],
    completedCourses: Array.isArray(savedProgress?.completedCourses) ? savedProgress.completedCourses : [],
  };
  customAssignmentNames = assertSupabaseResult(assignmentOptionResult, "carregar os nomes personalizados")
    .map((row) => ({ id: row.id, type: row.type, title: row.title }));

  deletedBuiltIns = { course: [], resource: [], platform: [] };
  assertSupabaseResult(deletedCatalogResult, "carregar os itens removidos").forEach((row) => {
    if (row.type === "resource" || row.type === "platform") deletedBuiltIns[row.type].push(row.item_id);
  });
  deletedBuiltIns.platform.forEach((id) => {
    delete materialPlatforms[id];
    document.querySelector(`[data-count="${id}"]`)?.closest(".platform-card")?.remove();
  });
  for (let index = resources.length - 1; index >= 0; index -= 1) {
    if (deletedBuiltIns.resource.includes(resources[index].id) || deletedBuiltIns.platform.includes(resources[index].platform)) {
      resources.splice(index, 1);
    }
  }

  const courseOverrides = assertSupabaseResult(courseOverrideResult, "carregar as trilhas personalizadas");
  courseOverrides.forEach((row) => {
    if (!courses[row.course_id]) return;
    if (row.deleted) {
      delete courses[row.course_id];
      const cardIndex = courseCards.findIndex((card) => card.dataset.courseId === row.course_id);
      if (cardIndex >= 0) courseCards.splice(cardIndex, 1)[0].remove();
      return;
    }
    courses[row.course_id].title = row.title;
    courses[row.course_id].description = row.description;
    if (row.image_path) courses[row.course_id].imageFileId = row.image_path;
    else delete courses[row.course_id].imageFileId;
    const card = courseCards.find((item) => item.dataset.courseId === row.course_id);
    if (card) {
      card.querySelector(".course-info h3").textContent = row.title;
      card.querySelector(".course-info > p").textContent = row.description;
    }
  });
  await Promise.all(courseOverrides
    .filter((row) => row.image_path
      && !row.deleted
      && courses[row.course_id]
      && (hasAdminAccess() || (sectorAssignments[profile.sector_id]?.courseIds || []).includes(row.course_id)))
    .map((row) => loadCourseProfileImage(row.course_id)));

  const orientationSectors = assertSupabaseResult(orientationSectorResult, "carregar os setores das orientações");
  publishedOrientations = assertSupabaseResult(orientationResult, "carregar as orientações").map((row) => ({
    id: row.id,
    title: row.title,
    body: row.body,
    url: row.url || "",
    fileId: row.file_path || "",
    fileName: row.file_name || "",
    fileType: row.file_type || "",
    sectorIds: orientationSectors
      .filter((assignment) => assignment.orientation_id === row.id)
      .map((assignment) => assignment.sector_id),
  }));
  for (let index = resources.length - 1; index >= 0; index -= 1) {
    if (resources[index].platform === "orientacoes") resources.splice(index, 1);
  }
  publishedOrientations.forEach((orientation) => {
    resources.push(createOrientationResource(orientation));
    orientation.sectorIds.forEach((sectorId) => {
      const assignment = sectorAssignments[sectorId];
      if (assignment && !assignment.resourceIds.includes(orientation.id)) assignment.resourceIds.push(orientation.id);
    });
  });

  const profileSector = sectors.find((sector) => sector.id === profile.sector_id);
  if (!profileSector) throw new Error("Seu perfil não possui um setor válido. Consulte um administrador.");
  const savedSector = sectors.find((sector) => sector.id === cloudUserState.active_sector_id);
  activeSectorId = hasAdminAccess()
    ? (savedSector || profileSector).id
    : profileSector.id;

  sessionLoading.hidden = true;
  demoLoginScreen.hidden = true;
  appShell.hidden = false;
  appShell.setAttribute("aria-hidden", "false");
  demoAdminLinks.forEach((link) => { link.hidden = !hasAdminAccess(); });
  renderResources();
  renderAdminPanel();
  refreshSectorViews();
  updateDemoProfile();
  renderRoute(location.hash || "#/inicio");
  initializeNotifications();
}

async function initializeSupabaseAuth() {
  const client = window.trainingSupabase;
  if (!client) throw new Error("A biblioteca do Supabase não carregou. Verifique sua conexão com a internet.");

  if (window.trainingAuthStorage.hasRememberedSession) {
    const { data, error } = await client.auth.getSession();
    if (error) throw error;
    if (data.session) {
      await loadSupabaseWorkspace(data.session);
    } else {
      showLoginScreen();
    }
  } else {
    showLoginScreen();
  }
  client.auth.onAuthStateChange((event) => {
    if (event === "SIGNED_OUT") {
      document.querySelector("#demo-remember-device").checked = false;
      showLoginScreen();
    }
  });
}

async function invokeUserManagement(payload) {
  const { data, error } = await window.trainingSupabase.functions.invoke("manage-user", { body: payload });
  if (!error) return data;

  let message = error.message || "Não foi possível gerenciar o acesso.";
  if (error.context instanceof Response) {
    try {
      const details = await error.context.json();
      if (details.error) message = details.error;
    } catch (parseError) {
      console.error("Não foi possível interpretar a resposta da função de acessos.", parseError);
    }
  }
  throw new Error(message);
}

async function reloadSupabaseWorkspace() {
  const { data, error } = await window.trainingSupabase.auth.getSession();
  if (error) throw error;
  if (!data.session) throw new Error("Sua sessão expirou. Entre novamente.");
  await loadSupabaseWorkspace(data.session);
}

// MATERIAIS: progresso dos videos, modulos, visualizacao e anexos.
function releaseCourseFileUrls() {
  activeCourseFileUrls.forEach((url) => URL.revokeObjectURL(url));
  activeCourseFileUrls = [];
}

function videoProgressKey(platformId) {
  if (supabaseEnabled) return platformId;
  return `${videoProgressStorageKey}:${encodeURIComponent(demoSession.userId)}:${encodeURIComponent(platformId)}`;
}

function reportVideoProgressError(error) {
  console.error(`Não foi possível salvar o progresso do vídeo ${supabaseEnabled ? "no Supabase" : "neste navegador"}.`, error);
  if (!videoProgressStorageFailed) {
    videoProgressStorageFailed = true;
    showToast(`Não foi possível salvar o progresso do vídeo ${supabaseEnabled ? "no Supabase" : "neste navegador"}.`);
  }
}

function readVideoProgress(key) {
  if (supabaseEnabled) {
    const stored = cloudUserState.video_progress?.[key];
    if (!stored) return { videos: [], last: null };
    if (!stored || typeof stored !== "object" || !Array.isArray(stored.videos)) {
      reportVideoProgressError(new Error("Os dados de progresso têm formato inválido."));
      return null;
    }
    return stored;
  }
  try {
    const stored = localStorage.getItem(key);
    if (!stored) return { videos: [], last: null };
    const progress = JSON.parse(stored);
    if (!progress || typeof progress !== "object" || !Array.isArray(progress.videos)) {
      throw new Error("Os dados de progresso têm formato inválido.");
    }
    return progress;
  } catch (error) {
    reportVideoProgressError(error);
    return null;
  }
}

function saveVideoPosition(activeVideo, allowZero = false) {
  if (!activeVideo || activeVideo.video.readyState < 1 || !Number.isFinite(activeVideo.video.currentTime)) return;
  const { video, item, moduleId, key } = activeVideo;
  const progress = readVideoProgress(key);
  if (!progress) return;
  const seconds = video.ended ? 0 : video.currentTime;
  if (seconds <= 0 && !video.ended && !allowZero) return;
  const source = `${item.fileId || ""}|${item.fileName || ""}|${item.url || ""}`;
  progress.videos = progress.videos.filter((entry) => entry && entry.id !== item.id);
  progress.videos.push({ id: item.id, source, seconds });
  progress.last = { moduleId, itemId: item.id };
  if (supabaseEnabled) {
    void persistCloudUserState((state) => ({
      video_progress: {
        ...(state.video_progress || {}),
        [key]: progress,
      },
    })).catch(reportVideoProgressError);
  } else {
    try {
      localStorage.setItem(key, JSON.stringify(progress));
    } catch (error) {
      reportVideoProgressError(error);
    }
  }
}

function createPlatformVideo(item, moduleId, platformId, sourceUrl) {
  const video = document.createElement("video");
  video.controls = true;
  video.preload = "metadata";
  video.setAttribute("aria-label", `Vídeo: ${item.title}`);
  const key = videoProgressKey(platformId);
  const activeVideo = { video, item, moduleId, key };
  activePlatformVideo = activeVideo;
  const progress = readVideoProgress(key);
  const source = `${item.fileId || ""}|${item.fileName || ""}|${item.url || ""}`;
  const saved = progress?.videos.find((entry) => entry && entry.id === item.id && entry.source === source);
  video.addEventListener("loadedmetadata", () => {
    if (Number.isFinite(saved?.seconds) && saved.seconds > 0 && saved.seconds < video.duration) {
      video.currentTime = saved.seconds;
    }
  });
  let lastSave = 0;
  video.addEventListener("timeupdate", () => {
    if (Date.now() - lastSave >= 5000) {
      saveVideoPosition(activeVideo);
      lastSave = Date.now();
    }
  });
  ["pause", "ended"].forEach((event) => {
    video.addEventListener(event, () => saveVideoPosition(activeVideo));
  });
  video.addEventListener("seeked", () => saveVideoPosition(activeVideo, true));
  video.src = sourceUrl;
  return video;
}

window.addEventListener("pagehide", () => saveVideoPosition(activePlatformVideo));
document.addEventListener("visibilitychange", () => {
  if (document.hidden) saveVideoPosition(activePlatformVideo);
});

function renderEmptyPlatformModules(container) {
  container.hidden = false;
  const message = document.createElement("p");
  message.className = "empty-state";
  message.textContent = "Ainda não há aulas ou materiais publicados nesta plataforma.";
  container.append(message);
}

function getPlatformModuleData(platformId) {
  const modules = courseModules.filter((module) => module.courseId === platformId);
  const assignedResources = new Set(getActiveAssignment().resourceIds);
  const builtInItems = resources.filter((resource) => resource.platform === platformId
    && assignedResources.has(resource.id) && (resource.steps?.length || resource.videoUrl))
    .map((resource) => ({ ...resource, courseId: platformId, moduleId: `builtin-guides-${platformId}`, url: resource.videoUrl || "" }));
  if (builtInItems.length) {
    modules.push({
      id: `builtin-guides-${platformId}`,
      courseId: platformId,
      title: "Tutoriais existentes",
      description: "Tutoriais disponíveis para consulta.",
    });
  }
  const getModuleItems = (module) => module.id === `builtin-guides-${platformId}`
    ? builtInItems
    : courseMaterials.filter((item) => item.courseId === platformId && item.moduleId === module.id);
  return { modules, getModuleItems };
}

function renderPlatformModules() {
  saveVideoPosition(activePlatformVideo);
  activePlatformVideo = null;
  activePlatformFileUrls.forEach((url) => URL.revokeObjectURL(url));
  activePlatformFileUrls = [];
  document.querySelectorAll("[data-platform-modules]").forEach((container) => {
    container.hidden = true;
    container.replaceChildren();
  });
  const platformId = Object.keys(materialPlatforms).find((id) => materialPlatforms[id].page === currentPage);
  if (!platformId || !(getActiveAssignment().platformIds || []).includes(platformId)) return;
  const container = document.querySelector(`[data-platform-modules="${platformId}"]`);
  const { modules, getModuleItems } = getPlatformModuleData(platformId);
  if (!modules.some((module) => getModuleItems(module).length)) {
    renderEmptyPlatformModules(container);
    return;
  }
  const searchParams = new URLSearchParams(location.hash.split("?")[1] || "");
  const moduleParam = searchParams.get("modulo");
  const requestedModule = modules.find((module) => module.id === moduleParam);
  const savedProgress = !moduleParam && !searchParams.get("aula") ? readVideoProgress(videoProgressKey(platformId)) : null;
  const savedModule = modules.find((module) => module.id === savedProgress?.last?.moduleId
    && getModuleItems(module).some((item) => item.id === savedProgress.last.itemId && item.type === "video"));
  const activeModule = requestedModule || savedModule || modules.find((module) => getModuleItems(module).length);
  const activeItems = getModuleItems(activeModule);
  const requestedItem = activeItems.find((item) => item.id === (searchParams.get("aula") || savedProgress?.last?.itemId));
  const activeItem = requestedItem || activeItems.find((item) => item.type === "video") || activeItems[0] || null;
  container.hidden = false;
  const layout = document.createElement("div");
  layout.className = "module-learning-layout";

  const lesson = document.createElement("div");
  lesson.className = "module-learning-main";
  const heading = document.createElement("div");
  heading.className = "module-player-heading";
  const eyebrow = document.createElement("p");
  eyebrow.className = "section-kicker";
  eyebrow.textContent = `${materialPlatforms[platformId].name} · MÓDULO ${String(modules.indexOf(activeModule) + 1).padStart(2, "0")}`;
  const title = document.createElement("h2");
  title.textContent = activeItem?.title || activeModule.title;
  const description = document.createElement("p");
  description.textContent = activeItem?.type === "text" ? "Material de leitura" : activeItem?.description || activeModule.title;
  heading.append(eyebrow, title, description);

  const player = document.createElement("div");
  player.className = "module-player-screen";
  if (activeItem) {
    renderModuleLessonMedia(player, activeItem, activeModule.id, platformId);
  } else {
    player.className = "module-player-unavailable";
    const empty = document.createElement("p");
    empty.textContent = "As aulas e os materiais deste módulo ainda serão publicados.";
    player.append(empty);
  }

  const controls = document.createElement("div");
  controls.className = "module-player-controls";
  const itemIndex = activeItems.indexOf(activeItem);
  const previous = activeItems[itemIndex - 1];
  const next = activeItems[itemIndex + 1];
  const previousLink = createModuleLessonLink(previous, activeModule, platformId, "← Aula anterior");
  const nextLink = createModuleLessonLink(next, activeModule, platformId, "Próxima aula →");
  controls.append(previousLink, nextLink);

  const overview = document.createElement("section");
  overview.className = "module-lesson-overview";
  const overviewTitle = document.createElement("h3");
  overviewTitle.textContent = "Sobre esta aula";
  const overviewText = document.createElement("p");
  overviewText.textContent = activeItem?.description || "Selecione uma aula no painel de conteúdo para começar.";
  overview.append(overviewTitle, overviewText);
  overview.hidden = activeItem?.type === "text";
  lesson.append(heading, player, controls, overview);

  const outline = document.createElement("aside");
  outline.className = "module-outline";
  const outlineHeading = document.createElement("div");
  outlineHeading.className = "module-outline-heading";
  const outlineTitle = document.createElement("h2");
  outlineTitle.textContent = "Conteúdo";
  const outlineCount = document.createElement("small");
  const totalItems = modules.reduce((total, module) => total + getModuleItems(module).length, 0);
  outlineCount.textContent = `${modules.length} ${modules.length === 1 ? "módulo" : "módulos"} · ${totalItems} ${totalItems === 1 ? "aula ou material" : "aulas e materiais"}`;
  outlineHeading.append(outlineTitle, outlineCount);

  const outlineList = document.createElement("div");
  outlineList.className = "module-outline-list";
  modules.forEach((module, index) => {
    const items = getModuleItems(module);
    const section = document.createElement("details");
    section.className = "module-outline-module";
    section.open = module.id === activeModule.id;
    const summary = document.createElement("summary");
    const moduleCopy = document.createElement("span");
    moduleCopy.className = "module-outline-module-copy";
    const moduleTitle = document.createElement("strong");
    moduleTitle.textContent = module.title;
    const moduleCount = document.createElement("small");
    moduleCount.textContent = `${items.length} ${items.length === 1 ? "conteúdo" : "conteúdos"}`;
    moduleCopy.append(moduleTitle, moduleCount);
    summary.append(moduleCopy);
    summary.addEventListener("click", (event) => {
      if (module.id === activeModule.id) return;
      event.preventDefault();
      const firstItem = items.find((item) => item.type === "video") || items[0];
      const params = new URLSearchParams({ modulo: module.id });
      if (firstItem) params.set("aula", firstItem.id);
      location.hash = `#/materiais/${materialPlatforms[platformId].page}?${params.toString()}`;
    });
    const list = document.createElement("ol");
    list.className = "module-outline-lessons";
    items.forEach((item, itemPosition) => {
      const row = document.createElement("li");
      const link = createModuleLessonLink(item, module, platformId, "");
      link.className = `module-outline-lesson${item.id === activeItem?.id ? " is-active" : ""}`;
      const marker = document.createElement("span");
      marker.className = "module-outline-marker";
      marker.setAttribute("aria-hidden", "true");
      marker.textContent = item.type === "video" ? "▶" : String(itemPosition + 1);
      const copy = document.createElement("span");
      copy.className = "module-outline-lesson-copy";
      const itemName = document.createElement("strong");
      itemName.textContent = item.title;
      const type = document.createElement("small");
      type.textContent = getCourseContentTypeLabel(item.type);
      copy.append(itemName, type);
      link.append(marker, copy);
      row.append(link);
      list.append(row);
    });
    if (!items.length) {
      const empty = document.createElement("li");
      empty.className = "module-outline-empty";
      empty.textContent = "Conteúdo em breve";
      list.append(empty);
    }
    section.append(summary, list);
    outlineList.append(section);
  });
  outline.append(outlineHeading, outlineList);
  layout.append(lesson, outline);
  container.append(layout);
}

function createModuleLessonLink(item, module, platformId, label) {
  const link = document.createElement("a");
  link.textContent = label || "";
  if (!item) {
    link.removeAttribute("href");
    link.setAttribute("aria-disabled", "true");
    return link;
  }
  const params = new URLSearchParams({ modulo: module.id, aula: item.id });
  link.href = `#/materiais/${materialPlatforms[platformId].page}?${params.toString()}`;
  if (!label) link.title = item.title;
  return link;
}

function renderModuleLessonMedia(container, item, moduleId, platformId) {
  if (item.type === "text" || item.type === "guide") {
    container.classList.add("module-player-screen--text");
    const content = document.createElement("div");
    content.className = "module-text-content";
    if (item.type === "text") {
      content.textContent = item.description;
    } else {
      item.steps.forEach(([heading, body]) => {
        const title = document.createElement("h3");
        title.textContent = heading;
        const text = document.createElement("p");
        text.textContent = body;
        content.append(title, text);
      });
    }
    container.append(content);
    return;
  }
  if (item.fileId) {
    const status = document.createElement("p");
    status.className = "module-player-status";
    status.textContent = "Carregando conteúdo...";
    container.append(status);
    getCourseFile(item.fileId).then((file) => {
      if (!container.isConnected) return;
      if (!(file instanceof Blob) && !file) throw new Error("O arquivo não foi encontrado no armazenamento.");
      const fileUrl = file instanceof Blob ? URL.createObjectURL(file) : file;
      if (file instanceof Blob) activePlatformFileUrls.push(fileUrl);
      status.remove();
      if (item.type === "video") {
        container.append(createPlatformVideo(item, moduleId, platformId, fileUrl));
      } else if (item.type === "image") {
        const image = document.createElement("img");
        image.src = fileUrl;
        image.alt = item.title;
        container.append(image);
      } else {
        const link = document.createElement("a");
        link.href = fileUrl;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = "Abrir PDF ↗";
        container.append(link);
      }
    }).catch((error) => {
      console.error(`Não foi possível carregar o arquivo "${item.title}".`, error);
      status.textContent = "Arquivo indisponível. Tente novamente ou avise o Super Admin.";
    });
    return;
  }

  if (item.type === "video" && item.url) {
    let externalUrl;
    try {
      externalUrl = new URL(item.url);
    } catch (error) {
      console.error(`O link do vídeo "${item.title}" não é válido.`, error);
    }

    if (externalUrl?.protocol === "https:") {
      const hostname = externalUrl.hostname.toLocaleLowerCase("en-US");
      const youtubeId = hostname === "youtu.be"
        ? externalUrl.pathname.split("/").filter(Boolean)[0]
        : ["youtube.com", "www.youtube.com", "m.youtube.com"].includes(hostname)
          ? externalUrl.searchParams.get("v") || externalUrl.pathname.match(/^\/embed\/([^/]+)/)?.[1]
          : null;
      const vimeoId = ["vimeo.com", "www.vimeo.com"].includes(hostname)
        ? externalUrl.pathname.match(/^\/(\d+)(?:\/|$)/)?.[1]
        : null;
      const embedUrl = youtubeId
        ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(youtubeId)}`
        : vimeoId ? `https://player.vimeo.com/video/${vimeoId}` : "";

      if (embedUrl) {
        const frame = document.createElement("iframe");
        frame.src = embedUrl;
        frame.title = `Vídeo: ${item.title}`;
        frame.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        frame.allowFullscreen = true;
        frame.referrerPolicy = "strict-origin-when-cross-origin";
        container.append(frame);
        return;
      }

      if (/\.(mp4|webm|ogg)$/i.test(externalUrl.pathname)) {
        container.append(createPlatformVideo(item, moduleId, platformId, externalUrl.href));
        return;
      }
    }
  }

  const message = document.createElement("p");
  message.className = "module-player-empty";
  message.textContent = item.type === "video" ? "Este vídeo está disponível pelo link abaixo." : "Abra o material desta aula pelo link abaixo.";
  const link = document.createElement("a");
  link.href = item.url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = item.type === "video" ? "Assistir vídeo ↗" : "Abrir material ↗";
  container.append(message, link);
}

async function renderOrientationAttachment(resource, container) {
  container.hidden = false;
  const status = document.createElement("p");
  status.className = "course-extra-file-status";
  status.textContent = "Carregando anexo...";
  container.replaceChildren(status);

  try {
    const file = await getCourseFile(resource.fileId);
    if (!courseDialog.open || currentResourceId !== resource.id) return;
    if (!(file instanceof Blob) && typeof file !== "string") {
      throw new Error("O arquivo não está disponível neste navegador.");
    }

    const fileUrl = file instanceof Blob ? URL.createObjectURL(file) : file;
    if (file instanceof Blob) activeCourseFileUrls.push(fileUrl);
    const attachment = document.createElement("div");
    attachment.className = "course-extra-material--file";
    const heading = document.createElement("h3");
    heading.textContent = resource.fileName || "Anexo da orientação";
    let preview;
    if (resource.fileType === "image") {
      preview = document.createElement("img");
      preview.className = "course-extra-image";
      preview.alt = resource.fileName || resource.title;
    } else if (resource.fileType === "video") {
      preview = document.createElement("video");
      preview.className = "course-extra-video";
      preview.controls = true;
      preview.preload = "metadata";
      preview.setAttribute("aria-label", `Vídeo da orientação: ${resource.title}`);
    }
    if (preview) preview.src = fileUrl;

    const link = document.createElement("a");
    link.className = "course-extra-open-link";
    link.href = fileUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = resource.fileType === "pdf" ? "Abrir PDF em nova aba ↗" : "Abrir anexo em nova aba ↗";
    attachment.append(heading);
    if (preview) attachment.append(preview);
    attachment.append(link);
    container.replaceChildren(attachment);
  } catch (error) {
    if (!courseDialog.open || currentResourceId !== resource.id) return;
    console.error(`Não foi possível carregar o anexo da orientação "${resource.title}".`, error);
    status.textContent = "Não foi possível carregar o anexo. Verifique se a migração do Supabase foi aplicada e se a orientação está atribuída ao seu setor.";
    showToast("Não foi possível abrir o anexo desta orientação.");
  }
}

function openCourse(courseId) {
  const course = courses[courseId];
  if (!course) return;

  releaseCourseFileUrls();
  currentCourseId = courseId;
  currentResourceId = null;
  document.querySelector("#dialog-category").textContent = course.category;
  document.querySelector("#dialog-title").textContent = course.title;
  document.querySelector("#dialog-description").textContent = course.description;
  document.querySelector("#dialog-duration").hidden = true;
  const platform = materialPlatforms[courseId];
  const hasPlatformAccess = platform && (getActiveAssignment().platformIds || []).includes(courseId);
  const modules = hasPlatformAccess ? getPlatformModuleData(courseId).modules : [];
  document.querySelector("#dialog-lessons").textContent = `${modules.length} ${modules.length === 1 ? "módulo" : "módulos"}`;
  document.querySelector("#dialog-section-title").textContent = "Módulos da trilha";
  document.querySelector("#dialog-section-title").hidden = false;
  lessonList.replaceChildren();

  modules.forEach((module) => {
    const item = document.createElement("li");
    const lessonCopy = document.createElement("span");
    const lessonTitle = document.createElement("strong");
    const lessonDescription = document.createElement("small");

    lessonTitle.textContent = module.title;
    lessonDescription.textContent = module.description || "Descrição não informada.";
    lessonCopy.append(lessonTitle, lessonDescription);
    item.append(lessonCopy);
    lessonList.append(item);
  });
  const emptyModules = document.querySelector("#course-modules-empty");
  emptyModules.hidden = modules.length > 0;
  emptyModules.textContent = platform && !hasPlatformAccess
    ? "Os materiais desta trilha não estão disponíveis para seu setor."
    : platform ? "Ainda não há módulos cadastrados para esta trilha." : "Esta trilha ainda não possui uma plataforma de materiais vinculada.";

  const extraMaterials = document.querySelector("#course-extra-materials");
  extraMaterials.replaceChildren();
  extraMaterials.hidden = true;
  document.querySelector("#content-note").hidden = true;

  const isComplete = progress.completedCourses.includes(courseId);
  document.querySelector("#dialog-status").textContent = isComplete ? "Trilha concluída" : "No seu ritmo · salve seu progresso neste dispositivo";
  document.querySelector("#complete-course").textContent = isComplete ? "Desfazer conclusão" : "Marcar trilha como concluída";
  document.querySelector("#complete-course").hidden = false;
  const materialsLink = document.querySelector("#course-materials-link");
  materialsLink.href = hasPlatformAccess ? `#/materiais/${platform.page}` : "#/materiais";
  materialsLink.hidden = false;
  document.querySelector("#resource-link").hidden = true;
  if (!courseDialog.open) courseDialog.showModal();
}

function openResource(resourceId, resourceOverride = null) {
  const resource = resourceOverride || resources.find((item) => item.id === resourceId);
  if (!resource) return;

  releaseCourseFileUrls();
  currentCourseId = null;
  currentResourceId = resource.id;
  const extraMaterials = document.querySelector("#course-extra-materials");
  extraMaterials.hidden = true;
  extraMaterials.replaceChildren();
  document.querySelector("#dialog-category").textContent = `${resource.platformName} · ${resource.type === "video" ? "Aula em vídeo" : "Tutorial escrito"}`;
  if (resource.type === "article") {
    document.querySelector("#dialog-category").textContent = `${resource.platformName} · Orientação`;
  }
  document.querySelector("#dialog-title").textContent = resource.title;
  document.querySelector("#dialog-description").textContent = resource.description;
  document.querySelector("#dialog-duration").hidden = false;
  document.querySelector("#dialog-duration").textContent = resource.type === "video"
    ? "▶ Aula em vídeo"
    : resource.type === "article" ? "▤ Comunicado interno" : "≡ Passo a passo";
  document.querySelector("#dialog-lessons").textContent = resource.duration;
  document.querySelector("#dialog-section-title").textContent = resource.type === "article"
    ? "Orientação"
    : resource.type === "video" ? "Sobre esta aula" : "Passo a passo";
  document.querySelector("#dialog-section-title").hidden = false;
  lessonList.replaceChildren();
  document.querySelector("#course-modules-empty").hidden = true;

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
  resourceLink.target = "_blank";
  const contentNote = document.querySelector("#content-note");
  contentNote.hidden = false;
  document.querySelector("#dialog-status").textContent = resource.type === "video" && !resource.videoUrl
    ? "Sessão reservada · aguardando o vídeo da equipe"
    : `${resource.platformName} · material de consulta`;
  document.querySelector("#complete-course").hidden = true;
  document.querySelector("#course-materials-link").hidden = true;
  resourceLink.hidden = true;
  const externalUrl = resource.videoUrl || resource.articleUrl;
  if (externalUrl) {
    resourceLink.href = externalUrl;
    resourceLink.textContent = resource.type === "video" ? "Abrir vídeo ↗" : "Abrir material ↗";
    resourceLink.hidden = false;
  }
  contentNote.innerHTML = resource.type === "video" && !resource.videoUrl
    ? '<span aria-hidden="true">✦</span> O espaço da aula está pronto. Envie o vídeo ou link para a equipe de TI publicar nesta sessão.'
    : resource.type === "article"
      ? '<span aria-hidden="true">✦</span> Consulte também as comunicações oficiais da equipe para datas e detalhes específicos de cada mudança.'
    : '<span aria-hidden="true">✦</span> Este guia é uma orientação geral. Siga os processos e as permissões definidos pela sua equipe.';
  if (!courseDialog.open) courseDialog.showModal();
  if (resource.fileId) renderOrientationAttachment(resource, extraMaterials);
}

// ACOES DA PAGINA INICIAL: selecionar publico e salvar textos.
function changeHomeEditorTarget(event) {
  if (!homeEditorData || homeSettingsSaving) return;
  const sectorSelect = document.querySelector("#admin-home-sector");
  const userSelect = document.querySelector("#admin-home-user");
  if (homeEditorHasChanges() && !window.confirm("Descartar as alterações não salvas deste público?")) {
    sectorSelect.value = homeEditorSectorId;
    userSelect.value = homeEditorUserId;
    return;
  }
  if (event.currentTarget === sectorSelect) {
    homeEditorSectorId = sectorSelect.value;
    homeEditorUserId = "";
  } else {
    homeEditorUserId = userSelect.value;
  }
  renderHomeEditor();
}

document.querySelector("#admin-home-sector").addEventListener("change", changeHomeEditorTarget);
document.querySelector("#admin-home-user").addEventListener("change", changeHomeEditorTarget);
setupUserPicker(
  document.querySelector("#admin-home-user"), document.querySelector("#admin-home-user-search"),
  document.querySelector("#admin-home-user-menu"), document.querySelector("#admin-home-user-options"),
  document.querySelector("#admin-home-user-search-status"),
);
document.querySelector("#admin-home-retry").addEventListener("click", loadHomeEditor);
document.querySelector("#admin-home-refresh").addEventListener("click", () => {
  if (homeSettingsSaving) return;
  if (homeEditorHasChanges() && !window.confirm("Descartar as alterações não salvas deste público?")) return;
  loadHomeEditor();
});
document.querySelector("#admin-home-restore").addEventListener("click", () => {
  if (!isSuperAdmin() || !homeEditorData || homeSettingsSaving) return;
  const inherited = homeEditorUserId ? homeEditorBaseValues() : { ...globalHomeSettings, ...resolveHomeVisual(globalHomeSettings) };
  const original = homeEditorRenderedValues;
  renderHomeSettingsForm(inherited);
  homeEditorRenderedValues = original;
  showToast("Conteúdo herdado restaurado. Salve para confirmar.");
});

document.querySelector("#admin-home-form").addEventListener("invalid", (event) => {
  let element = event.target.parentElement;
  while (element && element !== event.currentTarget) {
    if (element instanceof HTMLDetailsElement) element.open = true;
    element = element.parentElement;
  }
}, true);

document.querySelector("#admin-home-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!isSuperAdmin() || !homeEditorData || homeSettingsSaving
    || (homeEditorSectorId === "__no_sector__" && !homeEditorUserId)) return;
  const form = event.currentTarget;
  const errorElement = document.querySelector("#admin-home-error");
  const submitButton = document.querySelector("#admin-home-save");
  const values = Object.fromEntries(homeFields.map((field) => [field.key, form.elements.namedItem(field.key).value.trim()]));
  errorElement.hidden = true;
  if (homeFields.some((field) => !values[field.key] || values[field.key].length > field.maxLength)) {
    errorElement.textContent = "Preencha todos os campos com textos válidos.";
    errorElement.hidden = false;
    return;
  }
  const targetUser = homeEditorUserId;
  const targetSector = homeEditorSectorId;
  const scoped = Boolean(targetUser || targetSector);
  const inherited = targetUser ? homeEditorBaseValues() : { ...globalHomeSettings, ...resolveHomeVisual(globalHomeSettings) };
  const collection = targetUser ? homeEditorData.userOverrides : homeEditorData.sectorOverrides;
  const targetId = targetUser || targetSector;
  const hadOverride = scoped && Object.prototype.hasOwnProperty.call(collection, targetId);
  let visual;
  let uploads;
  try {
    ({ visual, uploads } = readHomeVisualEditor({ revealErrors: true }));
    if (!homeSafeDestination(values.helpDestination)) {
      document.querySelector('[data-home-section="Ajuda rápida"]').open = true;
      form.elements.namedItem("helpDestination").focus();
    }
    validateHomeContent(values);
  } catch (error) {
    errorElement.textContent = error.message;
    errorElement.hidden = false;
    return;
  }
  homeSettingsSaving = true;
  submitButton.disabled = true;
  document.querySelector("#admin-home-sector").disabled = true;
  document.querySelector("#admin-home-user").disabled = true;
  closeUserPicker(document.querySelector("#admin-home-user"), document.querySelector("#admin-home-user-search"),
    document.querySelector("#admin-home-user-menu"), document.querySelector("#admin-home-user-search-status"));
  document.querySelector("#admin-home-user-search").disabled = true;
  document.querySelector("#admin-home-restore").disabled = true;
  document.querySelector("#admin-home-refresh").disabled = true;
  document.querySelectorAll("#admin-home-fields fieldset").forEach((fieldset) => { fieldset.disabled = true; });
  const userId = demoSession?.userId;
  const uploadedPaths = [];
  let saved = false;
  let writeAttempted = false;
  try {
    await uploadHomeImages(uploads, targetSector, targetUser, uploadedPaths);
    validateHomeVisual(visual);
    Object.assign(values, visual);
    const keys = [...homeFields.map((field) => field.key), ...homeVisualKeys];
    const content = scoped
      ? Object.fromEntries(keys.filter((key) => !homeValuesEqual(values[key], inherited[key])).map((key) => [key, values[key]]))
      : values;
    if (scoped && !hadOverride && !Object.keys(content).length) {
      renderHomeEditor();
      showToast("Nenhuma personalização para salvar.");
      return;
    }
    if (supabaseEnabled) {
      writeAttempted = true;
      if (!scoped) {
        assertSupabaseResult(await window.trainingSupabase.from("home_settings").upsert({
          id: "home", content, updated_at: new Date().toISOString(),
        }, { onConflict: "id" }).select("id").single(), "salvar os textos gerais");
      } else {
        const table = targetUser ? "home_user_settings" : "home_sector_settings";
        const idColumn = targetUser ? "user_id" : "sector_id";
        if (Object.keys(content).length) {
          assertSupabaseResult(await window.trainingSupabase.from(table)
            .upsert({ [idColumn]: targetId, content }, { onConflict: idColumn })
            .select(idColumn).single(), "salvar os textos personalizados");
        } else {
          const removed = assertSupabaseResult(await window.trainingSupabase.from(table)
            .delete().eq(idColumn, targetId).select(idColumn), "remover a personalização");
          if (removed.length !== 1) throw new Error("A personalização não pôde ser removida; atualize a página e tente novamente.");
        }
      }
      saved = true;
      if (demoSession?.userId !== userId) return;
    } else if (!scoped) {
      localStorage.setItem(homeSettingsStorageKey, JSON.stringify(content));
    } else {
      const next = {
        sectors: { ...homeEditorData.sectorOverrides },
        users: { ...homeEditorData.userOverrides },
      };
      const target = targetUser ? next.users : next.sectors;
      if (Object.keys(content).length) target[targetId] = content;
      else delete target[targetId];
      localStorage.setItem(homeOverridesStorageKey, JSON.stringify(next));
    }
    saved = true;
    if (!scoped) globalHomeSettings = values;
    else if (Object.keys(content).length) collection[targetId] = content;
    else delete collection[targetId];
    homeSessionSectorOverride = homeEditorData.sectorOverrides[homeSessionSectorId] || {};
    homeSessionUserOverride = homeEditorData.userOverrides[userId] || {};
    applySessionHomeSettings();
    renderHomeEditor();
    showToast("Página inicial atualizada.");
  } catch (error) {
    console.error("Não foi possível salvar a página inicial.", error);
    if (!saved && uploadedPaths.length && (!supabaseEnabled || !writeAttempted)) {
      try { await removeNewHomeImages(uploadedPaths); } catch (cleanupError) {
        console.error("Não foi possível remover imagens enviadas após a falha.", cleanupError);
        showToast("Não foi possível remover as imagens enviadas após a falha.");
      }
    }
    if (!saved && uploadedPaths.length && supabaseEnabled && writeAttempted) {
      showToast("Confirme se a alteração foi salva antes de remover as imagens enviadas.");
    }
    errorElement.textContent = `Não foi possível salvar as alterações. ${error.message || "Verifique a conexão e tente novamente."}`;
    errorElement.hidden = false;
  } finally {
    homeSettingsSaving = false;
    submitButton.disabled = false;
    document.querySelector("#admin-home-sector").disabled = false;
    document.querySelector("#admin-home-user").disabled = false;
    document.querySelector("#admin-home-user-search").disabled = false;
    document.querySelector("#admin-home-restore").disabled = false;
    document.querySelector("#admin-home-refresh").disabled = false;
    document.querySelectorAll("#admin-home-fields fieldset").forEach((fieldset) => { fieldset.disabled = false; });
  }
});

// ACOES DA CENTRAL DE AJUDA: abrir, cadastrar, editar e excluir contatos e tutoriais.
document.querySelector("#help-published-list").addEventListener("click", (event) => {
  const link = event.target.closest("[data-help-content-id]");
  if (link && location.hash === link.hash) {
    event.preventDefault();
    openHelpContent(link.dataset.helpContentId);
  }
});

document.querySelector("#open-help-contact-dialog").addEventListener("click", () => {
  if (!isSuperAdmin()) return;
  resetHelpContactForm();
  openAdminDialog("#help-contact-dialog", "Novo contato", "#help-contact-title");
});
document.querySelector("#cancel-help-contact").addEventListener("click", () => {
  if (!helpContactSaving) document.querySelector("#help-contact-dialog").close();
});
document.querySelector("#help-contact-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!isSuperAdmin() || helpContactSaving) return;
  const title = document.querySelector("#help-contact-title").value.trim();
  const summary = document.querySelector("#help-contact-summary").value.trim();
  const url = document.querySelector("#help-contact-url").value.trim();
  const errorElement = document.querySelector("#help-contact-error");
  errorElement.hidden = true;
  if (!title || !summary || !url) {
    errorElement.textContent = "Informe o nome, a descrição e o link de contato.";
    errorElement.hidden = false;
    return;
  }
  try {
    parseHelpContactUrl(url);
  } catch (error) {
    errorElement.textContent = "Informe um link de contato válido: http://, https://, mailto: ou tel:.";
    errorElement.hidden = false;
    return;
  }
  const submitButton = document.querySelector("#save-help-contact");
  helpContactSaving = true;
  submitButton.disabled = true;
  try {
    let item;
    const values = { title, summary, url };
    if (supabaseEnabled) {
      const query = editingHelpContactId
        ? window.trainingSupabase.from("help_contacts").update(values).eq("id", editingHelpContactId)
        : window.trainingSupabase.from("help_contacts").insert(values);
      item = assertSupabaseResult(await query.select().single(), "salvar o contato de ajuda");
    } else {
      item = { id: editingHelpContactId || crypto.randomUUID(), ...values };
    }
    const nextContacts = [...helpContacts];
    const index = nextContacts.findIndex((contact) => contact.id === item.id);
    if (index >= 0) nextContacts[index] = item;
    else nextContacts.push(item);
    if (!supabaseEnabled) localStorage.setItem(helpContactStorageKey, JSON.stringify(nextContacts));
    helpContacts = nextContacts;
    renderHelpContacts();
    renderAdminHelpContacts();
    showToast(editingHelpContactId ? "Contato atualizado." : "Contato adicionado.");
    document.querySelector("#help-contact-dialog").close();
  } catch (error) {
    console.error("Não foi possível salvar o contato de ajuda.", error);
    errorElement.textContent = "Não foi possível salvar o contato. Verifique a conexão e tente novamente.";
    errorElement.hidden = false;
  } finally {
    helpContactSaving = false;
    submitButton.disabled = false;
  }
});

document.querySelector("#admin-help-contact-list").addEventListener("click", async (event) => {
  if (!isSuperAdmin()) return;
  const button = event.target.closest("[data-help-contact-action]");
  if (!button || button.disabled) return;
  const item = helpContacts.find((contact) => contact.id === button.dataset.itemId);
  if (!item) {
    showToast("Contato não encontrado.");
    return;
  }
  if (button.dataset.helpContactAction === "edit") {
    resetHelpContactForm();
    editingHelpContactId = item.id;
    document.querySelector("#help-contact-title").value = item.title;
    document.querySelector("#help-contact-summary").value = item.summary;
    document.querySelector("#help-contact-url").value = item.url;
    openAdminDialog("#help-contact-dialog", "Editar contato", "#help-contact-title");
    return;
  }
  if (!window.confirm(`Excluir o contato "${item.title}" da central de ajuda?`)) return;
  button.disabled = true;
  try {
    if (supabaseEnabled) {
      assertSupabaseResult(
        await window.trainingSupabase.from("help_contacts").delete().eq("id", item.id).select().single(),
        "excluir o contato de ajuda",
      );
    }
    const nextContacts = helpContacts.filter((contact) => contact.id !== item.id);
    if (!supabaseEnabled) localStorage.setItem(helpContactStorageKey, JSON.stringify(nextContacts));
    helpContacts = nextContacts;
    renderHelpContacts();
    renderAdminHelpContacts();
    showToast("Contato excluído.");
  } catch (error) {
    console.error("Não foi possível excluir o contato de ajuda.", error);
    showToast("Não foi possível excluir o contato. Verifique a conexão e tente novamente.");
    button.disabled = false;
  }
});

document.querySelector("#add-help-content-step").addEventListener("click", () => {
  addHelpContentStep().focus();
});
document.querySelector("#help-content-steps").addEventListener("click", (event) => {
  const button = event.target.closest("[data-remove-help-step]");
  if (!button) return;
  button.closest("[data-help-step]").remove();
  updateHelpStepLabels();
});

document.querySelector("#open-help-content-dialog").addEventListener("click", () => {
  if (!isSuperAdmin()) return;
  resetHelpContentForm();
  openAdminDialog("#help-content-edit-dialog", "Novo conteúdo", "#help-content-title");
});
document.querySelector("#cancel-help-content").addEventListener("click", () => {
  if (!helpContentSaving) document.querySelector("#help-content-edit-dialog").close();
});
document.querySelector("#help-content-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!isSuperAdmin() || helpContentSaving) return;
  const title = document.querySelector("#help-content-title").value.trim();
  const summary = document.querySelector("#help-content-summary").value.trim();
  const body = document.querySelector("#help-content-body").value.trim();
  const steps = [...document.querySelectorAll("[data-help-step]")].map((row) => ({
    title: row.querySelector("[data-help-step-title]").value.trim(),
    description: row.querySelector("[data-help-step-description]").value.trim(),
  }));
  const errorElement = document.querySelector("#help-content-error");
  errorElement.hidden = true;
  if (!title || !summary || !steps.length) {
    errorElement.textContent = "Informe o título, o resumo e adicione pelo menos um passo.";
    errorElement.hidden = false;
    return;
  }
  if (steps.some((step) => !step.title || !step.description)) {
    errorElement.textContent = "Preencha o título e a descrição de cada passo ou remova os passos vazios.";
    errorElement.hidden = false;
    return;
  }
  const submitButton = document.querySelector("#save-help-content");
  helpContentSaving = true;
  submitButton.disabled = true;
  try {
    let item;
    const values = { title, summary, body, steps };
    if (supabaseEnabled) {
      const query = editingHelpContentId
        ? window.trainingSupabase.from("help_contents").update(values).eq("id", editingHelpContentId)
        : window.trainingSupabase.from("help_contents").insert(values);
      item = assertSupabaseResult(await query.select().single(), "salvar o conteúdo de ajuda");
    } else {
      item = { id: editingHelpContentId || crypto.randomUUID(), ...values };
    }
    const index = helpContents.findIndex((content) => content.id === item.id);
    const nextContents = [...helpContents];
    if (index >= 0) nextContents[index] = item;
    else nextContents.push(item);
    if (!supabaseEnabled) localStorage.setItem(helpContentStorageKey, JSON.stringify(nextContents));
    helpContents = nextContents;
    renderHelpContents();
    renderAdminHelpContents();
    renderAdminSummary();
    showToast(editingHelpContentId ? "Conteúdo de ajuda atualizado." : "Conteúdo de ajuda publicado.");
    document.querySelector("#help-content-edit-dialog").close();
  } catch (error) {
    console.error("Não foi possível salvar o conteúdo de ajuda.", error);
    errorElement.textContent = "Não foi possível salvar o conteúdo. Verifique a conexão e tente novamente.";
    errorElement.hidden = false;
  } finally {
    helpContentSaving = false;
    submitButton.disabled = false;
  }
});

document.querySelector("#admin-help-content-list").addEventListener("click", async (event) => {
  if (!isSuperAdmin()) return;
  const button = event.target.closest("[data-help-content-action]");
  if (!button || button.disabled) return;
  const item = helpContents.find((content) => content.id === button.dataset.itemId);
  if (!item) {
    showToast("Conteúdo de ajuda não encontrado.");
    return;
  }
  if (button.dataset.helpContentAction === "edit") {
    resetHelpContentForm();
    editingHelpContentId = item.id;
    document.querySelector("#help-content-title").value = item.title;
    document.querySelector("#help-content-summary").value = item.summary;
    document.querySelector("#help-content-body").value = item.body;
    if (!validHelpSteps(item.steps || [])) {
      showToast("Não foi possível editar os passos deste conteúdo.");
      console.error("Os passos do conteúdo de ajuda estão inválidos.", item.id);
      return;
    }
    (item.steps || []).forEach((step) => addHelpContentStep(step));
    document.querySelector("#save-help-content").textContent = "Salvar alterações";
    openAdminDialog("#help-content-edit-dialog", "Editar conteúdo", "#help-content-title");
    return;
  }
  if (!window.confirm(`Excluir o conteúdo de ajuda "${item.title}"?`)) return;
  button.disabled = true;
  try {
    if (supabaseEnabled) {
      assertSupabaseResult(
        await window.trainingSupabase.from("help_contents").delete().eq("id", item.id).select().single(),
        "excluir o conteúdo de ajuda",
      );
    }
    const nextContents = helpContents.filter((content) => content.id !== item.id);
    if (!supabaseEnabled) localStorage.setItem(helpContentStorageKey, JSON.stringify(nextContents));
    helpContents = nextContents;
    renderHelpContents();
    renderAdminHelpContents();
    renderAdminSummary();
    showToast("Conteúdo de ajuda excluído.");
  } catch (error) {
    console.error("Não foi possível excluir o conteúdo de ajuda.", error);
    showToast("Não foi possível excluir o conteúdo. Verifique a conexão e tente novamente.");
    button.disabled = false;
  }
});

// ACOES DE NAVEGACAO E ADMINISTRACAO: busca, abas e paginacao.
searchInput.addEventListener("input", () => {
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

adminTabButtons.forEach((button) => {
  button.addEventListener("click", () => activateAdminTab(button.dataset.adminTabButton));
  button.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
    const availableTabs = adminTabButtons.filter((tab) => !tab.hidden);
    const currentIndex = availableTabs.indexOf(button);
    const offset = event.key === "ArrowRight" ? 1 : -1;
    const nextTab = availableTabs[(currentIndex + offset + availableTabs.length) % availableTabs.length];
    event.preventDefault();
    activateAdminTab(nextTab.dataset.adminTabButton);
    nextTab.focus();
  });
});

document.querySelector("#admin-report-sector").addEventListener("change", () => {
  insightsReportPage = 1;
  renderReport();
});
document.querySelector("#admin-report-user").addEventListener("change", () => {
  insightsReportPage = 1;
  renderReport();
});
setupUserPicker(
  document.querySelector("#admin-report-user"), document.querySelector("#admin-report-user-search"),
  document.querySelector("#admin-report-user-menu"), document.querySelector("#admin-report-user-options"),
  document.querySelector("#admin-report-user-search-status"),
);
document.querySelector("#admin-report-page-previous").addEventListener("click", () => {
  insightsReportPage = Math.max(1, insightsReportPage - 1);
  renderReport();
});
document.querySelector("#admin-report-page-next").addEventListener("click", () => {
  insightsReportPage += 1;
  renderReport();
});
document.querySelector("#admin-report-refresh").addEventListener("click", loadAdminInsightsReport);
document.querySelector("#admin-report-export").addEventListener("click", exportAdminInsightsReport);

document.querySelector("#open-user-create-dialog").addEventListener("click", () => {
  resetUserForm();
  openAdminDialog("#user-edit-dialog", "Novo acesso", "#managed-user-name");
});

document.querySelector("#admin-user-page-size").addEventListener("change", (event) => {
  adminUserPageSize = Number(event.target.value);
  adminUserPage = 1;
  renderAdminUsers();
});

document.querySelector("#admin-user-page-previous").addEventListener("click", () => {
  adminUserPage = Math.max(1, adminUserPage - 1);
  renderAdminUsers();
});

document.querySelector("#admin-user-page-next").addEventListener("click", () => {
  adminUserPage += 1;
  renderAdminUsers();
});

document.querySelector("#module-list-course").addEventListener("change", () => {
  modulePage = 1;
  renderCourseModules();
});

document.querySelector("#module-page-size").addEventListener("change", (event) => {
  modulePageSize = Number(event.target.value);
  modulePage = 1;
  renderCourseModules();
});

document.querySelector("#course-module-page-previous").addEventListener("click", () => {
  modulePage = Math.max(1, modulePage - 1);
  renderCourseModules();
});

document.querySelector("#course-module-page-next").addEventListener("click", () => {
  modulePage += 1;
  renderCourseModules();
});

document.querySelector("#course-content-page-size").addEventListener("change", (event) => {
  courseContentPageSize = Number(event.target.value);
  courseContentPage = 1;
  renderPublishedContent();
});

document.querySelector("#course-content-platform-filter").addEventListener("change", (event) => {
  courseContentPlatform = event.target.value;
  courseContentPage = 1;
  renderPublishedContent();
});

document.querySelector("#course-content-page-previous").addEventListener("click", () => {
  courseContentPage = Math.max(1, courseContentPage - 1);
  renderPublishedContent();
});

document.querySelector("#course-content-page-next").addEventListener("click", () => {
  courseContentPage += 1;
  renderPublishedContent();
});

document.querySelector("#orientation-page-size").addEventListener("change", (event) => {
  orientationPageSize = Number(event.target.value);
  orientationPage = 1;
  renderPublishedContent();
});

document.querySelector("#orientation-page-previous").addEventListener("click", () => {
  orientationPage = Math.max(1, orientationPage - 1);
  renderPublishedContent();
});

document.querySelector("#orientation-page-next").addEventListener("click", () => {
  orientationPage += 1;
  renderPublishedContent();
});

// ACOES DE LOGIN: credenciais e opcao de lembrar o dispositivo.
demoLoginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!supabaseEnabled) {
    showToast("O login real será configurado depois. Você está usando a prévia local.");
    return;
  }
  const client = window.trainingSupabase;
  if (!client) {
    demoLoginError.textContent = "Não foi possível conectar ao Supabase. Verifique sua conexão e recarregue a página.";
    demoLoginError.hidden = false;
    return;
  }
  const submitButton = demoLoginForm.querySelector('button[type="submit"]');
  const submitLabel = submitButton.textContent;
  submitButton.disabled = true;
  submitButton.textContent = "Carregando...";
  submitButton.setAttribute("aria-busy", "true");
  demoLoginError.hidden = true;
  let signedIn = false;
  try {
    window.trainingAuthStorage.setRememberSession(document.querySelector("#demo-remember-device").checked);
    const { data, error } = await client.auth.signInWithPassword({
      email: document.querySelector("#demo-email").value.trim(),
      password: document.querySelector("#demo-password").value,
    });
    if (error) throw error;
    if (!data.session) throw new Error("Não foi possível iniciar a sessão.");
    signedIn = true;
    await loadSupabaseWorkspace(data.session);
    document.querySelector("#demo-password").value = "";
  } catch (error) {
    console.error("Não foi possível entrar na Academy.", error);
    if (signedIn) {
      const { error: signOutError } = await client.auth.signOut();
      if (signOutError) console.error("Não foi possível encerrar a sessão após a falha de acesso.", signOutError);
    }
    showLoginScreen(signedIn
      ? "Não foi possível carregar os dados do Supabase. Confira se a migração de persistência foi aplicada e se seu perfil está ativo."
      : "Não foi possível entrar. Confira o e-mail e a senha e tente novamente.");
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = submitLabel;
    submitButton.removeAttribute("aria-busy");
  }
});

// ACOES DE SETORES E DISPONIBILIDADE: selecao, equipes e opcoes de conteudo.
async function selectAdminSector(sectorId) {
  if (supabaseEnabled) {
    try {
      await persistCloudUserState({ active_sector_id: sectorId });
    } catch (error) {
      console.error("Não foi possível salvar o setor administrativo selecionado.", error);
      showToast("Não foi possível salvar o setor selecionado.");
      return;
    }
  } else {
    localStorage.setItem(activeSectorStorageKey, sectorId);
  }
  activeSectorId = sectorId;
  renderAdminPanel();
  refreshSectorViews();
}

document.querySelector("#content-sector-select").addEventListener("change", (event) => {
  selectAdminSector(event.target.value);
});

document.querySelector("#managed-user-sector").addEventListener("change", () => {
  renderManagedUserTeams();
});

document.querySelector("#admin-sector-page-previous").addEventListener("click", () => {
  adminSectorPage = Math.max(1, adminSectorPage - 1);
  renderAdminSectorList();
});

document.querySelector("#admin-sector-page-next").addEventListener("click", () => {
  adminSectorPage += 1;
  renderAdminSectorList();
});

document.querySelector("#admin-sector-list").addEventListener("click", (event) => {
  const editButton = event.target.closest("[data-edit-sector]");
  if (!editButton) return;

  void selectAdminSector(editButton.dataset.editSector).then(() => {
    if (activeSectorId === editButton.dataset.editSector) {
      openAdminDialog("#sector-edit-dialog", `Editar setor: ${getActiveSector().name}`, "#admin-sector-name");
    }
  });
});

document.querySelector("#admin-sector-team-select").addEventListener("change", (event) => {
  const rows = document.querySelectorAll("#admin-sector-teams .admin-team-row");
  updateSectorTeamSelection(event.target.value === "" ? null : rows[Number(event.target.value)]);
});

document.querySelector("#add-sector-team").addEventListener("click", () => {
  const nameInput = addSectorTeamRow();
  updateSectorTeamSelection(nameInput.closest(".admin-team-row"));
  nameInput.focus();
});

document.querySelector("#open-sector-add-dialog").addEventListener("click", () => {
  document.querySelector("#new-sector-name").value = "";
  document.querySelector("#new-sector-vps").value = "";
  document.querySelector("#new-sector-teams").value = "";
  openAdminDialog("#sector-add-dialog", "Adicionar setor", "#new-sector-name");
});

document.querySelector("#open-sector-assignment-dialog").addEventListener("click", () => {
  openAdminDialog(
    "#sector-assignment-dialog",
    `Disponibilidade de ${getActiveSector().name}`,
    "#admin-course-options input",
  );
});

const assignmentNameLists = {
  course: "#admin-course-options",
  resource: "#admin-resource-options",
  platform: "#admin-platform-options",
};

document.querySelectorAll("[data-add-assignment-name]").forEach((button) => {
  button.addEventListener("click", () => {
    const form = document.querySelector(`[data-assignment-name-form="${button.dataset.addAssignmentName}"]`);
    form.hidden = false;
    const error = form.querySelector(".admin-assignment-name-error");
    error.hidden = true;
    form.querySelector("[data-assignment-name-input]").focus();
  });
});

document.querySelectorAll("[data-assignment-name-form]").forEach((form) => {
  const input = form.querySelector("[data-assignment-name-input]");
  const error = form.querySelector(".admin-assignment-name-error");
  const confirmButton = form.querySelector("[data-confirm-assignment-name]");
  form.querySelector("[data-cancel-assignment-name]").addEventListener("click", () => {
    input.value = "";
    error.hidden = true;
    form.hidden = true;
    document.querySelector(`[data-add-assignment-name="${form.dataset.assignmentNameForm}"]`).focus();
  });
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      confirmButton.click();
    }
  });
  confirmButton.addEventListener("click", () => {
    const title = input.value.trim();
    const type = form.dataset.assignmentNameForm;
    const list = document.querySelector(assignmentNameLists[type]);
    if (!title) {
      error.textContent = "Informe um nome.";
      error.hidden = false;
      input.focus();
      return;
    }
    if ([...list.querySelectorAll(".admin-option strong")].some((item) => normalizeText(item.textContent.trim()) === normalizeText(title))) {
      error.textContent = "Esse nome já existe nesta lista.";
      error.hidden = false;
      input.focus();
      return;
    }
    const item = { id: `name-${type}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, type, title };
    pendingAssignmentNames.push(item);
    const holder = document.createElement("div");
    renderAdminOptions(holder, [item], [], type);
    list.append(holder.firstElementChild);
    input.value = "";
    error.hidden = true;
    form.hidden = true;
    list.lastElementChild.scrollIntoView({ block: "nearest" });
    list.lastElementChild.querySelector("input").focus();
  });
});

document.querySelector("#admin-course-options").addEventListener("click", (event) => {
  const button = event.target.closest("[data-edit-course]");
  if (!button || !isSuperAdmin()) return;
  const id = button.dataset.editCourse;
  const course = courses[id];
  const error = document.querySelector("#admin-assignment-save-error");
  error.hidden = true;
  if (!course) {
    error.textContent = "Não foi possível encontrar a trilha para edição.";
    error.hidden = false;
    return;
  }
  editingCourseId = id;
  editingCourseImageFile = null;
  editingCourseImageRemoved = false;
  document.querySelector("#course-edit-name").value = course.title;
  document.querySelector("#course-edit-description").value = course.description;
  document.querySelector("#course-profile-image-input").value = "";
  document.querySelector("#course-edit-error").hidden = true;
  document.querySelector("#remove-course-profile-image").hidden = !course.imageFileId;
  document.querySelector("#remove-course-profile-image").textContent = "Remover imagem atual";
  clearCourseProfilePreview();
  openAdminDialog("#course-edit-dialog", `Editar trilha: ${course.title}`, "#course-edit-name");
  loadCourseProfilePreview(id);
});

document.querySelector("#course-profile-image-input").addEventListener("change", (event) => {
  const input = event.currentTarget;
  const file = input.files[0];
  if (!file) return;
  const error = document.querySelector("#course-edit-error");
  if (!isSupportedCourseFile(file, "image") || file.size > 5 * 1024 * 1024) {
    error.textContent = "Selecione uma imagem válida de até 5 MB.";
    error.hidden = false;
    input.value = "";
    return;
  }
  editingCourseImageFile = file;
  editingCourseImageRemoved = false;
  error.hidden = true;
  document.querySelector("#remove-course-profile-image").hidden = false;
  document.querySelector("#remove-course-profile-image").textContent = "Limpar imagem selecionada";
  showCourseProfilePreview(file);
});

document.querySelector("#remove-course-profile-image").addEventListener("click", () => {
  const course = courses[editingCourseId];
  if (editingCourseImageFile) {
    editingCourseImageFile = null;
    document.querySelector("#course-profile-image-input").value = "";
    editingCourseImageRemoved = false;
    document.querySelector("#remove-course-profile-image").textContent = "Remover imagem atual";
    document.querySelector("#remove-course-profile-image").hidden = !course?.imageFileId;
    clearCourseProfilePreview();
    if (course?.imageFileId) loadCourseProfilePreview(editingCourseId);
    return;
  }
  if (!course?.imageFileId) return;
  editingCourseImageRemoved = !editingCourseImageRemoved;
  document.querySelector("#remove-course-profile-image").textContent = editingCourseImageRemoved
    ? "Manter imagem atual"
    : "Remover imagem atual";
  if (editingCourseImageRemoved) clearCourseProfilePreview();
  else loadCourseProfilePreview(editingCourseId);
});

// ACOES DE TRILHAS E DISPONIBILIDADE: edicao e exclusao.
document.querySelector("#course-edit-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!isSuperAdmin()) return;
  const error = document.querySelector("#course-edit-error");
  const title = document.querySelector("#course-edit-name").value.trim();
  const description = document.querySelector("#course-edit-description").value.trim();
  const course = courses[editingCourseId];
  if (!course) {
    error.textContent = "Não foi possível salvar as alterações da trilha.";
    error.hidden = false;
    return;
  }
  if (!title || title.length > 120 || !description || description.length > 500) {
    error.textContent = "Informe um nome e uma descrição para a trilha dentro dos limites indicados.";
    error.hidden = false;
    return;
  }

  const previousImageFileId = course.imageFileId || null;
  let imageFileId = editingCourseImageRemoved ? null : previousImageFileId;
  let uploadedImageFileId = null;
  try {
    if (editingCourseImageFile) {
      imageFileId = await storeCourseFile(`course-profile-${editingCourseId}-${Date.now()}`, editingCourseImageFile);
      uploadedImageFileId = imageFileId;
    }
    if (supabaseEnabled) {
      assertSupabaseResult(await window.trainingSupabase.from("course_overrides").upsert({
        course_id: editingCourseId,
        title,
        description,
        image_path: imageFileId,
        deleted: false,
        updated_at: new Date().toISOString(),
      }, { onConflict: "course_id" }), "salvar a trilha");
    } else {
      const saved = JSON.parse(localStorage.getItem(courseDetailsStorageKey) || "{}");
      if (!saved || typeof saved !== "object" || Array.isArray(saved)) throw new Error("Dados salvos das trilhas têm formato inválido.");
      saved[editingCourseId] = { title, description, imageFileId };
      localStorage.setItem(courseDetailsStorageKey, JSON.stringify(saved));
    }
  } catch (saveError) {
    if (uploadedImageFileId) {
      try {
        await deleteCourseFile(uploadedImageFileId);
      } catch (cleanupError) {
        console.error("Não foi possível remover a imagem não salva da trilha.", cleanupError);
      }
    }
    console.error("Não foi possível salvar as alterações da trilha.", saveError);
    error.textContent = `Não foi possível salvar as alterações ${supabaseEnabled ? "no Supabase" : "neste navegador"}. Tente novamente.`;
    error.hidden = false;
    return;
  }

  course.title = title;
  course.description = description;
  if (imageFileId) course.imageFileId = imageFileId;
  else delete course.imageFileId;
  const card = courseCards.find((item) => item.dataset.courseId === editingCourseId);
  if (card) {
    card.querySelector(".course-info h3").textContent = title;
    card.querySelector(".course-info > p").textContent = description;
    card.querySelector(".start-button").setAttribute("aria-label", `Ver ${title}`);
    const image = card.querySelector(".course-cover-image");
    if (image) image.alt = `Imagem de perfil da trilha ${title}`;
  }
  const assignmentRow = [...document.querySelectorAll("#admin-course-options [data-edit-course]")]
    .find((item) => item.dataset.editCourse === editingCourseId)?.closest(".admin-assignment-option-row");
  if (assignmentRow) {
    assignmentRow.querySelector(".admin-option strong").textContent = title;
    assignmentRow.querySelector("[data-edit-course]").setAttribute("aria-label", `Editar trilha ${title}`);
    assignmentRow.querySelector("[data-delete-assignment-type]").setAttribute("aria-label", `Excluir ${title}`);
  }
  if (editingCourseImageFile) applyCourseProfileImage(editingCourseId, editingCourseImageFile);
  else if (editingCourseImageRemoved) removeCourseProfileImageFromCard(editingCourseId);
  updateCourseCards();
  updateProgressUI();
  document.querySelector("#course-edit-dialog").close();
  showToast("As informações da trilha foram atualizadas.");
  if (previousImageFileId && previousImageFileId !== imageFileId) {
    try {
      await deleteCourseFile(previousImageFileId);
    } catch (deleteError) {
      console.error("As alterações foram salvas, mas não foi possível remover a imagem anterior da trilha.", deleteError);
      showToast("Trilha atualizada. Não foi possível remover a imagem anterior.");
    }
  }
});

document.querySelector("#sector-assignment-dialog").addEventListener("click", async (event) => {
  const button = event.target.closest("[data-delete-assignment-type]");
  if (!button || !isSuperAdmin()) return;
  const errorMessage = document.querySelector("#admin-assignment-save-error");
  errorMessage.hidden = true;
  const type = button.dataset.deleteAssignmentType;
  const id = button.dataset.itemId;
  const title = button.closest(".admin-assignment-option-row").querySelector("strong").textContent;
  const pending = pendingAssignmentNames.find((item) => item.type === type && item.id === id);
  const platform = type === "platform" && materialPlatforms[id];
  const resource = type === "resource" && resources.find((item) => item.id === id);
  const orientation = resource && publishedOrientations.find((item) => item.id === id);
  const warning = platform
    ? "Isso também excluirá os módulos, conteúdos e arquivos publicados nessa plataforma."
    : orientation ? "A orientação publicada e seu anexo também serão excluídos." : "O item deixará de estar disponível para todos os setores.";
  if (!window.confirm(`Excluir "${title}"? ${warning} A exclusão é imediata.`)) return;
  if (pending) {
    pendingAssignmentNames = pendingAssignmentNames.filter((item) => item.id !== id);
    button.closest(".admin-assignment-option-row").remove();
    return;
  }

  button.disabled = true;
  let savedNames;
  try {
    savedNames = supabaseEnabled ? customAssignmentNames : JSON.parse(localStorage.getItem(assignmentNamesStorageKey) || "[]");
    if (!Array.isArray(savedNames)) throw new Error("Lista de nomes inválida.");
  } catch (error) {
    console.error("Não foi possível ler os nomes da disponibilidade.", error);
    errorMessage.textContent = "Não foi possível ler os nomes salvos. Nenhum item foi excluído.";
    errorMessage.hidden = false;
    button.disabled = false;
    return;
  }
  const custom = savedNames.some((item) => item.type === type && item.id === id);
  if (!custom && !(type === "course" && courses[id]) && !resource && !platform) {
    errorMessage.textContent = "Não foi possível encontrar este item para exclusão.";
    errorMessage.hidden = false;
    button.disabled = false;
    return;
  }
  const removedResourceIds = new Set(platform ? resources.filter((item) => item.platform === id).map((item) => item.id) : []);
  if (resource) removedResourceIds.add(id);
  const removedMaterials = platform ? courseMaterials.filter((item) => item.courseId === id) : [];
  const nextMaterials = courseMaterials.filter((item) => !removedMaterials.includes(item));
  const nextModules = platform ? courseModules.filter((item) => item.courseId !== id) : courseModules;
  const nextOrientations = orientation ? publishedOrientations.filter((item) => item.id !== id) : publishedOrientations;
  const removedCourseImageFileId = type === "course" && !custom ? courses[id]?.imageFileId : null;
  const nextAssignments = Object.fromEntries(Object.entries(sectorAssignments).map(([sectorId, assignment]) => [
    sectorId,
    {
      ...assignment,
      courseIds: assignment.courseIds.filter((value) => type !== "course" || value !== id),
      resourceIds: assignment.resourceIds.filter((value) => !removedResourceIds.has(value) && !(custom && type === "resource" && value === id)),
      platformIds: (assignment.platformIds || []).filter((value) => type !== "platform" || value !== id),
    },
  ]));
  const nextDeleted = {
    course: [...deletedBuiltIns.course],
    resource: [...deletedBuiltIns.resource],
    platform: [...deletedBuiltIns.platform],
  };
  if (!custom && !orientation) nextDeleted[type].push(id);
  const nextProgress = type === "course" && !custom
    ? { ...progress, completedCourses: progress.completedCourses.filter((value) => value !== id) }
    : progress;
  const changes = new Map([
    [assignmentsStorageKey, nextAssignments],
    ...(custom ? [[assignmentNamesStorageKey, savedNames.filter((item) => !(item.type === type && item.id === id))]] : []),
    ...(!custom && !orientation ? [[deletedBuiltInsStorageKey, nextDeleted]] : []),
    ...(platform ? [[courseContentStorageKey, nextMaterials], [courseModulesStorageKey, nextModules]] : []),
    ...(orientation ? [[orientationStorageKey, nextOrientations]] : []),
    ...(nextProgress !== progress ? [[storageKey, nextProgress]] : []),
  ]);
  const previous = new Map();
  try {
    if (supabaseEnabled) {
      if (custom) {
        assertSupabaseResult(await window.trainingSupabase.from("assignment_options").delete().eq("id", id), "excluir o nome personalizado");
      } else if (type === "course") {
        const course = courses[id];
        assertSupabaseResult(await window.trainingSupabase.from("course_overrides").upsert({
          course_id: id,
          title: course.title,
          description: course.description,
          image_path: null,
          deleted: true,
          updated_at: new Date().toISOString(),
        }, { onConflict: "course_id" }), "excluir a trilha");
      } else if (!orientation) {
        assertSupabaseResult(await window.trainingSupabase.from("deleted_catalog_items").upsert({
          item_id: id,
          type,
          deleted_at: new Date().toISOString(),
        }, { onConflict: "item_id,type" }), "excluir o item do catálogo");
      }
      await persistCloudAssignments(nextAssignments);
      if (platform || orientation) {
        await persistCloudContent({
          modules: nextModules,
          materials: nextMaterials,
          orientations: nextOrientations,
        });
      }
      if (nextProgress !== progress) {
        await persistCloudUserState({ progress: nextProgress });
      }
    } else {
      for (const [key, value] of changes) {
        const oldValue = localStorage.getItem(key);
        previous.set(key, oldValue);
        localStorage.setItem(key, JSON.stringify(value));
      }
    }
  } catch (error) {
    console.error("Não foi possível salvar a exclusão.", error);
    if (supabaseEnabled) {
      button.disabled = false;
      let reloadFailed = false;
      try {
        await reloadSupabaseWorkspace();
      } catch (reloadError) {
        console.error("Não foi possível recarregar os dados após a falha na exclusão.", reloadError);
        reloadFailed = true;
      }
      errorMessage.textContent = reloadFailed
        ? "A exclusão falhou e não foi possível confirmar o estado atual. Recarregue a página."
        : "Não foi possível concluir a exclusão no Supabase. Confira os dados e tente novamente.";
      errorMessage.hidden = false;
      return;
    }
    let rollbackFailed = false;
    for (const [key, value] of previous) {
      try {
        if (value === null) localStorage.removeItem(key);
        else localStorage.setItem(key, value);
      } catch (rollbackError) {
        console.error("Não foi possível restaurar os dados após a falha.", rollbackError);
        rollbackFailed = true;
      }
    }
    errorMessage.textContent = rollbackFailed
      ? "Falha ao excluir e restaurar os dados. Recarregue a página e confira os conteúdos e setores."
      : "Não foi possível salvar a exclusão. Nenhum item foi excluído.";
    errorMessage.hidden = false;
    button.disabled = false;
    return;
  }

  sectorAssignments = nextAssignments;
  deletedBuiltIns = nextDeleted;
  courseMaterials = nextMaterials;
  courseModules = nextModules;
  publishedOrientations = nextOrientations;
  progress = nextProgress;
  if (custom) customAssignmentNames = customAssignmentNames.filter((item) => !(item.type === type && item.id === id));
  defaultSectorAssignment.courseIds = defaultSectorAssignment.courseIds.filter((value) => type !== "course" || value !== id);
  defaultSectorAssignment.resourceIds = defaultSectorAssignment.resourceIds.filter((value) => !removedResourceIds.has(value));
  defaultSectorAssignment.platformIds = defaultSectorAssignment.platformIds.filter((value) => type !== "platform" || value !== id);
  if (type === "course" && !custom) {
    removeCourseProfileImageFromCard(id);
    delete courses[id];
    const index = courseCards.findIndex((card) => card.dataset.courseId === id);
    if (index >= 0) courseCards.splice(index, 1)[0].remove();
  }
  if (platform) {
    delete materialPlatforms[id];
    document.querySelector(`[data-count="${id}"]`)?.closest(".platform-card")?.remove();
  }
  for (let index = resources.length - 1; index >= 0; index -= 1) {
    if (removedResourceIds.has(resources[index].id)) resources.splice(index, 1);
  }
  button.closest(".admin-assignment-option-row").remove();
  document.querySelectorAll('[data-delete-assignment-type="resource"]').forEach((removeButton) => {
    if (removedResourceIds.has(removeButton.dataset.itemId)) removeButton.closest(".admin-assignment-option-row").remove();
  });
  renderResources();
  renderPublishedContent();
  renderAdminSummary();
  refreshSectorViews();

  const retainedFileIds = new Set([...nextMaterials, ...nextOrientations].map((item) => item.fileId).filter(Boolean));
  const fileIds = [...new Set([...removedMaterials, ...(orientation ? [orientation] : [])]
    .map((item) => item.fileId).filter((fileId) => fileId && !retainedFileIds.has(fileId))
    .concat(removedCourseImageFileId ? [removedCourseImageFileId] : []))];
  let cleanupFailed = false;
  for (const fileId of fileIds) {
    try {
      await deleteCourseFile(fileId);
    } catch (error) {
      console.error("Não foi possível excluir um arquivo do armazenamento.", error);
      cleanupFailed = true;
    }
  }
  if (cleanupFailed) {
    errorMessage.textContent = "O item foi excluído, mas não foi possível apagar todos os arquivos do armazenamento.";
    errorMessage.hidden = false;
  }
});

// ACOES DE ACESSOS: cadastro, edicao, senha, bloqueio e exclusao.
document.querySelector("#admin-user-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  if (userAccessSaving) return;
  const formError = document.querySelector("#admin-user-error");
  formError.hidden = true;
  const showFormError = (message) => {
    formError.textContent = message;
    formError.hidden = false;
  };
  const name = document.querySelector("#managed-user-name").value.trim();
  const email = document.querySelector("#managed-user-email").value.trim().toLocaleLowerCase("pt-BR");
  const role = document.querySelector("#managed-user-role").value;
  const sectorId = document.querySelector("#managed-user-sector").value;
  const team = document.querySelector("#managed-user-team").value.trim();
  const password = document.querySelector("#managed-user-password").value;
  if (!name) {
    showFormError("Informe o nome do usuário.");
    return;
  }
  if (!email || !sectorId) {
    showFormError("Informe um e-mail e selecione um setor para o acesso.");
    return;
  }
  if (supabaseEnabled && (!editingUserId || password) && password.length < 8) {
    showFormError("A senha deve ter pelo menos 8 caracteres.");
    return;
  }
  if (role === "super-admin" && !isSuperAdmin()) {
    showFormError("Somente um Super Admin pode conceder esse perfil.");
    return;
  }

  const duplicate = users.find((user) => user.email.toLocaleLowerCase("pt-BR") === email && user.id !== editingUserId);
  if (duplicate) {
    showFormError("Esse e-mail já possui acesso.");
    return;
  }

  const editingUser = users.find((user) => user.id === editingUserId);
  if (editingUser && isSystemAdminUser(editingUser)) {
    showFormError("Seu próprio acesso não pode ser alterado por aqui.");
    return;
  }
  if (editingUser && !isSuperAdmin() && editingUser.role === "super-admin") {
    showFormError("Você não pode alterar o acesso de um Super Admin.");
    return;
  }

  if (supabaseEnabled) {
    const form = event.currentTarget;
    const dialog = document.querySelector("#user-edit-dialog");
    const closeButton = dialog.querySelector("[data-admin-modal-close]");
    const saveButton = document.querySelector("#save-user-access");
    const saveLabel = saveButton.textContent;
    const enabledControls = [...form.elements].filter((control) => !control.disabled);
    userAccessSaving = true;
    enabledControls.forEach((control) => { control.disabled = true; });
    closeButton.disabled = true;
    saveButton.textContent = "Salvando...";
    saveButton.setAttribute("aria-busy", "true");
    form.setAttribute("aria-busy", "true");
    let result;
    try {
      result = await invokeUserManagement({
        action: editingUser ? "update" : "create",
        userId: editingUser?.id,
        name,
        email,
        role,
        sectorId,
        team,
        password,
      });
    } catch (error) {
      console.error("Não foi possível salvar o acesso no Supabase.", error);
      showFormError(error.message || "Não foi possível salvar o acesso.");
      return;
    } finally {
      userAccessSaving = false;
      enabledControls.forEach((control) => { control.disabled = false; });
      closeButton.disabled = false;
      saveButton.textContent = saveLabel;
      saveButton.removeAttribute("aria-busy");
      form.removeAttribute("aria-busy");
    }
    if (editingUser) {
      Object.assign(editingUser, { name, email, role, sectorId, team });
    } else if (result?.userId) {
      users.push({ id: result.userId, name, email, role, sectorId, team, accessBlocked: false });
    } else {
      showToast("Acesso criado, mas não foi possível atualizar a lista. Recarregue a página.");
      return;
    }
  } else if (editingUser) {
    Object.assign(editingUser, { name, email, role, sectorId, team });
    saveUsers();
  } else {
    users.push({
      id: `preview-user-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name,
      email,
      role,
      sectorId,
      team,
      accessBlocked: false,
    });
    saveUsers();
  }
  const accessCreated = !editingUser;
  const dialog = document.querySelector("#user-edit-dialog");
  if (accessCreated) resetUserForm();
  else dialog.close();
  const message = supabaseEnabled
    ? (editingUser ? "Acesso atualizado." : "Acesso criado.")
    : (editingUser ? "Acesso atualizado na prévia local." : "Acesso criado na prévia local. O login real será configurado depois.");
  showToast(message);
  renderAdminUsers();
  renderAdminSummary();
});

document.querySelector("#cancel-user-edit").addEventListener("click", () => {
  document.querySelector("#user-edit-dialog").close();
});

document.querySelector("#admin-user-list").addEventListener("click", async (event) => {
  const button = event.target.closest("[data-user-action]");
  if (!button) return;
  const user = users.find((item) => item.id === button.dataset.itemId);
  if (!user) return;

  if (button.dataset.userAction === "edit") {
    if (isSystemAdminUser(user)) return;
    prepareUserEdit(user);
    return;
  }

  if (button.dataset.userAction === "password") {
    if (isSystemAdminUser(user)) return;
    prepareUserEdit(user, true);
    return;
  }

  if (button.dataset.userAction === "toggle-access") {
    const currentUserEmail = demoSession?.email.toLocaleLowerCase("pt-BR");
    const isCurrentUser = user.email.toLocaleLowerCase("pt-BR") === currentUserEmail;
    if (isSystemAdminUser(user) || isCurrentUser || (!isSuperAdmin() && user.role === "super-admin")) return;
    const accessBlocked = !user.accessBlocked;
    if (!window.confirm(`${accessBlocked ? "Bloquear" : "Desbloquear"} o acesso de ${user.name}?`)) return;
    if (supabaseEnabled) {
      try {
        assertSupabaseResult(
          await window.trainingSupabase.from("profiles")
            .update({ access_blocked: accessBlocked })
            .eq("id", user.id)
            .select("id")
            .single(),
          "atualizar o acesso",
        );
      } catch (error) {
        console.error("Não foi possível atualizar o acesso no Supabase.", error);
        showToast("Não foi possível atualizar o acesso.");
        return;
      }
    }
    user.accessBlocked = accessBlocked;
    if (!supabaseEnabled) saveUsers();
    renderAdminPanel();
    showToast(`Acesso de ${user.name} ${accessBlocked ? "bloqueado" : "desbloqueado"}.`);
    return;
  }

  if (button.dataset.userAction === "delete") {
    if (isSystemAdminUser(user) || user.email === demoSession.email || (!isSuperAdmin() && user.role === "super-admin")) return;
    if (!window.confirm(`Excluir o acesso de ${user.name}?`)) return;
    if (supabaseEnabled) {
      try {
        await invokeUserManagement({ action: "delete", userId: user.id });
        await reloadSupabaseWorkspace();
      } catch (error) {
        console.error("Não foi possível excluir o acesso no Supabase.", error);
        showToast(error.message || "Não foi possível excluir o acesso.");
        return;
      }
    } else {
      users = users.filter((item) => item.id !== user.id);
      saveUsers();
    }
    renderAdminPanel();
    showToast("Acesso removido.");
  }
});

// ACOES DE MODULOS: criacao, edicao e exclusao.
function resetCourseModuleForm() {
  editingModuleId = null;
  document.querySelector("#module-title").value = "";
  document.querySelector("#module-description").value = "";
  document.querySelector("#module-course").disabled = false;
  document.querySelector("#save-course-module").textContent = "Criar módulo";
  document.querySelector("#cancel-module-edit").hidden = true;
}

document.querySelector("#content-course").addEventListener("change", () => renderModuleOptions(""));
document.querySelector("#open-course-module-dialog").addEventListener("click", () => {
  resetCourseModuleForm();
  document.querySelector("#module-course").value = document.querySelector("#module-list-course").value;
  openAdminDialog("#course-module-dialog", "Adicionar módulo", "#module-title");
});
document.querySelector("#cancel-module-edit").addEventListener("click", () => {
  document.querySelector("#course-module-dialog").close();
});
document.querySelector("#course-module-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!isSuperAdmin()) return;
  const courseId = document.querySelector("#module-course").value;
  const title = document.querySelector("#module-title").value.trim();
  const description = document.querySelector("#module-description").value.trim();
  if (!materialPlatforms[courseId] || !title) {
    showToast("Selecione uma plataforma em Materiais e informe o título do módulo.");
    return;
  }
  if (courseModules.some((module) => module.courseId === courseId && module.id !== editingModuleId
    && normalizeText(module.title.trim()) === normalizeText(title))) {
    showToast("Já existe um módulo com esse título nesta plataforma.");
    return;
  }
  const editingModule = courseModules.find((module) => module.id === editingModuleId);
  if (editingModuleId && !editingModule) {
    showToast("Não foi possível encontrar o módulo para edição.");
    return;
  }
  let moduleId = editingModuleId;
  if (editingModule) {
    editingModule.title = title;
    editingModule.description = description;
    editingModule.courseId = courseId;
    courseMaterials.filter((item) => item.moduleId === moduleId)
      .forEach((item) => { item.courseId = courseId; });
  } else {
    moduleId = `module-${Date.now()}`;
    while (courseModules.some((module) => module.id === moduleId)) moduleId += "-1";
    courseModules.push({ id: moduleId, courseId, title, description });
  }
  document.querySelector("#module-list-course").value = courseId;
  const moduleIndex = courseModules.filter((module) => module.courseId === courseId)
    .findIndex((module) => module.id === moduleId);
  modulePage = Math.floor(moduleIndex / modulePageSize) + 1;
  resetCourseModuleForm();
  document.querySelector("#content-course").value = courseId;
  try {
    await refreshPublishedContent();
  } catch (error) {
    console.error("Não foi possível publicar o módulo no Supabase.", error);
    showToast("Não foi possível salvar o módulo no Supabase. Confira as permissões e tente novamente.");
    return;
  }
  renderModuleOptions(moduleId);
  showToast(editingModule ? "Módulo atualizado." : "Módulo criado. Adicione as aulas e os materiais abaixo.");
  document.querySelector("#course-module-dialog").close();
});

document.querySelector("#course-module-list").addEventListener("click", async (event) => {
  if (!isSuperAdmin()) return;
  const button = event.target.closest("[data-course-module-action]");
  const module = courseModules.find((item) => item.id === button?.dataset.itemId);
  if (!module) return;
  if (button.dataset.courseModuleAction === "edit") {
    editingModuleId = module.id;
    document.querySelector("#module-list-course").value = module.courseId;
    modulePage = 1;
    renderCourseModules();
    document.querySelector("#module-course").value = module.courseId;
    document.querySelector("#module-title").value = module.title;
    document.querySelector("#module-description").value = module.description || "";
    document.querySelector("#save-course-module").textContent = "Salvar módulo";
    document.querySelector("#cancel-module-edit").hidden = false;
    openAdminDialog("#course-module-dialog", "Editar módulo", "#module-title");
    return;
  }
  if (courseMaterials.some((item) => item.moduleId === module.id && item.courseId === module.courseId)) {
    showToast("Para excluir este módulo, primeiro mova ou exclua seus conteúdos.");
    return;
  }
  if (!window.confirm(`Excluir o módulo "${module.title}"?`)) return;
  if (supabaseEnabled) {
    try {
      assertSupabaseResult(
        await window.trainingSupabase.from("course_modules").delete().eq("id", module.id),
        "excluir o módulo",
      );
    } catch (error) {
      console.error("Não foi possível excluir o módulo no Supabase.", error);
      showToast("Não foi possível excluir o módulo do Supabase.");
      return;
    }
  }
  courseModules = courseModules.filter((item) => item.id !== module.id);
  if (editingModuleId === module.id) resetCourseModuleForm();
  try {
    await refreshPublishedContent();
  } catch (error) {
    console.error("Não foi possível atualizar o conteúdo no Supabase.", error);
    showToast("O módulo foi excluído, mas os outros dados não puderam ser sincronizados.");
    return;
  }
  showToast("Módulo removido.");
});

// ACOES DE MATERIAIS: publicacao, arquivos, edicao e exclusao.
document.querySelector("#content-type").addEventListener("change", () => {
  document.querySelector("#content-file").value = "";
  updateCourseContentSourceFields();
});
document.querySelector("#content-file").addEventListener("change", (event) => {
  if (event.target.files.length) document.querySelector("#content-url").value = "";
});
document.querySelector("#content-url").addEventListener("input", (event) => {
  if (event.target.value) document.querySelector("#content-file").value = "";
});
updateCourseContentSourceFields();

document.querySelector("#open-course-content-dialog").addEventListener("click", () => {
  resetCourseContentForm();
  openAdminDialog("#course-content-dialog", "Adicionar conteúdo", "#content-title");
});

document.querySelector("#course-content-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!isSuperAdmin()) return;

  const id = editingCourseContentId || `course-content-${Date.now()}`;
  const courseId = document.querySelector("#content-course").value;
  const moduleId = document.querySelector("#content-module").value;
  const type = document.querySelector("#content-type").value;
  const title = document.querySelector("#content-title").value.trim();
  const description = document.querySelector("#content-description").value.trim();
  const url = type === "text" ? "" : document.querySelector("#content-url").value.trim();
  const file = document.querySelector("#content-file").files[0] || null;
  const existingContent = courseMaterials.find((item) => item.id === editingCourseContentId);
  const supportsFile = ["video", "pdf", "image"].includes(type);
  const reusableFileId = existingContent?.type === type ? existingContent.fileId : "";

  if (!materialPlatforms[courseId] || !courseModules.some((module) => module.id === moduleId && module.courseId === courseId)) {
    showToast("Selecione um módulo de uma plataforma em Materiais.");
    return;
  }
  if (!title) {
    showToast("Informe o título da aula ou material.");
    return;
  }
  if (type === "text" && !description) {
    showToast("Informe o texto do material.");
    return;
  }
  if (file && !supportsFile) {
    showToast("Esse tipo de publicação não aceita envio de arquivo.");
    return;
  }
  if (file && url) {
    showToast("Use um arquivo ou um link externo, não os dois.");
    return;
  }
  if (file && !isSupportedCourseFile(file, type)) {
    showToast(`Selecione um arquivo válido do tipo ${getCourseContentTypeLabel(type)}.`);
    return;
  }
  if (type === "material" && !url) {
    showToast("Informe o link do material.");
    return;
  }
  if (supportsFile && !file && !url && !reusableFileId) {
    showToast(`Envie um arquivo do tipo ${getCourseContentTypeLabel(type)} ou informe um link externo.`);
    return;
  }

  let fileId = file
    ? `${id}-file-${Date.now()}`
    : url ? "" : reusableFileId;
  if (file) {
    try {
      fileId = await storeCourseFile(fileId, file);
    } catch (error) {
      console.error("Não foi possível salvar o arquivo.", error);
      showToast(supabaseEnabled
        ? "Não foi possível enviar o arquivo. Confira o limite de 50 MB e tente novamente."
        : "Não foi possível salvar o arquivo neste navegador. Confira o espaço disponível.");
      return;
    }
  }

  const content = {
    id,
    courseId,
    moduleId,
    type,
    title,
    description,
    url: fileId ? "" : url,
    fileId,
    fileName: file ? file.name : fileId ? existingContent?.fileName || "" : "",
  };

  const existingIndex = courseMaterials.findIndex((item) => item.id === editingCourseContentId);
  if (existingIndex >= 0) courseMaterials[existingIndex] = content;
  else courseMaterials.push(content);
  if (courseContentPlatform && courseContentPlatform !== content.courseId) {
    courseContentPlatform = content.courseId;
  }
  const filteredContent = courseContentPlatform
    ? courseMaterials.filter((item) => item.courseId === courseContentPlatform)
    : courseMaterials;
  courseContentPage = Math.floor(filteredContent.findIndex((item) => item.id === content.id) / courseContentPageSize) + 1;
  resetCourseContentForm();
  try {
    await refreshPublishedContent();
  } catch (error) {
    console.error("Não foi possível publicar o material no Supabase.", error);
    showToast("Não foi possível salvar o material. Confira a conexão e tente novamente.");
    return;
  }
  if (existingContent?.fileId && existingContent.fileId !== content.fileId) {
    try {
      await deleteCourseFile(existingContent.fileId);
    } catch (error) {
      console.error("Não foi possível remover o arquivo substituído do Supabase Storage.", error);
      showToast("Conteúdo atualizado, mas o arquivo antigo não pôde ser removido do armazenamento.");
      return;
    }
  }
  showToast(existingIndex >= 0 ? "Conteúdo atualizado em Materiais." : "Conteúdo publicado em Materiais.");
  document.querySelector("#course-content-dialog").close();
});

document.querySelector("#cancel-course-content-edit").addEventListener("click", () => {
  document.querySelector("#course-content-dialog").close();
});
document.querySelector("#published-course-content-list").addEventListener("click", async (event) => {
  if (!isSuperAdmin()) return;
  const button = event.target.closest("[data-course-content-action]");
  if (!button) return;
  const item = courseMaterials.find((content) => content.id === button.dataset.itemId);
  if (!item) return;

  if (button.dataset.courseContentAction === "edit") {
    editingCourseContentId = item.id;
    document.querySelector("#content-course").value = item.courseId;
    renderModuleOptions(item.moduleId);
    document.querySelector("#content-type").value = item.type;
    document.querySelector("#content-title").value = item.title;
    document.querySelector("#content-description").value = item.description || "";
    document.querySelector("#content-url").value = item.url || "";
    document.querySelector("#content-file").value = "";
    const currentFile = document.querySelector("#content-current-file");
    currentFile.textContent = item.fileId
      ? `${getCourseContentTypeLabel(item.type)} atual: ${item.fileName || (supabaseEnabled ? "Arquivo no Supabase" : "Arquivo neste navegador")}. Selecione outro arquivo para substituir.`
      : "";
    currentFile.hidden = !item.fileId;
    updateCourseContentSourceFields();
    document.querySelector("#publish-course-content").textContent = "Salvar alterações";
    document.querySelector("#cancel-course-content-edit").hidden = false;
    openAdminDialog("#course-content-dialog", "Editar conteúdo", "#content-title");
    return;
  }

  if (!window.confirm(`Excluir "${item.title}" do módulo?`)) return;
  if (supabaseEnabled) {
    try {
      assertSupabaseResult(
        await window.trainingSupabase.from("course_materials").delete().eq("id", item.id),
        "excluir o material",
      );
    } catch (error) {
      console.error("Não foi possível excluir o material no Supabase.", error);
      showToast("Não foi possível excluir o material do Supabase.");
      return;
    }
  }
  if (item.fileId) {
    try {
      await deleteCourseFile(item.fileId);
    } catch (error) {
      console.error("Não foi possível excluir o arquivo do Supabase Storage.", error);
      showToast("O material foi removido, mas o arquivo ficou no armazenamento.");
    }
  }
  courseMaterials = courseMaterials.filter((content) => content.id !== item.id);
  try {
    await refreshPublishedContent();
  } catch (error) {
    console.error("Não foi possível atualizar as permissões após excluir o material.", error);
    showToast("O material foi removido, mas as permissões dos setores não foram sincronizadas.");
    return;
  }
  showToast("Conteúdo removido do módulo.");
});

// ACOES DE ORIENTACOES: publicacao, setores, anexos e exclusao.
document.querySelector("#orientation-file").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    document.querySelector("#orientation-file-help").textContent = `${file.name} selecionado.`;
    return;
  }
  document.querySelector("#orientation-file-help").textContent = supabaseEnabled
    ? "O anexo ficará salvo no armazenamento compartilhado."
    : "O anexo ficará salvo neste navegador nesta prévia local.";
});

document.querySelector("#open-orientation-dialog").addEventListener("click", () => {
  resetOrientationForm();
  openAdminDialog("#orientation-dialog", "Nova orientação", "#orientation-title");
});

document.querySelector("#orientation-select-all").addEventListener("click", () => {
 const checkboxes = [...document.querySelectorAll('#orientation-sector-list input[type="checkbox"]')];
 const selectAll = checkboxes.some((input) => !input.checked);
 checkboxes.forEach((input) => { input.checked = selectAll; });
 updateOrientationSelectAllButton();
});
document.querySelector("#orientation-sector-list").addEventListener("change", updateOrientationSelectAllButton);

document.querySelector("#orientation-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!isSuperAdmin()) return;
  const sectorIds = [...document.querySelectorAll('#orientation-sector-list input[type="checkbox"]:checked')]
    .map((input) => input.value);
  if (!sectorIds.length) {
    showToast("Selecione ao menos um setor para a orientação.");
    return;
  }

  const title = document.querySelector("#orientation-title").value.trim();
  const body = document.querySelector("#orientation-body").value.trim();
  const file = document.querySelector("#orientation-file").files[0] || null;
  const fileType = file ? ["image", "video", "pdf"].find((type) => isSupportedCourseFile(file, type)) : "";
  const existingOrientation = publishedOrientations.find((item) => item.id === editingOrientationId);
  if (!title || !body) {
    showToast("Informe o título e o texto da orientação.");
    return;
  }
  if (file && !fileType) {
    showToast("Selecione uma imagem, um vídeo ou um arquivo PDF válido.");
    return;
  }
  if (editingOrientationId && !existingOrientation) {
    showToast("Não foi possível encontrar a orientação para edição.");
    return;
  }

  const id = editingOrientationId || `orientation-${Date.now()}`;
  let fileId = file
    ? existingOrientation?.fileId || `orientation-file-${id}`
    : existingOrientation?.fileId || "";
  if (file) {
    try {
      fileId = await storeCourseFile(fileId, file);
    } catch (error) {
      console.error("Não foi possível salvar o anexo da orientação.", error);
      showToast(supabaseEnabled
        ? "Não foi possível enviar o anexo. Confira o armazenamento e tente novamente."
        : "Não foi possível salvar o anexo neste navegador. Confira o espaço disponível.");
      return;
    }
  }

  const orientation = {
    id,
    title,
    body,
    url: document.querySelector("#orientation-url").value.trim(),
    fileId,
    fileName: file ? file.name : existingOrientation?.fileName || "",
    fileType: file ? fileType : existingOrientation?.fileType || "",
    sectorIds,
  };

  const existingIndex = publishedOrientations.findIndex((item) => item.id === editingOrientationId);
  if (existingIndex >= 0) {
    publishedOrientations[existingIndex] = orientation;
  } else {
    publishedOrientations.push(orientation);
  }
  orientationPage = Math.floor(publishedOrientations.findIndex((item) => item.id === orientation.id) / orientationPageSize) + 1;
  sectors.forEach((sector) => {
    const assignment = sectorAssignments[sector.id];
    if (!assignment) return;
    assignment.resourceIds = assignment.resourceIds.filter((id) => id !== orientation.id);
    if (sectorIds.includes(sector.id)) assignment.resourceIds.push(orientation.id);
  });
  const resourceIndex = resources.findIndex((resource) => resource.id === orientation.id);
  if (resourceIndex >= 0) resources.splice(resourceIndex, 1);
  resources.push(createOrientationResource(orientation));

  resetOrientationForm();
  try {
    await refreshPublishedContent();
  } catch (error) {
    console.error("Não foi possível publicar a orientação no Supabase.", error);
    showToast("Não foi possível salvar a orientação. Confira a conexão e tente novamente.");
    return;
  }
  showToast(existingIndex >= 0 ? "Orientação atualizada." : "Orientação publicada.");
  document.querySelector("#orientation-dialog").close();
});

document.querySelector("#cancel-orientation-edit").addEventListener("click", () => {
  document.querySelector("#orientation-dialog").close();
});
document.querySelector("#published-orientation-list").addEventListener("click", async (event) => {
  if (!isSuperAdmin()) return;
  const button = event.target.closest("[data-orientation-action]");
  if (!button) return;
  const orientation = publishedOrientations.find((item) => item.id === button.dataset.itemId);
  if (!orientation) return;

  if (button.dataset.orientationAction === "edit") {
    editingOrientationId = orientation.id;
    document.querySelector("#orientation-title").value = orientation.title;
    document.querySelector("#orientation-body").value = orientation.body;
    document.querySelector("#orientation-url").value = orientation.url || "";
    document.querySelector("#orientation-file").value = "";
    const currentFile = document.querySelector("#orientation-current-file");
    currentFile.textContent = orientation.fileId
      ? `Anexo atual: ${orientation.fileName || "arquivo"}. Selecione outro para substituir.`
      : "";
    currentFile.hidden = !orientation.fileId;
    document.querySelector("#orientation-file-help").textContent = supabaseEnabled
      ? "O anexo ficará salvo no armazenamento compartilhado."
      : "O anexo ficará salvo neste navegador nesta prévia local.";
    document.querySelectorAll('#orientation-sector-list input[type="checkbox"]').forEach((input) => {
      input.checked = (orientation.sectorIds || []).includes(input.value);
    });
    updateOrientationSelectAllButton();
    document.querySelector("#publish-orientation").textContent = "Salvar alterações";
    document.querySelector("#cancel-orientation-edit").hidden = false;
    openAdminDialog("#orientation-dialog", "Editar orientação", "#orientation-title");
    return;
  }

  if (!window.confirm(`Excluir a orientação "${orientation.title}"?`)) return;
  if (supabaseEnabled) {
    try {
      assertSupabaseResult(
        await window.trainingSupabase.from("orientations").delete().eq("id", orientation.id),
        "excluir a orientação",
      );
    } catch (error) {
      console.error("Não foi possível excluir a orientação no Supabase.", error);
      showToast("Não foi possível excluir a orientação do Supabase.");
      return;
    }
  }
  let attachmentCleanupFailed = false;
  if (orientation.fileId) {
    try {
      await deleteCourseFile(orientation.fileId);
    } catch (error) {
      console.error(`Não foi possível remover o anexo da orientação "${orientation.title}".`, error);
      attachmentCleanupFailed = true;
    }
  }
  publishedOrientations = publishedOrientations.filter((item) => item.id !== orientation.id);
  const resourceIndex = resources.findIndex((resource) => resource.id === orientation.id);
  if (resourceIndex >= 0) resources.splice(resourceIndex, 1);
  sectors.forEach((sector) => {
    const assignment = sectorAssignments[sector.id];
    if (assignment) assignment.resourceIds = assignment.resourceIds.filter((id) => id !== orientation.id);
  });
  try {
    await refreshPublishedContent();
  } catch (error) {
    console.error("Não foi possível atualizar as permissões após excluir a orientação.", error);
    showToast("A orientação foi removida, mas as permissões dos setores não foram sincronizadas.");
    return;
  }
  showToast(attachmentCleanupFailed
    ? "Orientação removida, mas não foi possível apagar o anexo salvo."
    : "Orientação removida.");
});

// ACOES DE SETORES: salvar, adicionar, excluir e atualizar disponibilidade.
function parseSectorTeams(value) {
  return value.split(/\r?\n/)
    .map((line) => line.split("|").map((part) => part.trim()))
    .filter(([teamName]) => teamName)
    .map(([teamName, leader = ""]) => ({ name: teamName, leader }));
}

document.querySelector("#save-sector-details").addEventListener("click", async () => {
  const sector = getActiveSector();
  const name = document.querySelector("#admin-sector-name").value.trim();
  if (!name) {
    showToast("Informe o nome do setor.");
    return;
  }

  const teams = readSectorTeamRows();
  if (!teams) return;
  const updatedSector = {
    ...sector,
    name,
    vps: document.querySelector("#admin-sector-vps").value
      .split(",")
      .map((vp) => vp.trim())
      .filter(Boolean),
    teams,
  };
  const nextSectors = sectors.map((item) => item.id === sector.id ? updatedSector : item);
  try {
    await persistCloudSectors(nextSectors);
  } catch (error) {
    console.error("Não foi possível salvar o setor no Supabase.", error);
    showToast("Não foi possível salvar o setor. Confira a conexão e tente novamente.");
    return;
  }
  sectors = nextSectors;
  renderAdminPanel();
  refreshSectorViews();
  showToast("Setor atualizado.");
  document.querySelector("#sector-edit-dialog").close();
});

document.querySelector("#add-sector").addEventListener("click", async () => {
  const nameInput = document.querySelector("#new-sector-name");
  const vpInput = document.querySelector("#new-sector-vps");
  const name = nameInput.value.trim();
  if (!name) {
    showToast("Informe o nome do novo setor.");
    nameInput.focus();
    return;
  }
  const baseId = normalizeText(name).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "setor";
  let id = baseId;
  let suffix = 2;
  while (sectors.some((sector) => sector.id === id)) {
    id = `${baseId}-${suffix}`;
    suffix += 1;
  }

  const newSector = {
    id,
    name,
    vps: vpInput.value.split(",").map((vp) => vp.trim()).filter(Boolean),
    teams: parseSectorTeams(document.querySelector("#new-sector-teams").value),
  };
  const nextSectors = [...sectors, newSector];
  const nextAssignments = {
    ...sectorAssignments,
    [id]: {
      courseIds: [...defaultSectorAssignment.courseIds],
      resourceIds: [...defaultSectorAssignment.resourceIds],
      platformIds: [...defaultSectorAssignment.platformIds],
    },
  };
  try {
    await persistCloudSectors(nextSectors);
    if (isSuperAdmin()) await persistCloudAssignments(nextAssignments);
  } catch (error) {
    console.error("Não foi possível adicionar o setor no Supabase.", error);
    if (supabaseEnabled) {
      try {
        await reloadSupabaseWorkspace();
      } catch (reloadError) {
        console.error("Não foi possível recarregar os setores após a falha ao adicionar.", reloadError);
      }
    }
    showToast("Não foi possível salvar o novo setor. Confira a conexão e tente novamente.");
    return;
  }
  sectors = nextSectors;
  sectorAssignments = nextAssignments;
  activeSectorId = id;
  if (supabaseEnabled) {
    try {
      await persistCloudUserState({ active_sector_id: id });
    } catch (error) {
      console.error("O setor foi criado, mas não foi possível salvar a seleção atual.", error);
      showToast("Setor adicionado, mas não foi possível salvar a seleção.");
    }
  }
  nameInput.value = "";
  vpInput.value = "";
  adminSectorPage = Math.ceil(sectors.length / adminSectorPageSize);
  renderAdminPanel();
  refreshSectorViews();
  showToast("Setor adicionado.");
  document.querySelector("#sector-add-dialog").close();
});

document.querySelector("#delete-sector").addEventListener("click", async () => {
  if (sectors.length <= 1) {
    showToast("O sistema precisa manter pelo menos um setor.");
    return;
  }
  const sector = getActiveSector();
  if (!window.confirm(`Excluir o setor "${sector.name}" do sistema?`)) return;

  const fallbackSectorId = sectors.find((item) => item.id !== sector.id).id;
  if (supabaseEnabled) {
    try {
      for (const user of users.filter((item) => item.sectorId === sector.id)) {
        assertSupabaseResult(
          await window.trainingSupabase.from("profiles")
            .update({ sector_id: fallbackSectorId })
            .eq("id", user.id)
            .select("id")
            .single(),
          "mover o usuário para outro setor",
        );
      }
      assertSupabaseResult(
        await window.trainingSupabase.from("sectors").delete().eq("id", sector.id),
        "excluir o setor",
      );
    } catch (error) {
      console.error("Não foi possível excluir o setor no Supabase.", error);
      try {
        await reloadSupabaseWorkspace();
      } catch (reloadError) {
        console.error("Não foi possível recarregar os setores após a falha ao excluir.", reloadError);
      }
      showToast("Não foi possível excluir o setor. Confira as permissões e tente novamente.");
      return;
    }
  }

  sectors = sectors.filter((item) => item.id !== sector.id);
  delete sectorAssignments[sector.id];
  users.forEach((user) => {
    if (user.sectorId === sector.id) user.sectorId = fallbackSectorId;
  });
  saveUsers();
  publishedOrientations.forEach((orientation) => {
    orientation.sectorIds = (orientation.sectorIds || []).filter((id) => id !== sector.id);
  });
  publishedOrientations.forEach((orientation) => {
    sectors.forEach((remainingSector) => {
      const assignment = sectorAssignments[remainingSector.id];
      if (!assignment) return;
      assignment.resourceIds = assignment.resourceIds.filter((id) => id !== orientation.id);
      if (orientation.sectorIds.includes(remainingSector.id)) assignment.resourceIds.push(orientation.id);
    });
  });
  activeSectorId = sectors[0].id;
  if (!supabaseEnabled) localStorage.setItem(orientationStorageKey, JSON.stringify(publishedOrientations));
  saveSectorData();
  if (supabaseEnabled) {
    try {
      await persistCloudUserState({ active_sector_id: activeSectorId });
    } catch (error) {
      console.error("O setor foi removido, mas não foi possível salvar a seleção atual.", error);
      showToast("Setor removido, mas não foi possível salvar a seleção atual.");
    }
  }
  await refreshPublishedContent();
  renderAdminPanel();
  refreshSectorViews();
  showToast("Setor removido.");
  document.querySelector("#sector-edit-dialog").close();
});

document.querySelector("#save-sector-assignment").addEventListener("click", async () => {
  if (!isSuperAdmin()) return;
  for (const form of document.querySelectorAll("[data-assignment-name-form]:not([hidden])")) {
    const input = form.querySelector("[data-assignment-name-input]");
    if (input.value.trim()) {
      const error = form.querySelector(".admin-assignment-name-error");
      error.textContent = "Adicione o nome ou cancele antes de salvar.";
      error.hidden = false;
      input.focus();
      return;
    }
  }
  const existingNames = supabaseEnabled ? customAssignmentNames : readStoredJson(assignmentNamesStorageKey, []);
  if (!Array.isArray(existingNames)) {
    document.querySelector("#admin-assignment-save-error").textContent = "Não foi possível ler os nomes salvos. A disponibilidade não foi alterada.";
    document.querySelector("#admin-assignment-save-error").hidden = false;
    return;
  }
  const newNames = pendingAssignmentNames.filter((item) => !existingNames.some((saved) => saved.id === item.id));
  if (supabaseEnabled && newNames.length) {
    try {
      assertSupabaseResult(await window.trainingSupabase.from("assignment_options").insert(newNames.map((item) => ({
        id: item.id,
        type: item.type,
        title: item.title,
      }))), "salvar os nomes personalizados");
      customAssignmentNames = [...customAssignmentNames, ...newNames];
    } catch (error) {
      console.error("Não foi possível salvar os nomes da disponibilidade.", error);
      document.querySelector("#admin-assignment-save-error").textContent = "Não foi possível salvar os nomes no Supabase. A disponibilidade não foi alterada.";
      document.querySelector("#admin-assignment-save-error").hidden = false;
      return;
    }
  } else if (!supabaseEnabled && newNames.length) {
    try {
      localStorage.setItem(assignmentNamesStorageKey, JSON.stringify([...existingNames, ...newNames]));
    } catch (error) {
      console.error("Não foi possível salvar os nomes da disponibilidade.", error);
      document.querySelector("#admin-assignment-save-error").textContent = "Não foi possível salvar os nomes neste navegador. A disponibilidade não foi alterada.";
      document.querySelector("#admin-assignment-save-error").hidden = false;
      return;
    }
  }
  const courseIds = [...document.querySelectorAll('[data-assignment-type="course"]:checked')].map((input) => input.value);
  const resourceIds = [...document.querySelectorAll('[data-assignment-type="resource"]:checked')].map((input) => input.value);
  const platformIds = [...document.querySelectorAll('[data-assignment-type="platform"]:checked')].map((input) => input.value);
  const nextAssignments = {
    ...sectorAssignments,
    [activeSectorId]: { courseIds, resourceIds, platformIds },
  };
  try {
    await persistCloudAssignments(nextAssignments);
  } catch (error) {
    console.error("Não foi possível salvar as permissões do setor.", error);
    document.querySelector("#admin-assignment-save-error").textContent = "Não foi possível salvar as permissões no Supabase. Tente novamente.";
    document.querySelector("#admin-assignment-save-error").hidden = false;
    return;
  }
  sectorAssignments = nextAssignments;
  pendingAssignmentNames = [];
  saveSectorData();
  refreshSectorViews();
  showToast("Trilhas e materiais do setor foram atualizados.");
  document.querySelector("#sector-assignment-dialog").close();
});

document.querySelectorAll("[data-platform-grid]").forEach((grid) => {
  grid.addEventListener("click", (event) => {
    const button = event.target.closest("button.resource-open-button[data-resource-id]");
    if (button) openResource(button.dataset.resourceId);
  });
});

// ACOES DA BIBLIOTECA: busca, abertura de conteudos e conclusao de trilhas.
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

document.querySelector(".checklist").addEventListener("change", async (event) => {
    const input = event.target.closest("[data-task]");
    if (!input) return;
    const previousProgress = {
      tasks: [...progress.tasks],
      completedCourses: [...progress.completedCourses],
    };
    const tasks = new Set(progress.tasks);
    if (input.checked) tasks.add(input.dataset.task);
    else tasks.delete(input.dataset.task);
    progress.tasks = [...tasks];
    try {
      await saveProgress();
    } catch (error) {
      console.error("Não foi possível salvar o checklist no Supabase.", error);
      progress = previousProgress;
      input.checked = progress.tasks.includes(input.dataset.task);
      updateProgressUI();
      showToast("Não foi possível salvar o checklist. Tente novamente.");
      return;
    }
    updateProgressUI();
    showToast(input.checked ? "Boa! Etapa adicionada ao seu progresso." : "Etapa removida do checklist.");
});

document.querySelectorAll(".start-button").forEach((button) => {
  button.addEventListener("click", () => openCourse(button.closest(".course-card").dataset.courseId));
});

courseSearchGrid.addEventListener("click", (event) => {
  const button = event.target.closest(".start-button");
  if (!button) return;
  openCourse(button.closest(".course-card").dataset.courseId);
});

document.querySelector(".dialog-close").addEventListener("click", () => courseDialog.close());
document.querySelector("#course-materials-link").addEventListener("click", () => courseDialog.close());
courseDialog.addEventListener("close", () => {
  currentResourceId = null;
  releaseCourseFileUrls();
});
courseDialog.addEventListener("click", (event) => {
  if (event.target === courseDialog) courseDialog.close();
});

document.querySelector("#complete-course").addEventListener("click", async () => {
  const previousProgress = {
    tasks: [...progress.tasks],
    completedCourses: [...progress.completedCourses],
  };
  const completedCourses = new Set(progress.completedCourses);
  const wasComplete = completedCourses.has(currentCourseId);
  if (wasComplete) completedCourses.delete(currentCourseId);
  else completedCourses.add(currentCourseId);
  progress.completedCourses = [...completedCourses];
  try {
    await saveProgress();
  } catch (error) {
    console.error("Não foi possível salvar a conclusão da trilha no Supabase.", error);
    progress = previousProgress;
    updateProgressUI();
    showToast("Não foi possível salvar a conclusão da trilha.");
    return;
  }
  updateProgressUI();
  courseDialog.close();
  showToast(wasComplete ? "Conclusão desfeita. Você pode continuar quando quiser." : "Trilha concluída! Parabéns por mais essa etapa.");
});

// ACOES DA CONTA: notificacoes, tema, perfil, saida e progresso.
notificationButton.addEventListener("click", async () => {
  const isOpening = notificationPanel.hidden;
  notificationPanel.hidden = !isOpening;
  notificationButton.setAttribute("aria-expanded", String(isOpening));
  if (isOpening) await refreshNotifications(true);
});

notificationList.addEventListener("click", (event) => {
  const link = event.target.closest("a[data-notification-id]");
  if (!link) return;
  notificationPanel.hidden = true;
  notificationButton.setAttribute("aria-expanded", "false");
  void markNotificationRead(link.dataset.notificationId);
});

notificationMarkAllButton.addEventListener("click", async () => {
  try {
    assertSupabaseResult(await window.trainingSupabase
      .from("notifications")
      .update({ read_at: new Date().toISOString() })
      .eq("user_id", demoSession.userId)
      .is("read_at", null), "marcar as notificações como lidas");
    userNotifications = [];
    renderNotifications();
  } catch (error) {
    console.error("Não foi possível marcar as notificações como lidas.", error);
    showToast("Não foi possível atualizar as notificações.");
  }
});

function changeTheme(preference) {
  try {
    const save = setThemePreference(preference);
    void save.catch((error) => {
      console.error("Não foi possível salvar o tema no Supabase.", error);
    });
  } catch (error) {
    console.error("Não foi possível salvar a preferência de tema neste dispositivo.", error);
  }
}

themeToggle.addEventListener("click", () => {
  changeTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
});

document.querySelectorAll("[data-theme-choice]").forEach((button) => {
  button.addEventListener("click", () => {
    changeTheme(button.dataset.themeChoice);
  });
});

profileMenuButton.addEventListener("click", () => {
  profileMenu.hidden = !profileMenu.hidden;
  profileMenuButton.setAttribute("aria-expanded", String(!profileMenu.hidden));
});

document.querySelector("#demo-logout").addEventListener("click", async () => {
  if (!supabaseEnabled) return;
  try {
    const { error } = await window.trainingSupabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error("Não foi possível encerrar a sessão do Supabase.", error);
    showToast("Não foi possível encerrar a sessão. Tente novamente.");
    return;
  }
  showLoginScreen();
  profileMenu.hidden = true;
  profileMenuButton.setAttribute("aria-expanded", "false");
  location.hash = "#/inicio";
});

document.addEventListener("click", (event) => {
  if (!profileMenu.hidden && !event.target.closest(".profile")) {
    profileMenu.hidden = true;
    profileMenuButton.setAttribute("aria-expanded", "false");
  }
  if (!notificationPanel.hidden
    && !event.target.closest(".notification-panel")
    && !event.target.closest(".notification-button")) {
    notificationPanel.hidden = true;
    notificationButton.setAttribute("aria-expanded", "false");
  }
});

document.querySelector("#clear-progress").addEventListener("click", async () => {
  if (!window.confirm("Tem certeza de que deseja apagar todo o progresso salvo na sua conta?")) return;
  const previousProgress = {
    tasks: [...progress.tasks],
    completedCourses: [...progress.completedCourses],
  };
  progress = { tasks: [], completedCourses: [] };
  try {
    await saveProgress();
  } catch (error) {
    console.error("Não foi possível limpar o progresso no Supabase.", error);
    progress = previousProgress;
    updateProgressUI();
    showToast("Não foi possível limpar o progresso. Tente novamente.");
    return;
  }
  updateProgressUI();
  profileMenu.hidden = true;
  profileMenuButton.setAttribute("aria-expanded", "false");
  showToast("Seu progresso foi limpo.");
});

// EVENTOS GLOBAIS: navegacao, foco e atalhos de teclado.
window.addEventListener("hashchange", () => {
  renderRoute(location.hash);
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("focus", () => {
  if (!notificationPanel.hidden) void refreshNotifications();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    const openAdminDialogElement = document.querySelector(".admin-modal[open]");
    if (openAdminDialogElement) {
      event.preventDefault();
      openAdminDialogElement.close();
      return;
    }
    if (!notificationPanel.hidden) {
      notificationPanel.hidden = true;
      notificationButton.setAttribute("aria-expanded", "false");
      notificationButton.focus();
      return;
    }
    if (!profileMenu.hidden) {
      profileMenu.hidden = true;
      profileMenuButton.setAttribute("aria-expanded", "false");
      profileMenuButton.focus();
    }
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

// EFEITOS VISUAIS: iluminacao dos cartoes conforme o cursor.
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

// INICIALIZACAO: aplica preferencias e carrega a sessao ou a previa local.
applyThemePreference();
updateProgressUI();
if (supabaseEnabled) {
  initializeSupabaseAuth().catch((error) => {
    console.error("Não foi possível iniciar a conexão com o Supabase.", error);
    showLoginScreen("Não foi possível iniciar a sessão. Verifique sua conexão e o perfil no Supabase.");
  });
} else {
  Object.keys(courses).forEach((courseId) => loadCourseProfileImage(courseId));
  initializeLocalPreview();
}
