
async function getGameData() {
    let res = await fetch('games.json');
    let data = await res.json();
    return data;

} 

async function getStandings() {
    let res = await fetch('teams.json');
    let data = await res.json();
    return data;
}


if (localStorage.getItem('storedAllGames') == undefined || localStorage.getItem('storedAllGames') === null){
  localStorage.setItem('storedAllGames', JSON.stringify(gamesBigArr))
}

if (localStorage.getItem('storedTeams') === undefined || localStorage.getItem('storedTeams') === null){
  localStorage.setItem('storedTeams', JSON.stringify(teamsBigArr))
}

console.log(localStorage.getItem('storedAllGames'));

let allGamesString = localStorage.getItem('storedAllGames');
let allGames = JSON.parse(allGamesString);
let games = [];

let allTeamsString = localStorage.getItem('storedTeams');
let allTeams = JSON.parse(allTeamsString);
let teams = [];


function convertName(key){
    let fullName = ' ';
allTeams.forEach(team => {
    
    if(team.Key === key){
        fullName =  team.City + " " + team.Name;
        
    }
})

return fullName;
}


function getInput(){
    var newArr = []; 
    const parent = document.getElementById("sections")
    while (parent.firstChild) {
        parent.firstChild.remove()
    }

    let intialDate =  document.querySelector('#dateFrom').value;
    let endDate = document.querySelector('#dateTo').value;

    console.log(intialDate)
    console.log(endDate)

    allGames.forEach(game => {
        if ( new Date(game.DateTime) > new Date(intialDate) &&  new Date(game.DateTime) <= new Date(endDate)){
            console.log(game.DateTime)
            let row = createCardTwo(game); document.querySelector('#sections').appendChild(row);
            newArr.push(game);
        }
    })

    paginationTwo(newArr); 

    }

    function changeGames(team){
        var newArr = []; 
        
         const parent = document.getElementById("sections")
    while (parent.firstChild) {
        parent.firstChild.remove()
    }


        allGames.forEach(game => {
            if (game.HomeTeam === team || game.AwayTeam === team){
                let row = createCardTwo(game); document.querySelector('#sections').appendChild(row);
                newArr.push(game);

            }
        })
        paginationTwo(newArr); 
      }
    
function createCardTwo(game) {
    console.log("RUNNING");

    //create new row 
    let newRow = document.createElement('tr');
    newRow.setAttribute('id', 'card'); //each row has an id and card 

    //CARD
    let card = document.createElement('div');
    card.className = 'card text-dark bg-white mb-3';


    
    //create score display
    let hScore = document.createElement('h1');
    hScore.innerText =  game.HomeTeamScore;
    hScore.className = 'text-center p-4'
   
  
    //create score display
    let aScore = document.createElement('h1');
    aScore.innerText =  game.AwayTeamScore ;
    aScore.className = 'text-center p-4'


    //create home team label display
    let hTeam = document.createElement('div')
    hTeam.className = "p-4 font-weight-bold"
    hTeam.innerText =  "HOME" ;
    let hTeamHeading = document.createElement('h5')
    hTeamHeading.innerText = convertName(game.HomeTeam);
    hTeam.appendChild(hTeamHeading)
   


    //create away team label display
    let aTeam = document.createElement('div')
    aTeam.className = "p-4 font-weight-bold"
    aTeam.innerText =  "AWAY" ;
    let aTeamHeading = document.createElement('h5')
    aTeamHeading.innerText = convertName(game.AwayTeam);
    aTeam.appendChild(aTeamHeading)
   
    if(game.AwayTeamScore > game.HomeTeamScore){
        aScore.className = 'text-center p-4 text-primary'
        aTeam.className = "p-4 font-weight-bold text-primary"
        aTeamHeading.className= "text-primary"
        
    }
    if(game.AwayTeamScore < game.HomeTeamScore){
        hScore.className = 'text-center p-4 text-primary'
        hTeam.className = "p-4 font-weight-bold text-primary"
        hTeamHeading.className= "text-primary"
    }
   
    
  
    //background
    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';
  
    //month # to month name
    let monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let month = monthNames[parseInt(game.DateTime.substring(5, 7)) - 1];
    let day = game.DateTime.substring(8, 10);
    let year = game.DateTime.substring(0, 4);
   let date = `${month}. ${day}, ${year}`;

    //header 
    let title = document.createElement('h6');
    title.innerText = date + ': ' + convertName(game.HomeTeam) + '    vs    ' + convertName(game.AwayTeam)
    title.className = 'card-header text-center';

    //container with all the content
    let container = document.createElement('div');
    container.className = 'container p-4';
    
    //CONSTRUCT GRID
    //create row 
    let gridrow = document.createElement('div')
    gridrow.className = 'row';
    container.appendChild(gridrow);

    //create col 1
    let grid = document.createElement('div');
    grid.className ='col-sm';
    grid.appendChild(hTeam); //add the home team to this specific cell
    gridrow.appendChild(grid); //add this cell to the row

    //create col 2
    grid = document.createElement('div');
    grid.className ='col-sm';
    grid.appendChild(hScore);
    gridrow.appendChild(grid);

     //create row 2 
     let gridrow2 = document.createElement('div')
     gridrow2.className = 'row';
     container.appendChild(gridrow2);

    //create col 1
    grid = document.createElement('div');
    grid.className ='col-sm';
    grid.appendChild(aTeam);
    gridrow2.appendChild(grid);
 
     //create col 2
     grid = document.createElement('div');
     grid.className ='col-sm';
     grid.appendChild(aScore);
     gridrow2.appendChild(grid);
     
   
    //add the title and grid(container) to the cardbody
    cardBody.appendChild(title);
    cardBody.appendChild(container);

    //add the cardbody to the card
    card.appendChild(cardBody);
    
    //add card to the whole row
    newRow.appendChild(card);
    
    return newRow;

}

