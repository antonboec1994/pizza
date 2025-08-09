import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import type { RootState } from '../../../redux/store';
import { typeName, sizePrice } from '../../../redux/filters/slice';
import { addPizzaInCart, setFluidCartStatus } from '../../../redux/cart/slice';
import type { CartItem } from '../../../redux/cart/types';

import styles from './PizzaBlock.module.scss';

type PizzaBlockProps = {
	id: string;
	imageUrl: string;
	title: string;
	price: number;
	types: number[];
	sizes: number[];
	count: number;
	description: string;
	activePlusPrice: number;
};

export const PizzaBlock: React.FC<PizzaBlockProps> = ({
	id,
	imageUrl,
	title,
	price,
	types,
	sizes,
	description,
	count,
}) => {
	const [activeType, setActiveType] = React.useState(0);
	const [activeSize, setActiveSize] = React.useState(0);
	const [activePlusPrice, setActivePlusPrice] = React.useState(0);

	const dispatch = useDispatch();
	const itemInCart = useSelector((state: RootState) =>
		state.cart.pizzasInCart.find(
			(obj: any) =>
				obj.id === id &&
				obj.type === typeName[activeType] &&
				obj.size === sizes[activeSize]
		)
	);

	const addedCount: number = itemInCart ? itemInCart.count : 0;
	const pizza: CartItem = {
		id,
		imageUrl,
		title,
		price,
		type: typeName[activeType],
		size: sizes[activeSize],
		count,
		description,
		activePlusPrice,
	};

	const onClickAddPizza = () => {
		dispatch(addPizzaInCart({ ...pizza, activePlusPrice }));
		dispatch(setFluidCartStatus(true));
		setTimeout(() => {
			dispatch(setFluidCartStatus(false));
		}, 2000);
	};

	const onChangeSize = (i: number) => {
		setActiveSize(i);
		setActivePlusPrice(sizePrice[i].plus);
	};

	return (
		<div className={styles.item}>
			<img className={styles.item__image} src={imageUrl} alt='Pizza' />
			<Link to={`/product/${pizza.id}`} className={styles.item__title}>
				{title}
			</Link>
			<div className={styles.item__selector}>
				<ul>
					{types.map((type, i) => (
						<li
							className={activeType === i ? styles.active : ''}
							onClick={() => setActiveType(type)}
							key={i}
						>
							{typeName[type]}
						</li>
					))}
				</ul>
				<ul>
					{sizes.map((size, i) => (
						<li
							className={activeSize === i ? styles.active : ''}
							onClick={() => onChangeSize(i)}
							key={i}
						>
							{size} см.
						</li>
					))}
				</ul>
			</div>
			<div className={styles.item__bottom}>
				<div className={styles.item__price}>
					от {pizza.price + activePlusPrice} ₽
				</div>
				<div className={styles.item__buttons}>
					<button
						className={`${styles.button} ${styles.button_outline} ${styles.button_add}`}
						onClick={onClickAddPizza}
					>
						<svg
							width='12'
							height='12'
							viewBox='0 0 12 12'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
								fill='white'
							/>
						</svg>
						<span>Добавить</span>
						{addedCount > 0 && <i>{addedCount}</i>}
					</button>
				</div>
			</div>
		</div>
	);
};
