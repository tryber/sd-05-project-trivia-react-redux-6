import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from './Header';
import { fetchQuestions, scorePoint } from '../actions/index';
import './Game.css';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonsDisabled: false,
      indexResults: 0,
      tempo: 30,
      redirect: false,
      questions: [],
      visibility: 'hidden',
    };

    this.next = this.next.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.updateQuestions = this.updateQuestions.bind(this);
    this.timer = this.timer.bind(this);
    this.calculateScore = this.calculateScore.bind(this);
    this.setStorageValue = this.setStorageValue.bind(this);
  }

  componentDidMount() {
    const { token, fetchPerguntas } = this.props;
    fetchPerguntas(token);
    localStorage.setItem('state', JSON.stringify({ player: { score: 0, assertions: 0 }}));
    // this.timer();
  }

  componentDidUpdate(prevProps, prevState) {
    const { indexResults, questions } = this.state;
    const { results } = this.props;
    if (indexResults !== results.length) {
      if (prevState.indexResults !== indexResults || questions.length === 0) {
        this.updateQuestions();
      }
    }
  }

  componentWillUnmount() {
    this.unmountInterval();
  }

  timer() {
    //  ref2
    this.myInterval = setInterval(() => {
      const { tempo } = this.state;
      if (tempo === 1) {
        this.unmountInterval();
      }
      this.setState({ tempo: tempo - 1 });
    }, 1000);
  }

  unmountInterval() {
    clearInterval(this.myInterval);
    this.setState({ buttonsDisabled: true });
  }

  updateQuestions() {
    const { results } = this.props;
    if (results !== undefined) {
      this.setState({
        questions: this.randomicChoices(),
        tempo: 30,
      });
    }
    this.timer();
  }

  randomicChoices() {
    const { indexResults } = this.state;
    const { type } = this.props.results[indexResults];
    let arrayRandomico;
    if (type === 'boolean') {
      arrayRandomico = ['True', 'False'];
    } else {
      arrayRandomico = [this.props.results[indexResults].correct_answer,
        ...this.props.results[indexResults].incorrect_answers];
    }
    return arrayRandomico.sort(() => Math.random() - 0.5); // ref1
  }

  next() {
    const { indexResults } = this.state;
    const { results } = this.props;

    this.setState({
      indexResults: indexResults + 1,
      buttonsDisabled: false,
    });

    if (indexResults === results.length - 1) {
      this.setState({
        redirect: true,
      });
    }
  }

  handleClick(event) {
    const { buttonsDisabled } = this.state;
    const { testePoint, prevAssertions, prevScore } = this.props;
    let point;
    if (event.target.name === 'correct-answer') {
      point = this.calculateScore();
      testePoint((prevAssertions + 1), (prevScore + point));
      this.setStorageValue((prevAssertions + 1), (prevScore + point));
    }

    this.setState({
      buttonsDisabled: !buttonsDisabled,
      visibility: 'visible',
    });

    this.unmountInterval();
  }

  setStorageValue(acertos, placar) {
    const { name, email } = this.props;
    const player = {
      name,
      assertions: acertos,
      score: placar,
      gravatarEmail: email,
    };
    localStorage.setItem('state', JSON.stringify({ player }));
  }

  calculateScore() {
    const { results } = this.props;
    const { indexResults, tempo } = this.state;
    let difficultyValue;
    if (results[indexResults].difficulty === 'hard') difficultyValue = 3;
    if (results[indexResults].difficulty === 'medium') difficultyValue = 2;
    if (results[indexResults].difficulty === 'easy') difficultyValue = 1;
    const point = 10 + (tempo * difficultyValue);
    return point;
  }

  renderQuestions() {
    const { results } = this.props;
    const { questions, buttonsDisabled, indexResults } = this.state;

    return questions.map((item, index) => {
      if (item === results[indexResults].correct_answer) {
        return (
          <button
            key={item} className={(buttonsDisabled === true) ? 'correctAnswer' : null} data-testid="correct-answer" name="correct-answer"
            onClick={this.handleClick} disabled={buttonsDisabled}
          >
            {item}
          </button>
        );
      }
      return (
        <button
          key={item} className={(buttonsDisabled === true) ? 'wrongAnswer' : null}
          data-testid={`wrong-answer-${index}`} name="wrong-answer"
          onClick={this.handleClick} disabled={buttonsDisabled}
        >
          {item}
        </button>
      );
    });
  }

  render() {
    const { results, loading } = this.props;
    const { indexResults, redirect, tempo, visibility } = this.state;
    if (redirect) return (<Redirect to="/feedback" />);
    if (loading) return (<div>Loading...</div>);
    const { category, question } = results[indexResults];

    return (
      <div className="gameScreen">
        <div className="cardQuestion">
          <Header />
          <div className="questionAndAnswers">
            <div className="containerCategoryQuestion">
              <div className="question-category" data-testid="question-category">{category}</div>
              <p className="question-text" data-testid="question-text">{question}</p>
            </div>
            <div className="answers">{this.renderQuestions()}</div>
          </div>
          <div className="timeAndNext">
            <div className="timer">Tempo: {tempo} </div>
            <div className="next">
              <button onClick={this.next} style={{ visibility }} data-testid="btn-next">
                Próxima
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.reducerGravatar.name,
  email: state.reducerGravatar.email,
  loading: state.reducerTrivia.loading,
  token: state.reducerTrivia.token,
  results: state.reducerTrivia.results,
  prevAssertions: state.reducerGame.assertions,
  prevScore: state.reducerGame.score,
});

const mapDispatchToProps = (dispatch) => ({
  fetchPerguntas: (token) => dispatch(fetchQuestions(token)),
  testePoint: (assertions, score) => dispatch(scorePoint(assertions, score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

Game.propTypes = {
  name: propTypes.string.isRequired,
  email: propTypes.string.isRequired,
  loading: propTypes.bool.isRequired,
  token: propTypes.string.isRequired,
  results: propTypes.arrayOf(propTypes.instanceOf(Object)),
  prevAssertions: propTypes.number.isRequired,
  prevScore: propTypes.number.isRequired,
  fetchPerguntas: propTypes.func.isRequired,
  testePoint: propTypes.func.isRequired,
};

//  ref1: https://teamtreehouse.com/community/return-mathrandom05
//  ref2: https://medium.com/better-programming/building-a-simple-countdown-timer-with-react-4ca32763dda7
//  ref2: https://www.youtube.com/watch?v=NAx76xx40jM
//  ref2: https://www.w3schools.com/jsref/met_win_setinterval.asp
