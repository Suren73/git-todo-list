import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './App.module.css';

function App() {
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);

		axios
			.get('https://jsonplaceholder.typicode.com/todos')
			.then((response) => response.data)
			.then((data) => {
				setTodos(data);
				// console.log(data);
			})
			.finally(() => setIsLoading(false));
	}, []);

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Список дел:</h1>
			{isLoading && <div className={styles.loader}></div>}
			<ul className={styles.list}>
				{todos.map(({ title }) => (
					<li key={uuidv4()}>{title}</li>
				))}
			</ul>
		</div>
	);
}

export default App;
