import React, { Component } from 'react';

import Piece from './piece';

import './board.scss';
import variables from './variables.scss';

class Board extends Component {

  state = {
    board: [],
    pieces: [''],
  }

  self = this;

  constructor(props) {
    super(props);

    this.checkBoard = this.checkBoard.bind(this);
    this.createNewPiece = this.createNewPiece.bind(this);
  }

  componentDidMount() {
    const board = new Array(parseInt(variables.boardWidth));

    for (let i = 0; i < board.length; i++)
      board[i] = new Array(parseInt(variables.boardHeight));
    this.setState({ board });
  }

  createNewPiece() {
    const { pieces } = this.state;

    pieces.push('');
    this.setState({ pieces });
  }

  isInLimits(e, position) {
    // left
    if (e.keyCode === 37) {
      if (position.x > 0)
        return true;
    }
    // right
    else if (e.keyCode === 39) {
      if (position.x < variables.boardWidth - 3)
        return true;
    }

    return false;
  }

  checkBoard(newPosition, shape) {
    const { board } = this.state;

    let shapeBottom = shape[shape.length - 1];
    shapeBottom = shapeBottom.map((item, i) =>
      item ? i + newPosition.x : null
    )

    // console.log(shapeBottom);
    // console.log(newPosition.x, newPosition.y)
    const a = board[newPosition.x][newPosition.y];
    const isTouchingPiece = shapeBottom.map(item =>
      board[item][newPosition.y + 1]
    ).some(a => a);
    // console.log(isTouchingPiece)

    // Check if touched some piece or floor
    const isTouchingFloor = newPosition.y > (variables.boardHeight - 3);
    if (isTouchingFloor || isTouchingPiece) {
      const shapePos = shape.map((rows, j) =>
        rows.map((item, i) =>
          item ? i + newPosition.x : null
        )
      );

      shapePos.forEach((shapeRows, i) =>
        shapeRows.forEach((posX, j) => {
          if (posX !== null)
            board[posX][newPosition.y - 1 + i] = true;
        })
      );
      console.log(board);
      const transposedBoard = board[0].map((_, i) => board.map(row => row[i]));
      transposedBoard.forEach(row => {
        const isFullRow = row.every(item => item);
        if (isFullRow)
          row.fill(undefined);

      })

      this.setState({ board });
      this.createNewPiece();
      return false;
    }
    // else if()

    return true;
  }

  removeFullRow() {

  }

  render() {
    const { board, pieces } = this.state;

    return (
      <div className="game-board" >
        {pieces.map((piece, i) =>
          <Piece
            key={i}
            initPosition={{ x: 0, y: 0 }}
            board={board}
            checkBoard={this.checkBoard}
            isInLimits={this.isInLimits}
          />
        )}
      </div>
    );
  }
}

export default Board;
