// game Class: Represents a game
class Game {
    constructor(hTeam, aTeam, hScore, aScore, dateStr, ) {
        this.gameID = gameID;
        this.dateStr = dateStr;
    
        this.hTeam = hTeam; 
      this.aTeam = aTeam; 
      this.hScore = hScore; 
      this.aScore = aScore;
      
    }
  }
  
  // UI Class: Handle UI Tasks
  class UI {
    static displayGame() {
      const games = Store.getGame();
  
      games.forEach((game) => UI.addgameToList(game));
    }
  
    static addGameToList(game) {
      const list = document.querySelector('#game-list');
  
      const row = document.createElement('tr');
  
      row.innerHTML = `
        <td>${game.hTeam}</td>
        <td>${game.aTeam}</td>
        <td>${game.hScore}</td>
        <td>${game.aScore}</td>
        <td>${game.dateStr}</td>
       
       
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
      `;
  
      list.appendChild(row);
    }
  
    static deleteGame(el) {
      if(el.classList.contains('delete')) {
        el.parentElement.parentElement.remove();
      }
    }
  
    static showAlert(message, className) {
      const div = document.createElement('div');
      div.className = `alert alert-${className}`;
      div.appendChild(document.createTextNode(message));
      const container = document.querySelector('.container');
      const form = document.querySelector('#game-form');
      container.insertBefore(div, form);
  
      // Vanish in 3 seconds
      setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
  
    static clearFields() {
      document.querySelector('#day').value = '';
      document.querySelector('#week').value = '';
      document.querySelector('#date').value = '';
      document.querySelector('#homeTeam').value = '';
      document.querySelector('#awayTeam').value = '';
      document.querySelector('#homeScore').value = '';
      document.querySelector('#awayScore').value = '';


    // $function () {
    //     $('#my').prop('selected', function() {
    //         return this.defaultSelected;
    //     });


    }
  }

  
//Parse class: parses date to get the month 

function parse(game){
  let month = game.Day.substring(5,7); 
  
  switch (new Date().getDay()) {
    case 1:
      day = "Jan";
      break;
    case 2:
      day = "Feb";
      break;
    case 3:
       day = "March";
      break;
    case 4:
      day = "April";
      break;
    case 5:
      day = "May";
      break;
    case 6:
      day = "June";
      break;
    case 7:
      day = "July";
      break;
    case 8:
      day = "August";
      break;
    case 9:
      day = "Sept";
      break;
    case 10:
      day = "Oct";
      break;
    case 11:
      day = "Nov";
      break;
    case 12:
        day = "Dec";
        break;
  }

  localStorage.setItem(game, month); 

}



  // Store Class: Handles Storage
  class Store {
    static getGames() {
      let games;
      if(localStorage.getItem('games') === null) {
        games = [];
      } else {
        games = JSON.parse(localStorage.getItem('games'));
      }
  
      return games;
    }
  
    static addgame(game) {
      const games = Store.getgames();
      games.push(game);
      localStorage.setItem('games', JSON.stringify(games));
    }
  
    // static removegame(gameID) {
    //   const games = Store.getgames();
  
    //   games.forEach((game, index) => {
    //     if(game.gameID === gameID) {
    //       games.splice(index, 1);
    //     }
    //   });
  
    //   localStorage.setItem('games', JSON.stringify(games));
    // }
  }
  
  // Event: Display games
  document.addEventListener('DOMContentLoaded', UI.displaygames);
  
  // Event: Add a game
  document.querySelector('#game-form').addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();
  
    // Get form values
    const date = document.querySelector('#date').value;
    const hTeam = document.querySelector('#homeTeam').value;
    const aTeam = document.querySelector('#awayTeam').value;
    const hScore = document.querySelector('#aScore').value;
    const aScore = document.querySelector('#hScore').value;
    
    //TODO: ADD VALUES FROM THE DROPDOWN MENU
  
    // Validate
    if(hTeam === '' || aTeam === '' || hScore === '' ||
    aScore === '' || date ==='') {
      UI.showAlert('Please fill in all fields', 'danger');
    } else {
      // Instatiate game
      const game = new game(title, author, isbn);
  
      // Add game to UI
      UI.addgameToList(game);
  
      // Add game to store
      Store.addgame(game);
  
      // Show success message
      UI.showAlert('game Added', 'success');
  
      // Clear fields
      UI.clearFields();
    }
  });
  
  // Event: Remove a game
  document.querySelector('#game-list').addEventListener('click', (e) => {
    // Remove game from UI
    UI.deletegame(e.target);
  
    // Remove game from store
    Store.removegame(e.target.parentElement.previousElementSibling.textContent);
  
    // Show success message
    UI.showAlert('game Removed', 'success');
  });