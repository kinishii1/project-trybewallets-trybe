type SelectProps = {
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  dataTestId?: string;
  options: any[];
};

function Select({ name, value, onChange, dataTestId = '', options }: SelectProps) {
  return (
    <select
      name={ name }
      value={ value }
      onChange={ onChange }
      data-testid={ dataTestId }
    >
      {options.map((option) => (
        <option key={ option.id }>
          {option}
        </option>
      ))}
    </select>
  );
}

export default Select;
