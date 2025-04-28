import React, { useEffect, useRef, useState } from 'react';
import styles from './App.module.css';
import { createHandleCancel, createHandleEdit } from './handlers';
import {
	useRequestAddTodo,
	useRequestDeleteTodo,
	useRequestGetTodos,
	useRequestUpdateTodo,
} from './hooks';
import { getFilteredTodos, getSortedTodos } from './utils';

function App() {
	const [newTodo, setNewTodo] = useState('');
	const [editingId, setEditingId] = useState(null);
	const [editingText, setEditingText] = useState('');
	const [searchQuery, setSearchQuery] = useState('');
	const [sortByAlphabet, setSortByAlphabet] = useState(false);

	const inputRef = useRef(null);

	const { todos, setTodos, isLoading, setIsLoading } = useRequestGetTodos();
	const { handleAdd, isCreating } = useRequestAddTodo(
		newTodo,
		setNewTodo,
		setTodos,
		setIsLoading,
	);
	const { handleDelete } = useRequestDeleteTodo(setTodos, setIsLoading);
	const { handleUpdate } = useRequestUpdateTodo(setTodos, setIsLoading, setEditingId);

	const handleCancel = createHandleCancel(setEditingId);
	const handleEdit = createHandleEdit(setEditingId, setEditingText);

	const filteredTodos = getFilteredTodos(todos, searchQuery);
	const sortedAndFilteredTodos = getSortedTodos(filteredTodos, sortByAlphabet);

	useEffect(() => {
		if (editingId !== null && inputRef.current) {
			inputRef.current.focus();
		}
	}, [editingId]);

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Список дел:</h1>
			<div className={styles.controls}>
				<input
					type="text"
					value={newTodo}
					onChange={(e) => setNewTodo(e.target.value)}
					placeholder="Новая задача"
					className={styles.input}
				/>
				<button
					onClick={handleAdd}
					className={styles.button}
					disabled={isCreating}
				>
					Добавить
				</button>
				<button
					onClick={() => setSortByAlphabet(!sortByAlphabet)}
					className={`${styles.button} ${sortByAlphabet ? styles.activeSort : ''}`}
				>
					{sortByAlphabet ? 'Отменить сортировку' : 'Сортировать по А-Я'}
				</button>
			</div>
			<div className={styles.search}>
				<input
					type="text"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					placeholder="Поиск задач"
					className={styles.input}
				/>
			</div>

			{isLoading && (
				<div className={styles.overlay}>
					<div className={styles.spinner}></div>
					<div className={styles.message}>Пожалуйста, подождите...</div>
				</div>
			)}

			<ul className={styles.list}>
				{sortedAndFilteredTodos.map(({ id, title }) => (
					<li key={id}>
						{editingId === id ? (
							<>
								<input
									type="text"
									ref={inputRef}
									value={editingText}
									onChange={(e) => setEditingText(e.target.value)}
									className={styles.inputEdit}
								/>
								<button
									className={styles.buttonSave}
									onClick={() => {
										handleUpdate(id, editingText);
									}}
								>
									Сохранить
								</button>
								<button
									className={styles.buttonCancel}
									onClick={handleCancel}
								>
									Отмена
								</button>
							</>
						) : (
							<>
								<span>{title}</span>
								<button
									className={styles.buttonUpdate}
									onClick={() => handleEdit(id, title)}
								>
									Изменить
								</button>
							</>
						)}
						<button
							className={styles.buttonDelete}
							onClick={() => handleDelete(id)}
						>
							Удалить
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}

export default App;
