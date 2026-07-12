(async () => {
  const loginPath = "/login/login.html";

  function redirectToLogin() {
    const next = encodeURIComponent(window.location.pathname + window.location.search);
    window.location.replace(`${loginPath}?next=${next}`);
  }

  try {
    const response = await fetch("/api/auth/me", {
      cache: "no-store",
      credentials: "same-origin",
      headers: { "Accept": "application/json" }
    });

    if (!response.ok) {
      redirectToLogin();
      return;
    }

    const session = await response.json();
    window.MavwuAuth = session.user;
    window.dispatchEvent(new CustomEvent("mavwu:auth", { detail: session.user }));
  } catch (error) {
    redirectToLogin();
  }
})();
