import { renderWithRouterAndRedux } from "./helpers/renderWith";
import Wallet from "../pages/Wallet";
import { screen } from "@testing-library/react";
import mockData from "./helpers/mockData";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
const emailState = {
  user: {
    email: "alguem@alguem.com",
  },
};

const walletState = {
  wallet: {
    currencies: [Object.keys(mockData)],
    expenses: [
      {
        id: 1,
        value: 5,
        description: "teste",
        currency: "USD",
        method: "Dinheiro",
        tag: "Alimentação",
        exchangeRates: mockData,
      },
    ],
    total: 0,
  },
};

describe("WalletForm", () => {
  beforeAll(() => {
    vi.spyOn(global, 'fetch').mockResolvedValue({ json: async () => mockData } as Response);
  });
  it("renderiza o email salvo no estado global", () => {
    renderWithRouterAndRedux(<Wallet />, {
      initialEntries: ["/carteira"],
      initialState: emailState,
    });
    const email = screen.getByRole("heading", {
      name: 'alguem@alguem.com',
    });
    expect(email).toBeInTheDocument();
  });
  it("renderiza o Header corretamente", () => {
    renderWithRouterAndRedux(<Wallet />, {
      initialEntries: ["/carteira"],
      initialState: walletState,
    });
    const value = screen.getByRole("heading", {
      name: '23.77',
    });
    const currency = screen.getByRole("heading", {
      name: /BRL/i,
    });
    expect(value).toBeInTheDocument();
    expect(currency).toBeInTheDocument();
  });
  it("é possivel adicionar uma despesa", async () => {
    const { store } = renderWithRouterAndRedux(<Wallet />, {
      initialEntries: ["/carteira"],
      initialState: walletState,
    });
    const valueInput = screen.getByTestId("value-input");
    const descriptionInput = screen.getByTestId("description-input");
    const addButton = screen.getByRole("button", { name: /adicionar despesa/i });
    expect(addButton).toBeInTheDocument();
    await userEvent.type(valueInput, "5");
    await userEvent.type(descriptionInput, "teste");
    expect(addButton).not.toBeDisabled();
    await userEvent.click(addButton);
    const { wallet: { expenses } } = store.getState();
    expect(expenses).toHaveLength(2);
  });
  it("atualiza o valor total corretamente", async () => {
    renderWithRouterAndRedux(<Wallet />, {
      initialEntries: ["/carteira"],
      initialState: walletState,
    });
    const value = screen.getByRole("heading", {
      name: '23.77',
    });
    const valueInput = screen.getByTestId("value-input");
    const addButton = screen.getByRole("button", { name: /adicionar despesa/i });

    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("23.77");
    await userEvent.type(valueInput, "5");
    await userEvent.click(addButton);
    expect(value).toHaveTextContent("47.53");
  });
  it('verifica se o fetch foi chamado', async () => {
    renderWithRouterAndRedux(<Wallet />, {
      initialEntries: ["/carteira"],
      initialState: walletState,
    });
    expect(global.fetch).toBeCalledTimes(3);
    expect(global.fetch).toBeCalledWith('https://economia.awesomeapi.com.br/json/all');
  });
});
