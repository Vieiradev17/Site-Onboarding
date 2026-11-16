const searchInput = document.querySelector("#course-search");
const courseCards = [...document.querySelectorAll(".course-card")];
const emptyState = document.querySelector("#empty-state");
const toast = document.querySelector("#toast");
const whatsappFloat = document.querySelector(".whatsapp-float");
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
const appShell = document.querySelector("#app-shell");
const demoLoginScreen = document.querySelector("#demo-login-screen");
const demoLoginForm = document.querySelector("#demo-login-form");
const demoLoginError = document.querySelector("#demo-login-error");
const demoAdminLinks = [...document.querySelectorAll("[data-admin-only]")];
const adminTabButtons = [...document.querySelectorAll("[data-admin-tab-button]")];
const adminTabPanels = [...document.querySelectorAll("[data-admin-panel]")];
const userAccessTabButtons = [...document.querySelectorAll("[data-user-access-tab]")];
const userAccessTabPanels = [...document.querySelectorAll("[data-user-access-panel]")];
const demoSessionStorageKey = "villelatech-training-demo-session-v1";
const sectorsStorageKey = "villelatech-training-demo-sectors-v1";
const additionalSectorSeedKey = "villelatech-training-demo-sector-seeds-v1";
const sectorVpSeedKey = "villelatech-training-demo-sector-vps-v1";
const assignmentsStorageKey = "villelatech-training-demo-assignments-v1";
const activeSectorStorageKey = "villelatech-training-demo-active-sector-v1";
const usersStorageKey = "villelatech-training-demo-users-v1";
const courseContentStorageKey = "villelatech-training-demo-course-content-v1";
const courseModulesStorageKey = "villelatech-training-demo-course-modules-v1";
const orientationStorageKey = "villelatech-training-demo-orientations-v1";
const courseFileDatabaseName = "villelatech-training-course-videos-v1";
const courseFileStoreName = "videos";
const demoAdminEmail = "tecnico13@villelatech.com.br";
const systemAdminUserId = "system-admin-fixed";
const systemAdminEmail = "admin@admin";
const systemAdminSectorId = "ti";
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

const initialSectors = [
  { id: "juridico", name: "Jurídico", vps: ["Adria", "Mirelly", "Allyson", "Thalles"], teams: [] },
  { id: "invest", name: "Invest", vps: ["Allysson"], teams: [] },
  { id: "comercial-lead-next", name: "Comercial Lead/Next", vps: ["Lead Sabrina", "Next Laureen Morais"], teams: [] },
  { id: "vbb", name: "Vbb", vps: ["Jader", "Nayara"], teams: [] },
  { id: "juridico-bancario", name: "Jurídico Bancário", vps: ["Marcel"], teams: [] },
  { id: "concilie", name: "Concilie", vps: ["Felipe Lascani"], teams: [] },
  { id: "rh-departamento-pessoal", name: "RH Departamento Pessoal", vps: ["Sueli"], teams: [] },
  { id: "rh-franqueados", name: "RH Franqueados", vps: ["Camila Rosa"], teams: [] },
  { id: "franqueados", name: "Franqueados", vps: [], teams: [] },
  { id: "financeiro", name: "Financeiro", vps: ["Rocha", "Mabiane"], teams: [] },
  { id: "auditoria", name: "Auditoria", vps: ["Jean Seidert"], teams: [] },
  { id: "desenvolvimento", name: "Desenvolvimento", vps: ["Marcelo", "Wendell"], teams: [] },
  { id: "compliance", name: "Compliance", vps: ["Labarthe"], teams: [] },
  { id: "contabilidade", name: "Contabilidade", vps: ["Carla"], teams: [] },
  { id: "cobranca", name: "Cobrança", vps: ["Camila Cristoffoli"], teams: [] },
  { id: "c3", name: "C3", vps: ["Paola", "Labarthe"], teams: [] },
  { id: "controladoria", name: "Controladoria", vps: ["Vânia"], teams: [] },
  { id: "vboffice", name: "VBOffice", vps: ["Guilherme Coletto", "Rafael Aguiar"], teams: [] },
  { id: systemAdminSectorId, name: "TI", vps: ["Márcio"], teams: [] },
  { id: "tax", name: "Tax", vps: ["Fernanda Ferrari"], teams: [] },
  { id: "prime", name: "Prime", vps: ["Yan Bosco"], teams: [] },
];

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

const initialUsers = [{
  id: "super-admin-owner",
  name: "Super Admin",
  email: demoAdminEmail,
  role: "super-admin",
  sectorId: "juridico",
  team: "",
}];
let users = readStoredJson(usersStorageKey, initialUsers);
if (!Array.isArray(users)) users = [...initialUsers];
function isSystemAdminUser(user) {
  return user?.id === systemAdminUserId
    || user?.email?.toLocaleLowerCase("pt-BR") === systemAdminEmail;
}
if (!users.some((user) => user.email?.toLocaleLowerCase("pt-BR") === demoAdminEmail)) {
  users.unshift(...initialUsers);
}

function readDemoSession() {
  const savedSession = sessionStorage.getItem(demoSessionStorageKey);
  if (!savedSession) return null;

  try {
    const session = JSON.parse(savedSession);
    const user = users.find((item) => item.email.toLocaleLowerCase("pt-BR") === session.email);
    if (!user || user.accessBlocked || user.role !== session.role) {
      sessionStorage.removeItem(demoSessionStorageKey);
      return null;
    }
    return session;
  } catch (error) {
    console.error("Não foi possível ler a sessão de demonstração.", error);
    return null;
  }
}

let demoSession = readDemoSession();
let sectors = readStoredJson(sectorsStorageKey, initialSectors);
if (!Array.isArray(sectors) || sectors.length === 0) sectors = initialSectors;
if (localStorage.getItem(additionalSectorSeedKey) !== "done") {
  ["tax", "prime"].forEach((sectorId) => {
    const seededSector = initialSectors.find((sector) => sector.id === sectorId);
    const alreadyExists = sectors.some((sector) => (
      sector.id === sectorId
      || sector.name?.trim().toLocaleLowerCase("pt-BR") === seededSector.name.toLocaleLowerCase("pt-BR")
    ));
    if (!alreadyExists) sectors.push({ ...seededSector, teams: [] });
  });
  localStorage.setItem(additionalSectorSeedKey, "done");
}
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
if (localStorage.getItem(sectorVpSeedKey) !== "done") {
  ["tax", "prime"].forEach((sectorId) => {
    const seed = initialSectors.find((sector) => sector.id === sectorId);
    const sector = sectors.find((item) => normalizeText(item.name?.trim() || "") === normalizeText(seed.name))
      || sectors.find((item) => item.id === sectorId);
    if (sector) sector.vps = [...seed.vps];
  });
}
const systemAdmin = users.find(isSystemAdminUser);
if (systemAdmin) systemAdmin.sectorId = systemAdminSector.id;
localStorage.setItem(sectorsStorageKey, JSON.stringify(sectors));
localStorage.setItem(sectorVpSeedKey, "done");
localStorage.setItem(usersStorageKey, JSON.stringify(users));

