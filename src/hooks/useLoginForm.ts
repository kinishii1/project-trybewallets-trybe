import { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/actions';

type LoginFormState = {
  email: string;
  password: string;
};

const initialState = {
  email: '',
  password: '',
};

const useLoginForm = () => {
  const [loginState, setloginState] = useState<LoginFormState>(initialState);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setloginState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate('/carteira');
    dispatch(login(loginState.email));
  };
  return { loginState, handleChange, handleSubmit };
};

export default useLoginForm;
