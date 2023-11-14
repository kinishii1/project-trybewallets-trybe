import { useSelector } from "react-redux";

function Header() {
  const { email } = useSelector((state: any) => state.user);
  return (
    <>
      <h2 data-testid="email-field">{email}</h2>
      <h2 data-testid="total-field">
        {0}
        <span data-testid="header-currency-field">BRL</span>
      </h2>
    </>
  );
}

export default Header;
