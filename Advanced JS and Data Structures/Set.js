// //set is a collection that 

// const arr = [1,2,3,4,5,5,2]; 
// console.log(arr); 

// const uniqueVals = new Set(arr); 

// console.log(uniqueVals); 

// const arrNoDups = [...uniqueVals]; 

// console.log(arrNoDups); 

let stuff = new Set(); 
console.log(stuff); 

stuff.add(3); 
stuff.add(5); 
stuff.add('Hello');
stuff.add((a,b)=> a + b);
stuff.add({'prop1': 1, 'prop2': 2, 'prop3': 3});  

console.log(stuff); 

stuff.delete(3); 
console.log(stuff); 
console.log(stuff.size);
console.log(stuff.has(5)); 
console.log(stuff.has(3)); 

stuff.forEach(el=> { console.log(el)});
 



