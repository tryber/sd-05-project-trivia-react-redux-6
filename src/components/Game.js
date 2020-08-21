import React from 'react';
import Header from './Header';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchQuestions } from '../actions/index';
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
    };

    this.next = this.next.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.updateQuestions = this.updateQuestions.bind(this);
  }
  componentDidMount() {
    const { token, fetchPerguntas } = this.props;
    fetchPerguntas(token);
  }

  componentDidUpdate(prevProps, prevState) {
    const { indexResults, questions } = this.state;
    if (indexResults !== 5) {
      if (prevState.indexResults !== indexResults || questions.length === 0) {
        this.updateQuestions();
      }
    }
  }

  updateQuestions() {
    this.setState({
      questions: this.randomicChoices(),
    });
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
    if (indexResults === 4) {
      this.setState({
        redirect: true,
      });
    }
    this.setState({
      indexResults: indexResults + 1,
      buttonsDisabled: false,
    });
  }

  handleClick(event) {
    const { buttonsDisabled } = this.state;
    console.log('estou dentro do handleClick', event.target.innerHTML);
    this.setState({
      buttonsDisabled: !buttonsDisabled,
    });
  }
  renderQuestions() {
    const { results } = this.props;
    const { questions, buttonsDisabled, indexResults } = this.state;

    return questions.map((item, index) => {
      if (item === results[indexResults].correct_answer) {
        return (
          <button
            key={item} className={(buttonsDisabled === true) ? 'correctAnswer' : null} data-testid="correct-answer"
            onClick={this.handleClick} disabled={buttonsDisabled}
          >
            {item}
          </button>
        );
      }
      return (
        <button
          key={item} className={(buttonsDisabled === true) ? 'wrongAnswer' : null}
          data-testid={`wrong-answer-${index}`}
          onClick={this.handleClick} disabled={buttonsDisabled}
        >
          {item}
        </button>
      );
    });
  }

  render() {
    const { results, loading } = this.props;
    const { indexResults, redirect } = this.state;
    if (redirect) return (<Redirect to="/" />); //  mudar para feedback quando tiver ela pronta.
    if (loading) return (<div>Loading...</div>);
    const { category, question } = results[indexResults];

    return (
      <div className="gameScreen">
        <h4>Game Screen</h4>
        <div className="cardQuestion">
          {/* <Header /> */}
          <div className="questionAndAnswers">
            <div className="containerCategoryQuestion">
              <div className="question-category" data-testid="question-category">{category}</div>
              <p className="question-text" data-testid="question-text">{question}</p>
            </div>
            <div className="answers">
              {this.renderQuestions()}
            </div>
          </div>
          <div className="timeAndNext">
            <div className="timer">Tempo: </div>
            <div className="next">
              <button onClick={this.next} data-testid="btn-next">Próxima</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.reducerTrivia.loading,
  token: state.reducerTrivia.token,
  results: state.reducerTrivia.results,
});

const mapDispatchToProps = (dispatch) => ({
  fetchPerguntas: (token) => dispatch(fetchQuestions(token)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Game);

//  ref1: https://teamtreehouse.com/community/return-mathrandom05
