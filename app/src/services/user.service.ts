
import User from '../types/User';

const getUsers = async ()=>{
   
    try {
    const response = await fetch('http://localhost:8080/users');
    const users = await response.json();

    return users;
    }  catch (error) {
        // traitement erreur
        console.log(error)
    } 
}

const addUser = async (user : User)=>{
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    try {
        const response =  await fetch('http://localhost:8080/users', requestOptions);
        const userSave = await response.json();
        return userSave;
    } catch(e) {
        console.log(e)
    }

   
}

export {getUsers, addUser}