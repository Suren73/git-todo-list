import { ref, remove } from 'firebase/database';
import { useState } from 'react';
import { db } from '../firebase';

export function useRequestDeleteTodo() {
	const [isDeleting, setIsDeleting] = useState(false);

	function handleDelete(key) {
		setIsDeleting(true);

		const todoDbRef = ref(db, `todos/${key}`);

		remove(todoDbRef)
			.then((response) => {
				console.log('Задача удалена, ответ сервера:', response);
			})
			.catch((error) => console.log('Ошибка:', error))
			.finally(() => setIsDeleting(false));
	}

	return { handleDelete, isDeleting };
}
