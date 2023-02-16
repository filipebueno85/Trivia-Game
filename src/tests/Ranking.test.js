import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Testes da página de ranking', () => {
  const ranking = [
    {
      name: 'player1',
      score: 68,
      avatar:
        'https://www.gravatar.com/avatar/ce11fce876c93ed5d2a72da660496473',
    },
    {
      name: 'player2',
      score: 204,
      avatar:
        'https://www.gravatar.com/avatar/9c9a28833552756cb36d046ca94d3cc8%22%7D%5D',
    },
    {
      name: 'player3',
      score: 75,
      avatar:
        'https://www.gravatar.com/avatar/9c9a28833552756cb36d046ca94d3cc8%22%7D%5D',
    },
  ];

  const INITIAL_STATE = {
    player: {
      email: 'e@mail.com',
      name: 'John Doe',
      score: 0,
      assertions: 0,
    },
    game: {},
    configs: {},
    ranking: {},
    feedback: {},
  };

  const localStorageMock = (function () {
    let store = {};

    return {
      getItem(key) {
        return store[key];
      },

      setItem(key, value) {
        store[key] = value;
      },

      clear() {
        store = {};
      },

      removeItem(key) {
        delete store[key];
      },

      getAll() {
        return store;
      },
    };
  })();

  Object.defineProperty(window, 'localStorage', { value: localStorageMock });

  const setLocalStorage = (id, data) => {
    window.localStorage.setItem(id, JSON.stringify(data));
  };

  it('1 - Deve existir um botão que direciona para a página inicial', async () => {
    setLocalStorage('ranking', ranking);

    const { history } = renderWithRouterAndRedux(
      <App />,
      INITIAL_STATE,
      '/ranking'
    );
    const homeBtn = screen.getByTestId('btn-go-home');

    await waitFor(() => {
      expect(homeBtn).toBeInTheDocument();
    });

    userEvent.click(homeBtn);
    expect(history.location.pathname).toBe('/');
  });

  it('2 - Os jogadores devem ser exibidos na tela de acordo com sua pontuação, do maior ao menor', () => {

    renderWithRouterAndRedux(<App />, INITIAL_STATE, '/ranking');
    const player1 = screen.getByTestId('player-name-0');
    expect(player1).toBeInTheDocument();

    // primeiro lugar - player2
    // segundo lugar - player 3
    // terceiro lugar - player1 

    const rankingDiv = document.querySelectorAll('div')[3];
    const players = within(rankingDiv).getAllByTestId(/player-name/);

    expect(players[0]).toHaveTextContent('player2');
    expect(players[1]).toHaveTextContent('player3');
    expect(players[2]).toHaveTextContent('player1');
  });
});