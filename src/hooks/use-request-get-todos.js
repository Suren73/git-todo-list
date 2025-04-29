import { onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { objectToArrayWithKeys } from '../utils';

export function useRequestGetTodos() {
	const [isLoading, setIsLoading] = useState(true);
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		const todosDbRef = ref(db, 'todos');

		return onValue(todosDbRef, (snapshot) => {
			const loadedTodos = snapshot.val() || {};

			const arrTodo = objectToArrayWithKeys(loadedTodos);

			setTodos(arrTodo);
			setIsLoading(false);
		});
	}, []);

	return { todos, isLoading };
}
