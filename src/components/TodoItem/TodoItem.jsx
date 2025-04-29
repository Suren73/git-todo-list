import React from 'react';
import { createHandleCancel, createHandleEdit, createInputHandler } from '../../handlers';
import styles from './TodoItem.module.css';

export const TodoItem = ({
	id,
	title,
	editingId,
	setEditingId,
	inputRef,
	editingText,
	setEditingText,
	handleUpdate,
	handleDelete,
	isDeleting,
	isUpdating,
}) => {
	const handleCancel = createHandleCancel(setEditingId);
	const handleEdit = createHandleEdit(setEditingId, setEditingText);

	return (
		<li className={styles.listItem}>
			{editingId === id ? (
				<>
					<input
						type="text"
						ref={inputRef}
						value={editingText}
						onChange={createInputHandler(setEditingText)}
						className={styles.inputEdit}
					/>
					<button
						className={styles.buttonSave}
						onClick={() => {
							handleUpdate(id, editingText);
						}}
						disabled={isUpdating}
					>
						Сохранить
					</button>
					<button className={styles.buttonCancel} onClick={handleCancel}>
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
				disabled={isDeleting}
			>
				Удалить
			</button>
		</li>
	);
};
