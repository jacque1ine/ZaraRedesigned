// async function getGameData() {

//     const res = await fetch('games.json');
  
//     const data = await res.json();
  
//     return data;
  
//   }
  
//   async function getStandings() {
  
//     const res = await fetch('teams.json');
  
//     const data = await res.json();
  
//     return data;
  
//   }
let test = [];
  
let allGames = [];
let games = [];

let teams = [];

let allTeamsArr = [];

let filteredTeams = [];



teamsAll.then(data =>{ games = data; allGames = data; initGames()})

dataAll.then(data => { teams = data; allTeamsArr = teams; initTeams() });


/*

const teamString = localStorage.getItem('storedTeams');
let allTeams = teamString != null ? JSON.parse(teamString) : JSON.parse(teamData);


const allGamesString = localStorage.getItem('storedAllGames');
let allGames = allGamesString != null ? JSON.parse(allGamesString) : JSON.parse(gameData).filter(game => (game.Status !== "Canceled" && game.Status !== "Postponed"));;

*/
function storeData() {
  localStorage.setItem('storedTeams', teamsAll);

  console.log("storing");
  localStorage.setItem('storedAllGames', gamesAll);

  console.log(allGames)
  console.log(allTeamsArr);

}



function createGame(){

  const date = document.querySelector('#date').value;
  const hTeam = document.querySelector('#homeTeam').value;
  const aTeam = document.querySelector('#awayTeam').value;
  const hScore = document.querySelector('#aScore').value;
  const aScore = document.querySelector('#hScore').value;
  
  if( !isNaN(date) && !isNaN(hScore) &&!isNaN(aScore)){
    let newGame = {
      Week: Week,
      HomeTeam: hTeam,
      AwayTeam: aTeam,
      AwayScore: aScore,
      HomeScore: hScore,
    }
  
    allGames.push(newGame);
    storeData();


      //fix ISSUE WITH DATE
     Date =  document.querySelector('#date').value;
     aTeam = document.querySelector('#awayTeam').value = ' ';
     hTeam = document.querySelector('#homeTeam').value= ' ';
     hScore = document.querySelector('#hScore').value= ' ';
     aScore = document.querySelector('#aScore').value= ' ';
  } else{
    alert('please enter the correct information');
    
  }

}

function initTeams(){
  allTeams = teams;
  test = allTeams;
  console.log(test);

}

function initGames(data){
 
}



