import { push, ref } from 'firebase/database';
import { useState } from 'react';
import { db } from '../firebase';

export function useRequestAddTodo(newTodo, setNewTodo) {
	const [isCreating, setIsCreating] = useState(false);

	function handleAdd() {
		if (!newTodo.trim()) return;
		setIsCreating(true);

		const todosDbRef = ref(db, 'todos');

		push(todosDbRef, {
			title: newTodo.trim(),
			completed: false,
		})
			.then((response) => response.toJSON())
			.then((data) => {
				setNewTodo('');
				console.log('Задача добавлена, ответ сервера:', data);
			})
			.catch((error) => console.error('Ошибка:', error))
			.finally(() => setIsCreating(false));
	}
	return { handleAdd, isCreating };
}
