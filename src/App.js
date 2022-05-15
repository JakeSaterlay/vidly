import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import { Route, Routes, Navigate } from "react-router-dom";
import NavBar from "./components/navBar";
import "./App.css";
import React from "react";

function App() {
	return (
		<React.Fragment>
			<NavBar />
			<main className="container">
				<Routes>
					<Route path="/movies/:id" element={<MovieForm />}></Route>
					<Route path="/movies" element={<Movies />}></Route>
					<Route path="/customers" element={<Customers />}></Route>
					<Route path="/rentals" element={<Rentals />}></Route>
					<Route path="/not-found" element={<NotFound />}></Route>
					<Route path="/" element={<Navigate replace to="/movies" />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</main>
		</React.Fragment>
	);
}

export default App;
