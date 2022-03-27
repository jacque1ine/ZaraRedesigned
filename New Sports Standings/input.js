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



let allGames = [];
let games = [];

let teams = [];

let allTeamsArr = [];



getGameData().then(data =>{ games = data; allGames = data; initGames()})

getStandings().then(data => { teams = data; allTeamsArr = teams; initTeams() });




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

  // console.log(allGames)
  // console.log(allTeams);


}



function createGame(){

  let date = document.querySelector('#date').value + "T00:00:00";
  let hTeam = document.querySelector('#homeTeam').value;
  let aTeam = document.querySelector('#awayTeam').value;
  let hScore = document.querySelector('#awayScore').value;
  let aScore = document.querySelector('#homeScore').value;
  
  if(!isNaN(hScore) &&!isNaN(aScore)){
    let newGame = {
      HomeTeam: hTeam,
      AwayTeam: aTeam,
      AwayTeamScore: aScore,
      HomeTeamScore: hScore,
    }
  
    allGames.push(newGame);
    storeData();
    console.log(date + hTeam + aTeam + hScore + aScore)


     date =  document.querySelector('#date').value = ' ';
     aTeam = document.querySelector('#awayTeam').value = ' ';
     hTeam = document.querySelector('#homeTeam').value= ' ';
     hScore = document.querySelector('#homeScore').value= ' ';
     aScore = document.querySelector('#awayScore').value= ' ';

    
  } else{
    alert('please enter the correct information');
    
  }

}

function initTeams(){
  allTeams = teams;
 
  // console.log(test);

}

function initGames(data){

 
}


// console.log(localStorage.getItem('storedTeams'))
// console.log(localStorage.getItem('storedAllGames'))

// if (localStorage.getItem('storedTeams') == undefined || localStorage.getItem('storedTeams') == null){
//   localStorage.setItem('storedTeams', getGameData)
// }




