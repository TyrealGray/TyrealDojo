import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
	Button,
	Grid,
	Container,
	Divider,
	Header,
	Icon,
	Segment,
	Input,
} from 'semantic-ui-react';
import { openModal } from '../actions/modalActions';
import { updateAmount, convertAmount } from '../actions/queryActions';

const AmountCheck = (props) => {
	const { updateAmount, convertAmount } = props;
	const [value, setValue] = useState(0);

	return (
		<Container>
			<Segment placeholder>
				<Grid columns={2} stackable textAlign="center">
					<Divider vertical />

					<Grid.Row verticalAlign="middle">
						<Grid.Column>
							<Header icon>
								<Icon name="balance scale" />
								Currency Conversion From SEK
							</Header>
							<Container>
								<Input
									value={value}
									type={'number'}
									onChange={(e, { value }) => {
										/**
										 * I use Number(value).toString() to remove 0 in the front
										 */
										const numberStr = Number(
											value,
										).toString();
										if (
											isNaN(numberStr) ||
											Number(numberStr) < 0
										) {
											return;
										}

										const number = Number(numberStr);
										setValue(numberStr);
										updateAmount(number);
										convertAmount(number);
									}}
								/>
							</Container>
						</Grid.Column>

						<Grid.Column>
							<Header icon>
								<Icon name="world" />
								Add New Country
							</Header>
							<Button
								primary
								onClick={() => {
									props.openModal();
								}}>
								Add
							</Button>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Segment>
		</Container>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		openModal: () => dispatch(openModal()),
		updateAmount: (amount) => dispatch(updateAmount(amount)),
		convertAmount: (amount) => dispatch(convertAmount(amount)),
	};
};

export default connect(
	null,
	mapDispatchToProps,
)(AmountCheck);
