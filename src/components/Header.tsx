import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTotal } from "../redux/actions";

function Header() {
  const { email } = useSelector((state: any) => state.user);
  const totalExpenses = useSelector((state) => state.wallet.expenses);

  console.log(totalExpenses);

  const totalValue = totalExpenses.reduce((acc, expense) => {
    const currencyAsk = expense.exchangeRates?.[expense.currency]?.ask;
    return acc + Number(expense.value) * Number(currencyAsk);
  }, 0);


  return (
    <>
      <h2 data-testid="email-field">{email}</h2>
      <h2 data-testid="total-field">{ totalValue.toFixed(2) }</h2>
      <h2 data-testid="header-currency-field">BRL</h2>
    </>
  );
}

export default Header;
