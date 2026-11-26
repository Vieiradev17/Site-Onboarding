// VISAO GERAL: blocos editaveis, validacao e montagem da pagina.
const homeVisualKeys = ["homeTasks", "homeShortcuts", "homeCards", "homeHeroImage"];
const homeIcons = { book: "📚", star: "✦", rocket: "🚀", link: "↗", help: "?", check: "✓", clock: "◷", team: "♟" };
const homeIconNames = { book: "Livro", star: "Estrela", rocket: "Foguete", link: "Link", help: "Ajuda", check: "Concluído", clock: "Relógio", team: "Equipe" };
const homeRoutes = ["inicio", "trilhas", "materiais", "hubspot", "microsoft", "seguranca", "orientacoes", "ajuda", "admin"];
const homeTaskIds = ["profile", "access", "security", "tools"];
const homeShortcutIds = ["trilhas", "materiais", "orientacoes"];

function homeValuesEqual(left, right) {
  if (Array.isArray(left) && Array.isArray(right)) {
    return left.length === right.length && left.every((item, index) => homeValuesEqual(item, right[index]));
  }
  if (left && right && typeof left === "object" && typeof right === "object") {
    const keys = Object.keys(left);
    return keys.length === Object.keys(right).length && keys.every((key) => Object.prototype.hasOwnProperty.call(right, key) && homeValuesEqual(left[key], right[key]));
  }
  return left === right;
}

function createHomeDefaults() {
  const taskRows = [...document.querySelectorAll(".checklist-item")];
  const shortcutRows = [...document.querySelectorAll(".home-shortcut")];
  return {
    homeTasks: taskRows.map((row) => ({
      id: row.dataset.taskRow, title: row.querySelector("strong").textContent,
      description: row.querySelector("small").textContent, tag: row.querySelector(".task-tag").textContent,
    })),
    homeShortcuts: shortcutRows.map((row, index) => ({
      id: homeShortcutIds[index], title: row.querySelector("strong").textContent,
      description: row.querySelector("small").textContent, destination: row.getAttribute("href"),
      icon: ["star", "book", "help"][index], image: "",
    })),
    homeCards: [
      { id: "available", title: "Trilhas disponíveis", description: "para você explorar", metric: "available", value: "", icon: "book", image: "" },
      { id: "time", title: "Tempo de aprendizado", description: "sua jornada começa agora", metric: "text", value: "0 h", icon: "clock", image: "" },
      { id: "completed", title: "Conteúdos concluídos", description: "cada passo conta", metric: "completed", value: "", icon: "star", image: "" },
    ],
    homeHeroImage: "",
  };
}

function homeSafeDestination(value) {
  if (typeof value !== "string" || value.length > 2000) return false;
  if (/^#\/[a-z]+(?:\/[a-z]+)?(?:\?[^#\s]*)?$/.test(value)) {
    const route = value.slice(2).split("?")[0].split("/");
    return route.length === 1 ? homeRoutes.includes(route[0])
      : route[0] === "materiais" && ["hubspot", "microsoft", "seguranca"].includes(route[1]);
  }
  try { return ["http:", "https:", "mailto:", "tel:"].includes(new URL(value).protocol); } catch { return false; }
}

function homeSafeImage(value) {
  if (typeof value !== "string" || value.length > 2000) return false;
  if (!value) return true;
  if (/^storage:(global|sector\/[a-zA-Z0-9_-]+|user\/[a-zA-Z0-9_-]+)\/[a-zA-Z0-9._-]+$/.test(value)) return true;
  try { return ["http:", "https:"].includes(new URL(value).protocol); } catch { return false; }
}

