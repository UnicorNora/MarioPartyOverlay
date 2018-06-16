/*
* Updates Input elements of the counters.
* Is activated at each button press and updates the value from the Input elements.
*
* @param {number} player Which player should be updated.
* @param {string} action What should be done.
* @param {string} amount The amount that should be changed
* @param {string} counter Which counter should be updated.
*/
function counterButtons (player, action, amount, counter) {
	//console.log('Player: ' + player + ', action: ' + action + ', amount: ' + amount + ', counter: ' + counter)
	if (amount == '') {
			amount = 1
		}

	if (counter != 'curTurn' && counter != 'maxTurn' && counter != 'coinStar') {

		if (action == 'P') {
			for (let num = 0; num < amount; num++) {
				document.getElementById('p' + player + counter + 'Input').value++
			}
		} else if (action == 'M') {
			for (let num = 0; num < amount; num++) {
				document.getElementById('p' + player + counter + 'Input').value--
			}
		}

		displayChange(player, counter)
	} else {
		if (action == 'P') {
			for (let num = 0; num < amount; num++) {
				document.getElementById(counter + 'Input').value++
			}
		} else if (action == 'M') {
			for (let num = 0; num < amount; num++) {
				document.getElementById(counter + 'Input').value--
			}
		}
	}


	if (counter == 'coinStar') {
		coinStar()
	} else if (counter == 'maxTurn' || counter == 'curTurn') {
		turns()
	} else if (document.getElementById('enableHighlight').checked == true) {
		highlight(counter, highlightColor)
	}

	if (document.getElementById('slowStarActivated').checked == true) {
		slowHighlight(highlightColor)
	}
}

/*
* Hides and shows counters after pressing the "on/off" buttons.
*
* @param {string} counter Which counter should be hidden/shown.
* @param {string} counter2 Same as counter but with the beggining being uppercase, only useful for counters that hide and show certain buttons like Running with Slow Star.
* @param {boolean} start True if the function is only called to hide all counters.
*/
function displayOnOff (counter, counter2, start) {
	if (document.getElementById(counter + 'Var').value == 1) {
			var visibility = 'none'
			var visibilityOpposite = ''
			document.getElementById(counter + 'Var').value = 0
		} else {
			var visibility = ''
			var visibilityOpposite = 'none'
			document.getElementById(counter + 'Var').value = 1
		}

	if (counter == 'running') {
		for (let num = 1; num < 5; num++) {
			document.getElementById(counter + 'Explanation').style.display = visibility
			document.getElementById('p' + num + counter2 + 'Display').style.display = visibility
			document.getElementById('p' + num + counter2 + 'Text').style.display = visibility
			document.getElementById('p' + num + counter2 + 'Break').style.display = visibility

			document.getElementById('p' + num + counter2 + 'InputTextBefore').style.display = visibility
			document.getElementById('p' + num + counter2 + 'Input').style.display = visibility
			document.getElementById('p' + num + counter2 + 'InputM').style.display = visibility
			document.getElementById('p' + num + counter2 + 'InputP').style.display = visibility
			if (document.getElementById('slowStarActivated').checked == true) {
				document.getElementById('p' + num + counter2 + 'InputM6').style.display = visibility
				document.getElementById('p' + num + counter2 + 'InputP6').style.display = visibility
			} else {
				document.getElementById('p' + num + counter2 + 'InputM10').style.display = visibility
				document.getElementById('p' + num + counter2 + 'InputP10').style.display = visibility
			}
			if (start == true) {
				document.getElementById('p' + num + counter2 + 'InputM6').style.display = visibility
				document.getElementById('p' + num + counter2 + 'InputP6').style.display = visibility
				document.getElementById('p' + num + counter2 + 'InputM10').style.display = visibility
				document.getElementById('p' + num + counter2 + 'InputP10').style.display = visibility
			}
		}
	} else {
		var classList = document.getElementsByClassName(counter)

		for (let num = 0; num < classList.length; num++) {
			document.getElementsByClassName(counter)[num].style.display = visibility
		}
	}
}

