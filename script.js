$(document).ready(function() {
	$("#generate").click(function(){
		let pass = [];
		let length = $("#length").val();
		let capital = $("#capitalized").val();
		let special = $("#special").val();
		let numbers = $("#numbers").val();
		let list = [capital, special, numbers]
		for (let i in list) {
			if (list[i] == "") {
				list[i] = 0;
			}
			else {
				list[i] = parseInt(list[i]);
			}
		}
		capital = list[0];
		special = list[1];
		numbers = list[2];
		if (length == "") {
			$("#error").text("Length is required");
		}
		else if (parseInt(length) <= 0) {
			$("#error").text("Length must be greater zero");
		}
		else if (isNaN(length) || isNaN(capital) || isNaN(special) || isNaN(numbers)) {
			$("#error").text("Inputs must be numbers");
		}
		else if (parseInt(length) < (capital + special + numbers)) {
			$("#error").text("Length must be greater all other inputs put together");
		}
		else if (parseInt(length) > 1000) {
			$("#error").text("Length cannot be greater than 1000");
		}
		else {
			if ($("#error").text() != "") {
				$("#error").text("");
			}
			length = parseInt(length);
			let undercase = length - (capital + special + numbers);
			const lowerList = ["a", "b", "c", "d", "e", "f", "g", "h", "i" ,"j", "k", "l", "m", "n", "o", "p", "q", 
			"r", "s", "t", "u", "v", "w", "x", "y", "z"];
			const upperList = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", 
			"R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
			const specialList = ["@", "!", "#", "$", "%", "^", "&", "*", "(", ")", "-", "+", "=", "{", "}", "/", 
			";", ":", "'", "?", ",", ".", "`", "<", ">"];
			const numbersList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
			let lowerPass = getCharacters(lowerList, undercase);
			let upperPass = getCharacters(upperList, capital);
			let specialPass = getCharacters(specialList, special);
			let numberPass = getCharacters(numbersList, numbers);
			let passList = lowerPass.concat(upperPass, specialPass, numberPass);
			let passW = generatePassword(passList, length);
			passW = passW.join("");
			$("#password").text(passW);
		}
	});
	
	$("#generic").click(function() {
		const lowerList = ["a", "b", "c", "d", "e", "f", "g", "h", "i" ,"j", "k", "l", "m", "n", "o", "p", "q", 
		"r", "s", "t", "u", "v", "w", "x", "y", "z"];
		const upperList = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", 
		"R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
		const specialList = ["@", "!", "#", "$", "%", "^", "&", "*", "(", ")", "-", "+", "=", "{", "}", "/", 
		";", ":", "'", "?", ",", ".", "`", "<", ">"];
		const numbersList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
		let length = Math.floor(Math.random() * (17 - 14)) + 14;
		let capital = Math.floor(Math.random() * 4) + 1;
		let special = Math.floor(Math.random() * 4) + 1;
		let numbers = Math.floor(Math.random() * 4) + 1;
		let lower = length - (capital + special + numbers);
		let lowerPass = getCharacters(lowerList, lower);
		let upperPass = getCharacters(upperList, capital);
		let specialPass = getCharacters(specialList, special);
		let numberPass = getCharacters(numbersList, numbers);
		let passList = lowerPass.concat(upperPass, specialPass, numberPass);
		let passW = generatePassword(passList, length);
		passW = passW.join("");
		$("#password").text(passW);
	});
	
	$("#clear").click(function() {
		$("#password").text("");
		$("#length").val("");
		$("#capitalized").val("");
		$("#special").val("");
		$("#numbers").val("");
		$("#error").text("");
	});
	
	function getCharacters(characters, length) {
		let pass = [];
		let len = characters.length;
		for (let i = 0; i < length; i++) {
			let x = Math.floor(Math.random() * len);
			pass.push(characters[x]);
		}
		return pass;
	}
	
	function generatePassword(passList, length) {
		let passW = []
		for (let i = length; i >= 0; i--) {
			let x = Math.floor(Math.random() * i);
			passW.push(passList[x]);
			delete passList[x];
			let newPassList = [];
			for (let n in passList) {
				if (passList[n] !== undefined) {
					newPassList.push(passList[n]);
				}
			}
			passList = newPassList;
		}
		return passW;
	}
});