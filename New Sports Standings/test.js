var gamesString = JSON.stringify(gamesBigArr);
// console.log(gamesString);

localStorage.setItem("localGames", gamesString);
console.log(localStorage.getItem("localGames"))