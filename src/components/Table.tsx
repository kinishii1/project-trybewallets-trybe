import { useDispatch, useSelector } from "react-redux";
import { deleteExpense, setEditing } from "../redux/actions";

function Table() {
  const { expenses } = useSelector((state) => state.wallet);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteExpense(id));
  };

  const openEditForm = (id) => {
    dispatch(setEditing(true, id));
  };


  return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{Number(expense.value).toFixed(2)}</td>
              <td>{expense.exchangeRates[expense.currency].name}</td>
              <td>
                {Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}
              </td>
              <td>
                {(
                  expense.value * expense.exchangeRates[expense.currency].ask
                ).toFixed(2)}
              </td>
              <td>Real</td>
              <td>
                <button
                  data-testid="edit-btn"
                  onClick={() => {
                    openEditForm(expense.id);
                  }}
                >
                  Editar
                </button>
                <button
                  data-testid="delete-btn"
                  onClick={() => {
                    handleDelete(expense.id);
                  }}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  );
}

export default Table;
