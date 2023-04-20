import { FC, useState, useEffect } from 'react';
import {IoPencilSharp, IoTrashBinSharp, IoNewspaperSharp} from 'react-icons/io5';
import {getUsers, addUser, deleteUser} from '../services/user.service';
import { confirmAlert } from 'react-confirm-alert';
import User from "../types/User";
import Modal from './Modal';
import UserForm from './UserForm';

const ListUsers: FC = () => {
  const [users, setUsers] = useState<User[] | null>([]);
  const onclick = () => { alert('click button') };
  const [isOpenForm, setOpenForm] = useState(false);
  const [refresh, setRefresh] = useState(0);

  const submit = (user: User) =>
  {
    confirmAlert({
      title: 'Confirm to delete Dependent',
      message: `Are you sure you want to delete ${user?.name}?`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            deleteUser(user);
            setRefresh(refresh+1);
          }
        },
        {
          label: 'No',
          onClick: () =>  null
        }
      ]
    });
  }

  useEffect(() => {
    async function getData()
    {
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
            <th>Mail</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
        {users?.map((val, key) => {
          return (
              <tr key={key}>
                <td>{val.name}</td>
                <td>{val.email}</td>
                <td>
                  <button className='iconButton'>
                    <IoNewspaperSharp/>
                  </button>
                  <button className='iconButton' >
                    <IoPencilSharp/>
                  </button>
                  <button className='iconButton' onClick={() => submit(val)}>
                    <IoTrashBinSharp/>
                  </button>
                </td>
              </tr>
          )
        })}
        </tbody>
      </table>
    </div>
  )
}

export default ListUsers