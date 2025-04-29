import { ref, set } from 'firebase/database';
import { useState } from 'react';
import { db } from '../firebase';

export function useRequestUpdateTodo(setEditingId) {
	const [isUpdating, setIsUpdating] = useState(false);

	function handleUpdate(key, newTitle) {
		if (!newTitle.trim()) return;

		setIsUpdating(true);
		const todoDbRef = ref(db, `todos/${key}`);

		set(todoDbRef, {
			title: newTitle.trim(),
			complete: false,
		})
			.then((response) => {
				console.log('Задача обновлена, ответ сервера:', response);
			})
			.catch((error) => console.error('Ошибка:', error))
			.finally(() => {
				setIsUpdating(false);
				setEditingId(null);
			});
	}
	return { handleUpdate, isUpdating };
}
