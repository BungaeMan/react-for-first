import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState([]);

  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setDetail(json.data.movie);
    setLoading(false);
  };
  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <a href={detail.url} target="_blank">
            <img src={detail.large_cover_image} />
          </a>
          <h2>{detail.title}</h2>
          <p>Ratings: {detail.rating}</p>
        </div>
      )}
    </div>
  );
}

export default Detail;