/*
* Calls displayOnOff() when the page is being loaded.
* This is required due to some problems with setting up elements that already include the "display: none;" style attribute.
*/
function startDisplayOnOff () {
	var counter = 'happening'
	var counter2 = 'Happening'

	for (let num = 0; num < 10; num++) {
		switch (num) {
			case 0:
				counter = 'happening'
				break;
			case 1:
				counter = 'minigame'
				break;
			case 2:
				counter = 'redSpace'
				break;
			case 3:
				counter = 'running'
				counter2 = 'Running'
				break;
			case 4:
				counter = 'shopping'
				break;
			case 5:
				counter = 'orb'
				break;
			case 6:
				counter = 'candy'
				break;
			case 7:
				counter = 'spinSpace'
				break;
			case 8:
				counter = 'miniZtar'
				break;
			case 9:
				counter = 'specialDice'
				break;
		}
		if (document.getElementById(counter + 'Var').value == 0) {
			document.getElementById(counter + 'Var').value = 1
			displayOnOff(counter, counter2, true)
		}
	}
}

/*
* Resets or starts the highlighting feature by calling callHighlight().
*/
var highlightColor = '#ff0000'
function resetHighlights () {
	if (document.getElementById('enableHighlight').checked == false) {
		callHighlight(true)
	} else {
		callHighlight()
	}
}

/*
* Calls highlight() for all counters to either reset/start the highlighting or to change the color of it.
*
* @param {boolean} resetHighlights If highlighting should be turned off.
* @param {boolean} changeColor If the highlight color should be changed.
*/
function callHighlight (resetHighlights, changeColor) {
	var originalHighlightColor = highlightColor

	if (resetHighlights == true) {
		originalHighlightColor = highlightColor
		highlightColor = 'white'
	} else if (changeColor) {
		highlightColor = document.getElementById('highlightColor').value
		originalHighlightColor = highlightColor
	}

	if (document.getElementById('enableHighlight').checked == true || resetHighlights) {
		if (document.getElementById('happeningVar').value == 1 ) {
			highlight('Happening', highlightColor)
		}
		if (document.getElementById('minigameVar').value == 1 ) {
			highlight('Minigame', highlightColor)
		}
		if (document.getElementById('redSpaceVar').value == 1 ) {
			highlight('RedSpace', highlightColor)
		}
		if (document.getElementById('runningVar').value == 1 && document.getElementById('slowStarActivated').checked == false ) {
			highlight('Running', highlightColor)
		} else if (document.getElementById('runningVar').value == 1 && document.getElementById('slowStarActivated').checked == true ) {
			slowHighlight(highlightColor)
		}
		if (document.getElementById('shoppingVar').value == 1 ) {
			highlight('Shopping', highlightColor)
		}
		if (document.getElementById('orbVar').value == 1 ) {
			highlight('Orb', highlightColor)
		}
		if (document.getElementById('candyVar').value == 1 ) {
			highlight('Candy', highlightColor)
		}
		if (document.getElementById('spinSpaceVar').value == 1 ) {
			highlight('SpinSpace', highlightColor)
		}
		if (slowStarActivated == true) {
			slowHighlight(highlightColor)
		}
		if (document.getElementById('miniZtarVar').value == 1 ) {
			highlight('MiniZtar', highlightColor)
		}
		if (document.getElementById('specialDiceVar').value == 1 ) {
			highlight('SpecialDice', highlightColor)
		}
	}
	highlightColor = originalHighlightColor
}

/*
* Updates the highlighting for a certain counter in case the bonus star(s) has changed.
*
* @param {string} counter Which counter should be updated.
* @param {string} color Which color the highlight should have.
*/
function highlight (counter, color) {
	var counterP1 = document.getElementById('p1' + counter + 'Text').innerHTML
	var counterP2 = document.getElementById('p2' + counter + 'Text').innerHTML
	var counterP3 = document.getElementById('p3' + counter + 'Text').innerHTML
	var counterP4 = document.getElementById('p4' + counter + 'Text').innerHTML

	var counterNum = Math.max(counterP1, counterP2, counterP3, counterP4)

	if (counterP1 == 0 && counterP2 == 0 && counterP3 == 0 && counterP4 == 0) {
		document.getElementById('p1' + counter + 'Text').style.color = 'white'
		document.getElementById('p2' + counter + 'Text').style.color = 'white'
		document.getElementById('p3' + counter + 'Text').style.color = 'white'
		document.getElementById('p4' + counter + 'Text').style.color = 'white'
	} else {
		if (counterNum == counterP1) {
			document.getElementById('p1' + counter + 'Text').style.color = color
		} else {
			document.getElementById('p1' + counter + 'Text').style.color = 'white'
		}

		if (counterNum == counterP2) {
			document.getElementById('p2' + counter + 'Text').style.color = color
		} else {
			document.getElementById('p2' + counter + 'Text').style.color = 'white'
		}

		if (counterNum == counterP3) {
			document.getElementById('p3' + counter + 'Text').style.color = color
		} else {
			document.getElementById('p3' + counter + 'Text').style.color = 'white'
		}

		if (counterNum == counterP4) {
			document.getElementById('p4' + counter + 'Text').style.color = color
		} else {
			document.getElementById('p4' + counter + 'Text').style.color = 'white'
		}
	}
}

