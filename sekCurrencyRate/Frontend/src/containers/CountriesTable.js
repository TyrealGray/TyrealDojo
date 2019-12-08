import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Container, Segment, Table, Message } from 'semantic-ui-react';
import { convertAmount } from '../actions/queryActions';

const CountriesTable = (props) => {
	const { convertAmount, countriesInfo, conversionInfo } = props;
	const { countries } = countriesInfo;
	const { rates, amount } = conversionInfo;

	const [table, setTable] = useState([]);

	useEffect(() => {
		const parseConversion = (country) => {
			const { name, currencies } = country;
			let ratesInfo = [];

			if (currencies && currencies.length !== 0) {
				for (let index = 0; index < currencies.length; ++index) {
					let currency = currencies[index];
					if (rates[currency.code]) {
						ratesInfo.push(
							<React.Fragment
								key={`currency-${name}${currency.code}${index}`}>
								{`SEK ${amount} => ${currency.code} ${
									rates[currency.code]
								}`}
								<br />
							</React.Fragment>,
						);
					} else {
						ratesInfo.push(
							<React.Fragment
								key={`currency-${name}${currency.code}${index}`}>
								{isNaN(currency.rateToSEK) &&
									`No data for converting ${currency.code}`}
								{!isNaN(currency.rateToSEK) &&
									`SEK ${amount} => ${currency.code} 0`}
								<br />
							</React.Fragment>,
						);
					}
				}
			}
			return ratesInfo.map((info) => info);
		};

		const parseCurrencies = (country) => {
			const { name, currencies } = country;
			let information = [];

			if (currencies && currencies.length !== 0) {
				for (let index = 0; index < currencies.length; ++index) {
					if (currencies.length > 1 && index !== 0) {
						information.push(
							<React.Fragment key={`${name}${index}`}>
								{`__`}
								<br />
							</React.Fragment>,
						);
					}

					let currency = currencies[index];
					for (const info in currency) {
						information.push(
							<React.Fragment key={`${name}${info}${index}`}>
								{`${info}: ${currency[info]}`}
								<br />
							</React.Fragment>,
						);
					}
				}
			}

			return information.map((info) => info);
		};

		const data = [];
		for (const country in countries) {
			const info = countries[country];

			let tableRow = (
				<Table.Row key={info.name}>
					<Table.Cell>{info.name}</Table.Cell>
					<Table.Cell>{info.population}</Table.Cell>
					<Table.Cell>{parseCurrencies(info)}</Table.Cell>
					<Table.Cell>{parseConversion(info)}</Table.Cell>
				</Table.Row>
			);
			data.push(tableRow);
		}

		setTable(data);
	}, [countries, rates, amount]);

	useEffect(() => {
		if (table.length > 0) {
			convertAmount(amount);
		}
	}, [table, amount, convertAmount]);

	return (
		<Container>
			<Segment>
				{!table.length && (
					<Message
						warning
						header="You have no data here."
						content="Add a country to begin the conversion"
					/>
				)}
				{!!table.length && (
					<Table celled selectable fixed>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell>
									Country Name
								</Table.HeaderCell>
								<Table.HeaderCell>Population</Table.HeaderCell>
								<Table.HeaderCell>Currency</Table.HeaderCell>
								<Table.HeaderCell>Conversion</Table.HeaderCell>
							</Table.Row>
						</Table.Header>

						<Table.Body>{table.map((row) => row)}</Table.Body>
					</Table>
				)}
			</Segment>
		</Container>
	);
};

const mapStateToProps = (state) => {
	return {
		countriesInfo: state.countriesInfo,
		conversionInfo: state.conversionInfo,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		convertAmount: (amount) => dispatch(convertAmount(amount)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(CountriesTable);
