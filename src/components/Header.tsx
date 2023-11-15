import useEmail from '../hooks/useEmail';
import useTotalExpense from '../hooks/useTotalExpense';

function Header() {
  // const { email } = useSelector((state: any) => state.user);

  // const totalExpenses = useSelector((state) => state.wallet.expenses);
  // const totalValue = totalExpenses.reduce((acc, expense) => {
  //   const currencyAsk = expense.exchangeRates?.[expense.currency]?.ask;
  //   return acc + Number(expense.value) * Number(currencyAsk);
  // }, 0);

  const email = useEmail();
  console.log('[useEmail]', email);

  const totalValue = useTotalExpense();
  console.log('[useTotalExpense]', email);

  return (
    <>
      <h2 data-testid="email-field">{email}</h2>
      <h2 data-testid="total-field">{ totalValue }</h2>
      <h2 data-testid="header-currency-field">BRL</h2>
    </>
  );
}

export default Header;
