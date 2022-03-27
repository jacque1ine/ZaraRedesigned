async function getGameData() {

  const res = await fetch('games.json');

  const data = await res.json();

  return data;

}




let allGames = [];
let games = [];


getGameData().then(data =>{ games = data; allGames = data})






/*

const teamString = localStorage.getItem('storedTeams');
let allTeams = teamString != null ? JSON.parse(teamString) : JSON.parse(teamData);


const allGamesString = localStorage.getItem('storedAllGames');
let allGames = allGamesString != null ? JSON.parse(allGamesString) : JSON.parse(gameData).filter(game => (game.Status !== "Canceled" && game.Status !== "Postponed"));;

*/
function storeData() {



  localStorage.setItem('storedAllGames', JSON.stringify(allGames));
  console.log("storing");



}



function createGame(){

  let date = document.querySelector('#date').value + "T00:00:00";
  let hTeam = document.querySelector('#homeTeam').value;
  let aTeam = document.querySelector('#awayTeam').value;
  let hScore = document.querySelector('#awayScore').value;
  let aScore = document.querySelector('#homeScore').value;
  
  if(!isNaN(hScore) &&!isNaN(aScore)){
    let newGame = {
      DateTime: date,
      HomeTeam: hTeam,
      AwayTeam: aTeam,
      AwayTeamScore: aScore,
      HomeTeamScore: hScore,
    }
    console.log(newGame)


  
    allGames.push(newGame);
    storeData();
    console.log(JSON.parse(localStorage.getItem('storedAllGames')))
  

    setTimeout(() => {
      date =  document.querySelector('#date').value = ' ';
      aTeam = document.querySelector('#awayTeam').value = ' ';
      hTeam = document.querySelector('#homeTeam').value= ' ';
      hScore = document.querySelector('#homeScore').value= ' ';
      aScore = document.querySelector('#awayScore').value= ' ';
  }, 2000);
    

    
  } else{
    alert('please enter the correct information');
    
  }

}