//create pagination
function paginationTwo(gamesArr){
    
    var state = {
        'querySet': gamesArr,
        'page': 1,
        'rows': 10,
        'window': 5,
    }
    
    buildTable()
    
    //grab our data and trim it down
    function pagination(querySet, page, rows) {
    
        var trimStart = (page - 1) * rows
        var trimEnd = trimStart + rows
    
        var trimmedData = querySet.slice(trimStart, trimEnd)
    
        var pages = Math.ceil(querySet.length / rows);
    
        return {
            'querySet': trimmedData,
            'pages': pages,
        }
    }
    
    function pageButtons(pages) {
        var wrapper = document.getElementById('pagination-wrapper')
    
        wrapper.innerHTML = ``
        console.log('Pages:', pages)
    
        var maxLeft = (state.page - Math.floor(state.window / 2))
        var maxRight = (state.page + Math.floor(state.window / 2))
    
        if (maxLeft < 1) {
            maxLeft = 1
            maxRight = state.window
        }
    
        if (maxRight > pages) {
            maxLeft = pages - (state.window - 1)
            
            if (maxLeft < 1){
                maxLeft = 1
            }
            maxRight = pages
        }
        
    
        for (var page = maxLeft; page <= maxRight; page++) {
            wrapper.innerHTML += `<button value=${page} class="page btn btn-sm btn-primary">${page}</button>`
        }
    
        if (state.page != 1) {
            wrapper.innerHTML = `<button value=${1} class="page btn btn-sm btn-primary">&#171; First</button>` + wrapper.innerHTML
        }
    
        if (state.page != pages) {
            wrapper.innerHTML += `<button value=${pages} class="page btn btn-sm btn-primary">Last &#187;</button>`
        }
    
        $('.page').on('click', function() {
            $('#table-body').empty()
    
            state.page = Number($(this).val())
    
            buildTable()
        })
    
    }
    
    
    function buildTable() {
        // var table = $('#table-body')

        const parent = document.getElementById("sections")
        while (parent.firstChild) {
            parent.firstChild.remove()
        }
    
        var data = pagination(state.querySet, state.page, state.rows)
        var myList = data.querySet
     
        for (let i = 0; i < myList.length; i++) {
            let item = myList[i];
            let row = createCardTwo(item);
            document.querySelector('#sections').appendChild(row)
        }
            
        pageButtons(data.pages)
    }
}


function createSchedule() {
    allGames.forEach(game => {
        let row = createCardTwo(game); document.querySelector('#sections').appendChild(row);
        // console.log(game.HomeTeam)

    })

}

function initTeams(){
    allTeams = teams;
}

function initGames(){
    allGames = games; 
}

function storeData() {
    localStorage.setItem('storedTeams', JSON.stringify(allTeams));
  
    console.log("storing");
    localStorage.setItem('storedAllGames', JSON.stringify(allGames));
  }

storeData();
createSchedule();
paginationTwo(allGames);
getStandings().then(data => { teams = data; allTeams = teams; initTeams() });

