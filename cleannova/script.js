// Giữ nguyên logic đăng nhập demo, tách biệt với tương tác của trang chủ.
"use strict";

const loginForm = document.querySelector("#login-form");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const passwordToggle = document.querySelector("#password-toggle");
const rememberMeInput = document.querySelector("#remember-me");
const signInButton = document.querySelector("#sign-in-button");
const formStatus = document.querySelector("#form-status");
const socialNote = document.querySelector("#social-note");
const loginView = document.querySelector("#login-view");
const dashboardView = document.querySelector("#dashboard-view");
const logoutButton = document.querySelector("#logout-button");
const googleButton = document.querySelector("#google-button");
const languageButtons = document.querySelectorAll("[data-language]");
const pageDescription = document.querySelector('meta[name="description"]');

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
    emailLabel: "Email",
    emailPlaceholder: "ban@example.com",
    passwordLabel: "Mật khẩu",
    passwordPlaceholder: "Nhập mật khẩu",
    showPassword: "Hiện mật khẩu",
    hidePassword: "Ẩn mật khẩu",
    rememberMe: "Ghi nhớ tôi",
    forgotPassword: "Quên mật khẩu?",
    rememberNote: "Tùy chọn ghi nhớ chỉ để minh họa; thông tin tài khoản không được lưu.",
    signIn: "Đăng nhập",
    signingIn: "Đang đăng nhập...",
    or: "HOẶC",
    googleButton: "Tiếp tục với Google",
    signupPrompt: "Chưa có tài khoản?",
    signUp: "Đăng ký",
    securityNote: "Chỉ là bản minh họa · Không xác thực thật",
    dashboardEyebrow: "KHÔNG GIAN CỦA BẠN",
    dashboardTitle: "Chào mừng bạn đến với Cleanova!",
    dashboardDescription: "Sẵn sàng đặt lịch và chăm sóc ngôi nhà theo cách thật nhẹ nhàng.",
    dashboardPreview: "Không gian sạch sẽ, tâm trí thảnh thơi",
    logout: "Đăng xuất",
    dashboardSecurity: "Bản demo giao diện · Không có phiên đăng nhập thật",
    contentFooter: "© 2026 Cleanova. Nhà sạch, lòng an yên.",
    emailRequired: "Vui lòng nhập địa chỉ email.",
    emailInvalid: "Vui lòng nhập địa chỉ email hợp lệ, ví dụ ban@example.com.",
    passwordRequired: "Vui lòng nhập mật khẩu.",
    signInSuccess: "Đăng nhập thành công. Đang mở không gian demo...",
    signInFailure: "Đăng nhập chưa thành công. Kiểm tra thông tin hoặc dùng tài khoản demo trong README.",
    forgotDemo: "Tính năng khôi phục mật khẩu chưa được kết nối trong bản demo này.",
    signupDemo: "Tính năng tạo tài khoản chưa được kết nối trong bản demo này.",
    googleDemo: "Đăng nhập Google chỉ là minh họa và chưa được kết nối.",
    rememberChecked: "Tùy chọn ghi nhớ chỉ để minh họa. Thông tin sẽ không được lưu."
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
    emailLabel: "Email",
    emailPlaceholder: "you@example.com",
    passwordLabel: "Password",
    passwordPlaceholder: "Enter your password",
    showPassword: "Show password",
    hidePassword: "Hide password",
    rememberMe: "Remember me",
    forgotPassword: "Forgot password?",
    rememberNote: "Remember me is for display only; no account details are saved.",
    signIn: "Sign in",
    signingIn: "Signing in...",
    or: "OR",
    googleButton: "Continue with Google",
    signupPrompt: "Don't have an account?",
    signUp: "Sign up",
    securityNote: "Demo experience only · No real authentication",
    dashboardEyebrow: "YOUR CLEANOVA SPACE",
    dashboardTitle: "Welcome to Cleanova!",
    dashboardDescription: "You're ready to book a little more care and calm for your home.",
    dashboardPreview: "A fresh home and a little more breathing room",
    logout: "Log out",
    dashboardSecurity: "Front-end demo · No real account session",
    contentFooter: "© 2026 Cleanova. A fresh start feels good.",
    emailRequired: "Please enter your email address.",
    emailInvalid: "Enter a valid email address, such as you@example.com.",
    passwordRequired: "Please enter your password.",
    signInSuccess: "Sign-in successful. Opening your demo workspace...",
    signInFailure: "Sign-in failed. Check your details or use the demo account in the README.",
    forgotDemo: "Password recovery isn't connected in this front-end demo.",
    signupDemo: "Account creation isn't connected in this front-end demo.",
    googleDemo: "Google sign-in is a visual demo only and is not connected.",
    rememberChecked: "Remember me is for display only. Nothing will be saved."
  }
};

// Demo-only credentials; this client-side check is not real authentication.
const demoAccount = {
  email: "demo@nova.app",
  password: "NovaDemo2026!"
};

const errorElements = {
  email: document.querySelector("#email-error"),
  password: document.querySelector("#password-error")
};

let isSubmitting = false;
let isPasswordVisible = false;
let currentLanguage = "vi";
let formStatusKey = "";
let formStatusState = "";
let socialNoteKey = "";
const fieldErrorKeys = {
  email: "",
  password: ""
};

