import { lang, langIndex } from "./lang.js";
import { closeBracket } from "./content/feature.js";
import { exit } from "./object/game.js";
import { removeValue } from "./tab.js";

// sign-in page
const signin = document.getElementById("sign-in-content");
const signinId = document.getElementById("sign-in-id");
const signinPw = document.getElementById("sign-in-pw");
const signinBtn = document.getElementById("sign-in-btn");
const signupBtn = document.getElementById("sign-up-btn");

// signup page
const signup = document.getElementById("sign-up-content");
const signupId = document.getElementById("sign-up-id");
const signupPw = document.getElementById("sign-up-pw");
const signupCheckPw = document.getElementById("sign-up-check-pw");
// email
const signupEmail = document.getElementById("sign-up-email");
const signupEmailSubmit = document.getElementById("sign-up-email-btn");
const signupCodeLabel = document.getElementById("sign-up-code-label");
const signupCode = document.getElementById("sign-up-code");
const signupCodeInput = document.getElementById("sign-up-code-input");
const signupCodeSubmit = document.getElementById("sign-up-code-btn");
// other
const signupSubmit = document.getElementById("sign-up-submit");
const goBack = document.getElementById("sign-up-cancel");

// containers
const signContainer = document.getElementById("sign");
const windowContainer = document.getElementById("window-content");
const logoutBtn = document.getElementById("logout-btn");
const offlineContainer = document.getElementById("offline");

const usernamePattern = /^\S+$/;
const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/;

history.pushState(null, null, location.href);
window.onpopstate = function () {
	history.go(1);
};

// Sign in
signinBtn.addEventListener("click", () => {
	const idInput = signinId.value;
	const pwInput = signinPw.value;
	if (idInput.length === 0 || idInput === "") {
		alert(lang[langIndex].nullId);
	} else if (pwInput.length === 0 || pwInput === "") {
		alert(lang[langIndex].nullPw);
	} else {
		const body = {
			"username": idInput,
			"password": pwInput
		};
		const uri = "/user/login/";
		fetch(uri, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		}).then((response) => {
			if (response.status === 200) {
				toContent();
			} else {
				alert(lang[langIndex].failsignin);
			}
		});
	}
});

// Sign up button
signupBtn.addEventListener("click", () => {
	signinId.value = "";
	signinPw.value = "";
	signin.style.display = "none";
	signup.style.display = "flex";
	sessionStorage.setItem("status", "signup");
});

// Verify email
signupEmailSubmit.addEventListener("click", () => {
	const email = signupEmail.value;
	if (email.length === 0 || email === "") {
		alert(lang[langIndex].nullEmail);
	} else {
		const body = {
			"email": email
		};
		const uri = "/user/email/";
		fetch(uri, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		}).then((response) => {
			if (response.status === 200) {
				alert(lang[langIndex].sendCode);
				signupCode.style.display = "flex";
				signupCodeLabel.style.display = "block";
				signupCodeSubmit.style.display = "block";
			} else {
				alert(lang[langIndex].failCode);
			}
		});
	}
});

// Verify email code
signupCodeSubmit.addEventListener("click", () => {
	const code = signupCodeInput.value;
	if (code.length === 0 || code === "") {
		alert(lang[langIndex].nullCode);
	} else {
		const uri = "/user/email-check/";
		const body = {
			"email": signupEmail.value,
			"code": code
		};
		try {
			fetch(uri, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			}).then((response) => {
				if (response.status === 200) {
					alert(lang[langIndex].successVerify);
				} else {
					alert(lang[langIndex].failVerify);
				}
			});
		} catch (error) {
			console.log(error);
		}
		signupSubmit.style.display = "block";
	}
});

// undo
goBack.addEventListener("click", () => {
	undo();
});

// Sign up - send to server
signupSubmit.addEventListener("click", () => {
	const idInput = signupId.value;
	const pwInput = signupPw.value;
	const checkPw = signupCheckPw.value;
	const emailInput = document.getElementById("sign-upemail").value;
	if (idInput.length === 0 || idInput === "") {
		alert(lang[langIndex].nullId);
	} else if (!usernamePattern.test(idInput)) {
		alert(lang[langIndex].wrongId);
	} else if (pwInput.length === 0 || pwInput === "") {
		alert(lang[langIndex].nullPw);
	} else if (!passwordPattern.test(pwInput)) {
		alert(lang[langIndex].wrongPw);
	} else if (checkPw != pwInput) {
		alert(lang[langIndex].notSame);
	} else {
		const body = {
			"username": idInput,
			"password": pwInput,
			"email": emailInput
		};
		const uri = "/user/signup/";
		fetch(uri, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		}).then((response) => {
			if (response.status === 201) {
				undo();
			} else if (response.username) {
				alert(lang[langIndex].wrongId);
			} else if (response.password) {
				alert(lang[langIndex].wrongPw);
			} else if (response.email) {
				alert(lang[langIndex].wrongEmail);
			}
		});
	}
});

// Log out
logoutBtn.addEventListener("click", () => {
	fetch("/user/logout/").then((response) => {
		if (response.status === 205) {
			removeValue();
			exit();
			closeBracket();
			logout();
		} else {
			alert(lang[langIndex].invalidToken);
		}
	});
});

export function logout() {
	offlineContainer.style.display = "block";
	signContainer.style.display = "block";
	windowContainer.style.display = "none";
	logoutBtn.style.display = "none";
	signin.style.display = "flex";
	sessionStorage.setItem("status", "signin");
}

export function toSignup() {
	signContainer.style.display = "block";
	windowContainer.style.display = "none";
	signin.style.display = "none";
	signup.style.display = "flex";
	sessionStorage.setItem("status", "signup");
}

export function undo() {
	signupId.value = "";
	signupPw.value = "";
	signupCheckPw.value = "";
	signupEmail.value = "";
	signupCodeInput.value = "";
	signupCode.style.display = "none";
	signupCodeSubmit.style.display = "none";
	signupSubmit.style.display = "none";
	signContainer.style.display = "block";
	signin.style.display = "flex";
	signup.style.display = "none";
	sessionStorage.setItem("status", "signin");
}

export function toContent() {
	signContainer.style.display = "none";
	windowContainer.style.display = "block";
	logoutBtn.style.display = "block";
	sessionStorage.setItem("status", "offline");
}
