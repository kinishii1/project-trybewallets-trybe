import { useState, ChangeEvent } from 'react';

type FormState = {
  [key: string]: string
};

const useFormState = (initialState: FormState) => {
  const [formState, setFormState] = useState<FormState>(initialState);

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  return { formState, setFormState, changeHandler };
};

export default useFormState;