/*
* Turns the slow star feature on or off.
*/
function slowStar () {
	if (document.getElementById('runningVar').value == 0) {
		displayOnOff('running', 'Running')
	}

	for (let num = 1; num < 5; num++) {
		if (document.getElementById('slowStarActivated').checked == true) {
			document.getElementById('p' + num + 'RunningInputM10').style.display = 'none'
			document.getElementById('p' + num + 'RunningInputP10').style.display = 'none'
			document.getElementById('p' + num + 'RunningInputM6').style.display = ''
			document.getElementById('p' + num + 'RunningInputP6').style.display = ''
		} else {
			document.getElementById('p' + num + 'RunningInputM10').style.display = ''
			document.getElementById('p' + num + 'RunningInputP10').style.display = ''
			document.getElementById('p' + num + 'RunningInputM6').style.display = 'none'
			document.getElementById('p' + num + 'RunningInputP6').style.display = 'none'
		}
	}
}

/*
* Highlights the slow star.
*
* @param {string} color Which color the highlight should have.
*/
function slowHighlight (color) {
		var counter = 'Running'

		var counterP1 = document.getElementById('p1' + counter + 'Text').innerHTML
		var counterP2 = document.getElementById('p2' + counter + 'Text').innerHTML
		var counterP3 = document.getElementById('p3' + counter + 'Text').innerHTML
		var counterP4 = document.getElementById('p4' + counter + 'Text').innerHTML

		var counterNumMax = Math.max(counterP1, counterP2, counterP3, counterP4)
		var counterNumMin = Math.min(counterP1, counterP2, counterP3, counterP4)


		if (counterP1 == 0) {
			document.getElementById('p1' + counter + 'Text').style.color = 'white'
		} else if (counterNumMax == counterP1 || counterNumMin == counterP1) {
			document.getElementById('p1' + counter + 'Text').style.color = color
		} else {
			document.getElementById('p1' + counter + 'Text').style.color = 'white'
		}

		if (counterP2 == 0) {
			document.getElementById('p2' + counter + 'Text').style.color = 'white'
		} else if (counterNumMax == counterP2 || counterNumMin == counterP2) {
			document.getElementById('p2' + counter + 'Text').style.color = color
		} else {
			document.getElementById('p2' + counter + 'Text').style.color = 'white'
		}

		if (counterP3 == 0) {
			document.getElementById('p3' + counter + 'Text').style.color = 'white'
		} else if (counterNumMax == counterP3 || counterNumMin == counterP3) {
			document.getElementById('p3' + counter + 'Text').style.color = color
		} else {
			document.getElementById('p3' + counter + 'Text').style.color = 'white'
		}

		if (counterP4 == 0) {
			document.getElementById('p4' + counter + 'Text').style.color = 'white'
		} else if (counterNumMax == counterP4 || counterNumMin == counterP4) {
			document.getElementById('p4' + counter + 'Text').style.color = color
		} else {
			document.getElementById('p4' + counter + 'Text').style.color = 'white'
		}
}

/*
* Replaces minigame coins with minigame wins.
*/
function minigameWins () {
	var activated = document.getElementById('minigameWinsActivated').checked
	var playerNum = 1
	var source = 'img/minigamewins.png'

	if (activated == true) {
		source = 'img/minigamewins.png'
		if (document.getElementById('changeNames').checked == false) {
			document.getElementById('minigameExplanation').innerHTML = 'Minigame Wins:'
		}
	} else {
		source = 'img/minigame.png'
		if (document.getElementById('changeNames').checked == false) {
			document.getElementById('minigameExplanation').innerHTML = 'Minigame Coins:'
		}
	}
	
	for (let num = 1; num < 5; num++) {
		document.getElementById('p' + num + 'MinigameDisplay').src = source
	}
}

