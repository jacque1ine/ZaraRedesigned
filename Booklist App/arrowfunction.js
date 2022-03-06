function sum(a,b){
    return a+b;
}

//arrow version 
let sum2 = (a,b) => {
    return a+b;
}

//one line return
let sum3 = (a,b) => a+b;


function isPostive(num){
    return num>=0;

}

let isPostive= num => num>=0;


let randNum2 =() => Math.random;

document.addEventListener('click', function(){
    console.log('Click')
})


document.addEventListener('click', () => console.log('Click'));