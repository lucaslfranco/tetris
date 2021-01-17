import React from 'react';

import './piece.scss';

function Block({ color = 0 }) {

	function getClassByType() {
		if (color !== 0)
			return `block block-${color}`;
		else
			return 'block';
	}

	return (
		<div className={getClassByType()} />
	)
}

export default Block;