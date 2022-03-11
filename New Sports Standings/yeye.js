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
let gameData = JSON.parse(allGamesString);



let games = [];

let allTeamsString = localStorage.getItem('storedTeams');
let teamData = JSON.parse(allTeamsString);

//Gets game and team data from either local storage or above JSON if data is not in local storage yet
const teamString = localStorage.getItem('storedTeams');
let allTeams = teamString != null ? JSON.parse(teamString) : JSON.parse(teamData);

const gamesString = localStorage.getItem('storedGames');
let allGames = gamesString != null ? JSON.parse(gamesString) : JSON.parse(gameData).filter(game => (game.Status !== "Canceled" && game.Status !== "Postponed"));;

//Gets the team of the current games being dislpayed from local storage, auto sets to all if none in storage
const currentTeamString = localStorage.getItem('storedCurrentTeam');
let currentTeam = currentTeamString != null ? JSON.parse(currentTeamString) : 'all';

const teamsPerPage = 40;
const gamesPerPage = 10;

//Sorts games based on date
function sortGames() {
    allGames.sort((a, b) => Date.parse(b.Day) - Date.parse(a.Day));
}

let pageNum = 1;
let teams = allTeams;

let currentSortField = 'wins';
let sortDirection = 'ASC';


//Creates the team standings
function createStandings() {
    try {
        document.querySelector('#rows').innerHTML = '';
        teams.forEach(team => {
            let row = createRow(team);
            document.querySelector('#rows').appendChild(row);
        });
    } catch (TypeError) {}
}

//Sets the current games that are being displayed to a specific team or to all teams
function setCurrentTeam(teamName) {
    if (teamName === 'All Teams') currentTeam = 'all';
    else {
        allTeams.forEach(team => {
            if (team.Name === teamName) currentTeam = team.Key;
        });
        storeData();
    }
    pageNum = 1;
}

//Creates a row in standings for a given team
function createRow(team) {
    let newRow = document.createElement('tr');
    newRow.setAttribute('scope', 'row');
    let newCell = document.createElement('td');
    let link = document.createElement('a');
    link.appendChild(document.createTextNode(team.Name));
    link.style = "color:black";
    link.setAttribute('onclick', ' setCurrentTeam(this.innerHTML);');
    link.setAttribute('href', '/games.html');

    newCell.appendChild(link);
    newCell.className = "team";
    newRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(team.Wins));
    newCell.className = "wins";
    newRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(team.Losses));
    newCell.className = "losses";
    newRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(team.Wins + team.Losses));
    newCell.className = "GP";
    newRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(team.Division));
    newCell.className = "division px-2";
    newRow.appendChild(newCell);

    return newRow;
}

//Sorts the standings based off one of the column's field
function sort(field) {
    if (field === undefined) {
        field = currentSortField;
    } else if (field === currentSortField) {
        sortDirection = sortDirection === 'ASC' ? 'DESC' : 'ASC';
    } else {
        sortDirection = 'ASC';
        currentSortField = field;
    }
    if (sortDirection === 'ASC') {
        if (field === 'team') {
            teams = allTeams.sort((a, b) => a.Name.localeCompare(b.Name) > 0 ? 1 : -1);
        } else if (field === 'wins') {
            teams = allTeams.sort((a, b) => a.Wins - b.Wins);
        } else if (field === 'losses') {
            teams = allTeams.sort((a, b) => a.Losses - b.Losses);
        } else if (field === 'division') {
            teams = allTeams.sort((a, b) => a.Division.localeCompare(b.Division) > 0 ? 1 : -1)
        } else {
            teams = allTeams.sort((a, b) => (a.Wins + a.Losses) - (b.Wins + b.Losses));
        }
    } else {
        if (field === 'team') {
            teams = allTeams.sort((a, b) => a.Name.localeCompare(b.Name) < 0 ? 1 : -1);
        } else if (field === 'wins') {
            teams = allTeams.sort((a, b) => b.Wins - a.Wins);
        } else if (field === 'losses') {
            teams = allTeams.sort((a, b) => b.Losses - a.Losses);
        } else if (field === 'division') {
            teams = allTeams.sort((a, b) => a.Division.localeCompare(b.Division) < 0 ? 1 : -1)
        } else {
            teams = allTeams.sort((a, b) => (b.Wins + b.Losses) - (a.Wins + a.Losses));
        }
    }
    createStandings();
    highlightSort();
}

