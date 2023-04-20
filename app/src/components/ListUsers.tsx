import { FC, useState, useEffect } from 'react';
import User from "../types/User";
import { getUsers, addUser } from '../services/user.service';
import Modal from './Modal';
import UserForm from './UserForm';
import {IoEyeSharp, IoAddCircle} from 'react-icons/io5';
interface ListUserProps {
  title: string;
}

const ListUsers: FC<ListUserProps> = ({ title }: ListUserProps) => {
  const [users, setUsers] = useState<User[] | null>([]);
  const onclick = () => { alert('click button') };
  const [isOpenForm, setOpenForm] = useState(false);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {

    const getData = async () => {

      const users: User[] = await getUsers();
      console.log(users);
      setUsers(users);
    }
    getData();
  }, [refresh]);


  const sendNewUser = (formData: any) => {
    setOpenForm(false);
    const add = async (userAdd : User)=>{
      const user = await addUser(userAdd);
      setRefresh(refresh+1);
    }

    add(formData);

  }

  return (
    <div>
      <h3>{title}</h3>

      <div>
        <button onClick={() => setOpenForm(true)}>Ajouter un utilisateur</button>
        <Modal
          isOpen={isOpenForm}
          onClose={() => setOpenForm(false)}
          title="Enregistrer un utilisateur"
          content={<UserForm onSubmit={sendNewUser} />}
        />

      </div>
      <table className='center'>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prenom</th>
            <th>Gestion des tâches</th>
          </tr>

        </thead>
        <tbody>
          {users?.map((val, key) => {
            return (
              <tr key={key}>
                <td>{val.name}</td>
                <td>{val.email}</td>
                <td><button className='iconButton'><IoEyeSharp /></button><button className='iconButton'><IoAddCircle /></button></td>

              </tr>
            )
          })}
        </tbody>
      </table>

    </div>



  )
}

export default ListUsers