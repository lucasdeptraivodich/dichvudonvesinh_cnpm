"use strict";

/* =========================================================================
   Cleanova - dang nhap / dang ky (da ket noi backend that: Express + MySQL)
   API su dung:
     POST /api/auth/login     { email, password }
     POST /api/auth/register  { fullName, email, phone, password }
     POST /api/auth/logout
     GET  /api/auth/me
   ========================================================================= */

// ---------- Tham chieu DOM ----------
const loginView = document.querySelector("#login-view");
const registerView = document.querySelector("#register-view");
const dashboardView = document.querySelector("#dashboard-view");

const loginForm = document.querySelector("#login-form");
const registerForm = document.querySelector("#register-form");

const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const passwordToggle = document.querySelector("#password-toggle");
const rememberMeInput = document.querySelector("#remember-me");
const signInButton = document.querySelector("#sign-in-button");
const formStatus = document.querySelector("#form-status");

const fullNameInput = document.querySelector("#full-name");
const registerEmailInput = document.querySelector("#register-email");
const registerPhoneInput = document.querySelector("#register-phone");
const registerPasswordInput = document.querySelector("#register-password");
const registerPasswordToggle = document.querySelector("#register-password-toggle");
const registerButton = document.querySelector("#register-button");
const registerStatusEl = document.querySelector("#register-status");

const goRegisterLink = document.querySelector("#go-register");
const goLoginLink = document.querySelector("#go-login");

const logoutButton = document.querySelector("#logout-button");
const googleButton = document.querySelector("#google-button");
const socialNote = document.querySelector("#social-note");
const languageButtons = document.querySelectorAll("[data-language]");
const pageDescription = document.querySelector('meta[name="description"]');

// Dashboard: hien thi du lieu that lay tu MySQL
const accountAvatar = document.querySelector("#account-avatar");
const accountName = document.querySelector("#account-name");
const accountEmail = document.querySelector("#account-email");
const accountId = document.querySelector("#account-id");
const accountPhone = document.querySelector("#account-phone");
const accountRole = document.querySelector("#account-role");