function validateHomeVisual(settings) {
  const result = {};
  const text = (value, limit, required = true) => typeof value === "string" && value.length <= limit && (!required || Boolean(value.trim()));
  for (const key of homeVisualKeys) {
    if (settings[key] === undefined) continue;
    const value = settings[key];
    if (key === "homeHeroImage") {
      if (!homeSafeImage(value)) throw new Error("A imagem de boas-vindas é inválida.");
    } else {
      if (!Array.isArray(value) || value.length > 30) throw new Error("A lista da página inicial é inválida ou ultrapassa 30 itens.");
      const ids = new Set();
      value.forEach((item) => {
        if (!item || typeof item !== "object" || Array.isArray(item) || typeof item.id !== "string"
          || !/^[a-zA-Z0-9_-]{1,80}$/.test(item.id) || ids.has(item.id)
          || !text(item.title, 120) || !text(item.description, 300, false)) throw new Error("Um item da página inicial está inválido.");
        ids.add(item.id);
        if (key === "homeTasks" && !text(item.tag, 40, false)) throw new Error("A etiqueta do checklist está inválida.");
        if (key !== "homeTasks" && !Object.prototype.hasOwnProperty.call(homeIcons, item.icon)) throw new Error("O ícone escolhido é inválido.");
        if (key !== "homeTasks" && !homeSafeImage(item.image)) throw new Error("O endereço da imagem é inválido.");
        if (key === "homeShortcuts" && !homeSafeDestination(item.destination)) throw new Error("Use uma página interna ou um endereço http(s), mailto ou tel válido.");
        if (key === "homeCards" && (!["available", "completed", "text"].includes(item.metric) || !text(item.value, 40, item.metric === "text"))) throw new Error("O valor do card está inválido.");
      });
    }
    result[key] = value;
  }
  return result;
}

function resolveHomeVisual(...layers) {
  const result = structuredClone(defaultHomeVisual);
  layers.forEach((layer) => {
    if (!layer) return;
    homeTaskIds.forEach((id, index) => {
      const item = result.homeTasks.find((entry) => entry.id === id);
      if (!item) return;
      if (layer[`task${index + 1}Title`] !== undefined) item.title = layer[`task${index + 1}Title`];
      if (layer[`task${index + 1}Description`] !== undefined) item.description = layer[`task${index + 1}Description`];
    });
    homeShortcutIds.forEach((id, index) => {
      const item = result.homeShortcuts.find((entry) => entry.id === id);
      if (!item) return;
      if (layer[`shortcut${index + 1}Title`] !== undefined) item.title = layer[`shortcut${index + 1}Title`];
      if (layer[`shortcut${index + 1}Description`] !== undefined) item.description = layer[`shortcut${index + 1}Description`];
    });
    Object.assign(result, structuredClone(validateHomeVisual(layer)));
  });
  return result;
}

let homeImageUrls = [];
let homeImageRenderVersion = 0;
async function showHomeImage(element, value, version) {
  if (!value) return;
  try {
    let url = value;
    if (value.startsWith("storage:")) {
      const path = value.slice(8);
      const data = supabaseEnabled
        ? assertSupabaseResult(await window.trainingSupabase.storage.from("home-media").createSignedUrl(path, 3600), "carregar imagem da página inicial").signedUrl
        : await getCourseFile(path);
      if (!data) throw new Error("Imagem não encontrada.");
      if (version !== homeImageRenderVersion) return;
      if (typeof data !== "string") {
        url = URL.createObjectURL(data);
        homeImageUrls.push(url);
      } else url = data;
    }
    if (version !== homeImageRenderVersion) return;
    element.addEventListener("error", () => {
      element.hidden = true;
      console.error("Não foi possível carregar uma imagem da página inicial.");
      showToast("Não foi possível carregar uma imagem da página inicial.");
    }, { once: true });
    element.src = url;
    element.hidden = false;
  } catch (error) {
    console.error("Não foi possível carregar imagem da página inicial.", error);
    showToast("Não foi possível carregar uma imagem da página inicial.");
  }
}

function homeImageElement(value, className, version) {
  const image = document.createElement("img");
  image.className = className;
  image.alt = "";
  image.hidden = true;
  if (value) void showHomeImage(image, value, version);
  return image;
}

