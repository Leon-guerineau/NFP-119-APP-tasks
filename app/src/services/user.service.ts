import User from '../types/User';

const getUsers = async () => {

    try {
        const response = await fetch('http://localhost:8080/users');
        const users = await response.json();

        return users;
    } catch (error) {
        console.log(error) // TODO : handle error
    }
}

const createUser = async (user: User) => {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    };
    try {
        const response = await fetch('http://localhost:8080/users', requestOptions);
        return await response.json();
    } catch (error) {
        console.log(error) // TODO : handle error
    }
}

const getUser = async (userId: any) => {
    try {
        const response = await fetch('http://localhost:8080/users/'+ userId);
        return await response.json();
    } catch (error) {
        console.log(error) // TODO : handle error
    }
}

const updateUser = async (user: User): Promise<any> => {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    };
    try {
        const response: Response = await fetch('http://localhost:8080/users'+ user._id, requestOptions);
        return await response.json();
    } catch (error) {
        console.log(error) // TODO : handle error
    }
}

const deleteUser = async (user: User): Promise<void> =>
{
    try {
        await fetch('http://localhost:8080/users/' + user._id, {method: 'DELETE'});
    } catch (error) {
        console.log(error) // TODO : handle error
    }
}
export {getUsers, createUser, getUser, updateUser, deleteUser};