// ---------- Da ngon ngu ----------
const translations = {
  vi: {
    pageTitle: "Đăng nhập · Cleanova",
    pageDescription: "Đặt lịch và quản lý dịch vụ vệ sinh nhà cửa cùng Cleanova.",
    brandHome: "Cleanova - Trang chủ",
    brandEyebrow: "CHĂM SÓC NHÀ CỬA, NHẸ NHÀNG HƠN",
    brandTitle: "Nhà sạch, ngày thêm vui.",
    brandDescription: "Đặt lịch và quản lý dịch vụ vệ sinh nhà cửa thật dễ dàng.",
    brandFooter: "Chăm nhà thảnh thơi, mỗi ngày.",
    accountAccess: "Đăng nhập",
    languageLabel: "Chọn ngôn ngữ",
    switchVietnamese: "Chuyển sang Tiếng Việt",
    switchEnglish: "Chuyển sang Tiếng Anh",
    formEyebrow: "RẤT VUI ĐƯỢC GẶP LẠI BẠN",
    formTitle: "Chào mừng trở lại",
    formDescription: "Đăng nhập để tiếp tục và chăm sóc tổ ấm của bạn.",
    registerEyebrow: "BẮT ĐẦU THẬT NHẸ NHÀNG",
    registerTitle: "Tạo tài khoản mới",
    registerDescription: "Đăng ký để đặt lịch và chăm sóc tổ ấm của bạn.",
    fullNameLabel: "Họ và tên",
    fullNamePlaceholder: "Nguyễn Văn A",
    phoneLabel: "Số điện thoại",
    phonePlaceholder: "0901234567",
    emailLabel: "Email",
    emailPlaceholder: "ban@example.com",
    passwordLabel: "Mật khẩu",
    passwordPlaceholder: "Nhập mật khẩu",
    registerPasswordPlaceholder: "Tối thiểu 6 ký tự",
    showPassword: "Hiện mật khẩu",
    hidePassword: "Ẩn mật khẩu",
    rememberMe: "Ghi nhớ tôi",
    forgotPassword: "Quên mật khẩu?",
    rememberNote: "Tùy chọn ghi nhớ chỉ để minh họa; phiên đăng nhập do máy chủ quản lý.",
    signIn: "Đăng nhập",
    signingIn: "Đang đăng nhập...",
    signingUp: "Đang tạo tài khoản...",
    or: "HOẶC",
    googleButton: "Tiếp tục với Google",
    signupPrompt: "Chưa có tài khoản?",
    loginPrompt: "Đã có tài khoản?",
    signUp: "Đăng ký",
    securityNote: "Tài khoản của bạn được lưu an toàn trong cơ sở dữ liệu",
    dashboardEyebrow: "KHÔNG GIAN CỦA BẠN",
    dashboardTitle: "Chào mừng bạn đến với Cleanova!",
    dashboardDescription: "Sẵn sàng đặt lịch và chăm sóc ngôi nhà theo cách thật nhẹ nhàng.",
    dashboardPreview: "Không gian sạch sẽ, tâm trí thảnh thơi",
    accountId: "Mã người dùng",
    accountPhone: "Số điện thoại",
    accountRole: "Vai trò",
    roleCustomer: "Khách hàng",
    roleAdmin: "Quản trị viên",
    notUpdated: "Chưa cập nhật",
    logout: "Đăng xuất",
    dashboardSecurity: "Thông tin tài khoản được lấy trực tiếp từ cơ sở dữ liệu",
    contentFooter: "© 2026 Cleanova. Nhà sạch, lòng an yên.",
    emailRequired: "Vui lòng nhập địa chỉ email.",
    emailInvalid: "Vui lòng nhập địa chỉ email hợp lệ, ví dụ ban@example.com.",
    passwordRequired: "Vui lòng nhập mật khẩu.",
    passwordTooShort: "Mật khẩu tối thiểu 6 ký tự.",
    fullNameRequired: "Vui lòng nhập họ và tên.",
    fullNameTooShort: "Họ và tên tối thiểu 2 ký tự.",
    phoneInvalid: "Số điện thoại không hợp lệ.",
    signInSuccess: "Đăng nhập thành công. Đang mở không gian của bạn...",
    signInFailure: "Email hoặc mật khẩu không đúng. Vui lòng thử lại.",
    signUpSuccess: "Đăng ký thành công! Đang mở không gian của bạn...",
    signUpFailure: "Đăng ký chưa thành công. Vui lòng thử lại.",
    emailExists: "Email này đã được đăng ký. Vui lòng đăng nhập.",
    serverError: "Không kết nối được máy chủ. Vui lòng thử lại sau.",
    forgotDemo: "Tính năng khôi phục mật khẩu chưa được kết nối.",
    googleDemo: "Đăng nhập Google chỉ là minh họa và chưa được kết nối.",
    rememberChecked: "Tùy chọn ghi nhớ chỉ để minh họa. Phiên đăng nhập do máy chủ quản lý.",
  },
  en: {
    pageTitle: "Sign in · Cleanova",
    pageDescription: "Book and manage home cleaning services with Cleanova.",
    brandHome: "Cleanova home",
    brandEyebrow: "A FRESHER WAY TO CARE FOR HOME",
    brandTitle: "A cleaner home, a brighter day.",
    brandDescription: "Book and manage home cleaning services with ease.",
    brandFooter: "More time to enjoy feeling at home.",
    accountAccess: "Sign in",
    languageLabel: "Choose language",
    switchVietnamese: "Switch to Vietnamese",
    switchEnglish: "Switch to English",
    formEyebrow: "IT'S LOVELY TO SEE YOU",
    formTitle: "Welcome back",
    formDescription: "Sign in to book a little more calm into your day.",
    registerEyebrow: "A GENTLE PLACE TO START",
    registerTitle: "Create your account",
    registerDescription: "Sign up to book and care for your home.",
    fullNameLabel: "Full name",
    fullNamePlaceholder: "Jane Doe",
    phoneLabel: "Phone number",
    phonePlaceholder: "0901234567",
    emailLabel: "Email",
    emailPlaceholder: "you@example.com",
    passwordLabel: "Password",
    passwordPlaceholder: "Enter your password",
    registerPasswordPlaceholder: "At least 6 characters",
    showPassword: "Show password",
    hidePassword: "Hide password",
    rememberMe: "Remember me",
    forgotPassword: "Forgot password?",
    rememberNote: "Remember me is for display only; the session is managed by the server.",
    signIn: "Sign in",
    signingIn: "Signing in...",
    signingUp: "Creating account...",
    or: "OR",
    googleButton: "Continue with Google",
    signupPrompt: "Don't have an account?",
    loginPrompt: "Already have an account?",
    signUp: "Sign up",
    securityNote: "Your account is stored securely in the database",
    dashboardEyebrow: "YOUR CLEANOVA SPACE",
    dashboardTitle: "Welcome to Cleanova!",
    dashboardDescription: "You're ready to book a little more care and calm for your home.",
    dashboardPreview: "A fresh home and a little more breathing room",
    accountId: "User ID",
    accountPhone: "Phone number",
    accountRole: "Role",
    roleCustomer: "Customer",
    roleAdmin: "Administrator",
    notUpdated: "Not updated",
    logout: "Log out",
    dashboardSecurity: "Account details are loaded directly from the database",
    contentFooter: "© 2026 Cleanova. A fresh start feels good.",
    emailRequired: "Please enter your email address.",
    emailInvalid: "Enter a valid email address, such as you@example.com.",
    passwordRequired: "Please enter your password.",
    passwordTooShort: "Password must be at least 6 characters.",
    fullNameRequired: "Please enter your full name.",
    fullNameTooShort: "Full name must be at least 2 characters.",
    phoneInvalid: "Enter a valid phone number.",
    signInSuccess: "Sign-in successful. Opening your space...",
    signInFailure: "Incorrect email or password. Please try again.",
    signUpSuccess: "Account created! Opening your space...",
    signUpFailure: "Sign-up failed. Please try again.",
    emailExists: "This email is already registered. Please sign in.",
    serverError: "Could not reach the server. Please try again later.",
    forgotDemo: "Password recovery isn't connected yet.",
    googleDemo: "Google sign-in is a visual demo only and is not connected.",
    rememberChecked: "Remember me is for display only. The session is managed by the server.",
  },
};

