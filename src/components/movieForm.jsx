import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getMovie, saveMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";

class MovieForm extends Form {
	state = {
		data: {
			title: "",
			genreId: "",
			numberInStock: "",
			dailyRentalRate: "",
		},
		genres: [],
		errors: {},
	};

	schema = {
		_id: Joi.string(),
		title: Joi.string().required().label("Title"),
		genreId: Joi.string().required().label("Genre"),
		numberInStock: Joi.number()
			.required()
			.min(0)
			.max(100)
			.label("Number in Stock"),
		dailyRentalRate: Joi.number()
			.required()
			.min(0)
			.max(10)
			.label("Daily Rental Rate"),
	};

	async populateGenres() {
		const { data: genres } = await getGenres();
		this.setState({ genres });
	}

	async populateMovie() {
		try {
			const movieId = this.props.match.params.id;
			if (movieId === "new") return;

			const { data: movie } = await getMovie(movieId);
			this.setState({ data: this.mapToViewModel(movie) });
		} catch (ex) {
			if (ex.response && ex.response.status === 404)
				return this.props.history.replace("/not-found");
		}
	}

	async componentDidMount() {
		await this.populateGenres();
		await this.populateMovie();
	}

	mapToViewModel(movie) {
		return {
			_id: movie._id,
			title: movie.title,
			genreId: movie.genre._id,
			numberInStock: movie.numberInStock,
			dailyRentalRate: movie.dailyRentalRate,
		};
	}

	doSubmit = async () => {
		await saveMovie(this.state.data);

		this.props.history.push("/movies");
	};

	render() {
		return (
			<div>
				<h1>Movie Form</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput("title", "Title")}
					{this.renderSelect("genreId", "Genre", this.state.genres)}
					{this.renderInput("numberInStock", "Number in Stock", "number")}
					{this.renderInput("dailyRentalRate", "Rate")}
					{this.renderButton("Save")}
				</form>
			</div>
		);
	}
}

// in react router V6, you dont have access to useParams() and other hooks in class components
// you have to pass these params to your component in the props
// it would be done like this:

// const withRouter = WrappedComponent => props => {
//   const params = useParams();
//   const navigate = useNavigate();

//   return (
//       <WrappedComponent
//           {...props}
//           params={params}
//           navigate={navigate}
//       />
//   );
// };
// export default withRouter(MovieForm);

// you could then access the params like movieID in the above example as so:
// const movieId = this.props.params.id;

export default MovieForm;
