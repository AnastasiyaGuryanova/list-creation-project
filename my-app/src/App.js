import { useState } from 'react';
import styles from './app.module.css';

const getTime = () => {
	const currentDate = new Date();
	const currentTime = currentDate.toTimeString().substring(0, 8);
	return currentTime;
};

const getDate = () => {
	const currentDate = new Date()
		.toISOString()
		.substring(0, 10)
		.split('-')
		.reverse()
		.join('.');
	return currentDate;
};

export const App = () => {
	const [value, setValue] = useState('');
	const [list, setList] = useState([]);
	const [error, setError] = useState('');
	const [isValueVaild, setIsValueValid] = useState(false);

	const onAddButtonClick = () => {
		const updatedList = [
			...list,
			{
				id: Date.now(),
				value: value,
				date: ' от ' + getDate() + ' ' + getTime(),
			},
		];
		setList(updatedList);
		setValue('');
		setError('');
		setIsValueValid(false);
	};

	const onInputButtonClick = () => {
		const promptValue = prompt('Введите значение');
		if (promptValue.length < 3) {
			setError('Введенное значение должно содержать минимум 3 символа');
			setIsValueValid(false);
		} else {
			setError('');
			setValue(promptValue);
			setIsValueValid(true);
		}
	};

	return (
		<div className={styles.app}>
			<h1 className={styles['page-heading']}>Ввод значения</h1>
			<p className={styles['no-margin-text']}>
				Текущее значение <code>value</code>: "
				<output className={styles['current-value']}>{value}</output>"
			</p>
			{error !== '' && <div className={styles.error}>{error}</div>}
			<div className={styles['buttons-container']}>
				<button className={styles.button} onClick={onInputButtonClick}>
					Ввести новое
				</button>
				<button
					className={styles.button}
					disabled={!isValueVaild}
					onClick={onAddButtonClick}
				>
					Добавить в список
				</button>
			</div>
			<div className={styles['list-container']}>
				<h2 className={styles['list-heading']}>Список:</h2>
				{list.length > 0 ? (
					<ul className={styles.list}>
						{list.map((item) => (
							<li className={styles['list-item']} key={item.id}>
								{item.value}
								<span className={styles['list-item-date']}>
									{item.date}
								</span>
							</li>
						))}
					</ul>
				) : (
					<p className={styles['no-margin-text']}>Нет добавленных элементов</p>
				)}
			</div>
		</div>
	);
};