/*
* Changes Character Images.
*
* @param {number} playerNum Which player should be updated.
*/
function imgSelect(playerNum) {
	var character = document.getElementById('p' + playerNum + 'Select').value
	if (document.getElementById('p' + playerNum + 'Com').checked) {
		var finalImage = "img/" + "com/" + character + ".png"
	} else {
		var finalImage = "img/" + character + ".png"
	}
	document.getElementById('p' + playerNum + 'Img').src = finalImage

	coinStarTie()
}

/*
* Changes counter displays and input.
* Gets fired from displayChange() which gets fired after updating a counter. Checks if the number is 0 or more, else sets it to 0, after that it updates the display.
*
* @param {number} playerNum Which player should get updated.
* @param {string} counter Which counter should get updated.
*/
function displayChange (playerNum, counter) {
	var num = document.getElementById('p' + playerNum + counter + 'Input').value
	if (num && num >= 0) {
		document.getElementById('p' + playerNum + counter + 'Text').innerHTML=num;
	} else if (num && num <= 0) {
		document.getElementById('p' + playerNum + counter + 'Input').value = 0
		document.getElementById('p' + playerNum + counter + 'Text').innerHTML=0
	}
}

/*
* Calls displayChange() for every single counter and player.
*/
function callDisplayChange () {
	var counter = 'Happening'

	for (let num = 0; num < 10; num++) {
		if (num == 0) {
			counter  = 'Happening'
		} else if (num == 1) {
			counter = 'Minigame'
		} else if (num == 2) {
			counter = 'RedSpace'
		} else if (num == 3) {
			counter = 'Running'
		} else if (num == 4) {
			counter = 'Shopping'
		} else if (num == 5) {
			counter = 'Orb'
		} else if (num == 6) {
			counter = 'Candy'
		} else if (num == 7) {
			counter = 'SpinSpace'
		} else if (num == 8) {
			counter = 'MiniZtar'
		} else if (num == 9) {
			counter = 'SpecialDice'
		}

		for (let num = 1; num < 5; num++) {
			displayChange(num, counter)
		}
	}
}

/*
* Changes turns displays and input.
* Gets fired from displayChange() which gets fired after updating the turns. Checks if the number is 1 or more and that the current turn does not exceed the max turn, after that it updates the display.
*/
function turns () {
	var curTurnVar = document.getElementById('curTurnInput').value
	var maxTurnVar = document.getElementById('maxTurnInput').value

	if (curTurnVar <= 1) {
		document.getElementById('curTurnInput').value = 1
	} else if (+curTurnVar > +maxTurnVar) {
		document.getElementById('curTurnInput').value = maxTurnVar
	}
	if (maxTurnVar <= 5) {
		document.getElementById('maxTurnInput').value = 5
	}
	var curTurnVar = document.getElementById('curTurnInput').value
	var maxTurnVar = document.getElementById('maxTurnInput').value
	console.log('Current:' + curTurnVar + ' Max:' + maxTurnVar)

	document.getElementById('curTurnText').innerHTML= curTurnVar + '/' + maxTurnVar
}

/*
* Updates the coin star display.
* Gets fired from displayChange() which gets fired after updating the coin star. Checks if the number is 0 or more, after that it updates the display.
*/
function coinStar () {
	var coinStarVar = document.getElementById('coinStarInput').value
	if (coinStarVar && coinStarVar >= 0) {
		document.getElementById("coinStarText").innerHTML=coinStarVar
	} else if (coinStarVar < 0) {
		document.getElementById('coinStarInput').value = 0
	}
}

