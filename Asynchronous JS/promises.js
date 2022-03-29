// function getPosts() {
//     fetch('http://jsonplaceholder.typicode.com/posts').then(res => res.json()).then(
//         (post) =>{
//             let output = '';

//             post.forEach(p =>{

//             })
//         }
//     )

// }

// async function getPosts(){
//     try{ 
//         const response = await fetch('http://jsonplaceholder.typicode.com/posts');
//         //wait for fetch to finish before moving on to next line
//         const posts = response.json(); 

//         let output = ''; 
        
//         posts.forEach(p => {
//             output += `<lil>${p.title}</li>`

//         }); 

//         document.getElementById('test').innerHTML = output; 
//     } catch (err) {
//         console.log(err); 

//     } 

// }

// getPosts();

function testPromise(){
    return new Promise((resolve, reject) => {
        const error = false; 
        if (!error){
            resolve(); 
        } else {
            reject('This is an error.');
        }
    })
}

