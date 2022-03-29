const users = [
    {name: 'Steve Henry', address: '123 Sesame Street'}, 
    {name: 'Jack Harvey', address: '85 Electric Company Road'}
]

function displayUsers(){
    setTimeout(() =>{
        let output = ''; 
    
    users.forEach(u => {
        output += `<li>${u.name}</li>`;
    } )

    document.getElementById('test').innerHTML = output;
    }, 1000);
    
}
function createUser(u){
    setTimeout(()=> {
        users.push(u); 
    },
    1000); 
}




createUser({name: 'Beth Stevenson', address: '85 Sesame Road'}, displayUsers)

displayUsers(); 
