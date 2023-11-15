import { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/actions';

type LoginFormState = {
  email: string;
  password: string;
};

const useLoginForm = () => {
  const [formState, setFormState] = useState<LoginFormState>({ email: '', password: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate('/carteira');
    dispatch(login(formState.email));
  };
  return { formState, handleChange, handleSubmit };
};

export default useLoginForm;
