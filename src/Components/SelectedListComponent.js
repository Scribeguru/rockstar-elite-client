import React from 'react';
import { Row, Col, Input } from 'reactstrap';

export default function SelectedList({ exercise, selectedDetails }) {

	function parseType() {
		const strength = 
			<Row className="text-center">
				<Col>
					<Input name={exercise.name}  placeholder="sets" />
				</Col>
				<Col>
					<Input name={exercise.name}  placeholder="reps" />
				</Col>
				<Col>
					<Input name={exercise.name}  placeholder="weight" />
				</Col>
			</Row>;
		const cardio = <Input name={exercise.name}  placeholder="length" />
		const type = (exercise.strengthOrCardio === "strength") ? strength : cardio;
		return type;
	}

	return (
		<>
			<em>{exercise.name}</em>
			{parseType()}
		</>
	);
}