const defaultSectorAssignment = {
  courseIds: ["welcome", "security", "tools"],
  resourceIds: ["security-email", "it-support", "orientation-seat-change"],
  platformIds: ["security"],
};
let sectorAssignments = readStoredJson(assignmentsStorageKey, {});
if (!sectorAssignments || typeof sectorAssignments !== "object" || Array.isArray(sectorAssignments)) {
  sectorAssignments = {};
}
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
  localStorage.setItem(courseModulesStorageKey, JSON.stringify(courseModules));
  localStorage.setItem(courseContentStorageKey, JSON.stringify(courseMaterials));
}
let publishedOrientations = readStoredJson(orientationStorageKey, []);
if (!Array.isArray(publishedOrientations)) publishedOrientations = [];
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
    search: `${orientation.title} ${orientation.body}`,
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
if (demoSession?.email === systemAdminEmail && sectors.some((sector) => sector.id === systemAdmin?.sectorId)) {
  activeSectorId = systemAdmin.sectorId;
  localStorage.setItem(activeSectorStorageKey, activeSectorId);
}

let activeFilter = "all";
let currentPage = "inicio";
let currentQuery = "";
let currentCourseId = null;
let activeCourseFileUrls = [];
let activePlatformFileUrls = [];
let activeAdminTabId = "users";
let activeUserAccessTabId = "list";
let adminUserPage = 1;
let adminUserPageSize = 25;
let editingUserId = null;
let editingModuleId = null;
let editingCourseContentId = null;
let editingOrientationId = null;
let toastTimeout;
let whatsappReturnTimeout;

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
  whatsappFloat.classList.add("is-obscured");
  window.clearTimeout(toastTimeout);
  window.clearTimeout(whatsappReturnTimeout);
  toastTimeout = window.setTimeout(() => {
    toast.classList.remove("visible");
    whatsappReturnTimeout = window.setTimeout(() => {
      if (!toast.classList.contains("visible")) whatsappFloat.classList.remove("is-obscured");
    }, 200);
  }, 3000);
}

function getActiveSector() {
  return sectors.find((sector) => sector.id === activeSectorId) || sectors[0];
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
  return sectorAssignments[activeSectorId] || defaultSectorAssignment;
}

function saveSectorData() {
  localStorage.setItem(sectorsStorageKey, JSON.stringify(sectors));
  localStorage.setItem(assignmentsStorageKey, JSON.stringify(sectorAssignments));
  localStorage.setItem(activeSectorStorageKey, activeSectorId);
}

function saveUsers() {
  localStorage.setItem(usersStorageKey, JSON.stringify(users));
}

function openCourseFileDatabase() {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error("O armazenamento local de arquivos não está disponível neste navegador."));
      return;
    }

    const request = window.indexedDB.open(courseFileDatabaseName, 1);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(courseFileStoreName)) {
        request.result.createObjectStore(courseFileStoreName);
      }
    };
    request.onerror = () => reject(request.error || new Error("Não foi possível abrir o armazenamento local de arquivos."));
    request.onsuccess = () => resolve(request.result);
  });
}

async function storeCourseFile(fileId, file) {
  const database = await openCourseFileDatabase();
  return new Promise((resolve, reject) => {
    let transaction;
    try {
      transaction = database.transaction(courseFileStoreName, "readwrite");
      transaction.objectStore(courseFileStoreName).put(file, fileId);
    } catch (error) {
      database.close();
      reject(error);
      return;
    }
    transaction.oncomplete = () => {
      database.close();
      resolve();
    };
    transaction.onabort = () => {
      database.close();
      reject(transaction.error || new Error("Não foi possível salvar o arquivo neste navegador."));
    };
  });
}

