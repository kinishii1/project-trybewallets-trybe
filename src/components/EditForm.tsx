import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { editExpense } from "../redux/actions";
import getRateExchange from "../service/getRateExchange";

function EditForm() {
  const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();
  const currencies = useSelector((state) => state.wallet.currencies);
  console.log(currencies);
  const [formState, setFormState] = useState({
    value: "",
    description: "",
    currency: "USD",
    method: "Dinheiro",
    tag: "Alimentação",
    exchangeRates: {},
  });
  const methodOptions = ["Dinheiro", "Cartão de crédito", "Cartão de débito"];
  const tagOptions = [
    "Alimentação",
    "Lazer",
    "Trabalho",
    "Transporte",
    "Saúde",
  ];

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };
  console.log(formState);
  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const exchangeRates = await getRateExchange();
    console.log(exchangeRates);
    dispatch(editExpense({ ...formState, exchangeRates }));
    setFormState({
      ...formState,
      value: "",
      description: "",
      currency: "USD",
      method: "Dinheiro",
      tag: "Alimentação",
    });
    // dispatch(getTotal())
  };
  return (
    <form onSubmit={submitHandler}>
      <input
        type="number"
        data-testid="value-input"
        placeholder="adicionar valor da despesa"
        name="value"
        value={formState.value}
        onChange={changeHandler}
      />
      <input
        type="text"
        value={formState.description}
        name="description"
        data-testid="description-input"
        placeholder="descrição da despesa"
        onChange={changeHandler}
      />
      <select
        name="currency"
        data-testid="currency-input"
        onChange={changeHandler}
        value={formState.currency}
      >
        {currencies.map((currency, index) => (
          <option key={index}>{currency}</option>
        ))}
      </select>
      <select
        name="method"
        data-testid="method-input"
        onChange={changeHandler}
        value={formState.method}
      >
        {methodOptions.map((method, index) => (
          <option key={index}>{method}</option>
        ))}
      </select>
      <select
        name="tag"
        data-testid="tag-input"
        onChange={changeHandler}
        value={formState.tag}
      >
        {tagOptions.map((tag, index) => (
          <option key={index}>{tag}</option>
        ))}
      </select>
      <button type="submit">Editar despesa</button>
    </form>
  );
}

export default EditForm;
