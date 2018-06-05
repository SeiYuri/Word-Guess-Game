// This document contains my notes explaining certain content. Will also use to reference and study later. //


var wordList =
	[
		"BRAVESHINE",
		"READYSTEADYGO",
		"NOSTALGICRAINFALL",
		"FIRSTKISS",
		"CROSSINGFIELD",
		"HEREANDTHERE",
		"CLICK",
		"HIKARUNARA",
	];

const maxTries = 10;  // <--- Using a constant instead of var because maxTries is always set to start at 10 with each gameplay. 

var guessedLetters = [];
var currentWordIndex;
var guessingWord = [];
var remainingGuesses = 0;
var gameFinished = false;  // <--- This is a flag variable. A flag variable has one value (in this case, false) until a condition later in the code changes its value to true.
var wins = 0;
var losses = 0;

// -------------------------Song Files------------------------- //
var braveShine = new Audio('./assets/sounds/braveshine.mp3');
var readySteadyGo = new Audio('./assets/sounds/readysteadygo.mp3');
var nostalgicRainfall = new Audio('./assets/sounds/nostalgicrainfall.mp3');
var firstKiss = new Audio('./assets/sounds/firstkiss.mp3');
var crossingField = new Audio('./assets/sounds/crossingfield.m4a');
var hereAndThere = new Audio('./assets/sounds/hereAndThere.mp3');
var clickSong = new Audio('./assets/sounds/click.mp3');
var hikaruNara = new Audio('./assets/sounds/hikarunara.mp3');

// ----------------------------------------------------------- //

document.onkeydown = function (event) { // <--- At the end of a game, a keypress of any kind will trigger the game to start again!
	if (gameFinished) {
		resetGame();
		gameFinished = false;
	} else {
		if (event.keyCode >= 65 && event.keyCode <= 90) { // <--- Letters have keywords. A's keyword is 65, Z's keyword is 90. This piece of code ensures that only letters are logged in as a guess when a user presses a button. This means if a user guesses '1' or '-', the input will not be picked up.
			makeGuess(event.key.toUpperCase());  // <--- Changes any user input (when a user guesses a letter) to uppercase. (a becomes A); The songs in the wordList are all uppercase, so this allows user's presses to match so they can guess correctly.
			newGame();
			checkWin();
			checkLoss();
		}
	}
};

// This function resets the game and sets all variables to their "initial" or starting positions. //

function resetGame() {
	braveShine.pause(); // <--- .pause() command makes the current song stop playing whenever the game resets.
	readySteadyGo.pause();
	nostalgicRainfall.pause();
	firstKiss.pause();
	crossingField.pause();
	hereAndThere.pause();
	clickSong.pause();
	hikaruNara.pause();


	remainingGuesses = maxTries; // <--- This resets the amount of guesses a user has to 10 each time a new game begins. 

	currentWordIndex = Math.floor(Math.random() * (wordList.length)); /// <---- Used to randomize a word from the wordList.


	guessedLetters = [];
	guessingWord = [];


	// At the start of each game, the word to be guessed will have "slots" ('_') to be guessed. 
	for (var i = 0; i < wordList[currentWordIndex].length; i++) {
		guessingWord.push("_"); // <--- The code .push adds another element to an array. 
	}

	// At the reset of each game, this code hides the "You Win", "You Lose" images, the words "Press Any Key To Play Again..." and the indivdual album cover arts.
	document.getElementById("wannaPlayAgain").style.cssText = "display: none";
	document.getElementById("lose-image").style.cssText = "display: none";
	document.getElementById("win-image").style.cssText = "display: none";
	document.getElementById("albumCovers").style.cssText = "display: block";
	document.getElementById("needAHint").style.cssText = "display: block";
	document.getElementById("braveShine").style.cssText = "display: none";
	document.getElementById("readySteadyGo").style.cssText = "display: none";
	document.getElementById("nostalgicRainfall").style.cssText = "display: none";
	document.getElementById("clickSong").style.cssText = "display: none";
	document.getElementById("crossingField").style.cssText = "display: none";
	document.getElementById("firstKiss").style.cssText = "display: none";
	document.getElementById("hereAndThere").style.cssText = "display: none";
	document.getElementById("hikaruNara").style.cssText = "display: none";

 //This calls the function 'newGame' which will trigger the following changes to appear for each new game. 
	newGame();
};

function newGame() {

	document.getElementById("totalWins").innerText = wins;
	document.getElementById("totalLosses").innerText = losses;

	var guessingWordText = "";
	for (var i = 0; i < guessingWord.length; i++) {
		guessingWordText += guessingWord[i];
	}

	document.getElementById("currentWord").innerText = guessingWordText;
	document.getElementById("remainingGuesses").innerText = remainingGuesses;
	document.getElementById("guessedLetters").innerText = guessedLetters;
};


function evaluateGuess(letter) {
	var positions = [];

	for (var i = 0; i < wordList[currentWordIndex].length; i++) {
		if (wordList[currentWordIndex][i] === letter) {
			positions.push(i);
		}
	}

	if (positions.length <= 0) {
		remainingGuesses--;  // <--- Removes a remaining guess everytime a letter is guessed wrong. 
	} else {
		for (var i = 0; i < positions.length; i++) {
			guessingWord[positions[i]] = letter;
		}
	}
};

