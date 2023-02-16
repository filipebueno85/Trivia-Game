import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { scryRenderedDOMComponentsWithClass } from 'react-dom/test-utils';
import App from '../App';
import { updateAssertions } from '../redux/actions';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Testando página de Feedback', () => {
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

  it('1 - Existe o link para /', () => {
    const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/feedback')
    const restartBtn = screen.getByRole('link', { name: /Play Again/ })
    expect(restartBtn).toBeInTheDocument();
    userEvent.click(restartBtn);
    expect(history.location.pathname).toBe('/');
  })
  it('2 - Existe o link para /ranking', () => {
    const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/feedback')
    const rankingBtn = screen.getByRole('link', { name: /Ranking/ })
    expect(rankingBtn).toBeInTheDocument();
    userEvent.click(rankingBtn);
    expect(history.location.pathname).toBe('/ranking');
  })
  it('3 - Render "Well Done!" de acordo com player.assertions', () => {
    renderWithRouterAndRedux(<App />, {player: {...INITIAL_STATE, assertions: 5,} }, '/feedback')
    const txt = screen.getByText('Well Done!');
    expect(txt).toBeInTheDocument();
  })
  it('4 - Render "Well Done!" se player.assertions for 3', () => {
    renderWithRouterAndRedux(<App />, {player: {...INITIAL_STATE, assertions: 3,} }, '/feedback')
    const txt = screen.getByText('Well Done!');
    expect(txt).toBeInTheDocument();
  })
  it('5 - Render "Could be better..." de acordo com player.assertions', () => {
    renderWithRouterAndRedux(<App />, {player: {...INITIAL_STATE, assertions: 1,}}, '/feedback');
    const txt = screen.getByText('Could be better...');
    expect(txt).toBeInTheDocument(); 
  })
  it('6 - Render do valor correto de acordo com player.score', () => {
    renderWithRouterAndRedux(<App />, {player: {...INITIAL_STATE, score: 1,}}, '/feedback');
    const txt = screen.getByTestId('feedback-total-score');
    expect(txt).toHaveTextContent('1');
  })
})