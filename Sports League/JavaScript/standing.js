const masterList = [{
    name: "Company One",
    category: "Finance",
    start: 1981,
    end: 2004
 },
 {
    name: "Company Two",
    category: "Retail",
    start: 1992,
    end: 2008
 },
 {
    name: "Company Three",
    category: "Auto",
    start: 1999,
    end: 2007
 },
 {
    name: "Company Four",
    category: "Retail",
    start: 1989,
    end: 2010
 },
 {
    name: "Company Five",
    category: "Technology",
    start: 2009,
    end: 2014
 },
 {
    name: "Company Six",
    category: "Finance",
    start: 1987,
    end: 2010
 },
 {
    name: "Company Seven",
    category: "Auto",
    start: 1986,
    end: 1996
 },
 {
    name: "Company Eight",
    category: "Technology",
    start: 2011,
    end: 2016
 },
 {
    name: "Company Nine",
    category: "Retail",
    start: 1981,
    end: 1989
 }
 ];

 let companies = masterList; 
 let isCategorySort = false; 
 let categorySortDir = 'none'; 
 
 const btn = document.querySelector('button');
 btn.addEventListener('click', createTable);
 
 function createTable() {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = ''; 
 
 
    companies.forEach(company => {
       const row = document.createElement('tr');
       tbody.appendChild(row);

       //iterate through properties in company 
       for (let key in company) {
          //for each one create a cell
          const cell = document.createElement('td');
          //key is the property, company is the obhect 
          cell.textContent = company[key];
          row.appendChild(cell);
       }
 
    });

   }
 //add event listener to category cell 
 //if we use cury braces we need to return smttn 

   const sortCategory = () => {

      if (categorySortDir !== 'asc'){
         categorySortDir = 'asc'
         companies = masterList.sort((a,b) => {return (a.category > b.category) ? 1 : (a.category === b.category ? 0: -1)});
      }

      else{
         categorySortDir= 'desc'; 
         companies = masterList.sort((a,b) => {return (a.category < b.category) ? 1 : (a.category === b.category ? 0: -1)});

      }
     
      createTable(); 

   }
   const search = document.querySelector('#search'); 



   const filter = () => {
      let val = search.value;
      companies = masterList.filter(companies => 
         company['category'].indexOf(val)>=0 || company['name'].indexOf(val)>=0)

         createTable(); 

   }

   search.addEventListener('keyup', filter); 

   const catHeader = document.querySelector('#category');
   catHeader.addEventListener('click', sortCategory); 