// ---------- Trang thai ----------
let currentLanguage = "vi";
let isLoginSubmitting = false;
let isRegisterSubmitting = false;
let isLoginPasswordVisible = false;
let isRegisterPasswordVisible = false;
let socialNoteKey = "";

const loginStatus = { key: "", state: "" };
const registerStatus = { key: "", state: "" };
const loginErrors = { email: "", password: "" };
const registerErrors = { fullName: "", email: "", phone: "", password: "" };

function t(key) {
  const value = translations[currentLanguage][key];
  return value === undefined ? key : value;
}

/** Goi API tra ve JSON */
async function api(url, options = {}) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    ...options,
  });
  let data = {};
  try {
    data = await res.json();
  } catch (_) {}
  return { ok: res.ok, status: res.status, data };
}

// ---------- Cap nhat chu tren form dang nhap ----------
function renderLoginText() {
  const emailError = document.querySelector("#email-error");
  const passwordError = document.querySelector("#password-error");
  emailError.textContent = loginErrors.email ? t(loginErrors.email) : "";
  passwordError.textContent = loginErrors.password ? t(loginErrors.password) : "";
  emailInput.setAttribute("aria-invalid", String(Boolean(loginErrors.email)));
  passwordInput.setAttribute("aria-invalid", String(Boolean(loginErrors.password)));

  formStatus.textContent = loginStatus.key ? t(loginStatus.key) : "";
  if (loginStatus.state) formStatus.dataset.state = loginStatus.state;
  else formStatus.removeAttribute("data-state");

  if (socialNote) socialNote.textContent = socialNoteKey ? t(socialNoteKey) : "";

  signInButton.querySelector(".button-label").textContent = t(isLoginSubmitting ? "signingIn" : "signIn");
  passwordToggle.setAttribute("aria-label", t(isLoginPasswordVisible ? "hidePassword" : "showPassword"));
}