/*
* Updates the coin star display.
*/
function coinStarTie () {
	document.getElementById('coinStarTie1').style.height = ''
	document.getElementById('coinStarTie1').style.top = ''
	document.getElementById('coinStarTie1').style.left = ''

	document.getElementById('coinStarTie4').style.height = ''
	document.getElementById('coinStarTie4').style.top = ''
	document.getElementById('coinStarTie4').style.left = ''

	var player1 = document.getElementById('p1CoinStarTie').checked
	var player2 = document.getElementById('p2CoinStarTie').checked
	var player3 = document.getElementById('p3CoinStarTie').checked
	var player4 = document.getElementById('p4CoinStarTie').checked

	var character1 = document.getElementById('p1Select').value
	var character2 = document.getElementById('p2Select').value
	var character3 = document.getElementById('p3Select').value
	var character4 = document.getElementById('p4Select').value

	var tied = []

	if (player1 == true) {
		tied.push(character1)
	}
	if (player2 == true) {
		tied.push(character2)
	}
	if (player3 == true) {
		tied.push(character3)
	}
	if (player4 == true) {
		tied.push(character4)
	}

	if (document.getElementById('questionForTie').checked == true && tied.length != 1 || tied.length == 0) {
		document.getElementById('coinStarCharacter').src = 'img/question.png'

		document.getElementById('coinStarTie1').src = 'img/tie.png'
		document.getElementById('coinStarTie2').src = 'img/tie.png'
		document.getElementById('coinStarTie3').src = 'img/tie.png'
		document.getElementById('coinStarTie4').src = 'img/tie.png'
		document.getElementById('coinStarTie5').src = 'img/tie.png'

		} else if (tied.length == 1) {
		document.getElementById('coinStarCharacter').src = 'img/' + tied[0] + '.png'

		document.getElementById('coinStarTie1').src = 'img/tie.png'
		document.getElementById('coinStarTie2').src = 'img/tie.png'
		document.getElementById('coinStarTie3').src = 'img/tie.png'
		document.getElementById('coinStarTie4').src = 'img/tie.png'
		document.getElementById('coinStarTie5').src = 'img/tie.png'

	} else if (tied.length == 2) {
		document.getElementById('coinStarTie1').src = 'img/' + tied[0] + '.png'
		document.getElementById('coinStarTie4').src = 'img/' + tied[1] + '.png'
		document.getElementById('coinStarCharacter').src = 'img/tie.png'

		document.getElementById('coinStarTie2').src = 'img/tie.png'
		document.getElementById('coinStarTie3').src = 'img/tie.png'
		document.getElementById('coinStarTie5').src = 'img/tie.png'

		document.getElementById('coinStarTie1').style.height = '32px'
		document.getElementById('coinStarTie1').style.top = '-24px'
		document.getElementById('coinStarTie1').style.left = '42px'

		document.getElementById('coinStarTie4').style.height = '32px'
		document.getElementById('coinStarTie4').style.top = '-2px'
		document.getElementById('coinStarTie4').style.left = '-31px'

	} else if (tied.length == 3) {
		document.getElementById('coinStarTie1').src = 'img/' + tied[0] + '.png'
		document.getElementById('coinStarTie2').src = 'img/' + tied[1] + '.png'
		document.getElementById('coinStarTie5').src = 'img/' + tied[2] + '.png'
		document.getElementById('coinStarCharacter').src = 'img/tie.png'

		document.getElementById('coinStarTie3').src = 'img/tie.png'
		document.getElementById('coinStarTie4').src = 'img/tie.png'

	} else if (tied.length == 4) {
		document.getElementById('coinStarTie1').src = 'img/' + tied[0] + '.png'
		document.getElementById('coinStarTie2').src = 'img/' + tied[1] + '.png'
		document.getElementById('coinStarTie3').src = 'img/' + tied[2] + '.png'
		document.getElementById('coinStarTie4').src = 'img/' + tied[3] + '.png'
		document.getElementById('coinStarCharacter').src = 'img/tie.png'

		document.getElementById('coinStarTie5').src = 'img/tie.png'

	}
}

/*
* Show/Hide a certain element.
* Adds or removes the classes "hidden" and "visible" which respectively hides and shows a element based on a id given.
*
* @param {string} id Which element should be hidden or shown.
*/
function showHideDiv (id) {
	var div = document.getElementById(id).classList
	console.log(div)
	if (div == 'hidden') {
		document.getElementById(id).classList.add('visible');
		document.getElementById(id).classList.remove('hidden');
	} else {
		document.getElementById(id).classList.remove('visible');
		document.getElementById(id).classList.add('hidden');
	}
}

