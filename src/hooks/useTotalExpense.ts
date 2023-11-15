import { useSelector } from 'react-redux';
import { RootState } from '../Types';

const useTotalExpense = () => {
  const totalExpenses = useSelector((state: RootState) => state.wallet.expenses);

  const totalValue = totalExpenses.reduce((acc: number, curr: any) => {
    const { exchangeRates, currency, value } = curr;
    if (!exchangeRates && !currency) return acc;

    const currencyAsk = Number(exchangeRates[currency].ask);

    return acc + Number(value) * currencyAsk;
  }, 0);
  return totalValue.toFixed(2);
};

export default useTotalExpense;