// ---------- Cap nhat chu tren form dang ky ----------
function renderRegisterText() {
  document.querySelector("#full-name-error").textContent = registerErrors.fullName ? t(registerErrors.fullName) : "";
  document.querySelector("#register-email-error").textContent = registerErrors.email ? t(registerErrors.email) : "";
  document.querySelector("#register-phone-error").textContent = registerErrors.phone ? t(registerErrors.phone) : "";
  document.querySelector("#register-password-error").textContent = registerErrors.password ? t(registerErrors.password) : "";

  fullNameInput.setAttribute("aria-invalid", String(Boolean(registerErrors.fullName)));
  registerEmailInput.setAttribute("aria-invalid", String(Boolean(registerErrors.email)));
  registerPhoneInput.setAttribute("aria-invalid", String(Boolean(registerErrors.phone)));
  registerPasswordInput.setAttribute("aria-invalid", String(Boolean(registerErrors.password)));

  registerStatusEl.textContent = registerStatus.key ? t(registerStatus.key) : "";
  if (registerStatus.state) registerStatusEl.dataset.state = registerStatus.state;
  else registerStatusEl.removeAttribute("data-state");

  registerButton.querySelector(".button-label").textContent = t(isRegisterSubmitting ? "signingUp" : "signUp");
  registerPasswordToggle.setAttribute("aria-label", t(isRegisterPasswordVisible ? "hidePassword" : "showPassword"));
}

function renderDynamicText() {
  renderLoginText();
  renderRegisterText();
}

// ---------- Doi ngon ngu ----------
function setLanguage(language) {
  currentLanguage = language;
  const dictionary = translations[currentLanguage];
  document.documentElement.lang = currentLanguage;
  document.title = dictionary.pageTitle;
  if (pageDescription) pageDescription.content = dictionary.pageDescription;

  for (const element of document.querySelectorAll("[data-i18n]")) {
    const key = element.dataset.i18n;
    if (dictionary[key] !== undefined) element.textContent = dictionary[key];
  }
  for (const input of document.querySelectorAll("[data-i18n-placeholder]")) {
    const key = input.dataset.i18nPlaceholder;
    if (dictionary[key] !== undefined) input.placeholder = dictionary[key];
  }
  for (const element of document.querySelectorAll("[data-i18n-aria-label]")) {
    const key = element.dataset.i18nAriaLabel;
    if (dictionary[key] !== undefined) element.setAttribute("aria-label", dictionary[key]);
  }
  for (const button of languageButtons) {
    button.setAttribute("aria-pressed", String(button.dataset.language === currentLanguage));
  }

  renderDynamicText();
}

// ---------- Chuyen khung nhin ----------
function showLogin() {
  loginView.hidden = false;
  registerView.hidden = true;
  dashboardView.hidden = true;
  loginForm.reset();
  loginErrors.email = "";
  loginErrors.password = "";
  loginStatus.key = "";
  loginStatus.state = "";
  socialNoteKey = "";
  isLoginPasswordVisible = false;
  passwordInput.type = "password";
  passwordToggle.setAttribute("aria-pressed", "false");
  renderDynamicText();
  emailInput.focus();
}

function showRegister() {
  loginView.hidden = true;
  registerView.hidden = false;
  dashboardView.hidden = true;
  registerForm.reset();
  registerErrors.fullName = "";
  registerErrors.email = "";
  registerErrors.phone = "";
  registerErrors.password = "";
  registerStatus.key = "";
  registerStatus.state = "";
  isRegisterPasswordVisible = false;
  registerPasswordInput.type = "password";
  registerPasswordToggle.setAttribute("aria-pressed", "false");
  renderDynamicText();
  fullNameInput.focus();
}

