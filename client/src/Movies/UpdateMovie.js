import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

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

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  return (
    <form className={'update-form'}>
      <label>Title
          <input
          type='text'
          name='Title'
          />
      </label>
      <label>Director
          <input
          type='text'
          name='Director'
          />
      </label>
      <label>Metascore
          <input
          type='text'
          name='Metascore'
          />
      </label>
    </form>
  );
}
