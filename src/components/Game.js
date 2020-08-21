import React from 'react';
import { connect } from 'react-redux';
import { fetchQuestions } from '../actions/index';
import './Game.css';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonsDisabled: false,
      indexResults: 0,
      answered: false,
      tempo: 30,
    };
    this.next = this.next.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    const { token, fetchPerguntas } = this.props;
    fetchPerguntas(token);
  }

  randomicChoices() {
    const { indexResults } = this.state;
    const { correct_answer, incorrect_answers, type } = this.props.results[indexResults];
    let arrayRandomico;
    if (type === 'boolean') {
      arrayRandomico = [ 'True', 'False' ];
    } else {
      console.log('incorrect answer pra nao booleano', incorrect_answers);
      arrayRandomico = [ correct_answer, ...incorrect_answers ];
    }
    return arrayRandomico.sort(() => Math.random() - 0.5); // ref1
  }

  next() {
    const { indexResults } = this.state;
    console.log(indexResults);
    this.setState({
      indexResults: indexResults + 1,
    });
  }

  handleClick(event) {
    const { buttonsDisabled } = this.state;
    console.log('estou dentro do handleClick', event.target.innerHTML);
    // if (this.state.clicked) {
    //   //  não deixar clicar em outro botão das alternativas
    // }
    this.setState({
      buttonsDisabled: !buttonsDisabled,
    });
    console.log('q loucura');
  }

  render() {
    const { results, loading } = this.props;
    const { indexResults } = this.state;
    if (loading) return (<div>Loading...</div>);
    const { category, question, correct_answer, incorrect_answers } = results[indexResults];
    const arrayRandomico = this.randomicChoices();
    console.log('a correta eh', correct_answer, typeof(correct_answer));
    console.log('o array Randomico eh', arrayRandomico);

    return (
      <div className="gameScreen">
        <h4>Game Screen</h4>
          <div className="cardQuestion">
            <div className="questionAndAnswers">
              <div className="containerCategoryQuestion">
                <div className="question-category" data-testid="question-category">{category}</div>
                <p className="question-text" data-testid="question-text">{question}</p>
              </div>
              <div className="answers">
                {/* <button data-testid="correct-answer">{correct_answer}</ button>
                {(incorrect_answers.length > 1) ? incorrect_answers.map((incorrect, index) => (<button key={incorrect} data-testid={`wrong-answer-${index}`} >{incorrect}</button>)) : <button data-testid={`wrong-answer-0`}>{incorrect_answers}</button>} */}
                {arrayRandomico.map((item, index) => (item === correct_answer) ? (<button key={item} data-testid="correct-answer" onClick={this.handleClick}>{item}</ button>) : (<button key={item} data-testid={`wrong-answer-${index}`} onClick={this.handleClick}>{item}</button>) )}
              </div>
            </div>
            <div className="timeAndNext">
              <div className="timer">Tempo: </div>
              <div className="next"><button onClick={this.next} data-testid="btn-next">Próxima</button></div>
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
