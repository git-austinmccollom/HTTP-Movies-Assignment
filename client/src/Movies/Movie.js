import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, getMovieList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const history = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const deleteMovie = () => {
    axios
      .delete(`http://localhost:5000/api/movies/${params.id}`)
      .then((res) => {
        console.log(res);
        getMovieList();
        history.push(`/`)
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />
      <Link to={`/update-movie/${movie.id}`}>
        <div className="update-button">Update</div>
      </Link>
      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <button onClick={() => deleteMovie()} className="update-button">Delete</button>
    </div>
  );
}

export default Movie;
