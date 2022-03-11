
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
let currentWeek = 1; 
let sWeek = 1;


// function convertName(nTeam){
//     let Tname = ' ';
// allTeams.forEach(team => {
    
//     if(team.Team === nTeam){
//         Tname =  team.Name
        
//     }
// })

// return Tname;
// }

// function changeWeek(week){
    
//     games.forEach(game => {
//         let section = document.getElementById('sections');
//         let cards = document.getElementById('card');
//         section.removeChild(cards);
        
//     });
   
    
//     currentWeek = week;
//     console.log(currentWeek);
//     createSchedule();
// }


function getInput(){

    const parent = document.getElementById("sections")
    while (parent.firstChild) {
        parent.firstChild.remove()
    }

    let intialDate =  document.querySelector('#dateFrom').value;
    let endDate = document.querySelector('#dateTo').value;

    console.log(intialDate)
    console.log(endDate)

    allGames.forEach(game => {
        if ( new Date(game.DateTime) >= new Date(intialDate) &&  new Date(game.DateTime) <= new Date(endDate)){
            console.log(game.DateTime)
            let row = createCard(game); document.querySelector('#sections').appendChild(row);

        }
    })


    }

    function changeGames(team){
        
         const parent = document.getElementById("sections")
    while (parent.firstChild) {
        parent.firstChild.remove()
    }


        allGames.forEach(game => {
            if (game.HomeTeam === team || game.AwayTeam === team){
                let row = createCard(game); document.querySelector('#sections').appendChild(row);
    
            }
        })
      }
      



// function getTime(){

    
        
        
//     })
// }



getInput();

console.log(document.getElementById("sections"))

// function findNearestDate(){

// }


function createCard(game) {
    console.log("RUNNING");
    let newRow = document.createElement('tr');
    newRow.setAttribute('id', 'card');

    let card = document.createElement('div');
    card.className = 'card text-dark bg-white mb-3';

    let score = document.createElement('h1');
    score.innerText =  game.HomeTeamScore + "  -  " + game.AwayTeamScore ;
    score.className = 'card-title text-center pt-lg-5 '

    let hTeam = document.createElement('div')
    hTeam.className = "card float-left d-inline p-2 font-weight-bold"
    let tbody = document.createElement('div')
    tbody.className = 'card-body';
    tbody.innerText = game.HomeTeam;

    hTeam.appendChild(tbody);

    let aTeam = document.createElement('div')
    aTeam.className = "card float-right p-2 font-weight-bold"
    
    tbody = document.createElement('div')

    tbody.className = 'card-body';
    tbody.innerText = game.AwayTeam;
    aTeam.appendChild(tbody);

    //background
    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';
  

    let monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let month = monthNames[parseInt(game.Day.substring(5, 7)) - 1];
    let day = game.Day.substring(8, 10);
    let year = game.Day.substring(0, 4);
   let date = `${month}. ${day}, ${year}`;
 

    let title = document.createElement('h6');
    title.innerText = date + ': ' + game.HomeTeam + ' (Home)    vs    ' + game.AwayTeam + " (Away)";
    title.className = 'card-header';

    let container = document.createElement('div');
    container.className = 'container p-4';
   
    let gridrow = document.createElement('div')
    gridrow.className = 'row';
    container.appendChild(gridrow);

    let grid = document.createElement('div');
    grid.className ='col-sm';
    grid.appendChild(hTeam);
    gridrow.appendChild(grid);
    grid = document.createElement('div');
    grid.className ='col-sm';
    grid.appendChild(score);
    gridrow.appendChild(grid);
    grid = document.createElement('div');
    grid.className ='col-sm';
    grid.appendChild(aTeam);
    gridrow.appendChild(grid);
    

    cardBody.appendChild(title);
    cardBody.appendChild(container);
    card.appendChild(cardBody);
    newRow.appendChild(card);
    
    return newRow;

}

// createCard(allGamesString)

