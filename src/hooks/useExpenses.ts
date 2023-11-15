import { useSelector } from 'react-redux';
import { RootState } from '../Types';

const useExpenses = () => {
  const { expenses } = useSelector((state: RootState) => state.wallet);
  return expenses;
};

export default useExpenses;
