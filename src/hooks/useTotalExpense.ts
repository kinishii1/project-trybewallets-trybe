import { useSelector } from 'react-redux';

const useTotalExpense = () => {
  const totalExpenses = useSelector((state: any) => state.wallet.expenses);
  const totalValue = totalExpenses.reduce((acc: number, expense: any) => {
    const currencyAsk = expense.exchangeRates?.[expense.currency]?.ask;
    return acc + Number(expense.value) * Number(currencyAsk);
  }, 0);
  return totalValue.toFixed(2);
};

export default useTotalExpense;
