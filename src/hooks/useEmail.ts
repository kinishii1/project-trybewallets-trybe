import { useSelector } from 'react-redux';
import { RootState } from '../Types';

const useEmail = () => {
  const { email } = useSelector((state: RootState) => state.user);
  return email;
};

export default useEmail;
