


async function getStandings() {

    const res = await fetch('teams.json');

    const data = await res.json();

    return data;

}
async function getGameData() {

  const res = await fetch('games.json');

  const data = await res.json();

  return data;

}

function storeData() {
  localStorage.setItem('storedTeams', JSON.stringify(allTeams));

  console.log("storing");
  localStorage.setItem('storedAllGames', JSON.stringify(allGames));


}

let sortDirection = 'ASC';
let allGames = [];
let games = [];

let teams = [];

let allTeams = [];

let filteredTeams = [];

let Conference = "NFL";
let Division = "";


function getStrk(teamName){

  let Wstreak = 0;
  let Lstreak = 0; 
  teams = allGames.filter(game => ((game.AwayTeam === teamName)|| (game.HomeTeam === teamName)));
 teams.forEach(game => {
   
  let winHome = (game.HomeTeam === teamName)&& (game.HomeScore > game.AwayScore);
  let winAway = (game.AwayTeam === teamName)&& (game.HomeScore < game.AwayScore);
   
   if(winHome|| winAway){
    Wstreak++;
    Lstreak=0;
   } else{
  Lstreak++;
  Wstreak =0;
   }
   
 });
 
 if(Wstreak != 0)
   return 'W'+ Wstreak;
   else
   return 'L' + Lstreak;
}

function getHomeRecord(teamName){
let wins = 0;
let losses = 0;
  teams = allGames.filter(game => (game.HomeTeam === teamName));
 teams.forEach(game => {
   
  let winHome =(game.HomeScore > game.AwayScore);
   
   if(winHome){
   wins++;
   } else{
    losses++;
   }
   
 });
 
 return wins +'-' + losses;
}

function getAwayRecord(teamName){
  let wins = 0;
  let losses = 0;
    teams = allGames.filter(game => (game.AwayTeam === teamName));
   teams.forEach(game => {
     
    let winAway = (game.HomeScore < game.AwayScore);
     
     if(winAway){
     wins++;
     } else{
      losses++;
     }
     
   });
   
   return wins +'-' + losses;
  }


function sort(field) {
console.log(sortDirection);
  if (sortDirection.localeCompare("ASC") == 0) {
    
    if (field === 'wins') {
      teams = allTeams.sort((a, b) => b.Wins - a.Wins)

   } else if (field === 'Percentage') {
      teams = allTeams.sort((a, b) => b.Percentage - a.Percentage)

   } else if (field === 'losses') {
      teams = allTeams.sort((a, b) => b.Losses - a.Losses)
   } else if (field === 'ties') {
    teams = allTeams.sort((a, b) => b.Ties - a.Ties)
 }   else if (field === 'team') {
      teams = allTeams.sort((a, b) => a.Name.localeCompare(b.Name))
   }else if (field === 'pf') {
    teams = allTeams.sort((a, b) => b.PointsFor - a.PointsFor)
  }else if (field === 'pa') {
    teams = allTeams.sort((a, b) => b.PointsAgainst - a.PointsAgainst)
  }
  sortDirection = 'DSC';
 } else {

     
     if (field === 'wins') {
      teams = allTeams.sort((a, b) => a.Wins - b.Wins)

   } else if (field === 'Percentage') {
      teams = allTeams.sort((a, b) => a.Percentage - b.Percentage)

   }else if (field === 'ties') {
    teams = allTeams.sort((a, b) => a.Ties - b.Ties)
 }  else if (field === "losses") {
      teams = allTeams.sort((a, b) => a.Losses - b.Losses)
   } else if (field === "team") {
      teams = allTeams.sort((a, b) => b.Name.localeCompare(a.Name))
   }else if (field === 'pf') {
    teams = allTeams.sort((a, b) => a.PointsFor - b.PointsFor)
  }else if (field === 'pa') {
    teams = allTeams.sort((a, b) => a.PointsAgainst - b.PointsAgainst)
  }
   sortDirection = 'ASC';
  }

  createStandings();
  
}

function createStandings() {
  document.querySelector('#rows').innerHTML = '';
  if(Conference.localeCompare("NFL") == 0){
    allTeams.forEach(team => { 
    let row = createRow(team); document.querySelector('#rows').appendChild(row); 
     
  });
  } else {
  
  teams = allTeams.filter(team => (team.Conference.localeCompare(Conference) ==0 && team.Division.localeCompare(Division)==0));
  console.log(teams);

  teams.forEach(team => {
    let row = createRow(team); document.querySelector('#rows').appendChild(row);
  })
  }
}

function changeStandings(nConference,nDivision){
  Conference = nConference;
  Division = nDivision;

  if(Conference.localeCompare("NFL") == 0){
    document.querySelector('.title').textContent = "NFL Standings";
  }else{
  document.querySelector(".title").textContent=  Conference + " " + Division;
  }
  createStandings();
}

function createRow(team) {
    let newRow = document.createElement('tr');
    newRow.setAttribute('scope', 'row');
    let newCell = document.createElement('td');
    // newCell.appendChild(initImage(team.Logo));
    newRow.appendChild(newCell);
    newCell.appendChild(document.createTextNode(team.Name));
    newRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(team.Wins));
    newRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(team.Losses));
    newRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(team.Ties));
    newRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(team.Percentage));
    newRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(team.PointsFor));
    newRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(team.PointsAgainst));
    newRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(team.ConferenceWins +"-"+ team.ConferenceLosses));
    newRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(team.DivisionWins + "-" + team.DivisionLosses));
    newRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(getHomeRecord(team.Team)));
    newRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(getAwayRecord(team.Team)));
    newRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(getStrk(team.Team)));
    newRow.appendChild(newCell);


    storeData();
    return newRow;
}

getGameData().then(data =>{ games = data; allGames = games;})

getStandings().then(data => { teams = data; allTeams = teams; createStandings(); });







     
// function initImage(source) {
//   var img = document.createElement('img'); 
//   img.src = source;
//   img.style.margin = '5px';
//   img.style.width = '30px';
//   img.style.height = '20px';
//   return img;
  
// } 