function checkWin() {
	if (guessingWord.indexOf("_") === -1) {
		document.getElementById("win-image").style.cssText = "display: block";
		document.getElementById("wannaPlayAgain").style.cssText = "display: block";
		document.getElementById("needAHint").style.cssText = "display: none";
		document.getElementById("albumCovers").style.cssText = "display: none";
		
		wins++
		gameFinished = true;
	}
	if(guessingWord.indexOf("_") === -1 && wordList[currentWordIndex] == "BRAVESHINE") {
		alert("This song is 'Brave Shine' by Aimer!");
		document.getElementById("braveShine").style.cssText = "display: block";
	}
	if(guessingWord.indexOf("_") === -1 && wordList[currentWordIndex] == "READYSTEADYGO") {
		alert("This song is 'Ready Steady Go' by L'Arc~en~Ciel!");
		document.getElementById("readySteadyGo").style.cssText = "display: block";
	}
	if(guessingWord.indexOf("_") === -1 && wordList[currentWordIndex] == "NOSTALGICRAINFALL") {
		alert("This song is 'Nostalgic Rainfall' by CHiCO with HoneyWorks!");
		document.getElementById("nostalgicRainfall").style.cssText = "display: block";
	}
	if(guessingWord.indexOf("_") === -1 && wordList[currentWordIndex] == "FIRSTKISS") {
		alert("This song is 'First Kiss' by ICHIKO!");
		document.getElementById("firstKiss").style.cssText = "display: block";
	}
	if(guessingWord.indexOf("_") === -1 && wordList[currentWordIndex] == "CLICK") {
		alert("This song is 'CLICK' by ClariS!");
		document.getElementById("clickSong").style.cssText = "display: block";
	}
	if(guessingWord.indexOf("_") === -1 && wordList[currentWordIndex] == "HIKARUNARA") {
		alert("This song is 'Hikaru Nara' (meaning: 'If There Is Light') by Goose house!");
		document.getElementById("hikaruNara").style.cssText = "display: block";
	}
	if(guessingWord.indexOf("_") === -1 && wordList[currentWordIndex] == "CROSSINGFIELD") {
		alert("This song is 'Crossing Field' by LiSA!");
		document.getElementById("crossingField").style.cssText = "display: block";
	}
	if(guessingWord.indexOf("_") === -1 && wordList[currentWordIndex] == "HEREANDTHERE") {
		alert("This song is 'Here and There' by Nagi Yanagi!");
		document.getElementById("hereAndThere").style.cssText = "display: block";
	}

	// Not the best way to code the music below, but it was the only way I understood how to do it at the moment.

	if (wordList[currentWordIndex] == "BRAVESHINE") {
		braveShine.play();
	}
	else if (wordList[currentWordIndex] == "READYSTEADYGO") {
		readySteadyGo.play();
	}
	else if (wordList[currentWordIndex] == "NOSTALGICRAINFALL") {
		nostalgicRainfall.play();
	}
	else if (wordList[currentWordIndex] == "FIRSTKISS") {
		firstKiss.play();
	}
	else if (wordList[currentWordIndex] == "CROSSINGFIELD") {
		crossingField.play();
	}
	else if (wordList[currentWordIndex] == "HEREANDTHERE") {
		hereAndThere.play();
	}
	else if (wordList[currentWordIndex] == "CLICK") {
		clickSong.play();
	}
	else if (wordList[currentWordIndex] == "HIKARUNARA") {
		hikaruNara.play();
	}
};

function checkLoss() {
    if(remainingGuesses <= 0) {
        document.getElementById("lose-image").style.cssText = "display: block";
		document.getElementById("wannaPlayAgain").style.cssText = "display:block";
		document.getElementById("needAHint").style.cssText = "display: none";
		document.getElementById("albumCovers").style.cssText = "display: none";

		losses++
        gameFinished = true;
	}
	if(remainingGuesses <= 0 && wordList[currentWordIndex] == "BRAVESHINE") {
		alert("This song is 'Brave Shine' by Aimer!");
		document.getElementById("braveShine").style.cssText = "display: block";
	}
	if(remainingGuesses <= 0 && wordList[currentWordIndex] == "READYSTEADYGO") {
		alert("This song is 'Ready Steady Go' by L'Arc~en~Ciel!");
		document.getElementById("readySteadyGo").style.cssText = "display: block";
	} 
	if(remainingGuesses <= 0 && wordList[currentWordIndex] == "NOSTALGICRAINFALL") {
		alert("This song is 'Nostalgic Rainfall' by CHiCO with HoneyWorks!");
		document.getElementById("nostalgicRainfall").style.cssText = "display: block";
	}
	if(remainingGuesses <= 0 && wordList[currentWordIndex] == "FIRSTKISS") {
		alert("This song is 'First Kiss' by ICHIKO!");
		document.getElementById("firstKiss").style.cssText = "display: block";
	}
	if(remainingGuesses <= 0 && wordList[currentWordIndex] == "CROSSINGFIELD") {
		alert("This song is 'Crossing Field' by LiSA!");
		document.getElementById("crossingField").style.cssText = "display: block";
	} 
	if(remainingGuesses <= 0 && wordList[currentWordIndex] == "CLICK") {
		alert("This song is 'CLICK' by ClariS");
		document.getElementById("clickSong").style.cssText = "display: block";
	}
	if(remainingGuesses <= 0 && wordList[currentWordIndex] == "HEREANDTHERE") {
		alert("This song is 'Here And There' by Nagi Yanagi!");
		document.getElementById("hereAndThere").style.cssText = "display: block";
	}
	if(remainingGuesses <= 0 && wordList[currentWordIndex] == "HIKARUNARA") {
		alert("This song is 'Hikaru Nara' (meaning: 'If There Is Light') by Goose house!");
		document.getElementById("hikaruNara").style.cssText = "display: block";
	}
};

	function makeGuess(letter) {
		if (remainingGuesses > 0) {
			if (guessedLetters.indexOf(letter) === -1) {
				guessedLetters.push(letter);
				evaluateGuess(letter);
			}
		}

	};