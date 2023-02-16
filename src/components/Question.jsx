import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../redux/actions';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      randAnswers: [],
    };
    this.isCorrectOption = this.isCorrectOption.bind(this);
    this.shuffleArr = this.shuffleArr.bind(this);
  }

  componentDidMount() {
    const { correctAnswer, incorrectAnswers } = this.props;
    const toRand = [correctAnswer, ...incorrectAnswers];
    this.setState({
      randAnswers: this.shuffleArr(toRand),
    });
  }

  score = (answer, difficulty) => {
    const { correctAnswer, updateScore, updateAssertions, seconds } = this.props;
    const normal = 10;
    const complement = {
      hard: 3,
      medium: 2,
      easy: 1,
    };

    if (correctAnswer === answer) {
      updateScore({ score: normal + (seconds * complement[difficulty]) });
      updateAssertions();
    }
  };

  isCorrectOption(option) {
    const { incorrectAnswers, correctAnswer } = this.props;
    if (correctAnswer === option) {
      return 'correct-answer';
    }
    const index = incorrectAnswers.indexOf(option);
    return `wrong-answer-${index}`;
  }

  shuffleArr(arr) {
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  colorAlternative(answer) {
    const { correctAnswer, answered } = this.props;
    if (answered) {
      return answer === correctAnswer
        ? { backgroundColor: 'rgb(6, 240, 15)',
          border: '2px solid rgb(6, 240, 15)',
          filter: 'drop-shadow(0 -1px 5px #2fc18c)' }
        : { backgroundColor: 'red',
          border: '2px solid red',
          filter: 'drop-shadow(0 0 5px #b83b3b)' };
    }
  }

  render() {
    const {
      category,
      question,
      difficulty,
      nextBtn,
      // sendToFeedback,
      answered,
    } = this.props;

    const { randAnswers } = this.state;

    return (
      <div className="question-container">
        <div className="question">
          <h4 data-testid="question-category">{category}</h4>
          <br />
          <p data-testid="question-text">{question}</p>
        </div>
        <div className="button-container" data-testid="answer-options">
          {randAnswers.map((answer) => (
            <button
              className="button-question"
              style={ this.colorAlternative(answer) }
              onClick={ () => {
                this.score(answer, difficulty);
                nextBtn();
              } }
              data-testid={ this.isCorrectOption(answer) }
              key={ answer }
              disabled={ answered }
            >
              {answer}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

Question.propTypes = {
  category: PropTypes.string,
  correctAnswer: PropTypes.string,
  incorrectAnswers: PropTypes.shape({
    indexOf: PropTypes.func,
  }),
  question: PropTypes.string,
}.isRequired;

const mapDispatchToProps = (dispatch) => bindActionCreators(Actions, dispatch);

const mapStateToProps = (state) => ({
  seconds: state.game.seconds,
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