/*
* Changes names from a explanation to the bonus star names.
*/
function changeNames () {
	if (document.getElementById('changeNames').checked == true) {
		document.getElementById('happeningExplanation').innerHTML = 'Happening:'
		document.getElementById('minigameExplanation').innerHTML = 'Minigame:'
		document.getElementById('redSpaceExplanation').innerHTML = 'Red Space:'
		document.getElementById('runningExplanation').innerHTML = 'Running:'
		document.getElementById('shoppingExplanation').innerHTML = 'Shopping:'
		document.getElementById('orbExplanation').innerHTML = 'Orb:'
		document.getElementById('candyExplanation').innerHTML = 'Candy:'
		document.getElementById('spinSpaceExplanation').innerHTML = 'Spin Space:'
		document.getElementById('miniZtarExplanation').innerHTML = 'Minus:'
		document.getElementById('specialDiceExplanation').innerHTML = 'Special Dice:'
	} else {
		document.getElementById('happeningExplanation').innerHTML = 'Happening:'
		if (document.getElementById('minigameWinsActivated').checked == true) {
		document.getElementById('minigameExplanation').innerHTML = 'Minigame Wins:'
	} else {
		document.getElementById('minigameExplanation').innerHTML = 'Minigame Coins:'
	}
		document.getElementById('redSpaceExplanation').innerHTML = 'Red Spaces:'
		document.getElementById('runningExplanation').innerHTML = 'Total Dice Num.:'
		document.getElementById('shoppingExplanation').innerHTML = 'Total Coins spent:'
		document.getElementById('orbExplanation').innerHTML = 'Total Orbs used:'
		document.getElementById('candyExplanation').innerHTML = 'Total Candies used:'
		document.getElementById('spinSpaceExplanation').innerHTML = 'Spin Spaces:'
		document.getElementById('miniZtarExplanation').innerHTML = 'Mini Ztars collected:'
		document.getElementById('specialDiceExplanation').innerHTML = 'Total Special Dices used:'
	}
}

/*
* Closes the settings if the user doesn't click on the settings while they are opened.
*
* @param {string} event What event got fired.
*/
function windowOnClick (event) {
	var settings = document.querySelector("#settings")
	var tutorial = document.querySelector("#tutorial")
	if (event.target === settings) {
		showHideDiv('settings')
	} else if (event.target === tutorial){
		showHideDiv('tutorial')
	}
}

/*
* Saves all settings as cookies.
*
* @param {boolean} close If the settings should be closed after saving. True = should be closed.
*/
function saveSettings (close) {
	localStorage.setItem('saving', 'true')

	localStorage.setItem('greenscreen', document.getElementById('greenscreen').checked)
	localStorage.setItem('bgColor', document.getElementById('bgColor').value)
	localStorage.setItem('bonusName', document.getElementById('changeNames').checked)
	localStorage.setItem('counterHighlight', document.getElementById('enableHighlight').checked)
	localStorage.setItem('highlightColor', document.getElementById('highlightColor').value)
	localStorage.setItem('questionForTie', document.getElementById('questionForTie').checked)

	localStorage.setItem('botName', document.getElementById('twitchNameInput').value)
	localStorage.setItem('botOauth', document.getElementById('twitchPasswordInput').value)
	localStorage.setItem('twitchChannel', document.getElementById('twitchChannelInput').value)
	localStorage.setItem('autoconnect', document.getElementById('twitchAutoConnect').checked)
	localStorage.setItem('userWhitelist', document.getElementById('userWhitelist').value)
	localStorage.setItem('adminList', document.getElementById('adminList').value)

	localStorage.setItem('commandsEnabled', document.getElementById('commandsEnabled').checked)
	localStorage.setItem('enablecmdConnected', document.getElementById('enablecmdConnected').checked)
	localStorage.setItem('enablecmdHelp', document.getElementById('enablecmdHelp').checked)
	localStorage.setItem('enablecmdCompleted', document.getElementById('enablecmdCompleted').checked)
	localStorage.setItem('enablecmdError', document.getElementById('enablecmdError').checked)
	localStorage.setItem('enablecmdMissing', document.getElementById('enablecmdMissing').checked)
	localStorage.setItem('enablecmdNoPerm', document.getElementById('enablecmdNoPerm').checked)

	localStorage.setItem('cmdConnected', document.getElementById('cmdConnected').value)
	localStorage.setItem('cmdHelp', document.getElementById('cmdHelp').value)
	localStorage.setItem('cmdCompleted', document.getElementById('cmdCompleted').value)
	localStorage.setItem('cmdError', document.getElementById('cmdError').value)
	localStorage.setItem('cmdMissing', document.getElementById('cmdMissing').value)
	localStorage.setItem('cmdNoPerm', document.getElementById('cmdNoPerm').value)

	if (close == true) {
		showHideDiv('settings')
	}
}