function renderHomeVisual(visual) {
  const version = ++homeImageRenderVersion;
  homeImageUrls.forEach((url) => URL.revokeObjectURL(url));
  homeImageUrls = [];
  const hero = document.querySelector(".welcome-illustration");
  hero.querySelector(".home-hero-image")?.remove();
  hero.append(homeImageElement(visual.homeHeroImage, "home-hero-image", version));
  const checklist = document.querySelector(".checklist");
  checklist.replaceChildren();
  visual.homeTasks.forEach((task) => {
    const label = document.createElement("label");
    label.className = "checklist-item";
    label.dataset.taskRow = task.id;
    const input = document.createElement("input");
    input.type = "checkbox";
    input.dataset.task = task.id;
    const check = document.createElement("span");
    check.className = "task-check";
    check.setAttribute("aria-hidden", "true");
    const copy = document.createElement("span");
    copy.className = "task-copy";
    const title = document.createElement("strong");
    title.textContent = task.title;
    const description = document.createElement("small");
    description.textContent = task.description;
    copy.append(title, description);
    const tag = document.createElement("span");
    tag.className = "task-tag";
    tag.textContent = task.tag;
    label.append(input, check, copy, tag);
    checklist.append(label);
  });
  const shortcuts = document.querySelector(".home-shortcut-row");
  shortcuts.replaceChildren();
  visual.homeShortcuts.forEach((item) => {
    const link = document.createElement("a");
    link.className = "home-shortcut";
    link.href = item.destination;
    if (/^https?:/i.test(item.destination)) { link.target = "_blank"; link.rel = "noopener noreferrer"; }
    const icon = document.createElement("span");
    icon.className = "home-shortcut-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = homeIcons[item.icon];
    icon.append(homeImageElement(item.image, "home-item-image", version));
    const title = document.createElement("strong");
    title.textContent = item.title;
    const description = document.createElement("small");
    description.textContent = item.description;
    const arrow = document.createElement("b");
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "→";
    link.append(icon, title, description, arrow);
    shortcuts.append(link);
  });
  const cards = document.querySelector(".stats-grid");
  cards.replaceChildren();
  visual.homeCards.forEach((item) => {
    const card = document.createElement("article");
    card.className = "stat-card";
    const icon = document.createElement("span");
    icon.className = "stat-icon mint";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = homeIcons[item.icon];
    icon.append(homeImageElement(item.image, "home-item-image", version));
    const content = document.createElement("div");
    const title = document.createElement("p");
    title.textContent = item.title;
    const value = document.createElement("strong");
    value.dataset.homeMetric = item.metric;
    value.textContent = item.value;
    content.append(title, value);
    const description = document.createElement("span");
    description.className = "stat-note";
    description.textContent = item.description;
    card.append(icon, content, description);
    cards.append(card);
  });
}

function homeEditorField(parent, labelText, name, value, options = null) {
  const label = document.createElement("label");
  label.textContent = labelText;
  const input = document.createElement(options ? "select" : "input");
  input.dataset.homeField = name;
  if (options) options.forEach(([key, text]) => input.add(new Option(text, key)));
  input.value = value;
  label.append(input);
  parent.append(label);
  return input;
}

function homeImageEditor(parent, value) {
  const input = homeEditorField(parent, "Imagem por link (http/https)", "image", value.startsWith("storage:") ? "" : value);
  input.dataset.stored = value.startsWith("storage:") ? value : "";
  const file = homeEditorField(parent, "Ou enviar imagem (PNG, JPEG ou WebP, até 5 MB)", "file", "");
  file.type = "file";
  file.accept = "image/png,image/jpeg,image/webp";
  if (input.dataset.stored) {
    const clear = document.createElement("button");
    clear.type = "button";
    clear.className = "admin-secondary-button";
    clear.textContent = "Remover imagem enviada";
    clear.addEventListener("click", () => { input.dataset.stored = ""; input.value = ""; file.value = ""; clear.remove(); });
    parent.append(clear);
  }
}

function createHomeEditorSection(container, title, description, icon) {
  const section = document.createElement("details");
  section.className = "admin-card home-editor-section";
  section.dataset.homeSection = title;
  const summary = document.createElement("summary");
  const mark = document.createElement("span");
  mark.className = "home-editor-mark";
  mark.setAttribute("aria-hidden", "true");
  mark.textContent = icon;
  const copy = document.createElement("span");
  copy.className = "home-editor-summary-copy";
  const name = document.createElement("strong");
  name.textContent = title;
  const hint = document.createElement("small");
  hint.textContent = description;
  copy.append(name, hint);
  const action = document.createElement("span");
  action.className = "home-editor-summary-action";
  action.textContent = "Editar";
  section.addEventListener("toggle", () => { action.textContent = section.open ? "Fechar" : "Editar"; });
  summary.append(mark, copy, action);
  const body = document.createElement("div");
  body.className = "home-editor-section-body";
  section.append(summary, body);
  container.append(section);
  return body;
}

