import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initalMovie = {
  title: "",
  director: "",
  metascore: "",
  stars: "",
};

const UpdateMovie = (props) => {
  const { push } = useHistory();
  const [movie, setMovie] = useState(initalMovie);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        console.log(res);
        setMovie(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const changeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setMovie({
      ...movie,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, setMovie)
      .then((res) => {
        console.log(res);
        setMovie(initalMovie);
        push("/");
        props.setRefresh(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h2>Update Movie</h2>
      <form className="update-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="New Title"
          value={movie.title}
        />
        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="New Director"
          value={movie.director}
        />
        <input
          type="text"
          name="metascore"
          onChange={changeHandler}
          placeholder="New Metascore"
          value={movie.metascore}
        />
        <input type="text" name="stars" value={movie.stars} />
        <button>Update Movie</button>
      </form>
    </div>
  );
};

export default UpdateMovie;