/*
* Prepares all settings that were saved as cookies when the site gets loaded.
*/
function prepareMPO () {
	if (localStorage.getItem('saving') == 'true') {

		document.getElementById('greenscreen').checked = stringToBoolean(localStorage.getItem('greenscreen'))
		document.getElementById('bgColor').value = localStorage.getItem('bgColor')
		if (document.getElementById('greenscreen').checked == true) {
		 	bgOnOff()
		}

		document.getElementById('changeNames').checked = stringToBoolean(localStorage.getItem('bonusName'))
		if (document.getElementById('changeNames').checked == true) {
		 	changeNames()
		}

		document.getElementById('enableHighlight').checked = stringToBoolean(localStorage.getItem('counterHighlight'))
		document.getElementById('highlightColor').value = localStorage.getItem('highlightColor')
		if (document.getElementById('enableHighlight').checked == true) {
		 	callHighlight(false, true)
		}

		document.getElementById('questionForTie').checked = stringToBoolean(localStorage.getItem('questionForTie'))


		document.getElementById('twitchNameInput').value = localStorage.getItem('botName')
		document.getElementById('twitchPasswordInput').value = localStorage.getItem('botOauth')
		document.getElementById('twitchChannelInput').value = localStorage.getItem('twitchChannel')
		document.getElementById('twitchAutoConnect').checked = stringToBoolean(localStorage.getItem('autoconnect'))

		document.getElementById('userWhitelist').value = localStorage.getItem('userWhitelist')
		document.getElementById('adminList').value = localStorage.getItem('adminList')
		saveTwitchLists()

		document.getElementById('commandsEnabled').checked = stringToBoolean(localStorage.getItem('commandsEnabled'))
		document.getElementById('enablecmdConnected').checked = stringToBoolean(localStorage.getItem('enablecmdConnected'))
		document.getElementById('enablecmdHelp').checked = stringToBoolean(localStorage.getItem('enablecmdHelp'))
		document.getElementById('enablecmdCompleted').checked = stringToBoolean(localStorage.getItem('enablecmdCompleted'))
		document.getElementById('enablecmdError').checked = stringToBoolean(localStorage.getItem('enablecmdError'))
		document.getElementById('enablecmdMissing').checked = stringToBoolean(localStorage.getItem('enablecmdMissing'))
		document.getElementById('enablecmdNoPerm').checked = stringToBoolean(localStorage.getItem('enablecmdNoPerm'))

		document.getElementById('cmdConnected').value = localStorage.getItem('cmdConnected')
		document.getElementById('cmdHelp').value = localStorage.getItem('cmdHelp')
		document.getElementById('cmdCompleted').value = localStorage.getItem('cmdCompleted')
		document.getElementById('cmdError').value = localStorage.getItem('cmdError')
		document.getElementById('cmdMissing').value = localStorage.getItem('cmdMissing')
		document.getElementById('cmdNoPerm').value = localStorage.getItem('cmdNoPerm')

		if (document.getElementById('twitchAutoConnect').checked == true) {
		 	connectTwitch()
		}
	}
}

/*
* Converts a string into a boolean.
*
* @param {string} boolean The string that should get coverted.
*/
function stringToBoolean(boolean) {
	if (boolean == 'true') {
		return true;
	} else if (boolean == 'false') {
		return false;
	}
}

