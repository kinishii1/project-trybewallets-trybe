import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import { walletState } from './helpers/storeDataMocks';

describe('EditForm', () => {
  test('Quando clicar no botao editar abre o formulario de edição', async () => {
    const { store } = renderWithRouterAndRedux(<Wallet />, {
      initialEntries: ['/carteira'],
      initialState: walletState,
    });

    const editButton = screen.getByRole('button', {
      name: 'Editar',
    });
    expect(editButton).toBeInTheDocument();
    const descriptionInfo = screen.getByRole('cell', {
      name: /teste/i,
    });
    expect(descriptionInfo).toBeInTheDocument();
    await userEvent.click(editButton);
    const finishEditButton = screen.getByRole('button', {
      name: /editar despesa/i,
    });

    expect(finishEditButton).toBeInTheDocument();
    const descriptionInput = screen.getByRole('textbox');
    expect(descriptionInput).toBeInTheDocument();
    await userEvent.type(descriptionInput, 'teste 2');
    expect(descriptionInput).toHaveValue('teste 2');
    await userEvent.click(finishEditButton);

    await waitFor(() => expect(descriptionInput).not.toBeInTheDocument());
    expect(finishEditButton).not.toBeInTheDocument();
    const newExpense = store.getState().wallet.expenses[0];
    expect(newExpense.description).toBe('teste 2');
  });
  test('Verificar se todos os campos estão preenchidos corretamente', () => {
    renderWithRouterAndRedux(<Wallet />, {
      initialEntries: ['/carteira'],
      initialState: walletState,
    });

    const descriptionInfo = screen.getByRole('cell', {
      name: /teste/i,
    });

    expect(descriptionInfo).toBeInTheDocument();
    const tagInfo = screen.getByRole('cell', {
      name: /Alimentação/i,
    });

    expect(tagInfo).toBeInTheDocument();
    const methodInfo = screen.getByRole('cell', {
      name: /Dinheiro/i,
    });

    expect(methodInfo).toBeInTheDocument();
    const valueInfo = screen.getByRole('cell', {
      name: '5.00',
    });

    expect(valueInfo).toBeInTheDocument();
    const currencyInfo = screen.getByRole('cell', {
      name: /dólar americano\/real brasileiro/i,
    });

    expect(currencyInfo).toBeInTheDocument();
    const exchangeRateInfo = screen.getByRole('cell', {
      name: /4.75/i,
    });
    expect(exchangeRateInfo).toBeInTheDocument();
  });
  test('verifica se o botao de excluir funciona corretamente', async () => {
    const { store } = renderWithRouterAndRedux(<Wallet />, {
      initialEntries: ['/carteira'],
      initialState: walletState,
    });

    const deleteButton = screen.getByRole('button', {
      name: /excluir/i,
    });
    expect(deleteButton).toBeInTheDocument();

    await userEvent.click(deleteButton);
    const newExpense = store.getState().wallet.expenses;
    expect(newExpense).toHaveLength(0);
  });
  test('verifica se fetch é chamado corretamente', async () => {
    const fetchSpy = vi.spyOn(global, 'fetch');
    renderWithRouterAndRedux(<Wallet />, {
      initialEntries: ['/carteira'],
      initialState: walletState,
    });

    const addButton = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });
    expect(addButton).toBeInTheDocument();

    await userEvent.click(addButton);
    await waitFor(() => expect(fetchSpy).toHaveBeenCalledTimes(1));
    expect(fetchSpy).toHaveBeenCalledWith(
      'https://economia.awesomeapi.com.br/json/all',
    );
  });
  test('verifica se os selects funcionam corretamente', async () => {
    renderWithRouterAndRedux(<Wallet />, {
      initialEntries: ['/carteira'],
      initialState: walletState,
    });

    const tagSelect = screen.getByTestId('tag-input');
    const methodSelect = screen.getByTestId('method-input');
    const currencySelect = screen.getByTestId('currency-input');

    expect(tagSelect).toBeInTheDocument();
    expect(methodSelect).toBeInTheDocument();
    expect(currencySelect).toBeInTheDocument();

    await userEvent.selectOptions(tagSelect, 'Lazer');
    await userEvent.selectOptions(methodSelect, 'Cartão de crédito');
    await userEvent.selectOptions(currencySelect, 'JPY');

    expect(tagSelect).toHaveValue('Lazer');
    expect(methodSelect).toHaveValue('Cartão de crédito');
    expect(currencySelect).toHaveValue('JPY');
  });
});
