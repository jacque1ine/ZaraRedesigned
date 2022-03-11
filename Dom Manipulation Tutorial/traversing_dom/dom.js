//TRAVERSING THE DOM 

var itemList = document.querySelector('#items'); //ul with id of items
//parentNode 
console.log(itemList.parentNode); //returns div withe the id of main


itemList.parentNode.style.backgroundColor = '#f4f4f4';
console.log(itemList.parentNode.parentNode);