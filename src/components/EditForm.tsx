import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { editExpense } from '../redux/actions';
import getRateExchange from '../service/getRateExchange';
import { RootState } from '../Types';
import { methodOptions, tagOptions } from '../data/data';

const initialState = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  exchangeRates: {},
};

function EditForm() {
  const dispatch: ThunkDispatch<object, unknown, AnyAction> = useDispatch();
  const currencies = useSelector((state: RootState) => state.wallet.currencies);
  const [formState, setFormState] = useState(initialState);
  console.log('[getState - wallet.currencies]', currencies);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };
  console.log('[changeHandler]', formState);

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const exchangeRates = await getRateExchange();
    console.log('[getRateExchange]', exchangeRates);
    dispatch(editExpense({ ...formState, exchangeRates }));
    setFormState(initialState);
  };
  return (
    <form onSubmit={ submitHandler }>
      <input
        type="number"
        data-testid="value-input"
        placeholder="editar valor da despesa"
        name="value"
        value={ formState.value }
        onChange={ changeHandler }
      />
      <input
        type="text"
        value={ formState.description }
        name="description"
        data-testid="description-input"
        placeholder="editar descrição da despesa"
        onChange={ changeHandler }
      />
      <select
        name="currency"
        data-testid="currency-input"
        onChange={ (e) => setFormState({ ...formState, currency: e.target.value }) }
        value={ formState.currency }
      >
        {currencies.map((currency, index) => (
          <option key={ index }>{currency}</option>
        ))}
      </select>
      <select
        name="method"
        data-testid="method-input"
        onChange={ (e) => setFormState({ ...formState, method: e.target.value }) }
        value={ formState.method }
      >
        {methodOptions.map((method, index) => (
          <option key={ index }>{method}</option>
        ))}
      </select>
      <select
        name="tag"
        data-testid="tag-input"
        onChange={ (e) => setFormState({ ...formState, tag: e.target.value }) }
        value={ formState.tag }
      >
        {tagOptions.map((tag, index) => (
          <option key={ index }>{tag}</option>
        ))}
      </select>
      <button type="submit">Editar despesa</button>
    </form>
  );
}

export default EditForm;