/*
* Resets settings and clears cookies.
*/
function resetSettings() {
	localStorage.clear()

	document.getElementById('greenscreen').checked = false
	document.getElementById('bgColor').value = '#0000FF'
	document.getElementById('changeNames').checked = false
	document.getElementById('enableHighlight').checked = true
	document.getElementById('highlightColor').value = '#ff0000'
	document.getElementById('questionForTie').checked = false

	document.getElementById('twitchNameInput').value = ''
	document.getElementById('twitchPasswordInput').value = ''
	document.getElementById('twitchChannelInput').value = ''
	document.getElementById('twitchAutoConnect').checked = false

	document.getElementById('commandsEnabled').checked = true
	document.getElementById('enablecmdConnected').checked = true
	document.getElementById('enablecmdHelp').checked = true
	document.getElementById('enablecmdCompleted').checked = ''
	document.getElementById('enablecmdError').checked = true
	document.getElementById('enablecmdMissing').checked = true
	document.getElementById('enablecmdNoPerm').checked = true
	document.getElementById('cmdConnected').value = 'MPO has succesfully connected to Twitch.'
	document.getElementById('cmdHelp').value = 'Correct usage: "!mpo *counter* *player* *action*"; "!mpo happening 3 +1", more info avaible at: https://github.com/blueYOSHI9000/MarioPartyOverlay/wiki/Twitch-Commands-Summary'
	document.getElementById('cmdCompleted').value = '@user, action completed.'
	document.getElementById('cmdError').value = '@user, "*wrong argument entered by user*" is a invalid argument, check "!mpo commands" for help.'
	document.getElementById('cmdMissing').value = '@user, your last argument is missing, check "!mpo commands" for help.'
	document.getElementById('cmdNoPerm').value = '@user, you don\'t have the permission to use this command.'

	showHideDiv('resetSettingsDiv')

	if (bgImgOn == 0) {
		bgOnOff()
	}

	if (document.getElementById('changeNames').checked == false) {
		changeNames()
	}

	callHighlight(false, true)
	resetHighlights()
}

/*
* Checks if something is included in a array.
*
* @param {-} needle Checks if this is included in the array.
* @param {array} arrhaystack The array that should include something.
*/
function arrCon(needle, arrhaystack)
{
    return (arrhaystack.indexOf(needle) > -1);
}

/*
* Changes background from greenscreen to image and vice versa.
*/
var bgImgOn = true
var bgColor = '#0000ff'
function bgOnOff () {
	bgColor = document.getElementById('bgColor').value

	if (bgImgOn == true) {
		document.getElementById('htmlTag').style.background = bgColor
		bgImgOn = false
	} else {
		document.getElementById('htmlTag').style = "background: url(img/background.jpg) no-repeat center center fixed; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;"
		bgImgOn = true
	}
}

/*
* Changes background color if greenscreen is used.
*/
function changeBGColor() {
	bgColor = document.getElementById('bgColor').value
	if (bgImgOn == false) {
		document.getElementById('htmlTag').style.background = bgColor
	}
}

window.addEventListener("click", windowOnClick)

/*
* Enables and disables the ability to drag 'n' drop counters.
*/
var enableInteractVar = false

function enableInteract () {
	if (enableInteractVar == false) {
		enableInteractVar = true
		document.getElementById('enableInteractButton').innerHTML = "Disable Drag 'n' Drop (reload to reset positions)"
	} else if (enableInteractVar == true) {
		enableInteractVar = false
		document.getElementById('enableInteractButton').innerHTML = "Enable Drag 'n' Drop (reload to reset positions)"
	}
}

// === INTERACT.JS ===
// target elements with the "draggable" class
interact('.draggable')
	.draggable({
		// enable inertial throwing
		inertia: true,
		// keep the element within the area of it's parent
		/* restrict: {
			restriction: "parent",
			endOnly: true,
			elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
		},*/ 
		// enable autoScroll
		autoScroll: true,

		// call this function on every dragmove event
		onmove: dragMoveListener,
		// call this function on every dragend event
		onend: function (event) {
		var textEl = event.target.querySelector('p');

		textEl && (textEl.textContent =
			'moved a distance of '
			+ (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
				Math.pow(event.pageY - event.y0, 2) | 0))
				.toFixed(2) + 'px');
	}
});

	function dragMoveListener (event) {
	if (enableInteractVar == true) {
		var target = event.target,
			// keep the dragged position in the data-x/data-y attributes
			x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
			y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

		// translate the element
		target.style.webkitTransform =
		target.style.transform =
			'translate(' + x + 'px, ' + y + 'px)';

		// update the posiion attributes
		target.setAttribute('data-x', x);
		target.setAttribute('data-y', y);
	}
}
// === INTERACT.JS END ===

window.onload = prepareMPO()
window.onload = startDisplayOnOff()