(() => {
  const projectUrl = "https://fmgkuggsrxpfarsalffy.supabase.co";
  const publishableKey = "sb_publishable_EopPusZ7_2IXJNsOHW_1PQ_a_BkmDgl";

  if (!window.supabase?.createClient) {
    console.error("A biblioteca do Supabase não foi carregada.");
    return;
  }

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
    global: { fetch: monitoredFetch },
  });
})();
