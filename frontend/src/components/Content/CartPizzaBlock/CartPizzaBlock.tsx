import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	addPizzaInCart,
	removePizzaInCart,
	minusPizzaInCart,
} from '../../../redux/cart/slice';
import type { CartItem } from '../../../redux/cart/types';
import { sizePrice } from '../../../redux/filters/slice';

import styles from '../../Content.module.scss';

type CartPizzaBlockProps = {
	id: string;
	title: string;
	price: number;
	count: number;
	type: string;
	size: number;
	imageUrl: string;
	description: string;
	activePlusPrice: number;
};

export const CartPizzaBlock: React.FC<CartPizzaBlockProps> = ({
	id,
	title,
	price,
	count,
	type,
	size,
	imageUrl,
	description,
	activePlusPrice,
}) => {
	const dispatch = useDispatch();

	const pizza: CartItem = {
		id,
		imageUrl,
		title,
		price,
		size,
		type,
		description,
		count,
		activePlusPrice,
	};

	const selectedSize = sizePrice.find((item: any) => item.size === size);
	const plusPizzaPrice = selectedSize?.plus || 0;

	const onClickAddPizza = () => {
		dispatch(addPizzaInCart(pizza));
	};

	const onClickMinusPizza = () => {
		dispatch(minusPizzaInCart(pizza));
	};

	const onClickRemovePizza = () => {
		if (window.confirm('Удалить выбранные пиццы?')) {
			dispatch(removePizzaInCart(pizza));
		}
	};

	return (
		<div className={styles.item}>
			<div className={styles.item__img}>
				<img className={styles.pizza_block__image} src={imageUrl} alt='Pizza' />
			</div>
			<div className={styles.item__info}>
				<Link className={styles.item__info_title} to={`/product/${pizza.id}`}>
					{title}
				</Link>
				<p>
					{type}, {size} см
				</p>
			</div>
			<div className={styles.item__box}>
				<div className={styles.item__count}>
					<div
						onClick={onClickMinusPizza}
						className={`${styles.button} ${styles.button_outline} ${styles.button_circle} ${styles.item__count_minus}`}
					>
						<svg
							width='10'
							height='10'
							viewBox='0 0 10 10'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z'
								fill='#EB5A1E'
							/>
							<path
								d='M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z'
								fill='#EB5A1E'
							/>
						</svg>
					</div>
					<b>{count}</b>
					<div
						onClick={onClickAddPizza}
						className={`${styles.button} ${styles.button_outline} ${styles.button_circle} ${styles.item__count_plus}`}
					>
						<svg
							width='10'
							height='10'
							viewBox='0 0 10 10'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z'
								fill='#EB5A1E'
							/>
							<path
								d='M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z'
								fill='#EB5A1E'
							/>
						</svg>
					</div>
				</div>
				<div className={styles.item__price}>
					<b>{(price + plusPizzaPrice) * count} ₽</b>
				</div>
				<div onClick={onClickRemovePizza} className={styles.item__remove}>
					<div
						className={`${styles.button} ${styles.button_outline} ${styles.button_circle}`}
					>
						<svg
							width='10'
							height='10'
							viewBox='0 0 10 10'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z'
								fill='#EB5A1E'
							/>
							<path
								d='M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z'
								fill='#EB5A1E'
							/>
						</svg>
					</div>
				</div>
			</div>
		</div>
	);
};
