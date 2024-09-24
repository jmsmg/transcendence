export let lang;
export let langIndex = "ko";

fetch("../lang.json").then((response) => response.json()).then((json) => lang = json);

document.getElementById("lang-select").addEventListener("change", (e) => {
	langIndex = e.target.value;
	document.querySelector(".title-bar-text").innerText = lang[langIndex].title;
	document.querySelector("#logout-btn").innerHTML = lang[langIndex].logout;
	document.querySelector(".id").innerHTML = lang[langIndex].id;
	document.querySelector(".code").innerHTML = lang[langIndex].varify;
	document.querySelector(".code-label").innerText = lang[langIndex].code;
	document.querySelector("#sign-in-btn").innerHTML = lang[langIndex].signin;
	document.querySelector("#sign-in-42-btn").innerHTML = lang[langIndex].signin42;
	document.querySelector("#sign-up-btn").innerHTML = lang[langIndex].signup;
	document.querySelector("#sign-up-check-password-label").innerHTML = lang[langIndex].checkPassword;
	document.querySelector("#sign-up-email-label").innerHTML = lang[langIndex].email;
	document.querySelector("#email-info").innerText = lang[langIndex].emailInfo;
	document.querySelector("#sign-up-code-label").innerHTML = lang[langIndex].code;
	document.querySelector("#sign-up-code-btn").innerHTML = lang[langIndex].checkEmail;
	document.querySelector("#sign-up-cancel").innerHTML = lang[langIndex].goBack;
	document.querySelector(".submit").innerHTML = lang[langIndex].submit;
	document.querySelector("#offline-tab a").innerText = lang[langIndex].offline;
	document.querySelector("#tournament-tab a").innerText = lang[langIndex].tournament;
	document.querySelector("#online-tab a").innerText = lang[langIndex].online;
	document.querySelector("#offline-info").innerText = lang[langIndex].lSet;
	document.querySelector("#name-input1-label").innerText = `1${lang[langIndex].playerName}`;
	document.querySelector("#name-input2-label").innerText = `2${lang[langIndex].playerName}`;
	document.querySelector("#tournament-info").innerText = lang[langIndex].tSet;
	document.querySelector("#num-people").innerText = lang[langIndex].nPeople;
	document.querySelector("#index-0").innerText = lang[langIndex].select;
	document.querySelector("#make-room-btn").innerText = lang[langIndex].roomMake;
	document.querySelector("#online-info").innerText = lang[langIndex].mSet;
	document.querySelector("#search-option-room").innerHTML = lang[langIndex].roomName;
	document.querySelector("#search-option-user").innerHTML = lang[langIndex].id;
	document.querySelector("#search-btn").innerHTML = lang[langIndex].search;
	document.querySelector("#refresh-btn").innerHTML = lang[langIndex].refresh;
	document.querySelector("#make-room-btn").innerHTML = lang[langIndex].roomMake;
	document.querySelector("#online-room-name-label").innerText = lang[langIndex].roomName;
	document.querySelector("#online-room-cancel").innerText = lang[langIndex].id;
	document.querySelector("#show-game-point").innerText = `${lang[langIndex].gamePoint}: `;

	const gamePointText = document.querySelectorAll(".game-point-text");
	for (let i = 0; i < gamePointText.length; i++) {
		gamePointText[i].innerHTML = lang[langIndex].gamePoint;
	}
	const passwordText = document.querySelectorAll(".password");
	for(let i = 0; i < passwordText.length; i++) {
		passwordText[i].innerHTML = lang[langIndex].password;
	}
	const playerLables = document.querySelectorAll(".player");
	if (playerLables) {
		for(let i = 0; i < playerLables.length; i++) {
			playerLables[i].textContent = `${i + 1}${lang[langIndex].playerName}`;
		}
	}
	const joinBtns = document.querySelectorAll(".room-btn");
	if (joinBtns) {
		for (let i = 0; i < joinBtns.length; i++) {
			joinBtns[i].innerHTML = lang[langIndex].enter;
		}
	}
});