import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const initialMovie = {
  id: null,
  title: "",
  director: "",
  metascore: null,
  stars: [],
};

export default function AddMovie({ getMovieList }) {
  const [movie, setMovie] = useState(initialMovie);
  const history = useHistory();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setMovie({
      ...movie,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/api/movies/`, movie)
      .then((res) => {
        console.log(res.data);
        getMovieList();
        history.push(`/`)
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <form className={"update-form"} onSubmit={handleSubmit}>
      <label>
        Title
        <input
          type="text"
          name="title"
          value={movie.title}
          onChange={handleChange}
        />
      </label>
      <label>
        Director
        <input
          type="text"
          name="director"
          value={movie.director}
          onChange={handleChange}
        />
      </label>
      <label>
        Metascore
        <input
          type="number"
          name="metascore"
          value={movie.metascore}
          onChange={handleChange}
        />
      </label>
      <button>submit</button>
      {/* <label>
          Stars
          <input
          type='text'
          name='stars'
          value={movie.stars[0]}
          onChange={handleStarsChange}
          />
      </label> */}
    </form>
  );
}
