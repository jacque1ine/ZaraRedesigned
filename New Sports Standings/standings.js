


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

let dirSor = 'ASC';
let allGames = [];
let games = [];

let teams = [];

let allTeams = [];

let filteredTeams = [];

let Conference = "NBA";
let Division = "";




function sort(field) {
console.log(dirSor);
if (dirSor.localeCompare("ASC") == 0) {
  
  if (field === 'wins') {
    teams = allTeams.sort((a, b) => b.Wins - a.Wins)

 } else if (field === 'Percentage') {
    teams = allTeams.sort((a, b) => b.Percentage - a.Percentage)

 } else if (field === 'losses') {
    teams = allTeams.sort((a, b) => b.Losses - a.Losses)
 
}   else if (field === 'team') {
    teams = allTeams.sort((a, b) => a.City.localeCompare(b.City))
 }else if (field === 'pf') {
  teams = allTeams.sort((a, b) => b.PointsPerGameFor - a.PointsPerGameFor)
}else if (field === 'pa') {
  teams = allTeams.sort((a, b) => b.PointsPerGameAgainst - a.PointsPerGameAgainst)
}
dirSor = 'DSC';
} else {

   
   if (field === 'wins') {
    teams = allTeams.sort((a, b) => a.Wins - b.Wins)

 } else if (field === 'Percentage') {
    teams = allTeams.sort((a, b) => a.Percentage - b.Percentage)

}  else if (field === "losses") {
    teams = allTeams.sort((a, b) => a.Losses - b.Losses)
 } else if (field === "team") {
    teams = allTeams.sort((a, b) => b.Name.localeCompare(a.Name))
 }else if (field === 'pf') {
  teams = allTeams.sort((a, b) => a.PointsPerGameFor - b.PointsPerGameFor)
}else if (field === 'pa') {
  teams = allTeams.sort((a, b) => a.PointsPerGameAgainst - b.PointsPerGameAgainst)
}
 dirSor = 'ASC';
}

createStandings();

}

function createStandings() {
document.querySelector('#rows').innerHTML = '';
if(Conference.localeCompare("NBA") == 0){
  allTeams.forEach(team => { 
  let row = createRow(team); document.querySelector('#rows').appendChild(row); 
   
});

}

else if((Conference.localeCompare("Eastern") == 0 || Conference.localeCompare("Western") == 0 )  && Division.localeCompare(" ") == 0  ){
  teams = allTeams.filter(team => (team.Conference.localeCompare(Conference) ==0));
console.log(teams);

teams.forEach(team => {
  let row = createRow(team); document.querySelector('#rows').appendChild(row);
})



}


else {

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

  if(Conference.localeCompare("NBA") == 0){
    document.querySelector('.title').textContent = "NBA Standings";
  }else{
  document.querySelector(".title").textContent=  Conference + " " + Division;
  }
  createStandings();
}


function createRow(team) {
  let newRow = document.createElement('tr');
  newRow.setAttribute('scope', 'row');
  let newCell = document.createElement('td');
  newRow.appendChild(newCell);
  newCell.appendChild(document.createTextNode(team.City + " " +team.Name));
  newRow.appendChild(newCell);
  newCell = document.createElement('td');
  newCell.appendChild(document.createTextNode(team.Wins));
  newRow.appendChild(newCell);
  newCell = document.createElement('td');
  newCell.appendChild(document.createTextNode(team.Losses));
  newRow.appendChild(newCell);

  newCell = document.createElement('td');
  newCell.appendChild(document.createTextNode(team.Percentage));
  newRow.appendChild(newCell);
  newCell = document.createElement('td');
  newCell.appendChild(document.createTextNode(team.PointsPerGameFor));
  newRow.appendChild(newCell);
  newCell = document.createElement('td');
  newCell.appendChild(document.createTextNode(team.PointsPerGameAgainst));
  newRow.appendChild(newCell);
  newCell = document.createElement('td');
  newCell.appendChild(document.createTextNode(team.ConferenceWins +"-"+ team.ConferenceLosses));
  newRow.appendChild(newCell);
  newCell = document.createElement('td');
  newCell.appendChild(document.createTextNode(team.DivisionWins + "-" + team.DivisionLosses));
  newRow.appendChild(newCell);
  newCell = document.createElement('td');
  newCell.appendChild(document.createTextNode(team.HomeWins + "-" + team.HomeLosses));
  newRow.appendChild(newCell);
  newCell = document.createElement('td');
  newCell.appendChild(document.createTextNode(team.AwayWins + "-" + team.AwayLosses));
  newRow.appendChild(newCell);
  newCell = document.createElement('td');
  newCell.appendChild(document.createTextNode(team.Streak));
  newRow.appendChild(newCell);


  storeData();
  return newRow;
}

getGameData().then(data =>{ games = data; allGames = games;})

getStandings().then(data => { teams = data; allTeams = teams; createStandings(); });









