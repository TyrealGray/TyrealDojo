import React, { useEffect, useState } from 'react';
import { Search } from 'semantic-ui-react';

export default function CountrySearchBar(props) {
	const [value, setValue] = useState(props.value);
	const [results, setResults] = useState(props.results);
	const [isLoading, setLoading] = useState(props.loading);

	useEffect(() => {
		setValue(props.value);
	}, [props.value]);

	useEffect(() => {
		setResults(props.results);
	}, [props.results]);

	useEffect(() => {
		setLoading(props.loading);
	}, [props.loading]);

	const handleResultSelect = (e, { result }) => {
		props.onSelect(result);
	};

	const handleSearchChange = (e, { value }) => {
		props.onChange(value);
	};

	const { resultRenderer } = props;

	return (
		<Search
			loading={isLoading}
			onResultSelect={handleResultSelect}
			onSearchChange={handleSearchChange}
			placeholder={'put at least 2 character'}
			results={results}
			value={value}
			resultRenderer={resultRenderer}
		/>
	);
}
