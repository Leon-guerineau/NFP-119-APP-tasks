import {FC, useEffect, useState} from "react";
import ListUsers from '../components/User/ListUsers';
import {useParams} from "react-router";
import {getUser} from "../services/user.service";
import User from "../types/User";

const UserTasks: FC = () => {
    const {userId} = useParams();
    const [user, setUser] = useState<User|null>(null);
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        async function getData() {
            const user: User = await getUser(userId);
            setUser(user);
        }
        getData();
    }, [refresh]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Tâches de : {user.email}</h2>
            <ListUsers/>
        </div>
    )
}

export default UserTasks;