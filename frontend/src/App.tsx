import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import styles from './App.module.scss';
import './assets/scss/libs/normalize.scss';

import { Content, Header } from './components';

const App: React.FC = () => {
	const headerRef = React.createRef<HTMLDivElement>();

	return (
		<BrowserRouter>
			<div className='App'>
				<div className={styles.wrapper}>
					<Header ref={headerRef} />
					<Content />
				</div>
			</div>
		</BrowserRouter>
	);
};

export default App;
