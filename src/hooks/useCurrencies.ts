import { useSelector } from 'react-redux';
import { RootState } from '../Types';

const useCurrencies = () => {
  const currencies = useSelector((state: RootState) => state.wallet.currencies);
  return currencies;
};

export default useCurrencies;
