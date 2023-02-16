import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Testando pagina Login', () => {
  
  it('teste da rota /', async() => {
    const initialState = {
      player: { 
        email: 'grupo19@trybe.com',
        name: 'test'
     },
     game: {},
     configs: {},
     ranking: {},
     feedback: {},
    };
    const { history } = renderWithRouterAndRedux(<App />, initialState  );
    const inputEmail = screen.getByTestId('input-gravatar-email');
    expect(inputEmail).toBeInTheDocument();
    userEvent.type(inputEmail, 'grupo19@trybe.com');
    const inputName = screen.getByTestId('input-player-name');
    expect(inputName).toBeInTheDocument();
    userEvent.type(inputName, 'test');
    const playButton = screen.getByTestId('btn-play');
    expect(playButton).toBeInTheDocument();
    userEvent.click(playButton);
    // act(() => {
    //   history.push('/game');
    // });
    await waitFor(() => {
      expect(screen.getByText('Tela do Jogo')).toBeInTheDocument();
    }) 
    expect(history.location.pathname).toBe('/game')
});
it('teste botão de configuração', () => {
  const initialState = {
    player: { 
      email: 'grupo19@trybe.com',
      name: 'test'
   },
   game: {},
   configs: {},
   ranking: {},
   feedback: {},
  };
  const { history } = renderWithRouterAndRedux(<App />, initialState  );
  const settingsButton = screen.getByTestId('btn-settings');
  expect(settingsButton).toBeInTheDocument();
  userEvent.click(settingsButton);
  // act(() => {
  //   history.push('/settings');
  // });
  expect(history.location.pathname).toBe('/settings')
});
});