async function getCourseFile(fileId) {
  const database = await openCourseFileDatabase();
  return new Promise((resolve, reject) => {
    let request;
    try {
      request = database.transaction(courseFileStoreName, "readonly")
        .objectStore(courseFileStoreName)
        .get(fileId);
    } catch (error) {
      database.close();
      reject(error);
      return;
    }
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

async function deleteCourseFile(fileId) {
  const database = await openCourseFileDatabase();
  return new Promise((resolve, reject) => {
    let transaction;
    try {
      transaction = database.transaction(courseFileStoreName, "readwrite");
      transaction.objectStore(courseFileStoreName).delete(fileId);
    } catch (error) {
      database.close();
      reject(error);
      return;
    }
    transaction.oncomplete = () => {
      database.close();
      resolve();
    };
    transaction.onabort = () => {
      database.close();
      reject(transaction.error || new Error("Não foi possível remover o arquivo deste navegador."));
    };
  });
}

function bytesToHex(bytes) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function hexToBytes(value) {
  if (!/^(?:[0-9a-f]{2})+$/i.test(value)) throw new Error("Credencial local inválida.");
  return new Uint8Array(value.match(/.{2}/g).map((byte) => parseInt(byte, 16)));
}

async function derivePasswordHash(password, salt) {
  if (!window.crypto?.subtle) throw new Error("A proteção de senha não está disponível neste navegador.");
  const key = await window.crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const hash = await window.crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations: 120000, hash: "SHA-256" },
    key,
    256,
  );
  return bytesToHex(new Uint8Array(hash));
}

async function createPasswordCredential(password) {
  const salt = window.crypto.getRandomValues(new Uint8Array(16));
  return {
    passwordSalt: bytesToHex(salt),
    passwordHash: await derivePasswordHash(password, salt),
  };
}

async function verifyOrSetPassword(user, password) {
  if (!user.passwordHash && !user.passwordSalt) {
    Object.assign(user, await createPasswordCredential(password));
    saveUsers();
    return true;
  }
  if (!user.passwordHash || !user.passwordSalt) throw new Error("Credencial local incompleta.");
  const salt = hexToBytes(user.passwordSalt);
  const expectedHash = await derivePasswordHash(password, salt);
  return expectedHash === user.passwordHash;
}

function setDemoSession(email) {
  const user = users.find((item) => item.email.toLocaleLowerCase("pt-BR") === email);
  if (!user || user.accessBlocked) return;
  demoSession = { email, role: user.role };
  sessionStorage.setItem(demoSessionStorageKey, JSON.stringify(demoSession));
  if ((isSystemAdminUser(user) || !hasAdminAccess()) && sectors.some((sector) => sector.id === user.sectorId)) {
    activeSectorId = user.sectorId;
    localStorage.setItem(activeSectorStorageKey, activeSectorId);
  }
  demoLoginScreen.hidden = true;
  appShell.hidden = false;
  appShell.setAttribute("aria-hidden", "false");
  demoAdminLinks.forEach((link) => { link.hidden = !hasAdminAccess(); });
  updateDemoProfile();
  renderRoute(location.hash || "#/inicio");
}

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

function updateCourseCards() {
  const query = normalizeText(searchInput.value.trim());
  const assignedCourseIds = new Set(getActiveAssignment().courseIds);
  let visibleCards = 0;

  courseCards.forEach((card) => {
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
      description: item.description || module.title,
      duration: module.title,
      videoUrl: item.type === "video" ? "published" : "",
      search: `${platform.name} ${module.title} ${item.title} ${item.description || ""}`,
    });
    card.dataset.publishedId = item.id;
    card.querySelector(".resource-kind").textContent = getCourseContentTypeLabel(item.type).toLocaleUpperCase("pt-BR");
    const link = document.createElement("a");
    link.className = "resource-open-button";
    link.href = `#/materiais/${platform.page}?modulo=${encodeURIComponent(module.id)}`;
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
  document.querySelectorAll("[data-count]").forEach((count) => {
    const total = resources.filter((resource) => assignedResourceIds.has(resource.id)
      && resource.platform === count.dataset.count && resource.platform !== "orientacoes").length
      + publishedCount(count.dataset.count);
    count.textContent = `${total} ${total === 1 ? "material" : "materiais"}`;
  });

  const platformResources = resources.filter((resource) => assignedResourceIds.has(resource.id) && resource.platform !== "orientacoes");
  const publishedTotal = Object.keys(materialPlatforms).reduce((total, platformId) => total + publishedCount(platformId), 0);
  document.querySelector("#library-total").textContent = `${platformResources.length + publishedTotal} materiais`;
  document.querySelectorAll("[data-platform-total]").forEach((total) => {
    const count = resources.filter((resource) => assignedResourceIds.has(resource.id)
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
      : assignedResourceIds.has(card.dataset.resourceId);
    const isVisible = hasAccess
      && normalizeText(`${card.dataset.search} ${card.innerText}`).includes(query);
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
  const validPages = ["inicio", "trilhas", "materiais", "hubspot", "microsoft", "seguranca", "orientacoes", "ajuda", "admin"];
  currentPage = validPages.includes(requestedPage) ? requestedPage : "inicio";
  if (currentPage === "admin" && !hasAdminAccess()) currentPage = "inicio";
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
    admin: "Administração",
  };
  document.querySelector(".breadcrumb strong").textContent = labels[currentPage];
  if (currentPage === "admin") renderAdminPanel();
  updateCourseCards();
  updateResourceCounts();
  updateLibrary();
  renderPlatformModules();
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
  const assignedCourseCount = courseCards.filter((card) => getActiveAssignment().courseIds.includes(card.dataset.courseId)).length;
  document.querySelector("#available-course-count").textContent = String(assignedCourseCount).padStart(2, "0");
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

function renderAdminOptions(container, items, selectedIds, idPrefix, getDescription) {
  container.replaceChildren();
  items.forEach((item) => {
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
    if (getDescription) {
      const description = document.createElement("small");
      description.textContent = getDescription(item);
      copy.append(description);
    }

    option.append(checkbox, copy);
    container.append(option);
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
    const sectorVp = sector?.vps?.length ? ` · VP ${sector.vps.join(", ")}` : "";
    const entry = createAdminEntry(
      user.name,
      `${user.email} · ${getRoleLabel(user.role)} · ${sector?.name || "Sem setor"}${sectorVp}${user.team ? ` · ${user.team}` : ""}${isImmutableAccount ? " · Conta principal protegida" : ""}${user.accessBlocked ? " · Acesso bloqueado" : ""}`,
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
  courseList.replaceChildren();
  courseMaterials.forEach((item) => {
    const platformName = materialPlatforms[item.courseId]?.name || `${courses[item.courseId]?.title || item.courseId} (sem página em Materiais)`;
    const module = courseModules.find((entry) => entry.id === item.moduleId && entry.courseId === item.courseId);
    courseList.append(createAdminEntry(
      item.title,
      `${platformName} · ${module?.title || "Módulo indisponível"} · ${getCourseContentTypeLabel(item.type)}${item.fileId ? ` · Arquivo local${item.fileName ? `: ${item.fileName}` : ""}` : ""}`,
      item.id,
      "courseContentAction",
    ));
  });
  if (!courseMaterials.length) courseList.textContent = "Ainda não há vídeos ou materiais publicados nos módulos.";

  const orientationList = document.querySelector("#published-orientation-list");
  orientationList.replaceChildren();
  publishedOrientations.forEach((item) => {
    const sectorNames = (item.sectorIds || [])
      .map((id) => sectors.find((sector) => sector.id === id)?.name)
      .filter(Boolean)
      .join(", ");
    orientationList.append(createAdminEntry(
      item.title,
      sectorNames || "Nenhum setor selecionado",
      item.id,
      "orientationAction",
    ));
  });
  if (!publishedOrientations.length) orientationList.textContent = "Ainda não há orientações publicadas.";
  document.querySelector("#admin-stat-publications").textContent = String(courseMaterials.length + publishedOrientations.length);
}

function getCourseContentTypeLabel(type) {
  return type === "video" ? "Vídeo" : type === "pdf" ? "PDF" : type === "image" ? "Imagem" : "Link externo";
}

function renderAdminSummary() {
  document.querySelector("#admin-stat-sectors").textContent = String(sectors.length);
  document.querySelector("#admin-stat-users").textContent = String(users.length);
  document.querySelector("#admin-stat-courses").textContent = String(Object.keys(courses).length);
  document.querySelector("#admin-stat-publications").textContent = String(courseMaterials.length + publishedOrientations.length);
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
  const courseId = document.querySelector("#module-course").value;
  const modules = courseModules.filter((module) => module.courseId === courseId);
  list.replaceChildren();
  modules.forEach((module, index) => {
    const count = courseMaterials.filter((item) => item.courseId === courseId && item.moduleId === module.id).length;
    list.append(createAdminEntry(
      `${String(index + 1).padStart(2, "0")} · ${module.title}`,
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

function activateAdminTab(tabId) {
  const selectedTab = adminTabButtons.find((button) => (
    button.dataset.adminTabButton === tabId && !button.hidden
  ));
  if (!selectedTab) return;

  activeAdminTabId = tabId;
  adminTabButtons.forEach((button) => {
    const isActive = button === selectedTab;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
    button.tabIndex = isActive ? 0 : -1;
  });
  adminTabPanels.forEach((panel) => {
    const isRestricted = panel.hasAttribute("data-super-admin-only") && !isSuperAdmin();
    panel.hidden = panel.dataset.adminPanel !== tabId || isRestricted;
  });
}

function activateUserAccessTab(tabId, startNewAccess = false) {
  const selectedTab = userAccessTabButtons.find((button) => button.dataset.userAccessTab === tabId);
  if (!selectedTab) return;
  if (tabId === "create" && startNewAccess && editingUserId) resetUserForm();

  activeUserAccessTabId = tabId;
  userAccessTabButtons.forEach((button) => {
    const isActive = button === selectedTab;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
    button.tabIndex = isActive ? 0 : -1;
  });
  userAccessTabPanels.forEach((panel) => {
    panel.hidden = panel.dataset.userAccessPanel !== tabId;
  });
}

function renderAdminPanel() {
  if (!demoSession || !sectors.length) return;

  document.querySelectorAll("[data-super-admin-only]").forEach((element) => {
    element.hidden = !isSuperAdmin();
  });
  document.querySelector("[data-super-admin-role]").hidden = !isSuperAdmin();
  renderAdminSummary();
  if (!adminTabButtons.some((button) => button.dataset.adminTabButton === activeAdminTabId && !button.hidden)) {
    activeAdminTabId = "users";
  }
  activateAdminTab(activeAdminTabId);
  activateUserAccessTab(activeUserAccessTabId);

  const sectorSelect = document.querySelector("#admin-sector-select");
  sectorSelect.replaceChildren();
  sectors.forEach((sector) => {
    const option = document.createElement("option");
    option.value = sector.id;
    option.textContent = sector.name;
    sectorSelect.append(option);
  });
  if (!sectors.some((sector) => sector.id === activeSectorId)) activeSectorId = sectors[0].id;
  sectorSelect.value = activeSectorId;

  const sector = getActiveSector();
  document.querySelector("#admin-sector-name").value = sector.name;
  document.querySelector("#admin-sector-vps").value = sector.vps.join(", ");
  document.querySelector("#admin-sector-teams").value = sector.teams
    .map((team) => `${team.name} | ${team.leader}`)
    .join("\n");
  document.querySelector("#admin-sector-count").textContent = `${sectors.length} setores na prévia`;
  document.querySelector("#assignment-sector-name").textContent = sector.name;

  const managedUserSector = document.querySelector("#managed-user-sector");
  const contentCourseSelect = document.querySelector("#content-course");
  const moduleCourseSelect = document.querySelector("#module-course");
  const orientationSectors = document.querySelector("#orientation-sectors");
  const selectedContentCourse = contentCourseSelect.value;
  const selectedModuleCourse = moduleCourseSelect.value;
  [managedUserSector, contentCourseSelect, moduleCourseSelect, orientationSectors].forEach((select) => select.replaceChildren());
  sectors.forEach((item) => {
    const userOption = document.createElement("option");
    userOption.value = item.id;
    userOption.textContent = item.name;
    managedUserSector.append(userOption);

    const orientationOption = userOption.cloneNode(true);
    orientationSectors.append(orientationOption);
  });
  const legacyIds = [...new Set([...courseModules, ...courseMaterials].map((item) => item.courseId))]
    .filter((id) => !materialPlatforms[id]);
  [...Object.keys(materialPlatforms), ...legacyIds].forEach((id) => {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = materialPlatforms[id]?.name || `${courses[id]?.title || id} (sem página em Materiais)`;
    contentCourseSelect.append(option);
    moduleCourseSelect.append(option.cloneNode(true));
  });
  if ([...contentCourseSelect.options].some((option) => option.value === selectedContentCourse)) contentCourseSelect.value = selectedContentCourse;
  if ([...moduleCourseSelect.options].some((option) => option.value === selectedModuleCourse)) moduleCourseSelect.value = selectedModuleCourse;
  renderModuleOptions();
  renderCourseModules();

  const assignment = getActiveAssignment();
  const courseOptions = Object.entries(courses).map(([id, course]) => ({ id, title: course.title, description: course.category }));
  const resourceOptions = resources.map((resource) => ({
    id: resource.id,
    title: resource.title,
    description: `${resource.platformName} · ${resource.type === "video" ? "Vídeo" : resource.type === "article" ? "Orientação" : "Tutorial"}`,
  }));
  renderAdminOptions(document.querySelector("#admin-course-options"), courseOptions, assignment.courseIds, "course");
  renderAdminOptions(document.querySelector("#admin-resource-options"), resourceOptions, assignment.resourceIds, "resource");
  const platformOptions = Object.entries(materialPlatforms).map(([id, platform]) => ({ id, title: platform.name }));
  renderAdminOptions(document.querySelector("#admin-platform-options"), platformOptions, assignment.platformIds || [], "platform");
  renderAdminUsers();
  renderPublishedContent();
  updateDemoProfile();
}

function resetUserForm() {
  document.querySelector("#admin-user-form").reset();
  editingUserId = null;
  document.querySelector("#managed-user-sector").value = activeSectorId;
  document.querySelector("#managed-user-password").required = true;
  document.querySelector("#managed-user-password-label").textContent = "Senha inicial";
  document.querySelector("#managed-user-password-help").textContent = "Obrigatória para criar o acesso. Você poderá testar esse e-mail e senha neste navegador.";
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
  document.querySelector("#managed-user-team").value = user.team || "";
  const passwordInput = document.querySelector("#managed-user-password");
  passwordInput.value = "";
  passwordInput.required = changePassword;
  document.querySelector("#managed-user-password-label").textContent = changePassword ? "Nova senha" : "Senha inicial";
  document.querySelector("#managed-user-password-help").textContent = changePassword
    ? "Informe uma senha nova com pelo menos 8 caracteres."
    : "Opcional. Preencha somente para definir uma nova senha.";
  document.querySelector("#save-user-access").textContent = changePassword ? "Alterar senha" : "Salvar alterações";
  document.querySelector("#cancel-user-edit").hidden = false;
  activateUserAccessTab("create");
  document.querySelector(changePassword ? "#managed-user-password" : "#managed-user-name").focus();
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
  const fileInput = document.querySelector("#content-file");
  fileInput.disabled = !supportsFile;
  document.querySelector("#content-file-field").hidden = !supportsFile;
  fileInput.accept = type === "video" ? "video/*,.mp4,.webm,.mov,.m4v,.ogv"
    : type === "pdf" ? "application/pdf,.pdf" : "image/*";
  document.querySelector("#content-file-field").firstChild.textContent = `Enviar ${type === "video" ? "vídeo" : type === "pdf" ? "PDF" : "imagem"} deste computador`;
  document.querySelector("#content-file-help").textContent = type === "video"
    ? "MP4 ou WebM são recomendados. O arquivo fica salvo somente neste navegador."
    : "O arquivo fica salvo somente neste navegador, não em um servidor.";
  const urlInput = document.querySelector("#content-url");
  urlInput.required = false;
  urlInput.placeholder = supportsFile ? "https://... (opcional se enviar arquivo)" : "https://...";
  document.querySelector("#content-url-field").firstChild.textContent = supportsFile
    ? "Link externo (opcional para arquivo)"
    : "Link externo";
  document.querySelector("#content-source-help").textContent = supportsFile
    ? "Envie um arquivo ou informe um link externo."
    : "Informe o endereço do material que deseja publicar.";
  if (!supportsFile && fileInput.files.length) fileInput.value = "";
}

function isSupportedCourseFile(file, type) {
  const extensionMatches = {
    video: /\.(mp4|webm|mov|m4v|ogv|ogg)$/i,
    pdf: /\.pdf$/i,
    image: /\.(avif|bmp|gif|jpe?g|png|svg|webp)$/i,
  };
  const mimeMatches = type === "video" ? file.type.startsWith("video/")
    : type === "image" ? file.type.startsWith("image/")
      : type === "pdf" && file.type === "application/pdf";
  return mimeMatches || (!file.type || file.type === "application/octet-stream") && extensionMatches[type].test(file.name);
}

function resetOrientationForm() {
  document.querySelector("#orientation-form").reset();
  [...document.querySelector("#orientation-sectors").options].forEach((option) => { option.selected = false; });
  editingOrientationId = null;
  document.querySelector("#publish-orientation").textContent = "Publicar orientação";
  document.querySelector("#cancel-orientation-edit").hidden = true;
}

function refreshPublishedContent() {
  localStorage.setItem(courseContentStorageKey, JSON.stringify(courseMaterials));
  localStorage.setItem(courseModulesStorageKey, JSON.stringify(courseModules));
  localStorage.setItem(orientationStorageKey, JSON.stringify(publishedOrientations));
  saveSectorData();
  renderResources();
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

function initializeDemoLogin() {
  if (!demoSession) return;
  demoLoginScreen.hidden = true;
  appShell.hidden = false;
  appShell.setAttribute("aria-hidden", "false");
  demoAdminLinks.forEach((link) => { link.hidden = !hasAdminAccess(); });
  updateDemoProfile();
}

function releaseCourseFileUrls() {
  activeCourseFileUrls.forEach((url) => URL.revokeObjectURL(url));
  activeCourseFileUrls = [];
}

function renderPlatformModules() {
  activePlatformFileUrls.forEach((url) => URL.revokeObjectURL(url));
  activePlatformFileUrls = [];
  document.querySelectorAll("[data-platform-modules]").forEach((container) => {
    container.hidden = true;
    container.replaceChildren();
  });
  const platformId = Object.keys(materialPlatforms).find((id) => materialPlatforms[id].page === currentPage);
  if (!platformId || !(getActiveAssignment().platformIds || []).includes(platformId)) return;
  const container = document.querySelector(`[data-platform-modules="${platformId}"]`);
  const modules = courseModules.filter((module) => module.courseId === platformId);
  if (!modules.length) return;
  const moduleParam = new URLSearchParams(location.hash.split("?")[1] || "").get("modulo");
  container.hidden = false;
  const heading = document.createElement("h2");
  heading.textContent = "Módulos";
  container.append(heading);
  modules.forEach((module, index) => {
    const items = courseMaterials.filter((item) => item.courseId === platformId && item.moduleId === module.id);
    const section = document.createElement("details");
    section.className = "course-module";
    section.open = moduleParam ? module.id === moduleParam : index === 0;
    const summary = document.createElement("summary");
    const number = document.createElement("span");
    number.className = "course-module-number";
    number.textContent = String(index + 1).padStart(2, "0");
    const copy = document.createElement("span");
    copy.className = "course-module-copy";
    const title = document.createElement("strong");
    title.textContent = module.title;
    const count = document.createElement("small");
    count.textContent = `${items.length} ${items.length === 1 ? "conteúdo" : "conteúdos"}`;
    copy.append(title, count);
    summary.append(number, copy);
    const list = document.createElement("div");
    list.className = "course-extra-material-list";
    if (!items.length) {
      const empty = document.createElement("p");
      empty.className = "course-module-empty";
      empty.textContent = "As aulas e os materiais deste módulo ainda serão publicados.";
      list.append(empty);
    }
    items.forEach((item) => {
      const card = document.createElement("article");
      card.className = `course-extra-material${item.fileId ? " course-extra-material--file" : ""}`;
      const itemCopy = document.createElement("span");
      const itemTitle = document.createElement("strong");
      itemTitle.textContent = item.title;
      const description = document.createElement("small");
      description.textContent = item.description || `${getCourseContentTypeLabel(item.type)} do módulo`;
      itemCopy.append(itemTitle, description);
      card.append(itemCopy);
      if (item.fileId) {
        const status = document.createElement("small");
        status.className = "course-extra-file-status";
        status.textContent = "Carregando arquivo...";
        card.append(status);
        getCourseFile(item.fileId).then((file) => {
          if (!file) throw new Error("O arquivo local não foi encontrado.");
          if (!card.isConnected) return;
          const fileUrl = URL.createObjectURL(file);
          activePlatformFileUrls.push(fileUrl);
          status.hidden = true;
          if (item.type === "video") {
            const video = document.createElement("video");
            video.className = "course-extra-video";
            video.controls = true;
            video.preload = "metadata";
            video.setAttribute("aria-label", `Vídeo: ${item.title}`);
            video.src = fileUrl;
            card.append(video);
          } else if (item.type === "image") {
            const image = document.createElement("img");
            image.className = "course-extra-image";
            image.src = fileUrl;
            image.alt = item.title;
            card.append(image);
          } else {
            const link = document.createElement("a");
            link.href = fileUrl;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.textContent = "Abrir PDF ↗";
            card.append(link);
          }
        }).catch((error) => {
          console.error(`Não foi possível carregar o arquivo "${item.title}".`, error);
          status.textContent = "Arquivo indisponível neste navegador. Reenvie-o pelo painel administrativo.";
        });
      } else {
        const link = document.createElement("a");
        link.href = item.url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = item.type === "video" ? "Assistir vídeo ↗" : "Abrir material ↗";
        card.append(link);
      }
      list.append(card);
    });
    section.append(summary, list);
    container.append(section);
  });
}

function openCourse(courseId) {
  const course = courses[courseId];
  if (!course) return;

  releaseCourseFileUrls();
  currentCourseId = courseId;
  document.querySelector("#dialog-category").textContent = course.category;
  document.querySelector("#dialog-title").textContent = course.title;
  document.querySelector("#dialog-description").textContent = course.description;
  document.querySelector("#dialog-duration").textContent = `◷ ${course.duration}`;
  document.querySelector("#dialog-lessons").textContent = `${course.lessons.length} itens no roteiro`;
  document.querySelector("#dialog-section-title").textContent = "Roteiro da trilha";
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

  const extraMaterials = document.querySelector("#course-extra-materials");
  extraMaterials.replaceChildren();
  extraMaterials.hidden = true;
  document.querySelector("#content-note").hidden = false;

  const isComplete = progress.completedCourses.includes(courseId);
  document.querySelector("#dialog-status").textContent = isComplete ? "Trilha concluída" : "No seu ritmo · salve seu progresso neste dispositivo";
  document.querySelector("#complete-course").textContent = isComplete ? "Desfazer conclusão" : "Marcar trilha como concluída";
  document.querySelector("#complete-course").hidden = false;
  document.querySelector("#resource-link").hidden = true;
  document.querySelector("#content-note").innerHTML = "<span aria-hidden=\"true\">✦</span> Consulte os vídeos e materiais disponíveis na seção Materiais.";
  if (!courseDialog.open) courseDialog.showModal();
}

function openResource(resourceId) {
  const resource = resources.find((item) => item.id === resourceId);
  if (!resource) return;

  releaseCourseFileUrls();
  currentCourseId = null;
  const extraMaterials = document.querySelector("#course-extra-materials");
  extraMaterials.hidden = true;
  extraMaterials.replaceChildren();
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
  contentNote.hidden = false;
  document.querySelector("#dialog-status").textContent = resource.type === "video" && !resource.videoUrl
    ? "Sessão reservada · aguardando o vídeo da equipe"
    : `${resource.platformName} · material de consulta`;
  document.querySelector("#complete-course").hidden = true;
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

userAccessTabButtons.forEach((button) => {
  button.addEventListener("click", () => activateUserAccessTab(button.dataset.userAccessTab, true));
  button.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
    const currentIndex = userAccessTabButtons.indexOf(button);
    const offset = event.key === "ArrowRight" ? 1 : -1;
    const nextTab = userAccessTabButtons[(currentIndex + offset + userAccessTabButtons.length) % userAccessTabButtons.length];
    event.preventDefault();
    activateUserAccessTab(nextTab.dataset.userAccessTab, true);
    nextTab.focus();
  });
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

demoLoginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = document.querySelector("#demo-email").value.trim().toLocaleLowerCase("pt-BR");
  const password = document.querySelector("#demo-password").value;
  const submitButton = demoLoginForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;

  try {
    const user = users.find((item) => item.email.toLocaleLowerCase("pt-BR") === email);
    if (!user || user.accessBlocked || !password) {
      demoLoginError.textContent = "E-mail ou senha incorretos. Confira seus dados e tente novamente.";
      demoLoginError.hidden = false;
      return;
    }

    if (!await verifyOrSetPassword(user, password)) {
      demoLoginError.textContent = "E-mail ou senha incorretos. Confira seus dados e tente novamente.";
      demoLoginError.hidden = false;
      return;
    }

    demoLoginError.hidden = true;
    setDemoSession(email);
  } catch (error) {
    console.error("Não foi possível validar a senha neste navegador.", error);
    demoLoginError.textContent = "Não foi possível validar sua senha neste navegador. Tente novamente.";
    demoLoginError.hidden = false;
  } finally {
    submitButton.disabled = false;
  }
});

window.addEventListener("storage", (event) => {
  if (event.key !== usersStorageKey) return;

  try {
    const updatedUsers = JSON.parse(event.newValue || "[]");
    if (!Array.isArray(updatedUsers)) throw new TypeError("A lista de usuários não é válida.");
    users = updatedUsers;
  } catch (error) {
    console.error("Não foi possível atualizar os acessos deste navegador.", error);
    return;
  }

  if (!demoSession) return;
  const currentUser = users.find((user) => user.email.toLocaleLowerCase("pt-BR") === demoSession.email);
  if (!currentUser || currentUser.accessBlocked || currentUser.role !== demoSession.role) {
    sessionStorage.removeItem(demoSessionStorageKey);
    demoSession = null;
    demoLoginScreen.hidden = false;
    appShell.hidden = true;
    appShell.setAttribute("aria-hidden", "true");
    demoAdminLinks.forEach((link) => { link.hidden = true; });
    demoLoginError.textContent = "Seu acesso não está disponível. Consulte um administrador.";
    demoLoginError.hidden = false;
    return;
  }

  renderAdminPanel();
  updateDemoProfile();
});

document.querySelector("#admin-sector-select").addEventListener("change", (event) => {
  activeSectorId = event.target.value;
  localStorage.setItem(activeSectorStorageKey, activeSectorId);
  renderAdminPanel();
  refreshSectorViews();
});

document.querySelector("#admin-user-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = document.querySelector("#managed-user-name").value.trim();
  const email = document.querySelector("#managed-user-email").value.trim().toLocaleLowerCase("pt-BR");
  const role = document.querySelector("#managed-user-role").value;
  const sectorId = document.querySelector("#managed-user-sector").value;
  const team = document.querySelector("#managed-user-team").value.trim();
  const password = document.querySelector("#managed-user-password").value;
  if (!name) {
    showToast("Informe o nome do usuário.");
    return;
  }
  if (!email || !sectorId) {
    showToast("Informe um e-mail e selecione um setor para o acesso.");
    return;
  }
  if ((!editingUserId || password) && password.length < 8) {
    showToast("A senha deve ter pelo menos 8 caracteres.");
    return;
  }
  if (role === "super-admin" && !isSuperAdmin()) {
    showToast("Somente um Super Admin pode conceder esse perfil.");
    return;
  }

  const duplicate = users.find((user) => user.email.toLocaleLowerCase("pt-BR") === email && user.id !== editingUserId);
  if (duplicate) {
    showToast("Esse e-mail já possui acesso.");
    return;
  }

  const editingUser = users.find((user) => user.id === editingUserId);
  if (editingUser && isSystemAdminUser(editingUser)) {
    showToast("A conta principal do sistema é protegida e não pode ser alterada.");
    resetUserForm();
    return;
  }
  if (email === systemAdminEmail && editingUser) {
    showToast("Esse e-mail é reservado para a conta principal. Crie um novo acesso para ele.");
    return;
  }
  if (email === systemAdminEmail && role !== "super-admin") {
    showToast("A conta principal precisa ter o perfil Super Admin.");
    return;
  }
  if (editingUser && !isSuperAdmin() && editingUser.role === "super-admin") {
    showToast("Você não pode alterar o acesso de um Super Admin.");
    return;
  }
  if (editingUser?.id === "super-admin-owner" && (email !== demoAdminEmail || role !== "super-admin")) {
    showToast("O acesso principal de Super Admin não pode ser removido ou rebaixado.");
    return;
  }

  let passwordCredential = null;
  if (password) {
    try {
      passwordCredential = await createPasswordCredential(password);
    } catch (error) {
      console.error("Não foi possível proteger a senha do novo acesso.", error);
      showToast("Não foi possível proteger a senha neste navegador.");
      return;
    }
  }

  if (editingUser) {
    editingUser.name = name;
    editingUser.email = email;
    editingUser.role = role;
    editingUser.sectorId = sectorId;
    editingUser.team = team;
    if (passwordCredential) Object.assign(editingUser, passwordCredential);
  } else {
    if (!passwordCredential) {
      showToast("Informe uma senha inicial para criar o acesso.");
      return;
    }
    users.push({
      id: email === systemAdminEmail
        ? systemAdminUserId
        : `user-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name,
      email,
      role,
      sectorId,
      team,
      ...passwordCredential,
    });
  }
  saveUsers();
  resetUserForm();
  renderAdminPanel();
  updateDemoProfile();
  showToast(editingUser ? "Acesso atualizado." : "Acesso criado.");
});

document.querySelector("#cancel-user-edit").addEventListener("click", resetUserForm);

document.querySelector("#admin-user-list").addEventListener("click", (event) => {
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
    if (isSystemAdminUser(user) || user.id === "super-admin-owner" || isCurrentUser || (!isSuperAdmin() && user.role === "super-admin")) return;
    const accessBlocked = !user.accessBlocked;
    if (!window.confirm(`${accessBlocked ? "Bloquear" : "Desbloquear"} o acesso de ${user.name}?`)) return;
    user.accessBlocked = accessBlocked;
    saveUsers();
    renderAdminPanel();
    showToast(`Acesso de ${user.name} ${accessBlocked ? "bloqueado" : "desbloqueado"}.`);
    return;
  }

  if (button.dataset.userAction === "delete") {
    if (isSystemAdminUser(user) || user.email === demoSession.email || (!isSuperAdmin() && user.role === "super-admin")) return;
    if (!window.confirm(`Excluir o acesso de ${user.name}?`)) return;
    users = users.filter((item) => item.id !== user.id);
    saveUsers();
    renderAdminPanel();
    showToast("Acesso removido.");
  }
});

function resetCourseModuleForm() {
  editingModuleId = null;
  document.querySelector("#module-title").value = "";
  document.querySelector("#module-course").disabled = false;
  document.querySelector("#save-course-module").textContent = "Criar módulo";
  document.querySelector("#cancel-module-edit").hidden = true;
}

document.querySelector("#module-course").addEventListener("change", renderCourseModules);
document.querySelector("#content-course").addEventListener("change", () => renderModuleOptions(""));
document.querySelector("#cancel-module-edit").addEventListener("click", resetCourseModuleForm);
document.querySelector("#course-module-form").addEventListener("submit", (event) => {
  event.preventDefault();
  if (!isSuperAdmin()) return;
  const courseId = document.querySelector("#module-course").value;
  const title = document.querySelector("#module-title").value.trim();
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
    editingModule.courseId = courseId;
    courseMaterials.filter((item) => item.moduleId === moduleId)
      .forEach((item) => { item.courseId = courseId; });
  } else {
    moduleId = `module-${Date.now()}`;
    while (courseModules.some((module) => module.id === moduleId)) moduleId += "-1";
    courseModules.push({ id: moduleId, courseId, title });
  }
  resetCourseModuleForm();
  document.querySelector("#content-course").value = courseId;
  refreshPublishedContent();
  renderModuleOptions(moduleId);
  showToast(editingModule ? "Módulo atualizado." : "Módulo criado. Adicione as aulas e os materiais abaixo.");
});

document.querySelector("#course-module-list").addEventListener("click", (event) => {
  if (!isSuperAdmin()) return;
  const button = event.target.closest("[data-course-module-action]");
  const module = courseModules.find((item) => item.id === button?.dataset.itemId);
  if (!module) return;
  if (button.dataset.courseModuleAction === "edit") {
    editingModuleId = module.id;
    document.querySelector("#module-course").value = module.courseId;
    document.querySelector("#module-title").value = module.title;
    document.querySelector("#save-course-module").textContent = "Salvar módulo";
    document.querySelector("#cancel-module-edit").hidden = false;
    document.querySelector("#module-title").focus();
    return;
  }
  if (courseMaterials.some((item) => item.moduleId === module.id && item.courseId === module.courseId)) {
    showToast("Para excluir este módulo, primeiro mova ou exclua seus conteúdos.");
    return;
  }
  if (!window.confirm(`Excluir o módulo "${module.title}"?`)) return;
  courseModules = courseModules.filter((item) => item.id !== module.id);
  if (editingModuleId === module.id) resetCourseModuleForm();
  refreshPublishedContent();
  showToast("Módulo removido.");
});

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

document.querySelector("#course-content-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!isSuperAdmin()) return;

  const id = editingCourseContentId || `course-content-${Date.now()}`;
  const courseId = document.querySelector("#content-course").value;
  const moduleId = document.querySelector("#content-module").value;
  const type = document.querySelector("#content-type").value;
  const title = document.querySelector("#content-title").value.trim();
  const description = document.querySelector("#content-description").value.trim();
  const url = document.querySelector("#content-url").value.trim();
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

  const fileId = file
    ? existingContent?.fileId || id
    : url ? "" : reusableFileId;
  if (file) {
    try {
      await storeCourseFile(fileId, file);
    } catch (error) {
      console.error("Não foi possível salvar o arquivo local.", error);
      showToast(error.name === "QuotaExceededError"
        ? "O navegador não tem espaço suficiente para salvar esse arquivo."
        : "Não foi possível salvar o arquivo neste navegador.");
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
  resetCourseContentForm();
  refreshPublishedContent();
  if (existingContent?.fileId && existingContent.fileId !== content.fileId) {
    try {
      await deleteCourseFile(existingContent.fileId);
    } catch (error) {
      console.error("Não foi possível remover o arquivo substituído.", error);
      showToast("Conteúdo atualizado, mas o arquivo antigo não pôde ser removido do armazenamento local.");
      return;
    }
  }
  showToast(existingIndex >= 0 ? "Conteúdo atualizado em Materiais." : "Conteúdo publicado em Materiais.");
});

document.querySelector("#cancel-course-content-edit").addEventListener("click", resetCourseContentForm);
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
      ? `${getCourseContentTypeLabel(item.type)} atual: ${item.fileName || "Arquivo local"}. Selecione outro arquivo para substituir.`
      : "";
    currentFile.hidden = !item.fileId;
    updateCourseContentSourceFields();
    document.querySelector("#publish-course-content").textContent = "Salvar alterações";
    document.querySelector("#cancel-course-content-edit").hidden = false;
    document.querySelector("#content-title").focus();
    return;
  }

  if (!window.confirm(`Excluir "${item.title}" do módulo?`)) return;
  if (item.fileId) {
    try {
      await deleteCourseFile(item.fileId);
    } catch (error) {
      console.error("Não foi possível excluir o arquivo local.", error);
      showToast("Não foi possível remover o arquivo deste navegador.");
      return;
    }
  }
  courseMaterials = courseMaterials.filter((content) => content.id !== item.id);
  refreshPublishedContent();
  showToast("Conteúdo removido do módulo.");
});

document.querySelector("#orientation-form").addEventListener("submit", (event) => {
  event.preventDefault();
  if (!isSuperAdmin()) return;
  const sectorIds = [...document.querySelector("#orientation-sectors").selectedOptions].map((option) => option.value);
  if (!sectorIds.length) {
    showToast("Selecione ao menos um setor para a orientação.");
    return;
  }

  const orientation = {
    id: editingOrientationId || `orientation-${Date.now()}`,
    title: document.querySelector("#orientation-title").value.trim(),
    body: document.querySelector("#orientation-body").value.trim(),
    url: document.querySelector("#orientation-url").value.trim(),
    sectorIds,
  };
  if (!orientation.title || !orientation.body) return;

  const existingIndex = publishedOrientations.findIndex((item) => item.id === editingOrientationId);
  if (existingIndex >= 0) {
    publishedOrientations[existingIndex] = orientation;
  } else {
    publishedOrientations.push(orientation);
  }
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
  refreshPublishedContent();
  showToast(existingIndex >= 0 ? "Orientação atualizada." : "Orientação publicada.");
});

document.querySelector("#cancel-orientation-edit").addEventListener("click", resetOrientationForm);
document.querySelector("#published-orientation-list").addEventListener("click", (event) => {
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
    [...document.querySelector("#orientation-sectors").options].forEach((option) => {
      option.selected = (orientation.sectorIds || []).includes(option.value);
    });
    document.querySelector("#publish-orientation").textContent = "Salvar alterações";
    document.querySelector("#cancel-orientation-edit").hidden = false;
    document.querySelector("#orientation-title").focus();
    return;
  }

  if (!window.confirm(`Excluir a orientação "${orientation.title}"?`)) return;
  publishedOrientations = publishedOrientations.filter((item) => item.id !== orientation.id);
  const resourceIndex = resources.findIndex((resource) => resource.id === orientation.id);
  if (resourceIndex >= 0) resources.splice(resourceIndex, 1);
  sectors.forEach((sector) => {
    const assignment = sectorAssignments[sector.id];
    if (assignment) assignment.resourceIds = assignment.resourceIds.filter((id) => id !== orientation.id);
  });
  refreshPublishedContent();
  showToast("Orientação removida.");
});

document.querySelector("#save-sector-details").addEventListener("click", () => {
  const sector = getActiveSector();
  const name = document.querySelector("#admin-sector-name").value.trim();
  if (!name) {
    showToast("Informe o nome do setor.");
    return;
  }

  sector.name = name;
  sector.vps = document.querySelector("#admin-sector-vps").value
    .split(",")
    .map((vp) => vp.trim())
    .filter(Boolean);
  sector.teams = document.querySelector("#admin-sector-teams").value
    .split(/\r?\n/)
    .map((line) => line.split("|").map((part) => part.trim()))
    .filter(([teamName]) => teamName)
    .map(([teamName, leader = ""]) => ({ name: teamName, leader }));
  saveSectorData();
  renderAdminPanel();
  refreshSectorViews();
  showToast("Setor atualizado neste navegador.");
});

document.querySelector("#add-sector").addEventListener("click", () => {
  const nameInput = document.querySelector("#new-sector-name");
  const vpInput = document.querySelector("#new-sector-vps");
  const name = nameInput.value.trim();
  if (!name) {
    showToast("Informe o nome do novo setor.");
    nameInput.focus();
    return;
  }
  if (sectors.some((sector) => normalizeText(sector.name) === normalizeText(name))) {
    showToast("Esse setor já está cadastrado.");
    return;
  }

  const baseId = normalizeText(name).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "setor";
  let id = baseId;
  let suffix = 2;
  while (sectors.some((sector) => sector.id === id)) {
    id = `${baseId}-${suffix}`;
    suffix += 1;
  }

  sectors.push({
    id,
    name,
    vps: vpInput.value.split(",").map((vp) => vp.trim()).filter(Boolean),
    teams: [],
  });
  sectorAssignments[id] = {
    courseIds: [...defaultSectorAssignment.courseIds],
    resourceIds: [...defaultSectorAssignment.resourceIds],
    platformIds: [...defaultSectorAssignment.platformIds],
  };
  activeSectorId = id;
  saveSectorData();
  nameInput.value = "";
  vpInput.value = "";
  renderAdminPanel();
  refreshSectorViews();
  showToast("Setor adicionado à prévia.");
});

document.querySelector("#delete-sector").addEventListener("click", () => {
  if (sectors.length <= 1) {
    showToast("A prévia precisa manter pelo menos um setor.");
    return;
  }
  const sector = getActiveSector();
  if (!window.confirm(`Excluir o setor "${sector.name}" desta prévia?`)) return;

  sectors = sectors.filter((item) => item.id !== sector.id);
  delete sectorAssignments[sector.id];
  const fallbackSectorId = sectors[0].id;
  users.forEach((user) => {
    if (user.sectorId === sector.id) user.sectorId = fallbackSectorId;
  });
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
  saveUsers();
  localStorage.setItem(orientationStorageKey, JSON.stringify(publishedOrientations));
  saveSectorData();
  renderAdminPanel();
  refreshSectorViews();
  showToast("Setor removido desta prévia.");
});

document.querySelector("#save-sector-assignment").addEventListener("click", () => {
  if (!isSuperAdmin()) return;
  const courseIds = [...document.querySelectorAll('[data-assignment-type="course"]:checked')].map((input) => input.value);
  const resourceIds = [...document.querySelectorAll('[data-assignment-type="resource"]:checked')].map((input) => input.value);
  const platformIds = [...document.querySelectorAll('[data-assignment-type="platform"]:checked')].map((input) => input.value);
  sectorAssignments[activeSectorId] = { courseIds, resourceIds, platformIds };
  saveSectorData();
  refreshSectorViews();
  showToast("Trilhas e materiais do setor foram atualizados.");
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
courseDialog.addEventListener("close", releaseCourseFileUrls);
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

document.querySelector("#demo-logout").addEventListener("click", () => {
  sessionStorage.removeItem(demoSessionStorageKey);
  demoSession = null;
  document.querySelector("#demo-password").value = "";
  profileMenu.hidden = true;
  profileMenuButton.setAttribute("aria-expanded", "false");
  appShell.hidden = true;
  appShell.setAttribute("aria-hidden", "true");
  demoAdminLinks.forEach((link) => { link.hidden = true; });
  demoLoginScreen.hidden = false;
  location.hash = "#/inicio";
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
renderResources();
initializeDemoLogin();
updateProgressUI();
renderRoute(location.hash || "#/inicio");
