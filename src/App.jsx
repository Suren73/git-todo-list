import React, { useEffect, useRef, useState } from 'react';
import styles from './App.module.css';
import { LoadingOverlay, SearchBar, SortButton, TodoForm, TodoList } from './components';

import {
	useRequestAddTodo,
	useRequestDeleteTodo,
	useRequestGetTodos,
	useRequestUpdateTodo,
} from './hooks';

function App() {
	const [newTodo, setNewTodo] = useState('');
	const [editingId, setEditingId] = useState(null);
	const [editingText, setEditingText] = useState('');
	const [searchQuery, setSearchQuery] = useState('');
	const [sortByAlphabet, setSortByAlphabet] = useState(false);

	const { todos, isLoading } = useRequestGetTodos();
	const { handleAdd, isCreating } = useRequestAddTodo(newTodo, setNewTodo);
	const { handleDelete, isDeleting } = useRequestDeleteTodo();
	const { handleUpdate, isUpdating } = useRequestUpdateTodo(setEditingId);

	const inputRef = useRef(null);

	useEffect(() => {
		if (editingId !== null && inputRef.current) {
			inputRef.current.focus();
		}
	}, [editingId]);

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Список дел:</h1>
			<TodoForm
				newTodo={newTodo}
				setNewTodo={setNewTodo}
				handleAdd={handleAdd}
				isCreating={isCreating}
			/>
			<SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
			{isLoading && <LoadingOverlay />}
			<SortButton
				sortByAlphabet={sortByAlphabet}
				setSortByAlphabet={setSortByAlphabet}
			/>
			<TodoList
				todos={todos}
				searchQuery={searchQuery}
				sortByAlphabet={sortByAlphabet}
				editingId={editingId}
				setEditingId={setEditingId}
				inputRef={inputRef}
				editingText={editingText}
				setEditingText={setEditingText}
				handleUpdate={handleUpdate}
				handleDelete={handleDelete}
				isDeleting={isDeleting}
				isUpdating={isUpdating}
			/>
		</div>
	);
}

export default App;
