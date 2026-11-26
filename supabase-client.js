(() => {
  // CONEXAO: identificacao do projeto e chave publica do navegador.
  const projectUrl = "https://fmgkuggsrxpfarsalffy.supabase.co";
  const publishableKey = "sb_publishable_EopPusZ7_2IXJNsOHW_1PQ_a_BkmDgl";
  const authStorageKey = "villelatech-training-auth-v1";
  const legacyAuthStorageKey = "sb-fmgkuggsrxpfarsalffy-auth-token";

  if (!window.supabase?.createClient) {
    console.error("A biblioteca do Supabase não foi carregada.");
    return;
  }

  // AUTENTICACAO: armazenamento temporario ou persistente da sessao.
  localStorage.removeItem(legacyAuthStorageKey);
  localStorage.removeItem(`${legacyAuthStorageKey}-code-verifier`);
  const memoryStorage = new Map();
  let rememberSession = Boolean(localStorage.getItem(authStorageKey));
  window.trainingAuthStorage = {
    hasRememberedSession: rememberSession,
    setRememberSession(value) {
      rememberSession = value;
      if (!value) {
        localStorage.removeItem(authStorageKey);
        localStorage.removeItem(`${authStorageKey}-code-verifier`);
      }
    },
  };
  const authStorage = {
    getItem(key) {
      return rememberSession ? localStorage.getItem(key) : (memoryStorage.get(key) ?? null);
    },
    setItem(key, value) {
      if (rememberSession) localStorage.setItem(key, value);
      else memoryStorage.set(key, value);
    },
    removeItem(key) {
      memoryStorage.delete(key);
      localStorage.removeItem(key);
    },
  };

  if (rememberSession) {
    document.querySelector("#session-loading").hidden = false;
    document.querySelector("#demo-login-screen").hidden = true;
  }

  // REQUISICOES: sinais de carregamento e salvamento usados pela interface.
  const monitoredFetch = async (input, init) => {
    const url = typeof input === "string" ? input : input.url;
    const method = (init?.method || input.method || "GET").toUpperCase();
    const kind = method === "GET" || method === "HEAD" || method === "OPTIONS" || url.includes("/auth/")
      ? "loading"
      : "saving";
    window.dispatchEvent(new CustomEvent("training:request-start", { detail: { kind } }));
    try {
      return await window.fetch(input, init);
    } finally {
      window.dispatchEvent(new CustomEvent("training:request-end", { detail: { kind } }));
    }
  };

  window.trainingSupabase = window.supabase.createClient(projectUrl, publishableKey, {
    auth: { storage: authStorage, storageKey: authStorageKey },
    global: { fetch: monitoredFetch },
  });
})();
