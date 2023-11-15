import { useSelector } from 'react-redux';
import { RootState } from '../Types';

const useEditingStatus = () => {
  const editing = useSelector((state: RootState) => state.wallet.editing);
  return editing;
};

export default useEditingStatus;
