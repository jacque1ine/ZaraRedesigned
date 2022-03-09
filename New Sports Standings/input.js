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
let test = [];

let allGames = [];
let games = [];

let teams = [];

let allTeamsArr = [];

let filteredTeams = [];

getGameData().then(data =>{ games = data; allGames = data; initGames()})

getStandings().then(data => { teams = data; allTeamsArr = teams; initTeams() });


/*

const teamString = localStorage.getItem('storedTeams');
let allTeams = teamString != null ? JSON.parse(teamString) : JSON.parse(teamData);


const allGamesString = localStorage.getItem('storedAllGames');
let allGames = allGamesString != null ? JSON.parse(allGamesString) : JSON.parse(gameData).filter(game => (game.Status !== "Canceled" && game.Status !== "Postponed"));;

*/
function storeData() {
  localStorage.setItem('storedTeams', JSON.stringify(allTeamsArr));

  console.log("storing");
  localStorage.setItem('storedAllGames', JSON.stringify(allGames));

  console.log(allGames)
  console.log(allTeamsArr);

}



function createGame(){

  let hOT = 0;
  let aOT =0;
  let Week =  document.querySelector('#week').value;
  let aTeam = document.querySelector('#awayTeam').value;
  let hTeam = document.querySelector('#homeTeam').value;
  let hScore = document.querySelector('#hScore').value;
  let aScore = document.querySelector('#aScore').value;
  let hQ1 = document.querySelector('#hQ1').value;
  let hQ2 = document.querySelector('#hQ2').value;
  let hQ3 = document.querySelector('#hQ3').value;
  let hQ4 = document.querySelector('#hQ4').value;
  let aQ1 = document.querySelector('#aQ1').value;
  let aQ2 = document.querySelector('#aQ2').value;
  let aQ3 = document.querySelector('#aQ3').value;
  let aQ4 = document.querySelector('#aQ4').value;
   hOT = hScore -hQ1-hQ2-hQ3-hQ4;
   aOT = aScore - aQ1-aQ2-aQ3-aQ4;
  console.log(aOT);
  console.log(hOT);
  if( !isNaN(Week) && !isNaN(hScore) &&!isNaN(aScore)&&!isNaN(hQ1)&&!isNaN(hQ2)&&!isNaN(hQ3)&&!isNaN(hQ4)&&!isNaN(aQ1)&&!isNaN(aQ2)&&!isNaN(aQ3)&&!isNaN(aQ4)&& hOT >= 0 && aOT >= 0){
    let newGame = {
      Week: Week,
      HomeTeam: hTeam,
      AwayTeam: aTeam,
      AwayScore: aScore,
      HomeScore: hScore,
      AwayScoreQuarter1:aQ1,
     AwayScoreQuarter2:aQ2,
     AwayScoreQuarter3:aQ3,
     AwayScoreQuarter4:aQ4,
     AwayScoreOvertime:aOT,
     HomeScoreQuarter1:hQ1,
     HomeScoreQuarter2:hQ2,
     HomeScoreQuarter3:hQ3,
     HomeScoreQuarter4:hQ4,
     HomeScoreOvertime:hOT,
    }

  
    allGames.push(newGame);
    storeData();


     Week =  document.querySelector('#week').value;
     aTeam = document.querySelector('#awayTeam').value = ' ';
     hTeam = document.querySelector('#homeTeam').value= ' ';
     hScore = document.querySelector('#hScore').value= ' ';
     aScore = document.querySelector('#aScore').value= ' ';
     hQ1 = document.querySelector('#hQ1').value= ' ';
     hQ2 = document.querySelector('#hQ2').value = ' ';
     hQ3 = document.querySelector('#hQ3').value = ' ';
     hQ4 = document.querySelector('#hQ4').value = ' ';
     aQ1 = document.querySelector('#aQ1').value = ' ';
     aQ2 = document.querySelector('#aQ2').value = ' ';
     aQ3 = document.querySelector('#aQ3').value = ' ';
     aQ4 = document.querySelector('#aQ4').value = ' ';
     aOT = 0; 
     hOT = 0;
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



