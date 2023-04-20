
import User from '../types/User';

export const getUsers = async ()=>{
   
    try {
    const response = await fetch('http://localhost:8080/users');
    const users = await response.json();

    return users;
    }  catch (error) {
        console.log(error) // TODO : handle error
    } 
}

export const addUser = async (user : User)=>{
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    try {
        const response =  await fetch('http://localhost:8080/users', requestOptions);
        const userSave = await response.json();
        return userSave;
    } catch(error) {
        console.log(error) // TODO : handle error
    }
}

export const deleteUser = async (user: User) => {
    try {
        await fetch('http://localhost:8080/users/' + user._id, {method: 'DELETE'});
    } catch (error) {
        console.log(error) // TODO : handle error
    }
}