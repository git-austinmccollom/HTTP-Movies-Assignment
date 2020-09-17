import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Movie from "./Movie";

const initialMovie = {
  id: 0,
  title: "",
  director: "",
  metascore: 0,
  stars: [],
};

export default function UpdateMovie(props) {
  const [movie, setMovie] = useState(initialMovie);
  const params = useParams();
  const history = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

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
      .put(`http://localhost:5000/api/movies/${params.id}`, movie)
      .then((res) => {
        console.log(res.data);
        // history.push(`movies/${movie.id}`)
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
          type="text"
          name="metascore"
          value={movie.metascore}
          onChange={handleChange}
        />
      </label>
      <button>submit</button>
    </form>
  );
}
