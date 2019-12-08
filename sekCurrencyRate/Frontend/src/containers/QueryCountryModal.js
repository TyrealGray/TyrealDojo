import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Label, Modal } from 'semantic-ui-react';

import { closeModal } from '../actions/modalActions';
import CountrySearchBar from '../components/CountrySearchBar';
import { addCountry, searchCountry } from '../actions/queryActions';

const QueryCountryModal = (props) => {
	const { modalInfo, closeModal, addCountry, searchCountry } = props;
	const [results, setResults] = useState([]);
	const [value, setValue] = useState('');
	const [loading, setLoading] = useState(false);

	let timerID = 0;
	const valueOnChange = (value) => {
		setValue(value);
		if (!value || value.length < 2) {
			return;
		}
		setLoading(true);

		clearTimeout(timerID);
		timerID = setTimeout(async () => {
			const data = await searchCountry(value);
			setResults(
				data.countriesInfo.map((c, index) => ({
					...c,
					title: c.name,
					key: index,
				})),
			);
			setLoading(false);
		}, 1000);
	};

	const onSelect = (result) => {
		setValue(result.name);
	};

	return (
		<Modal
			style={{ overflowY: 'auto' }}
			closeOnEscape={true}
			closeOnDimmerClick={false}
			size={'mini'}
			open={modalInfo.isOpen}>
			<Modal.Header>Add country</Modal.Header>
			<Modal.Content>
				<p>Search and add country to checklist</p>
				<CountrySearchBar
					value={value}
					loading={loading}
					results={results}
					onSelect={onSelect}
					onChange={valueOnChange}
					resultRenderer={({ name }) => <Label content={name} />}
				/>
			</Modal.Content>
			<Modal.Actions>
				<Button
					negative
					onClick={() => {
						setValue('');
						closeModal();
					}}>
					Close
				</Button>
				<Button
					positive
					icon="checkmark"
					labelPosition="right"
					content="Add"
					onClick={() => {
						for (const r of results) {
							if (r.name !== value) {
								continue;
							}
							addCountry(r);
							break;
						}
						closeModal();
					}}
				/>
			</Modal.Actions>
		</Modal>
	);
};

const mapStateToProps = (state) => {
	return {
		modalInfo: state.modalInfo,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addCountry: (country) => dispatch(addCountry(country)),
		searchCountry: (name) => dispatch(searchCountry(name)),
		closeModal: () => dispatch(closeModal()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(QueryCountryModal);