//Highlights the column that standings is being sorted by
function highlightSort() {
    let cols = document.querySelectorAll(`.${currentSortField}`);
    cols.forEach(element => element.style = "background:#ececec;");
}

//Fills a dropdown of all teams
function fillSelectButton() {
    try {
        let select = document.querySelector('#selectTeam')
        allTeams.forEach(team => {
            let option = document.createElement('option');
            if (team.Key === currentTeam) option.selected = true;
            option.appendChild(document.createTextNode(team.Name));
            select.appendChild(option);
        });
    } catch (TypeError) {}
}

//Filters the teams based on input in text box
function filterTeams() {
    let filterValue = document.querySelector('#filter').value;
    teams = allTeams.filter(team => (team.Name.toLowerCase().indexOf(filterValue) >= 0));
    createStandings();
    highlightSort();
}

//Filters games for either all teams or the currently selected team
function filterByTeam() {
    try {
        games = allGames;
        if (currentTeam != 'all') {
            games = games.filter(game => (game.HomeTeam === currentTeam || game.AwayTeam === currentTeam));
        }
        createGames();
    } catch (TypeError) {};
}

//Moves the games pages down one page
function pageDown() {
    pageNum -= 1;
    createGames();
}

//Moves the game pages up one page
function pageUp() {
    pageNum += 1;
    createGames();
}

//Goes directly to a specified page
function goToPage(element) {
    pageNum = parseInt(element.value);
    createGames();
}

//Removes existing games and displays each game from selected team or all teams 
function createGames() {
    try {
        let displayedGames = document.querySelectorAll('.side-by-side');
        displayedGames.forEach(element => {
            element.remove();
        });
        let displayedDates = document.querySelectorAll('.date');
        displayedDates.forEach(element => {
            element.remove();
        });

        let error = document.querySelector('.errorMsg');
        if (error != null) error.remove();

        //displays message if there are no games for the currently selected team
        if (games.length === 0) document.querySelector('#form-container').appendChild(createErrorMsg('No games available for this team'));

        createButtons();
        display = games.slice(((pageNum * gamesPerPage) - gamesPerPage), (pageNum * gamesPerPage));
        display.forEach(game => {
            displayGame(game);
        });
    } catch (typeError) {}
}


//Adds functionality to buttons at bottom of game screen
function createButtons() {
    let maxPage = Math.ceil(games.length / gamesPerPage);
    let input = document.querySelector('#pageNum');
    //Removes current page numbers from dropdown
    let currentPageNums = document.querySelectorAll('.page-number');
    currentPageNums.forEach(page => page.remove());
    //Fills the bottom dropdown with all page numbers
    for (let i = 0; i < maxPage; i++) {
        let option = document.createElement('option');
        option.className = "page-number";
        console.log(option);
        option.appendChild(document.createTextNode(i + 1));
        if (i === pageNum - 1) option.selected = 'selected';
        input.appendChild(option);
        console.log(input);
    }

    //Creates text beside dropdown that states total number of pages
    ofTotal = document.querySelector('#ofTotal');
    let ofTotalText = document.createElement('p');
    ofTotalText.appendChild(document.createTextNode(` of ${maxPage}`));
    ofTotalText.className = 'ofTotal d-inline';
    oldOfTotal = document.querySelector('.ofTotal');
    if (oldOfTotal !== null) ofTotal.replaceChild(ofTotalText, oldOfTotal);
    else ofTotal.appendChild(ofTotalText);

    //Disables left arrow when on first page
    let LeftArrow = document.querySelector('#leftArrow');
    if (pageNum === 1) LeftArrow.disabled = true;
    else LeftArrow.disabled = false;

    //Disables right arrow when on last page
    let rightArrow = document.querySelector('#rightArrow');
    if (pageNum === maxPage) rightArrow.disabled = true;
    else rightArrow.disabled = false;

}

