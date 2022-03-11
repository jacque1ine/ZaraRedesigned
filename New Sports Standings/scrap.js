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
