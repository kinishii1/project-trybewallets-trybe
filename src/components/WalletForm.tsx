import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addExpenses, fetchCurrencies } from '../redux/actions';
import getRateExchange from '../service/getRateExchangeApi';
import { methodOptions, tagOptions } from '../data/data';
import EditForm from './EditForm';
import useEditingStatus from '../hooks/useEditingStatus';
import useCurrencies from '../hooks/useCurrencies';
import useFormState from '../hooks/useFormState';
import Select from './Select';
import { ThunkDispatchType } from '../Types';

const initialState = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  exchangeRates: {},
};

function WalletForm() {
  // eslint-disable-next-line @typescript-eslint/ban-types
  const dispatch: ThunkDispatchType = useDispatch();
  const editing = useEditingStatus();
  console.log('[useEditingStatus]', editing);

  const currencies = useCurrencies();
  console.log('[useCurrencies]', currencies);

  const { formState, setFormState, changeHandler } = useFormState(initialState);
  // const [formState, setFormState] = useState(initialState);

  useEffect(() => {
    if (currencies.length === 0) {
      dispatch(fetchCurrencies());
    }
    console.log('render');
  }, []);

  // const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = event.target;
  //   setFormState({ ...formState, [name]: value });
  // };

  console.log(formState);
  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const exchangeRates = await getRateExchange();
    console.log(exchangeRates);
    dispatch(addExpenses({ ...formState, exchangeRates }));

    setFormState(initialState);
  };

  if (editing) return <EditForm />;

  return (
    <form onSubmit={ submitHandler }>
      <input
        type="number"
        data-testid="value-input"
        placeholder="adicionar valor da despesa"
        name="value"
        value={ formState.value }
        onChange={ changeHandler }
      />
      <input
        type="text"
        value={ formState.description }
        name="description"
        data-testid="description-input"
        placeholder="descrição da despesa"
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
      <button type="submit">Adicionar despesa</button>
    </form>
  );
}

export default WalletForm;