//Displays a given game 
function displayGame(game) {
    try {
        let homeTeam;
        teams.forEach(team => {
            if (team.Key === game.HomeTeam) homeTeam = team;
        });

        let awayTeam
        teams.forEach(team => {
            if (team.Key === game.AwayTeam) awayTeam = team;
        });

        let monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let month = monthNames[parseInt(game.Day.substring(5, 7)) - 1];
        let day = game.Day.substring(8, 10);
        let year = game.Day.substring(0, 4);
        let date = document.createElement('h3');
        date.className = "date border border-left-0 border-right-0 border-top-0 border-secondary py-3 bg-white m-0";
        date.style = "font-size: 26px; padding-left:25px;";
        date.appendChild(document.createTextNode(`${month}, ${day} - ${year}`));
        let sideBySide = document.createElement('div');
        sideBySide.className = "d-flex side-by-side";

        let box1 = document.createElement('ul');
        box1.className = "bg-white p-0 m-0 border border-left-0 border-right-0 border-top-0 border-secondary teams-scores";
        box1.style = "height:187px; width:100%;";

        let section1 = document.createElement('li');
        section1.style = "list-style:none; align-self:center;";

        let space = document.createElement('div');
        space.className = "mb-5 space";
        space.style = "width:500px;";
        space.appendChild(teamDisplay(homeTeam, game));
        space.appendChild(teamDisplay(awayTeam, game));
        box1.appendChild(space);
        sideBySide.appendChild(box1);

        let box2 = document.createElement('ul');
        box2.className = "bg-white d-flex p-0 m-0 border border-secondary border-left-0 border-top-0 border-right-0";
        box2.style = "height:187px; width:100%; justify-content: center; align-items: center;";

        let grid3 = document.createElement('div');
        grid3.className = "d-flex";

        let li1 = document.createElement('li');
        li1.style = "list-style:none; align-self:center;";
        let gameStatus = "Final";
        if (game.Status === "F/OT") gameStatus += "/OT"
        else if (game.Status === "F/SO") gameStatus += "/SO"
        let status = document.createElement('p');
        if (gameStatus !== "Final") status.className = "mb-0 ml-3 mr-5";
        else status.className = "mb-0 mx-5";

        status.appendChild(document.createTextNode(gameStatus));
        status.style = "font-size:22px; ";
        li1.appendChild(status);
        grid3.appendChild(li1);

        let li2 = document.createElement('li');
        li2.style = "list-style:none; align-self:center;";
        let line = document.createElement('div');
        line.className = "bg-secondary";
        line.style = "width:4px; height:75px;";
        li2.appendChild(line);
        grid3.appendChild(li2);

        let li3 = document.createElement('li');
        li3.className = "ml-3 mt-1";
        li3.style = "list-style:none; align-self:center;";
        let division1 = document.createElement('p');
        division1.appendChild(document.createTextNode(`Division: ${homeTeam.Division}`));
        li3.appendChild(division1);
        let division2 = document.createElement('p');
        division2.appendChild(document.createTextNode(`Division: ${awayTeam.Division}`));
        li3.appendChild(division2);
        grid3.appendChild(li3);

        box2.appendChild(grid3);
        sideBySide.appendChild(box2);

        let container = document.querySelector('#games');
        let prevDate = document.querySelector('.date:last-of-type')
        let prevDateText = prevDate != null ? prevDate.innerHTML : '';
        if (prevDateText != date.innerHTML) container.appendChild(date);
        container.appendChild(sideBySide);

    } catch (TypeError) {};
}

//Creates the team specific portion of a given game
function teamDisplay(team, game) {
    let grid = document.createElement('div');
    grid.className = "d-flex";

    let div = document.createElement('div');

    let name = document.createElement('h4');
    name.appendChild(document.createTextNode(team.Name));
    name.className = 'mx-4 mt-3';

    let record = document.createElement('p');
    record.appendChild(document.createTextNode(`(${team.Wins} - ${team.Losses})`));
    record.className = 'text-muted mx-4';

    div.appendChild(name);
    div.appendChild(record);
    grid.appendChild(div);

    let score = document.createElement('h1');

    let text = game.HomeTeam === team.Key ? game.HomeTeamScore : game.AwayTeamScore;

    score.appendChild(document.createTextNode(text));
    score.className = "score mt-3 ml-auto mx-5";

    grid.appendChild(score);
    return grid;
}

