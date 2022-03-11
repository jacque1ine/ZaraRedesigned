// // //Examine the document object
// // // console.dir(document);

// // //DOMAIN
// // console.log(document.domain)
// // console.log(document.URL)
// // console.log(document.title)

// // // document.title = 123;

// // console.log(document.doctype);

// // console.log(document.head);
// // console.log(document.all[10])
// // // document.all[10].textContent = "hello"; 

// // console.log(document.forms);
// // console.log(document.forms[0])

// console.log(document.images); 


//GET ELEMENT BY ID 
// var headTitle = document.getElementById('header-title'); 
// console.log(headTitle); 
// headTitle.textContent = "hello"; 
// headTitle.innerText = "goodbye"

// console.log(document.getElementById('header-title'));
// headTitle.innerHTML = '<h3>Hello</h3>'; 



// var header = document.getElementById('main-header');
// header.style.borderBottom ='solid 3px #000'; 

//GET ELEMENTS BY CLASS NAME
//let's say we want to get all the list items
// var items = document.getElementsByClassName('list-group-item'); 
// console.log(items);
// console.log(items[1])
// items[1].textContent = 'Hello 2'; 
// items[2].style.fontWeight = 'bold';
// items[1].style.backgroundColor = 'yellow'; 

// for(var i =0; i< items.length; i++){
//     items[i].style.backgroundColor = '#f4f4f4';

// }

//GET ELEMENTS BY TAG NAME 

// var li = document.getElementsByTagName('li'); 
// console.log(li);
// console.log(li[1])
// li[1].textContent = 'Hello 2'; 
// li[2].style.fontWeight = 'bold';
// li[1].style.backgroundColor = 'yellow'; 

// for(var i =0; i< li.length; i++){
//     li[i].style.backgroundColor = '#f4f4f4';

// }

// //QUERY SELECTOR 

// var header = document.querySelector('#main-header'); 
// header.style.borderBottom = 'solid 4px #ccc'

// var input = document.querySelector('input'); 
// input.value = "Hello World"

// var submit = document.querySelector('input[type="submit"]')
// submit.value = "SEND"

// var item = document.querySelector('.list-group-item'); 
// item.style.color ='red';

// var lastItem = document.querySelector('.list-group-item:last-child'); 
// lastItem.style.color ='blue';

// var secondItem = document.querySelector('.list-group-item:nth-child(2)'); 
// secondItem.style.color ='green';

//QUERYSELECTORALL
//grabs more than one thing 

var titles = document.querySelectorAll('.title')
console.log(titles); //gives node list which we can run array functions on
titles[0].textContent = 'YOYO';

var odd = document.querySelectorAll('li:nth-child(odd)'); 
var even = document.querySelectorAll('li:nth-child(even)'); 

for(var i =0; i < odd.length; i++){
    odd[i].style.backgroundColor = '#f4f4f4';
    even[i].style.backgroundColor = '#ccc';
}




