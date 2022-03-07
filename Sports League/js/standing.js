//



// class Team{
//    constructor(szn, sznType, ID, key, city, name, conference, division, wins, losses, percentage, confWins, confLosses, divWins, divLosses, ){
      
//    }
// }

let companies = getStandings();
let isCategorySort = false;
let categorySortDir = 'none';


// const btn = document.querySelector('button');
// btn.addEventListener('click', createTable);

function createTable() {
   const tbody = document.querySelector('tbody');
   tbody.innerHTML = '';

   companies.forEach(company => {
      const row = document.createElement('tr');
      tbody.appendChild(row);
      for (let key in company) {
         const cell = document.createElement('td');
         cell.textContent = company[key];
         row.appendChild(cell);
      }
   });
}

createTable();

const sort = (evt) => {
   let sortField = evt.currentTarget.id;
   console.log(1);
   if (categorySortDir !== 'asc') {
      categorySortDir = 'asc';
      companies = masterList.sort((a, b) => {
         return (a[sortField] > b[sortField]) ? 1 : (a[sortField] === b[sortField] ? 0 : -1);
      });
   } else {
      categorySortDir = 'desc';
      companies = masterList.sort((a, b) => {
         return (a[sortField] < b[sortField]) ? 1 : (a[sortField] === b[sortField] ? 0 : -1);
      });
   }

   createTable();
}

const search = document.querySelector('#search');

const filter = () => {

   let val = search.value;
   companies = masterList.filter(company =>
      company['category'].indexOf(val) >= 0 || company['name'].indexOf(val) >= 0
   );
   createTable();
}
search.addEventListener('keyup', filter);


document.querySelectorAll('th').forEach((th) => th.addEventListener('click', sort));



