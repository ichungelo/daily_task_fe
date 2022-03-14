import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Movies from './pages/Movies';
import DetailMovie from './pages/DetailMovie';

const App = () => {
	return (
		<div>
			<Navbar />
			<BrowserRouter>
				<Route path="/" exact component={Landing} />
				<Route path="/login" exact component={Login} />
				<Route path="/register" exact component={Register} />
				<Route path="/movies" exact component={Movies} />
				<Route path="/movies/:movieId" exact component={DetailMovie} />
			</BrowserRouter>
		</div>
	);
};

export default App;

