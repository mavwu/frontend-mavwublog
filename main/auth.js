(async () => {
  const loginPath = "/login/login.html";
  let loaderTimer = null;
  let longWaitTimer = null;
  let loaderDone = false;

  function addLoaderStyles() {
    if (document.getElementById("mavwu-auth-loader-styles")) return;

    const style = document.createElement("style");
    style.id = "mavwu-auth-loader-styles";
    style.textContent = `
      .auth-loader {
        position: fixed;
        inset: 0;
        z-index: 9999;
        display: grid;
        place-items: center;
        padding: 24px;
        background: rgba(243, 244, 246, 0.94);
        color: #111827;
      }

      .auth-loader__box {
        width: min(420px, 92vw);
        padding: 22px;
        border: 1px solid #e5e7eb;
        border-radius: 14px;
        background: white;
        box-shadow: 0 18px 50px rgba(17, 24, 39, 0.16);
        text-align: center;
      }

      .auth-loader__spinner {
        width: 42px;
        height: 42px;
        margin: 0 auto 14px;
        border: 4px solid #dbeafe;
        border-top-color: #1e40af;
        border-radius: 50%;
        animation: auth-loader-spin 0.9s linear infinite;
      }

      .auth-loader__title {
        margin: 0 0 8px;
        font: 800 1.15rem system-ui, sans-serif;
      }

      .auth-loader__text {
        margin: 0;
        color: #4b5563;
        line-height: 1.5;
      }

      @keyframes auth-loader-spin {
        to { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
  }

  function showLoader() {
    if (loaderDone || document.getElementById("auth-loader")) return;

    const mount = () => {
      if (loaderDone || document.getElementById("auth-loader")) return;

      addLoaderStyles();
      const loader = document.createElement("div");
      loader.id = "auth-loader";
      loader.className = "auth-loader";
      loader.setAttribute("role", "status");
      loader.setAttribute("aria-live", "polite");
      loader.innerHTML = `
        <div class="auth-loader__box">
          <div class="auth-loader__spinner" aria-hidden="true"></div>
          <h1 class="auth-loader__title">Opening your dashboard</h1>
          <p class="auth-loader__text" id="auth-loader-text">Checking your login session...</p>
        </div>
      `;
      document.body.appendChild(loader);
    };

    if (document.body) mount();
    else document.addEventListener("DOMContentLoaded", mount, { once: true });
  }

  function showLongWaitMessage() {
    const text = document.getElementById("auth-loader-text");
    if (text) {
      text.textContent = "The server is waking up. This can take a little while on the first request.";
    }
  }

  function hideLoader() {
    loaderDone = true;
    clearTimeout(loaderTimer);
    clearTimeout(longWaitTimer);
    document.getElementById("auth-loader")?.remove();
  }

  function redirectToLogin() {
    hideLoader();
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
    loaderTimer = setTimeout(showLoader, 300);
    longWaitTimer = setTimeout(showLongWaitMessage, 6000);

    const response = await fetch("/api/auth/me", {
      cache: "no-store",
      credentials: "same-origin",
      headers: { "Accept": "application/json" }
    });

    if (response.status === 404 && await hasLegacySession()) {
      hideLoader();
      return;
    }

    if (!response.ok) {
      redirectToLogin();
      return;
    }

    const session = await response.json();
    window.MavwuAuth = session.user;
    window.dispatchEvent(new CustomEvent("mavwu:auth", { detail: session.user }));
    hideLoader();
  } catch (error) {
    redirectToLogin();
  }
})();
