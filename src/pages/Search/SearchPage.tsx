import { useCallback, useEffect, useState } from "react";

import "./search.scss";
import MovieApi from "../../services/movie";
import { Col, Container, Row } from "react-bootstrap";
import { movie_uri } from "../../constant/baseUrl";
import { Link } from "react-router-dom";
import moment from "moment";

const SearchPage = () => {
  const [searchResult, setSearchResult] = useState<any>([]);
  const [generies, setGeneries] = useState<any>([]);

  const urlParams = new URLSearchParams(window.location.search);
  const searchParams = urlParams.get("movie");

  const getSearchMovies = useCallback(async () => {
    try {
      let url = `/search/movie?query=${searchParams}`;

      let genere = `/genre/movie/list`;
      const returnApi = await Promise.all([
        MovieApi.get(url),
        MovieApi.get(genere),
      ]);

      setSearchResult(returnApi[0]?.data?.results);
      setGeneries(returnApi[1]?.data?.genres);
    } catch (error) {
      console.log("error: ", error);
    }
  }, [searchParams]);
  function checkInGenery(value: any) {
    return (
      " " +
      generies?.filter((item: any, index: any) => item?.id === value)[0]?.name
    );
  }
  const renderMatchedGeneries = (array: any) => {
    let response = [];
    const found = array?.map((item: any) => checkInGenery(item));
    response = found;

    return response.toString();
  };

  useEffect(() => {
    getSearchMovies();
  }, [searchParams]);

  const renderMovieCard = useCallback(() => {
    return searchResult?.map((item: any, index: number) => (
      <Link to={`/movie/${item?.id}`} key={index + Math.random().toFixed(2)}>
        <div className="searchResultCard">
          <div className="poster">
            <img
              src={movie_uri + "w154/" + item?.poster_path}
              alt={item?.title}
            />
          </div>

          <div className="details">
            <h2>Graph By Rating</h2>
            <p>
              {renderMatchedGeneries(item?.genre_ids)} |{" "}
              {moment(item?.release_date).format("MMM Do YYYY")}
            </p>
            <p>{item?.overview}</p>
          </div>
        </div>
      </Link>
    ));
  }, [searchResult]);
  return (
    <div className="searchContainer">
      <Container>
        <Row>
          <Col sm={24} className={"my-5"}>
            {renderMovieCard()}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SearchPage;