/** Hien thi thong tin nguoi dung that (lay tu MySQL) tren dashboard */
function showDashboard(user) {
  loginView.hidden = true;
  registerView.hidden = true;
  dashboardView.hidden = false;

  const name = user.full_name || "-";
  if (accountAvatar) accountAvatar.textContent = (name.trim()[0] || "C").toUpperCase();
  if (accountName) accountName.textContent = name;
  if (accountEmail) accountEmail.textContent = user.email || "-";
  if (accountId) accountId.textContent = user.user_id != null ? user.user_id : "-";
  if (accountPhone) accountPhone.textContent = user.phone || t("notUpdated");
  if (accountRole) {
    accountRole.textContent =
      user.role_name === "admin" ? t("roleAdmin")
      : user.role_name === "customer" ? t("roleCustomer")
      : (user.role_name || "-");
  }

  document.querySelector("#dashboard-title").focus();
}

// ---------- Xu ly dang nhap ----------
loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (isLoginSubmitting) return;

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  loginErrors.email = "";
  loginErrors.password = "";
  loginStatus.key = "";
  loginStatus.state = "";

  let valid = true;
  if (!email) {
    loginErrors.email = "emailRequired";
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    loginErrors.email = "emailInvalid";
    valid = false;
  }
  if (!password) {
    loginErrors.password = "passwordRequired";
    valid = false;
  }

  renderDynamicText();
  if (!valid) return;

  isLoginSubmitting = true;
  signInButton.disabled = true;
  signInButton.classList.add("is-loading");
  signInButton.setAttribute("aria-busy", "true");
  renderDynamicText();

  try {
    const { ok, data } = await api("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (ok && data.success) {
      loginStatus.key = "signInSuccess";
      loginStatus.state = "success";
      renderDynamicText();
      window.setTimeout(() => showDashboard(data.user), 500);
      return;
    }

    loginStatus.key = "signInFailure";
    loginStatus.state = "error";
  } catch (_) {
    loginStatus.key = "serverError";
    loginStatus.state = "error";
  } finally {
    isLoginSubmitting = false;
    signInButton.disabled = false;
    signInButton.classList.remove("is-loading");
    signInButton.setAttribute("aria-busy", "false");
    renderDynamicText();
  }
});

// ---------- Xu ly dang ky ----------
registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (isRegisterSubmitting) return;

  const fullName = fullNameInput.value.trim();
  const email = registerEmailInput.value.trim();
  const phone = registerPhoneInput.value.trim();
  const password = registerPasswordInput.value;

  registerErrors.fullName = "";
  registerErrors.email = "";
  registerErrors.phone = "";
  registerErrors.password = "";
  registerStatus.key = "";
  registerStatus.state = "";

  let valid = true;
  if (!fullName) {
    registerErrors.fullName = "fullNameRequired";
    valid = false;
  } else if (fullName.length < 2) {
    registerErrors.fullName = "fullNameTooShort";
    valid = false;
  }
  if (!email) {
    registerErrors.email = "emailRequired";
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    registerErrors.email = "emailInvalid";
    valid = false;
  }
  if (!password) {
    registerErrors.password = "passwordRequired";
    valid = false;
  } else if (password.length < 6) {
    registerErrors.password = "passwordTooShort";
    valid = false;
  }
  if (phone && !/^[0-9+\-\s]{8,20}$/.test(phone)) {
    registerErrors.phone = "phoneInvalid";
    valid = false;
  }

  renderDynamicText();
  if (!valid) return;

  isRegisterSubmitting = true;
  registerButton.disabled = true;
  registerButton.classList.add("is-loading");
  registerButton.setAttribute("aria-busy", "true");
  renderDynamicText();

  try {
    const { ok, status, data } = await api("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ fullName, email, phone, password }),
    });

    if (ok && data.success) {
      registerStatus.key = "signUpSuccess";
      registerStatus.state = "success";
      renderDynamicText();
      window.setTimeout(() => showDashboard(data.user), 700);
      return;
    }

    if (status === 409 || (data.errors && data.errors.email)) {
      registerErrors.email = "emailExists";
      registerStatus.key = "emailExists";
      registerStatus.state = "error";
    } else {
      if (data.errors) {
        if (data.errors.fullName) registerErrors.fullName = "fullNameTooShort";
        if (data.errors.email) registerErrors.email = "emailInvalid";
        if (data.errors.phone) registerErrors.phone = "phoneInvalid";
        if (data.errors.password) registerErrors.password = "passwordTooShort";
      }
      registerStatus.key = "signUpFailure";
      registerStatus.state = "error";
    }
  } catch (_) {
    registerStatus.key = "serverError";
    registerStatus.state = "error";
  } finally {
    isRegisterSubmitting = false;
    registerButton.disabled = false;
    registerButton.classList.remove("is-loading");
    registerButton.setAttribute("aria-busy", "false");
    renderDynamicText();
  }
});

