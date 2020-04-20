import React from 'react';

import Board from './Board';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                step: null,
            }],
            stepNumber: 0,
            xIsNext: true,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        
        
        squares[i] = this.state.xIsNext ? "X" : "O";
        this.setState({
                history: history.concat([{
                squares: squares,
                step: i,
            }]),
            stepNumber: history.length,            
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
       // const step = current.step;        
        

        const moves = history.map((step, move) => {
            const desc = move 
                ? 'Перейти к ходу №' + move
                : "К началу игры";
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>               
            ) 
        })

        const table = history.map((step) =>{
            const s = step.step;
            let tables;        
            if (s === 0 || s === 3 || s === 6) {
                switch (s) {
                    case 0:
                        tables = '1ый столбец, 1ая строка';
                        break;
                    case 3:
                        tables = '1ый столбец, 2ая строка';
                        break;                
                    default:
                        tables = '1ый столбец, 3ая строка';
                        break;
                }
            } else if (s === 1 || s === 4 || s === 7) {
                switch (s) {
                    case 1:
                        tables = '2ой столбец, 1ая строка';
                        break;
                    case 4:
                        tables = '2ой столбец, 2ая строка';
                        break;                
                    default:
                        tables = '2ой столбец, 3ая строка';
                        break;
                }
            } else if (s === 2 || s === 5 || s === 8) {
                switch (s) {
                    case 2:
                        tables = '3ий столбец, 1ая строка';
                        break;
                    case 5:
                        tables = '3ий столбец, 2ая строка';
                        break;                
                    default:
                        tables = '3ий столбец, 3ая строка';
                        break;
                }
            } else {
                tables = 'Начало игры';
            }
            return (
                <li key={s}>{tables}</li>
            )
        })

        let status;
        if (winner) {
            status = 'Win ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? "X" : "O");
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board 
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>                    
                </div>
                <div className='info-table'>
                    <ul>{table}</ul>
                </div>
            </div>
        );
    }
}

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
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

export default Game;