import React from 'react';
import { useDispatch } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { editExpense } from '../redux/actions';
import getRateExchange from '../service/getRateExchangeApi';
import { methodOptions, tagOptions } from '../data/data';
import useFormState from '../hooks/useFormState';
import useCurrencies from '../hooks/useCurrencies';
import Select from './Select';

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
  const currencies = useCurrencies();
  const { formState, setFormState, changeHandler } = useFormState(initialState);
  console.log('[getState - wallet.currencies]', currencies);

  // const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = event.target;
  //   setFormState({ ...formState, [name]: value });
  // };
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
      <Select
        name="currency"
        value={ formState.currency }
        onChange={ (e) => setFormState({ ...formState, currency: e.target.value }) }
        options={ currencies }
        dataTestId="currency-input"
      />
      <Select
        name="method"
        value={ formState.method }
        onChange={ (e) => setFormState({ ...formState, method: e.target.value }) }
        options={ methodOptions }
        dataTestId="method-input"
      />
      <Select
        name="tag"
        value={ formState.tag }
        onChange={ (e) => setFormState({ ...formState, tag: e.target.value }) }
        options={ tagOptions }
        dataTestId="tag-input"
      />
      <button type="submit">Editar despesa</button>
    </form>
  );
}

export default EditForm;
