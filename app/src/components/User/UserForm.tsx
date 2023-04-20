import React, { useState } from "react";
import User from "../../types/User";

interface FormProps {
  onSubmit: (formData: FormData) => void;
  user?: User | null;
}

interface FormData {
  name: string;
  email: string;
}

const UserForm = ({ onSubmit, user = null }: FormProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
  });
  if (user) {
    setFormData({
      name: user.name? user.name.toString() : '',
      email: user? user.email.toString() : '',
    });
  }
  console.log(formData);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(formData);
    setFormData({ name: "", email: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nom :
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      
      <label>
        Email :
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Envoyer</button>
    </form>
  );
}

export default UserForm;