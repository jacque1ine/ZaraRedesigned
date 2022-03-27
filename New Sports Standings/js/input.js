async function getGameData() {
  const res = await fetch('games.json');
  const data = await res.json();
  return data;
}

let allGames = [];
let games = [];

getGameData().then(data =>{ games = data; allGames = data})

//puts into local storage
function storeData() {
  localStorage.setItem('storedAllGames', JSON.stringify(allGames));
  console.log("storing");
}

//creates a game object from input
function createGame(){

	//gets inputted information
	let date = document.querySelector('#date').value + "T00:00:00";
	let hTeam = document.querySelector('#homeTeam').value;
	let aTeam = document.querySelector('#awayTeam').value;
	let hScore = document.querySelector('#awayScore').value;
	let aScore = document.querySelector('#homeScore').value;

	//checks if scores are numbers
	if(!isNaN(hScore) &&!isNaN(aScore)){

		//create new game object with key value pairs that match w JSON file
		let newGame = {
		DateTime: date,
		HomeTeam: hTeam,
		AwayTeam: aTeam,
		AwayTeamScore: aScore,
		HomeTeamScore: hScore,
		}
		console.log(newGame)

		//add the new game object to existing array of games
		allGames.push(newGame);

		//updates local storage with the modified array
		storeData();
		console.log(JSON.parse(localStorage.getItem('storedAllGames')))

		//waits 1 second before clearing the input fields
		setTimeout(() => {
		date =  document.querySelector('#date').value = ' ';
		aTeam = document.querySelector('#awayTeam').value = ' ';
		hTeam = document.querySelector('#homeTeam').value= ' ';
		hScore = document.querySelector('#homeScore').value= ' ';
		aScore = document.querySelector('#awayScore').value= ' ';
		}, 1000);

	
	} else{
		alert('please enter the correct information');

	}

}