function homeEditorItem(list, key, item) {
  const row = document.createElement("details");
  row.className = "home-builder-item";
  row.dataset.homeId = item.id;
  row.open = !item.title;
  const summary = document.createElement("summary");
  const itemName = document.createElement("strong");
  itemName.textContent = item.title || (key === "homeTasks" ? "Novo item" : "Novo card");
  const editLabel = document.createElement("span");
  editLabel.className = "home-editor-summary-action";
  editLabel.textContent = "Editar";
  row.addEventListener("toggle", () => { editLabel.textContent = row.open ? "Fechar" : "Editar"; });
  summary.append(itemName, editLabel);
  const body = document.createElement("div");
  body.className = "home-builder-item-body";
  const fields = document.createElement("div");
  fields.className = "admin-form-grid";
  const title = homeEditorField(fields, "Título", "title", item.title);
  title.required = true;
  title.addEventListener("input", () => { itemName.textContent = title.value.trim() || (key === "homeTasks" ? "Novo item" : "Novo card"); });
  homeEditorField(fields, "Descrição", "description", item.description);
  if (key === "homeTasks") homeEditorField(fields, "Etiqueta", "tag", item.tag);
  else {
    homeEditorField(fields, "Ícone", "icon", item.icon, Object.entries(homeIcons).map(([id, icon]) => [id, `${icon} ${homeIconNames[id]}`]));
    if (key === "homeShortcuts") {
      const destination = homeEditorField(fields, "Destino: escolha uma página ou informe um link", "destination", item.destination);
      destination.required = true;
      const list = document.createElement("datalist");
      list.id = `home-route-${item.id}`;
      homeRoutes.forEach((route) => {
        const option = document.createElement("option");
        option.value = `#/${route}`;
        option.label = route;
        list.append(option);
      });
      destination.setAttribute("list", list.id);
      fields.append(list);
    } else {
      homeEditorField(fields, "Valor do card", "metric", item.metric, [["available", "Trilhas disponíveis"], ["completed", "Trilhas concluídas"], ["text", "Texto definido por você"]]);
      homeEditorField(fields, "Texto do valor personalizado", "value", item.value);
    }
    homeImageEditor(fields, item.image);
  }
  const actions = document.createElement("div");
  actions.className = "admin-actions home-builder-actions";
  [["↑ Subir", "up"], ["↓ Descer", "down"], ["Excluir", "remove"]].forEach(([text, action]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "admin-secondary-button";
    button.textContent = text;
    button.addEventListener("click", () => {
      if (action === "remove") {
        if (key === "homeTasks" && !window.confirm("Remover este item da exibição? O histórico de conclusão será preservado.")) return;
        row.remove();
      } else if (action === "up" && row.previousElementSibling) list.insertBefore(row, row.previousElementSibling);
      else if (action === "down" && row.nextElementSibling) list.insertBefore(row.nextElementSibling, row);
    });
    actions.append(button);
  });
  body.append(fields, actions);
  row.append(summary, body);
  list.append(row);
}

