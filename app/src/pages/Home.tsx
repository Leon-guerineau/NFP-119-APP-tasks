import { FC } from "react";
import ListUsers from '../components/User/ListUsers';

interface HomeProps {
    title: string;
}

const Home: FC<HomeProps> = ({ title }: HomeProps) => {
    return (
        <div>
            <h3>{title}</h3>
            <ListUsers/>
        </div>
    )
}

export default Home;