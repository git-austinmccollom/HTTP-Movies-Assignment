import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Star from "./Star";

const initialMovie = {
  id: null,
  title: "",
  director: "",
  metascore: null,
  stars: [],
};

export default function AddMovie({ getMovieList }) {
  const [movie, setMovie] = useState(initialMovie);
  const [starTemp, setStarTemp] = useState("");
  const history = useHistory();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setMovie({
      ...movie,
      [name]: value,
    });
  };

  const handleStarChange = (e) => {
    setStarTemp(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/api/movies/`, movie)
      .then((res) => {
        console.log(res.data);
        getMovieList();
        history.push(`/`);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const addStar = (e) => {
    setMovie({
      ...movie,
      stars: [...movie.stars, starTemp],
    });
    setStarTemp("");
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
      <label>
        Add Star:
        <div className="stars-div">
          <input
            type="text"
            name="stars"
            value={starTemp}
            onChange={handleStarChange}
          />
          <button
            type="button"
            onClick={() => {
              addStar();
            }}
          >
            Add Star
          </button>
          {movie.stars.map((st) => {
            return <p>{st}</p>;
          })}
        </div>
      </label>
      <button>submit</button>
    </form>
  );
}
