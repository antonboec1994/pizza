import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

import { ProductPageSkeleton } from '../components';
import { useAppDispatch, type RootState } from '../redux/store';
import { getItemsSelector } from '../redux/getItems/selectors';
import { fetchAllPizzas } from '../redux/getItems/slice';
import type { CartItem } from '../redux/cart/types';
import { sizePrice, typeName } from '../redux/filters/slice';
import { addPizzaInCart, setFluidCartStatus } from '../redux/cart/slice';

import styles from '../components/Content.module.scss';

import redPepper from '../assets/images/red-pepper.png';

const ProductPage: React.FC = () => {
	const [activeType, setActiveType] = React.useState<number>(0);
	const [activeSize, setActiveSize] = React.useState<number>(0);
	const [activePlusPrice, setActivePlusPrice] = React.useState<number>(0);

	const dispatch = useAppDispatch();
	const { allPizzas, statusAll } = useSelector(getItemsSelector);
	const { id } = useParams<string>();
	let pizzaFounded: boolean = false;

	const getAllPizzas = async () => {
		dispatch(fetchAllPizzas());
	};

	React.useEffect(() => {
		getAllPizzas();
	}, []);

	const findProduct = allPizzas.find((obj: any, i: number) => {
		if (obj.id === id) {
			return allPizzas[i];
		}
	});

	let pizza: CartItem;
	let addedCount: number = 0;
	let currentItemSize: number = 0;

	if (findProduct) {
		pizzaFounded = true;
		pizza = {
			id: findProduct.id,
			imageUrl: findProduct.imageUrl,
			title: findProduct.title,
			price: findProduct.price,
			type: typeName[activeType],
			size: findProduct.sizes[activeSize],
			description: findProduct.description,
			count: findProduct.count,
			activePlusPrice: findProduct.activePlusPrice,
		};
		currentItemSize = findProduct.sizes[activeSize];
	} else {
		pizzaFounded = false;
	}

	const itemInCart = useSelector((state: RootState) =>
		state.cart.pizzasInCart.find(
			(obj: any) =>
				obj.id === id &&
				obj.type === typeName[activeType] &&
				obj.size === currentItemSize
		)
	);
	if (itemInCart) {
		addedCount = itemInCart.count;
	}

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
		<>
			{statusAll === 'error' || pizzaFounded === false ? (
				<div>
					<h2>Ошибка, пиццы с выбранными параметрами не существует!</h2>
				</div>
			) : (
				<div className={styles.product}>
					{statusAll === 'loading' ? (
						<ProductPageSkeleton />
					) : (
						<div>
							<div className={styles.product__inner}>
								<div className={styles.product__inner_imagebox}>
									<img src={findProduct?.imageUrl} alt='image' />
								</div>
								<div className={styles.product__inner_info}>
									<div className={styles.product__info_title}>
										{findProduct?.title}
									</div>
									<div className={styles.product__info_text}>
										Выберите тип пиццы для добавления в корзину:
									</div>
									<div className={styles.product__info_variables}>
										<ul className={styles.product__varialbes_box}>
											{findProduct?.types.map((type: any, i: number) => (
												<li
													className={
														activeType === i
															? `${styles.product__variables_type} ${styles.active}`
															: styles.product__variables_type
													}
													onClick={() => setActiveType(type)}
													key={i}
												>
													{typeName[type]}
												</li>
											))}
										</ul>
										<ul className={styles.product__varialbes_box}>
											{findProduct?.sizes.map((size: any, i: number) => (
												<li
													className={
														activeSize === i
															? `${styles.product__variables_size} ${styles.active}`
															: styles.product__variables_size
													}
													onClick={() => onChangeSize(i)}
													key={i}
												>
													{size} см.
												</li>
											))}
										</ul>
									</div>
									<div className={styles.product__info_price}>
										{findProduct ? findProduct.price + activePlusPrice : null} ₽
									</div>
									<div className={styles.product__addtocart_buttons}>
										<button
											className={styles.product__addtocart_btn}
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
							<div className={styles.product__descr}>
								{findProduct?.description}
								<img
									className={styles.product__redpepper}
									src={redPepper}
									alt='image'
								/>
							</div>
							<Link className={styles.product__return} to='/'>
								Вернуться назад
							</Link>
						</div>
					)}
				</div>
			)}
		</>
	);
};

export default ProductPage;
