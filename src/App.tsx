import axios from 'axios';
import { JSX, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './App.module.css';

interface Todo {
	id: number;
	userId: number;
	title: string;
	completed: boolean;
}

function App(): JSX.Element {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		setIsLoading(true);

		axios
			.get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
			.then((response) => setTodos(response.data))
			.catch((error: unknown) => {
				if (error instanceof Error) {
					console.error('Error fetching todos:', error.message);
				}
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
