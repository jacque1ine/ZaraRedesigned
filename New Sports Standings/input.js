async function getGameData() {
  const res = await fetch('games.json');
  const data = await res.json();
  return data;

} 

async function getStandings() {

  const res = await fetch('teams.json');

  const data = await res.json();

  return data;

}


let allGamesString = localStorage.getItem('storedAllGames');
let allGames = JSON.parse(allGamesString);



let games = [];

let allTeamsString = localStorage.getItem('storedTeams');
let allTeams = JSON.parse(allTeamsString);
let teams = [];


/*

const teamString = localStorage.getItem('storedTeams');
let allTeams = teamString != null ? JSON.parse(teamString) : JSON.parse(teamData);


const allGamesString = localStorage.getItem('storedAllGames');
let allGames = allGamesString != null ? JSON.parse(allGamesString) : JSON.parse(gameData).filter(game => (game.Status !== "Canceled" && game.Status !== "Postponed"));;

*/
function storeData() {
  localStorage.setItem('storedTeams', allTeams);

  console.log("storing");
  localStorage.setItem('storedAllGames', allGames);

  console.log(allGames)
  console.log(allTeams);

}



function createGame(){

  const date = document.querySelector('#date').value;
  const hTeam = document.querySelector('#homeTeam').value;
  const aTeam = document.querySelector('#awayTeam').value;
  const hScore = document.querySelector('#awayScore').value;
  const aScore = document.querySelector('#homeScore').value;
  
  if(!isNaN(hScore) &&!isNaN(aScore)){
    let newGame = {
      HomeTeam: hTeam,
      AwayTeam: aTeam,
      AwayScore: aScore,
      HomeScore: hScore,
    }
  
    allGames.push(newGame);
    storeData();


    //   //fix ISSUE WITH DATE
    //  date =  document.querySelector('#date').value;
    //  aTeam = document.querySelector('#awayTeam').value = ' ';
    //  hTeam = document.querySelector('#homeTeam').value= ' ';
    //  hScore = document.querySelector('#homeScore').value= ' ';
    //  aScore = document.querySelector('#awayScore').value= ' ';
  } else{
    alert('please enter the correct information');
    
  }

}

// function initTeams(){
//   allTeams = teams;
//   test = allTeams;
//   console.log(test);

// }




