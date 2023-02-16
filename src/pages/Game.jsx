import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../components/Header';
import Question from '../components/Question';
import Timer from '../components/Timer';
import * as Actions from '../redux/actions';
import { apiRequestQuestions } from '../services/api';
import { getHashFromLocalStorage } from '../services/gravatar';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      currQuestion: 0,
      // timer,
      hasBeenAnswered: false,
      answered: false,
    };
  }

  async componentDidMount() {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    if (!token) {
      history.push('/');
    }
    const response = await apiRequestQuestions(token);
    const questions = response.results;

    if (questions.length < 1) {
      localStorage.removeItem('token');
      history.push('/');
    }

    this.setState({ questions });
  }

  createNextBtn = () => {
    const { hasBeenAnswered, answered } = this.state;

    if (!hasBeenAnswered) {
      this.setState({ hasBeenAnswered: true });
    }
    if (!answered) {
      this.setState({ answered: true });
    }
  };

  nextQuestion = () => {
    const { currQuestion } = this.state;
    const { history } = this.props;
    const maxquestions = 4;
    if (currQuestion <= maxquestions) {
      this.setState((prevState) => (
        { currQuestion: prevState.currQuestion + 1,
          answered: false }));
    }

    if (currQuestion === maxquestions) {
      const { name, score, updateRanking } = this.props;
      updateRanking({
        name,
        score,
        avatar: getHashFromLocalStorage(),
      });
      history.push('/feedback');
    }
  };

  changeAnswered = () => {
    const { answered } = this.state;
    this.setState({
      answered: !answered,
    });
  };

  // sendToFeedback = () => {
  //   const { currQuestion } = this.state;

  //   if (currQuestion === maxquestions) {

  //   }
  // }

  render() {
    const { questions, currQuestion, answered, hasBeenAnswered } = this.state;

    return (
      <div className="game-container">
        {console.log(questions.length)}
        <Header />
        <h1 className="header-game">
          <span className="trivia-title-g">Trivia</span>
          <span className="game-title-g">GAME</span>
        </h1>
        <section>
          {questions.map((data, index) => (
            index === currQuestion
            && (
              <>
                <Question
                  answered={ answered }
                  { ...data }
                  correctAnswer={ data.correct_answer }
                  incorrectAnswers={ data.incorrect_answers }
                  key={ data.question }
                  // sendToFeedback={ this.se }
                  nextBtn={ this.createNextBtn }
                />
                <Timer
                  changeAnswered={ this.changeAnswered }
                />
              </>)
          ))}

        </section>
        {hasBeenAnswered
        && (
          <button
            className="button-next"
            onClick={ this.nextQuestion }
            data-testid="btn-next"
          >
            Next

          </button>
        )}
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  updateRanking: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(Actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Game);
