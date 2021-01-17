import React, { Component } from 'react';

import Block from './block';

import './piece.scss';
import variables from './variables.scss';

class Piece extends Component {

	state = {
		color: Math.floor(Math.random() * 6) + 1,
		position: { x: 0, y: 0 },
		rotation: 0,
		isMoving: true,
		shape: []
	}

	shapes = [
		{
			code: 0,
			name: 'shape-L',
			setup: [
				[1, 1, 1],
				[1, 0, 0],
			],
		},
		{
			code: 1,
			name: 'shape-L-right',
			setup: [
				[1, 0, 0],
				[1, 1, 1],
			]
		},
		{
			code: 2,
			name: 'shape-square',
			setup: [
				[1, 1],
				[1, 1],
			]
		},
		{
			code: 3,
			name: 'shape-T',
			setup: [
				[0, 1, 0],
				[1, 1, 1],
			]
		},
		{
			code: 4,
			name: 'shape-I',
			setup: [
				[1, 1, 1, 1],
			]
		}
	]

	constructor(props) {
		super(props);

		this.checkAndMove = this.checkAndMove.bind(this);
		this.movePiece = this.movePiece.bind(this);
		this.rotatePiece = this.rotatePiece.bind(this);
		this.renderShape = this.renderShape.bind(this);
	}

	componentDidMount() {
		const self = this;
		// this.movingInterval = setInterval(() => {
		// 	self.movePiece({}, true)
		// }, 1000);

		document.addEventListener("keydown", this.movePiece, false);

		this.generateShape();

		return () => {
			document.removeEventListener("keydown", this.movePiece, false);
		};
	}

	generateShape() {
		const shape = Math.floor(Math.random() * 4) + 1;
		console.log(shape)
		this.setState({ shape })
	}

	getPosition() {
		const { position, rotation } = this.state;

		const x = position.x * variables.blockSize;
		const y = position.y * variables.blockSize;
		const rotDegrees = rotation * 90;

		return {
			transform: `translate(${x}px, ${y}px) rotate(${rotDegrees}deg)`
		};
	}

	movePiece(e, goDown = false) {
		const { isMoving, position } = this.state;
		const newPosition = { ...position };

		if (isMoving) {
			if (this.props.isInLimits(e, position)) {
				// left
				if (e.keyCode === 37)
					--newPosition.x;
				// right
				else if (e.keyCode === 39)
					++newPosition.x;
			}
			// up
			if (e.keyCode === 38)
				this.rotatePiece();
			// down
			else if (goDown || e.keyCode === 40)
				++newPosition.y;

			this.checkAndMove(newPosition)
		}
	}

	async checkAndMove(newPosition) {
		const { shape } = this.state;
		const keepMoving = this.props.checkBoard(newPosition, this.shapes[shape].setup);

		if (!keepMoving)
			clearInterval(this.movingInterval);

		this.setState({
			position: newPosition,
			isMoving: keepMoving,
		});
	}

	rotatePiece() {
		const { isMoving, rotation } = this.state;

		if (isMoving) {
			if (rotation === 3)
				this.setState({ rotation: 0 });
			else
				this.setState({ rotation: rotation + 1 });
		}
	}

	renderShape() {
		const { color, shape } = this.state;
		const { shapes } = this;

		if (shape === shapes[0].code)
			return (
				<>
					<div className="piece-row">
						<Block color={color} />
						<Block color={color} />
						<Block color={color} />
					</div>
					<div className="piece-row">
						<Block color={color} />
					</div>
				</>
			)
		else if (shape === shapes[1].code)
			return (
				<>
					<div className="piece-row">
						<Block color={color} />
					</div>
					<div className="piece-row">
						<Block color={color} />
						<Block color={color} />
						<Block color={color} />
					</div>
				</>
			)
		else if (shape === shapes[2].code)
			return (
				<>
					<div className="piece-row">
						<Block color={color} />
						<Block color={color} />
					</div>
					<div className="piece-row">
						<Block color={color} />
						<Block color={color} />
					</div>
				</>
			)

		else if (shape === shapes[3].code)
			return (
				<>
					<div className="piece-row">
						<Block />
						<Block color={color} />
						<Block />
					</div>
					<div className="piece-row">
						<Block color={color} />
						<Block color={color} />
						<Block color={color} />
					</div>
				</>
			)
		else if (shape === shapes[4].code)
			return (
				<>
					<div className="piece-row">
						<Block color={color} />
						<Block color={color} />
						<Block color={color} />
						<Block color={color} />
					</div>
				</>
			)
	}

	render() {
		return (
			<div
				className="piece"
				style={this.getPosition()}
			>
				{this.renderShape()}
			</div >
		)
	}
}

export default Piece;