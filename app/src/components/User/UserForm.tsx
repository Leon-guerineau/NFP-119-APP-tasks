import React, {useState} from "react";
import User from "../../types/User";

interface FormProps {
    onSubmit: (formData: FormData) => void;
    user?: User | null;
}

interface FormData {
    _id: string;
    name: string;
    email: string;
}

const UserForm = ({onSubmit, user}: FormProps) => {
    const [formData, setFormData] = useState<FormData>({
        _id: user ? user._id.toString() : '',
        name: user && user.name ? user.name.toString() : '',
        email: user ? user.email.toString() : '',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData((prevFormData) => ({...prevFormData, [name]: value}));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(formData);
        setFormData({_id: "", name: "", email: ""});
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="hidden" name="_id" value={formData._id}/>

            <label>
                Nom :
                <input type="text" name="name" value={formData.name} onChange={handleChange}/>
            </label>

            <label>
                Email :
                <input type="email" name="email" value={formData.email} onChange={handleChange}/>
            </label>

            <button type="submit">Envoyer</button>
        </form>
    );
}

export default UserForm;