function renderDynamicText() {
  for (const input of [emailInput, passwordInput]) {
    errorElements[input.name].textContent = fieldErrorKeys[input.name]
      ? translations[currentLanguage][fieldErrorKeys[input.name]]
      : "";
  }

  formStatus.textContent = formStatusKey ? translations[currentLanguage][formStatusKey] : "";
  if (formStatusState) {
    formStatus.dataset.state = formStatusState;
  } else {
    formStatus.removeAttribute("data-state");
  }
  socialNote.textContent = socialNoteKey ? translations[currentLanguage][socialNoteKey] : "";
  signInButton.querySelector(".button-label").textContent = translations[currentLanguage][
    isSubmitting ? "signingIn" : "signIn"
  ];
  passwordToggle.setAttribute(
    "aria-label",
    translations[currentLanguage][isPasswordVisible ? "hidePassword" : "showPassword"]
  );
}

function setLanguage(language) {
  currentLanguage = language;
  const dictionary = translations[currentLanguage];
  document.documentElement.lang = currentLanguage;
  document.title = dictionary.pageTitle;
  pageDescription.content = dictionary.pageDescription;

  for (const element of document.querySelectorAll("[data-i18n]")) {
    element.textContent = dictionary[element.dataset.i18n];
  }

  for (const input of document.querySelectorAll("[data-i18n-placeholder]")) {
    input.placeholder = dictionary[input.dataset.i18nPlaceholder];
  }

  for (const element of document.querySelectorAll("[data-i18n-aria-label]")) {
    element.setAttribute("aria-label", dictionary[element.dataset.i18nAriaLabel]);
  }

  for (const button of languageButtons) {
    button.setAttribute("aria-pressed", String(button.dataset.language === currentLanguage));
  }

  renderDynamicText();
}

function setStatus(key, state) {
  formStatusKey = key || "";
  formStatusState = state || "";
  renderDynamicText();
}

function setFieldError(input, messageKey) {
  fieldErrorKeys[input.name] = messageKey || "";
  input.setAttribute("aria-invalid", String(Boolean(messageKey)));
  renderDynamicText();
}

function clearFieldError(input) {
  setFieldError(input, "");
}

function validateForm() {
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  let isValid = true;

  if (!email) {
    setFieldError(emailInput, "emailRequired");
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setFieldError(emailInput, "emailInvalid");
    isValid = false;
  } else {
    clearFieldError(emailInput);
  }

  if (!password) {
    setFieldError(passwordInput, "passwordRequired");
    isValid = false;
  } else {
    clearFieldError(passwordInput);
  }

  if (!isValid) {
    setStatus("", "");
    (emailInput.getAttribute("aria-invalid") === "true" ? emailInput : passwordInput).focus();
  }

  return isValid;
}

function setLoading(isLoading) {
  isSubmitting = isLoading;
  signInButton.disabled = isLoading;
  signInButton.classList.toggle("is-loading", isLoading);
  signInButton.setAttribute("aria-busy", String(isLoading));
  renderDynamicText();
}

function showDashboard() {
  loginView.hidden = true;
  dashboardView.hidden = false;
  document.querySelector("#dashboard-title").focus();
}

function showLogin() {
  dashboardView.hidden = true;
  loginView.hidden = false;
  loginForm.reset();
  clearFieldError(emailInput);
  clearFieldError(passwordInput);
  isPasswordVisible = false;
  passwordInput.type = "password";
  passwordToggle.setAttribute("aria-pressed", "false");
  setStatus("", "");
  socialNoteKey = "";
  renderDynamicText();
  emailInput.focus();
}

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (isSubmitting || !validateForm()) {
    return;
  }

  const email = emailInput.value.trim().toLowerCase();
  const password = passwordInput.value;
  setLoading(true);
  setStatus("", "");

  window.setTimeout(() => {
    setLoading(false);

    if (email === demoAccount.email && password === demoAccount.password) {
      setStatus("signInSuccess", "success");
      showDashboard();
      return;
    }

    setStatus("signInFailure", "error");
  }, 850);
});

for (const input of [emailInput, passwordInput]) {
  input.addEventListener("input", () => {
    if (input.getAttribute("aria-invalid") === "true") {
      clearFieldError(input);
    }
    setStatus("", "");
  });
}

passwordToggle.addEventListener("click", () => {
  isPasswordVisible = !isPasswordVisible;
  passwordInput.type = isPasswordVisible ? "text" : "password";
  passwordToggle.setAttribute("aria-pressed", String(isPasswordVisible));
  renderDynamicText();
  passwordInput.focus();
});

for (const link of document.querySelectorAll("[data-notice]")) {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    setStatus(link.dataset.notice, "info");
  });
}

googleButton.addEventListener("click", () => {
  socialNoteKey = "googleDemo";
  renderDynamicText();
});

rememberMeInput.addEventListener("change", () => {
  setStatus(rememberMeInput.checked ? "rememberChecked" : "", rememberMeInput.checked ? "info" : "");
});

for (const button of languageButtons) {
  button.addEventListener("click", () => {
    setLanguage(button.dataset.language);
  });
}

logoutButton.addEventListener("click", showLogin);

setLanguage(currentLanguage);
