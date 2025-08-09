import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import styles from './Content.module.scss';

import { customSelector } from '../redux/custom/selectors';

import { Home } from '.';

const Cart = React.lazy(
	() => import(/* webpackChunkName: "Cart" */ '../pages/Cart')
);
const NotFound = React.lazy(
	() => import(/* webpackChunkName: "NotFound" */ '../pages/NotFound')
);
const ProductPage = React.lazy(
	() => import(/* webpackChunkName: "ProductPage" */ '../pages/ProductPage')
);
const Successful = React.lazy(
	() => import(/* webpackChunkName: "Successful" */ '../pages/Successful')
);

export const Content: React.FC = () => {
	const { stickyValue } = useSelector(customSelector);

	return (
		<div
			className={
				stickyValue ? `${styles.content} ${styles.sticky}` : `${styles.content}`
			}
		>
			<div className={styles.container}>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route
						path='/cart'
						element={
							<React.Suspense fallback={<div>Идёт загрузка корзины...</div>}>
								<Cart />
							</React.Suspense>
						}
					/>
					<Route
						path='/product/:id'
						element={
							<React.Suspense fallback={<div>Идёт загрузка страницы...</div>}>
								<ProductPage />
							</React.Suspense>
						}
					/>
					<Route path='/successful' element={<Successful />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
			</div>
		</div>
	);
};