function renderHomeVisualEditor(sections, groups, visual) {
  heroImageEditor(groups["Boas-vindas"], visual.homeHeroImage);
  [["homeCards", "Indicadores", "Cards de indicadores"], ["homeTasks", "Checklist", "Itens do checklist"], ["homeShortcuts", "Atalhos", "Cards de atalhos"]].forEach(([key, section, title]) => {
    const fieldset = document.createElement("fieldset");
    fieldset.className = "home-builder-block";
    fieldset.setAttribute("aria-label", title);
    const description = document.createElement("p");
    description.className = "admin-card-description";
    description.textContent = key === "homeTasks"
      ? "Ao excluir um item, o histórico continua salvo. Para mudar o significado de uma etapa, crie outra."
      : "Adicione, edite e organize os cards. Imagens são opcionais.";
    const list = document.createElement("div");
    list.className = "home-builder-list";
    list.dataset.homeList = key;
    visual[key].forEach((item) => homeEditorItem(list, key, item));
    const add = document.createElement("button");
    add.type = "button";
    add.className = "admin-secondary-button";
    add.textContent = key === "homeTasks" ? "Adicionar item" : "Adicionar card";
    add.addEventListener("click", () => {
      if (list.children.length >= 30) { showToast("O limite é de 30 itens por bloco."); return; }
      const id = `item-${crypto.randomUUID()}`;
      const common = { id, title: "", description: "" };
      const item = key === "homeTasks" ? { ...common, tag: "" }
        : key === "homeShortcuts" ? { ...common, icon: "link", destination: "#/inicio", image: "" }
          : { ...common, icon: "star", metric: "text", value: "", image: "" };
      homeEditorItem(list, key, item);
      list.lastElementChild.querySelector("input").focus();
    });
    fieldset.append(description, list, add);
    sections[section].append(fieldset);
  });
}

function heroImageEditor(parent, value) {
  const wrapper = document.createElement("div");
  wrapper.dataset.homeHero = "";
  wrapper.className = "admin-form-grid admin-field-wide";
  homeImageEditor(wrapper, value);
  parent.append(wrapper);
}

function readHomeVisualEditor({ revealErrors = false } = {}) {
  const uploads = [];
  function readBlock(element, read) {
    try {
      read();
    } catch (error) {
      if (revealErrors) {
        if (element instanceof HTMLDetailsElement) element.open = true;
        const section = element.closest(".home-editor-section");
        if (section) section.open = true;
      }
      throw error;
    }
  }
  function readImage(parent, target, key) {
    const input = parent.querySelector('[data-home-field="image"]');
    const file = parent.querySelector('[data-home-field="file"]').files[0];
    target[key] = input.value.trim() || input.dataset.stored || "";
    if (file) {
      if (!["image/jpeg", "image/png", "image/webp"].includes(file.type) || file.size > 5 * 1024 * 1024) throw new Error("Use uma imagem PNG, JPEG ou WebP de até 5 MB.");
      uploads.push({ file, target, key });
    }
  }
  const visual = {};
  const hero = document.querySelector("[data-home-hero]");
  readBlock(hero, () => {
    readImage(hero, visual, "homeHeroImage");
    validateHomeVisual({ homeHeroImage: visual.homeHeroImage });
  });
  ["homeTasks", "homeShortcuts", "homeCards"].forEach((key) => {
    visual[key] = [...document.querySelectorAll(`[data-home-list="${key}"] > .home-builder-item`)].map((row) => {
      const item = { id: row.dataset.homeId };
      readBlock(row, () => {
        row.querySelectorAll("[data-home-field]").forEach((input) => {
          if (!["file", "image"].includes(input.dataset.homeField)) item[input.dataset.homeField] = input.value.trim();
        });
        if (key !== "homeTasks") readImage(row, item, "image");
        validateHomeVisual({ [key]: [item] });
      });
      return item;
    });
  });
  validateHomeVisual(visual);
  return { visual, uploads };
}

async function uploadHomeImages(uploads, sectorId, userId, uploadedPaths) {
  for (const upload of uploads) {
    const prefix = userId ? `user/${userId}` : sectorId ? `sector/${sectorId}` : "global";
    const extension = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" }[upload.file.type];
    const path = `${prefix}/${crypto.randomUUID()}.${extension}`;
    if (supabaseEnabled) {
      assertSupabaseResult(await window.trainingSupabase.storage.from("home-media").upload(path, upload.file, { contentType: upload.file.type }), "enviar imagem");
    } else await storeCourseFile(path, upload.file);
    uploadedPaths.push(path);
    upload.target[upload.key] = `storage:${path}`;
  }
}

async function removeNewHomeImages(paths) {
  if (!paths.length) return;
  if (supabaseEnabled) assertSupabaseResult(await window.trainingSupabase.storage.from("home-media").remove(paths), "remover imagens não utilizadas");
  else for (const path of paths) await deleteCourseFile(path);
}
