(async () => {
  const loginPath = "/login/login.html";

  function redirectToLogin() {
    const next = encodeURIComponent(window.location.pathname + window.location.search);
    window.location.replace(`${loginPath}?next=${next}`);
  }

  async function hasLegacySession() {
    const response = await fetch("/api/fetchBlogs", {
      cache: "no-store",
      credentials: "same-origin",
      headers: { "Accept": "application/json" }
    });

    const contentType = response.headers.get("content-type") || "";
    return response.ok && contentType.includes("application/json");
  }

  try {
    const response = await fetch("/api/auth/me", {
      cache: "no-store",
      credentials: "same-origin",
      headers: { "Accept": "application/json" }
    });

    if (response.status === 404 && await hasLegacySession()) {
      return;
    }

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