// function pagination(){

//    let btn = document.createElement('button');
//    btn.innerText = '<';
//    btn.id = 'front';
//    btn.onclick = function(){
//     let section =  document.querySelector('#btnGroup');
//     section.removeChild(document.getElementById('front'));
//     section.removeChild(document.getElementById('end'));
//     for(i = 0; i<10; i++){
//         section.removeChild(document.getElementById('btn' +( sWeek+i)))
//     }
//        if(sWeek > 1)
//        sWeek--

//        pagination();
//    }
//    btn.className = 'btn btn-primary m-1'
//    document.querySelector('#btnGroup').appendChild(btn);

 

//     for(i=sWeek; i<=(sWeek+9); i++){
//         let btn = document.createElement('button');
//         btn.innerText = 'Week ' + i;
//         btn.id = 'btn' + i;
//         btn.className = 'btn btn-primary m-1'
      
//         document.querySelector('#btnGroup').appendChild(btn);
        
//     }

//     btn = document.createElement('button');
//     btn.innerText = '>';
//     btn.id = 'end';
//     btn.onclick = function(){
        

//         let section =  document.querySelector('#btnGroup');
//         section.removeChild(document.getElementById('front'));
//         section.removeChild(document.getElementById('end'));
//         for(i = 0; i<10; i++){
//             section.removeChild(document.getElementById('btn' +( sWeek+i)))
//         }

//        if(sWeek <8)
//         sWeek++

        
//         pagination();
//     }
//     btn.className = 'btn btn-primary m-1'
//     document.querySelector('#btnGroup').appendChild(btn);


//     document.getElementById('btn' + sWeek).onclick = function(){changeWeek(sWeek)};
//     document.getElementById('btn' + (sWeek+1)).onclick = function(){changeWeek(sWeek+1)};
//     document.getElementById('btn' + (sWeek+2 )).onclick = function(){changeWeek(sWeek+2)};
//     document.getElementById('btn' + (sWeek+3 )).onclick = function(){changeWeek(sWeek+3)};
//     document.getElementById('btn' + (sWeek+4 )).onclick = function(){changeWeek(sWeek+4)};
//     document.getElementById('btn' + (sWeek+5 )).onclick = function(){changeWeek(sWeek+5)};
//     document.getElementById('btn' + (sWeek+6 )).onclick = function(){changeWeek(sWeek+6)};
//     document.getElementById('btn' + (sWeek+7 )).onclick = function(){changeWeek(sWeek+7)};
//     document.getElementById('btn' + (sWeek+8 )).onclick = function(){changeWeek(sWeek+8)};
//     document.getElementById('btn' + (sWeek+9 )).onclick = function(){changeWeek(sWeek+9)}
    
// }

// game.Day.substring(5,9)

// function gfg_Run() {
//     D_1 = Date_1.split("/");
//     D_2 = Date_2.split("/");
//     D_3 = Date_to_check.split("/");
    
//     var d1 = new Date(D_1[2], parseInt(D_1[1]) - 1, D_1[0]);
//     var d2 = new Date(D_2[2], parseInt(D_2[1]) - 1, D_2[0]);
//     var d3 = new Date(D_3[2], parseInt(D_3[1]) - 1, D_3[0]);
    
//     if (d3 > d1 && d3 < d2) {
//         el_down.innerHTML = "Date is in between the "
//                             + "Date 1 and Date 2";
//     } else {
//         el_down.innerHTML = "Date is not in between "
//                             + "the Date 1 and Date 2";
//     }
// }

function createSchedule() {
    allGames.forEach(game => {
        let row = createCard(game); document.querySelector('#sections').appendChild(row);
        // console.log(game.HomeTeam)

    })

}





function initTeams(){
    allTeams = teams;
}

function initGames(){
    allGames = games; 
}

createSchedule();
// pagination();
getStandings().then(data => { teams = data; allTeams = teams; initTeams() });

// console.log(allGames)