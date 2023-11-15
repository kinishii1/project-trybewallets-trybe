import { SelectProps } from '../Types';

function Select({ name, value, onChange, dataTestId = '', options }: SelectProps) {
  return (
    <select
      name={ name }
      value={ value }
      onChange={ onChange }
      data-testid={ dataTestId }
    >
      {options?.map((option) => (
        <option key={ option.id }>
          {option}
        </option>
      ))}
    </select>
  );
}

export default Select;
