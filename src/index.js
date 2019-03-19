import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

/* replaced with function component as below 
class Square extends React.Component {
  render() {
    return (            
      <button 
        className="square" 
        onClick={() => this.props.onClick()}
      >
        {this.props.value} 
      </button>
    ) 
  }
}
*/

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  )
}


class Board extends React.Component {
  // constructor(props) { /* replaced with the constructor in Game to store data */
  // super(props)
  // this.state = {
  //   squares: Array(9).fill(null),  /* set the initial state as null and be changed later when input is entered */
  //   xIsNext: true
  //   }
  // }

  handleClick(i) {
    const squares = this.state.squares.slice() /* make a copy of the array to modify the data instead of modifying it directly to the original array */
    if (calculateWinner(squares) || squares[i]) {
      return
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext /* tracking the changing state of xIsNext */
    })
  }

  renderSquare(i) {
    return (
      <Square 
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        />) /* passing value and onClick props to Square component */
  }

  render() {
    /* remove below as now Game component keeps track of the status and state */
    // const winner = calculateWinner(this.state.squares)
    // let status
    // if (winner) {
    //   status = 'Winner: ' + winner
    // } else {
    //   status = 'Next player: ' + (this.state.xIsNext? 'X' : 'O')
    // }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    )
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {   /* store the history data */
      history: [{
        squares: Array(9).fill(null)
      }],
      xIsNext: true
    }
  }
  render() {
    const history = this.state.history
    const current = history[history.length - 1]
    const winner = calculateWinner(current.squares)
    let status
    if (winner) {
      status = 'Winner: ' + winner
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    )
  }
}

/* situation where a winner will appear */
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) { /* square[a] 'X' or 'O' is the same player as in square[b] and square[c] */
      return squares[a]
    }
  }
  return null
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
)