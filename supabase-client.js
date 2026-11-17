(() => {
  const projectUrl = "https://fmgkuggsrxpfarsalffy.supabase.co";
  const publishableKey = "sb_publishable_EopPusZ7_2IXJNsOHW_1PQ_a_BkmDgl";

  if (!window.supabase?.createClient) {
    console.error("A biblioteca do Supabase não foi carregada.");
    return;
  }

  window.trainingSupabase = window.supabase.createClient(projectUrl, publishableKey);
})();
