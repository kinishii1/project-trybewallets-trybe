import { useSelector } from 'react-redux';
import { RootState } from '../Types';

const useCurrencies = () => {
  const currencies = useSelector((state: RootState) => state.wallet.currencies);
  if (!currencies) throw new Error('Currencies not found');
  return currencies;
};

export default useCurrencies;
