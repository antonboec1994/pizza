import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { Search } from '.';

import { cartSelector } from '../redux/cart/selectors';
import { customSelector } from '../redux/custom/selectors';
import { setStickyValue } from '../redux/custom/slice';
import { getItemsSelector } from '../redux/getItems/selectors';

import styles from './Header.module.scss';

import logo from '../assets/images/logo.png';

type HeaderProps = React.ComponentPropsWithoutRef<'div'>;

export const Header = React.forwardRef<HTMLDivElement, HeaderProps>(
	(props, ref) => {
		const dispatch = useDispatch();
		const {
			pizzasInCart,
			totalPricePizzasInCart,
			totalCountPizzasInCart,
			currentAddedPizza,
			fluidCartStatus,
		} = useSelector(cartSelector);
		const { status } = useSelector(getItemsSelector);
		const { stickyValue } = useSelector(customSelector);

		const location = useLocation();
		const isMounted = React.useRef(false);

		const isSticky = () => {
			const scrollTop = window.scrollY;
			scrollTop >= 70
				? dispatch(setStickyValue(true))
				: dispatch(setStickyValue(false));
		};

		React.useEffect(() => {
			window.addEventListener('scroll', isSticky);
			return () => {
				window.removeEventListener('scroll', isSticky);
			};
		});

		React.useEffect(() => {
			if (isMounted.current) {
				const json = JSON.stringify(pizzasInCart);
				localStorage.setItem('cart', json);
			}
			isMounted.current = true;
		}, [pizzasInCart]);

		return (
			<div
				className={
					stickyValue ? `${styles.header} ${styles.sticky}` : `${styles.header}`
				}
				ref={ref}
				{...props}
			>
				<div className={styles.container}>
					<Link className={styles.header__logo} to='/'>
						<img src={logo} alt='Pizza logo' />
						<div>
							<h1>Pizza</h1>
							<p>самая вкусная пицца во вселенной</p>
						</div>
					</Link>
					{location.pathname === '/' ? <Search /> : ''}
					{location.pathname !== '/cart' && (
						<div className={styles.header__cart}>
							<Link
								to='/cart'
								className={`${styles.button} ${styles.button_cart}`}
							>
								<span>{totalPricePizzasInCart} ₽</span>
								<div className={styles.button_delimiter}></div>
								<svg
									width='18'
									height='18'
									viewBox='0 0 18 18'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										d='M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z'
										stroke='white'
										strokeWidth='1.8'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
									<path
										d='M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z'
										stroke='white'
										strokeWidth='1.8'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
									<path
										d='M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669'
										stroke='white'
										strokeWidth='1.8'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								</svg>
								<span>
									{pizzasInCart.length > 0 ? totalCountPizzasInCart : '0'}
								</span>
							</Link>
						</div>
					)}
				</div>
				{status === 'success' ? (
					<div
						className={`${styles.header__fluid} ${
							fluidCartStatus ? styles.active : ''
						}`}
					>
						<div className={styles.header__fluid_item}>
							<img
								className={styles.header__fluid_image}
								src={currentAddedPizza.imageUrl}
								alt='fluid'
							/>
							<div className={styles.header__fluid__item_info}>
								<div className={styles.header__fluid_title}>
									{currentAddedPizza.title}
								</div>
								<div className={styles.header__fluid_params}>
									{currentAddedPizza.type}, {currentAddedPizza.size} см
								</div>
							</div>
						</div>
					</div>
				) : (
					''
				)}
			</div>
		);
	}
);