//Attempts to add a new team to the data
function newTeam() {
    let newTeamName = document.querySelector('#newTeamName').value;
    let newTeamWins = document.querySelector('#newTeamWins').value;
    let newTeamLosses = document.querySelector('#newTeamLosses').value;
    let newTeamDivision = document.querySelector('#newTeamDivision').value;

    let error = document.querySelector('.errorMsg');
    if (error != null) error.remove();

    let same;
    allTeams.forEach(team => { if (team.Name === newTeamName) same = true });
    //Displays an error message if:
    //all fields are not filled out
    if (newTeamName == '' || newTeamWins == '' || newTeamLosses == '' || newTeamDivision == 'Choose Division ...') {
        let enterAllFields = createErrorMsg('Error: Please Fill Out All Required Fields');
        let container = document.querySelector('form .container');
        let enterNewTeam = document.querySelector('#test7');
        container.insertBefore(enterAllFields, enterNewTeam);
        //team with that name already exists
    } else if (same) {
        let sameName = createErrorMsg('Error: Team With That Name Already Exists');
        let container = document.querySelector('form .container');
        let enterNewTeam = document.querySelector('#test7');
        container.insertBefore(sameName, enterNewTeam);
    } else {
        //Creates new Team
        thisTeam = {
                Name: newTeamName,
                Wins: parseInt(newTeamWins),
                Losses: parseInt(newTeamLosses),
                Division: newTeamDivision,
                Key: newTeamName.substring(0, 3)
            }
            //Clears out inputs
        document.querySelector('#newTeamName').value = "";
        document.querySelector('#newTeamWins').value = "";
        document.querySelector('#newTeamLosses').value = "";
        document.querySelector('#newTeamDivision').value = "Choose Division ...";

        allTeams.push(thisTeam);
        storeData();
    }
}

//Attempts to add a new game to the data
function newGame() {
    let hTeamName = document.querySelector('#homeTeamName').value;
    let aTeamName = document.querySelector('#awayTeamName').value;
    let hScore = document.querySelector('#homeScore').value;
    let aScore = document.querySelector('#awayScore').value;
    let date = document.querySelector('#date').value;
    let OT = document.querySelector('#OT').checked;
    let SO = document.querySelector('#SO').checked;
    let status;

    if (OT === true) status = "F/OT";
    else if (SO === true) status = "F/SO"
    else status = "final";


    let error = document.querySelector('.errorMsg');
    if (error != null) error.remove();

    let container = document.querySelector('#addGame');
    let row1 = document.querySelector('#row1');

    let homeTeam;
    teams.forEach(team => {
        if (team.Name === hTeamName) homeTeam = team;
    });

    let awayTeam
    teams.forEach(team => {
        if (team.Name === aTeamName) awayTeam = team;
    });

    let today = new Date();
    // Displays an error message if: 
    //a field is left empty
    if (hTeamName === '' || aTeamName === '' || hScore === '' || aScore === '' || date === '' || OT === '') {
        let enterAllFields = createErrorMsg('Error: Please Fill Out All Required Fields');
        container.insertBefore(enterAllFields, row1);
    }
    //a valid team is not imputed 
    else if (homeTeam === undefined || awayTeam === undefined) {
        container.insertBefore(createErrorMsg('Error: Team Not Found'), row1);
    }
    //a valid date is not imputed 
    else if (isNaN(Date.parse(date)) || Date.parse(today) < Date.parse(date) || date.length != 10) {
        container.insertBefore(createErrorMsg('Error: Enter a Valid Date'), row1);
    }
    //a tie is imputed as the score
    else if (aScore === hScore) {
        container.insertBefore(createErrorMsg('Error: Invalid Score Input'), row1);
    }
    //Creates a new game
    else {
        //Updates overall stats for the teams
        if (hScore > aScore) {
            homeTeam.Wins += 1;
            awayTeam.Losses += 1;
        } else {
            awayTeam.Wins += 1;
            homeTeam.Losses += 1;
        }
        let game = {
            HomeTeam: homeTeam.Key,
            AwayTeam: awayTeam.Key,
            AwayTeamScore: aScore,
            HomeTeamScore: hScore,
            Day: date,
            Status: status
        }
        allGames.push(game);
        sortGames();
        storeData();
        //Emptys input
        document.querySelector('#homeTeamName').value = '';
        document.querySelector('#awayTeamName').value = '';
        document.querySelector('#homeScore').value = '';
        document.querySelector('#awayScore').value = '';
        document.querySelector('#date').value = '';
        document.querySelector('#OT').checked = false;
    }
}

//Creates a text element with the style of an error from given text
function createErrorMsg(msg) {
    let enterAllFields = document.createElement('h4');
    enterAllFields.appendChild(document.createTextNode(msg));
    enterAllFields.className = 'text-danger errorMsg pt-3 pl-2';
    return enterAllFields;
}


//Stores teams and games variables in local storage so they can be accessed on different pages
function storeData() {
    localStorage.setItem('storedTeams', JSON.stringify(allTeams));
    localStorage.setItem('storedGames', JSON.stringify(allGames));
    localStorage.setItem('storedCurrentTeam', JSON.stringify(currentTeam));
}

sortGames();
fillSelectButton();
createGames();
filterByTeam();
createStandings();
highlightSort();