// ---------- Nut hien / an mat khau ----------
passwordToggle.addEventListener("click", () => {
  isLoginPasswordVisible = !isLoginPasswordVisible;
  passwordInput.type = isLoginPasswordVisible ? "text" : "password";
  passwordToggle.setAttribute("aria-pressed", String(isLoginPasswordVisible));
  renderDynamicText();
  passwordInput.focus();
});

registerPasswordToggle.addEventListener("click", () => {
  isRegisterPasswordVisible = !isRegisterPasswordVisible;
  registerPasswordInput.type = isRegisterPasswordVisible ? "text" : "password";
  registerPasswordToggle.setAttribute("aria-pressed", String(isRegisterPasswordVisible));
  renderDynamicText();
  registerPasswordInput.focus();
});

// ---------- Xoa loi khi nguoi dung nhap lai ----------
emailInput.addEventListener("input", () => {
  if (loginErrors.email) { loginErrors.email = ""; loginStatus.key = ""; renderDynamicText(); }
});
passwordInput.addEventListener("input", () => {
  if (loginErrors.password) { loginErrors.password = ""; loginStatus.key = ""; renderDynamicText(); }
});
fullNameInput.addEventListener("input", () => {
  if (registerErrors.fullName) { registerErrors.fullName = ""; registerStatus.key = ""; renderDynamicText(); }
});
registerEmailInput.addEventListener("input", () => {
  if (registerErrors.email) { registerErrors.email = ""; registerStatus.key = ""; renderDynamicText(); }
});
registerPhoneInput.addEventListener("input", () => {
  if (registerErrors.phone) { registerErrors.phone = ""; registerStatus.key = ""; renderDynamicText(); }
});
registerPasswordInput.addEventListener("input", () => {
  if (registerErrors.password) { registerErrors.password = ""; registerStatus.key = ""; renderDynamicText(); }
});

// ---------- Lien ket chuyen khung nhin ----------
if (goRegisterLink) goRegisterLink.addEventListener("click", (e) => { e.preventDefault(); showRegister(); });
if (goLoginLink) goLoginLink.addEventListener("click", (e) => { e.preventDefault(); showLogin(); });

// ---------- Lien ket "quen mat khau" (chua ho tro) ----------
for (const link of document.querySelectorAll("[data-notice]")) {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    socialNoteKey = link.dataset.notice;
    renderDynamicText();
  });
}

// ---------- Google (chua ho tro) ----------
googleButton.addEventListener("click", () => {
  socialNoteKey = "googleDemo";
  renderDynamicText();
});

// ---------- Ghi nho toi (minh hoa) ----------
rememberMeInput.addEventListener("change", () => {
  socialNoteKey = rememberMeInput.checked ? "rememberChecked" : "";
  renderDynamicText();
});

// ---------- Doi ngon ngu ----------
for (const button of languageButtons) {
  button.addEventListener("click", () => setLanguage(button.dataset.language));
}

// ---------- Dang xuat (huy session that tren server) ----------
logoutButton.addEventListener("click", async () => {
  try {
    await api("/api/auth/logout", { method: "POST" });
  } catch (_) {}
  showLogin();
});

// ---------- Khoi dong: neu da co session thi vao thang dashboard ----------
async function init() {
  setLanguage(currentLanguage);
  try {
    const { ok, data } = await api("/api/auth/me");
    if (ok && data.success) showDashboard(data.user);
    else showLogin();
  } catch (_) {
    showLogin();
  }
}

init();
