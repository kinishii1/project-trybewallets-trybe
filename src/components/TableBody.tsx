import { useDispatch } from 'react-redux';
import useExpenses from '../hooks/useExpenses';
import { toFixedTwo } from '../helpers';
import { deleteExpense, setEditing } from '../redux/actions';

function TableBody() {
  const dispatch = useDispatch();
  const expenses = useExpenses();

  console.log('[useExpenses]', expenses);

  const handleDelete = (id: number) => {
    console.log('[handleDelete]', id);
    dispatch(deleteExpense(id));
  };
  const openEditForm = (id: string) => {
    console.log('[openEditForm]', id);
    dispatch(setEditing(true, id));
  };
  return (
    <tbody>
      {expenses.map((expense: any) => (
        <tr key={ expense.id }>
          <td>{expense.description}</td>
          <td>{expense.tag}</td>
          <td>{expense.method}</td>
          <td>{toFixedTwo(expense.value)}</td>
          <td>{expense.exchangeRates[expense.currency].name}</td>
          <td>
            {toFixedTwo(expense.exchangeRates[expense.currency].ask)}
          </td>
          <td>
            {toFixedTwo(expense.value * expense.exchangeRates[expense.currency].ask)}
          </td>
          <td>Real</td>
          <td>
            <button
              data-testid="edit-btn"
              onClick={ () => {
                openEditForm(expense.id);
              } }
            >
              Editar
            </button>
            <button
              data-testid="delete-btn"
              onClick={ () => {
                handleDelete(expense.id);
              } }
            >
              Excluir
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;
