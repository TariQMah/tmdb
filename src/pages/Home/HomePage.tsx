import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useId,
} from "react";

import Search from "../../components/Search";
import MovieCard from "../../components/MovieCard";
import Skeleton from "../../components/Skeleton";
import SortComponent from "../../components/SortComponent";
import { Col, Row, Spinner, Container } from "react-bootstrap";
import MovieApi from "../../services/movie";
import { useAppSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import { setMovieList } from "../../redux/movies";
import { Link, useNavigate } from "react-router-dom";
const HomePage = () => {
  const cardID = useId();
  let navigate = useNavigate();

  const [activeSort, setActiveSort] = useState<string>("now_playing");
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [sortBy, setSortBy] = useState<string>("title");
  let { loading, movies_list } = useAppSelector(
    (state: any) => state?.moviesModal
  );

  const dispatch = useDispatch();
  const sortByAction = useCallback(
    (e: string) => {
      setSortBy(e);
      setSortOrder((sortOrder) => (sortOrder === "asc" ? "desc" : "asc"));
      const items = [...movies_list];

      let sorted = [];
      if (e === "vote") {
        sorted = items.sort((firstObject: any, secondObject: any) => {
          const parsedA = firstObject.vote_average;
          const parsedB = secondObject.vote_average;
          return sortOrder === "asc"
            ? parsedA > parsedB
              ? -1
              : 1
            : parsedA < parsedB
            ? -1
            : 1;
        });
      } else {
        sorted = items.sort((firstObject: any, secondObject: any) =>
          sortOrder === "asc"
            ? firstObject.title?.toLowerCase() >
              secondObject.title?.toLowerCase()
              ? 1
              : -1
            : firstObject.title?.toLowerCase() <
              secondObject.title?.toLowerCase()
            ? 1
            : -1
        );
      }

      dispatch(setMovieList(sorted));
    },
    [dispatch, movies_list, sortOrder]
  );
  const getMovies = useCallback(async () => {
    try {
      let url = `/movie/${activeSort}`;
      let { data } = await MovieApi.get(url);

      dispatch(setMovieList(data?.results));
      sortByAction(sortBy);
    } catch (error) {}
  }, [activeSort, dispatch, sortBy, sortByAction]);

  useEffect(() => {
    getMovies();
  }, [activeSort]);

  const onSortClick = useCallback(
    (value: string) => {
      setActiveSort(value);
    },
    [activeSort]
  );
  const filterObject = useMemo(() => {
    return [
      {
        id: 1,
        value: "now_playing",
        label: "Now Playing",
      },
      {
        id: 2,
        value: "top_rated",
        label: "Top Rated",
      },
      {
        id: 3,
        value: "upcoming",
        label: "Upcoming",
      },
      {
        id: 4,
        value: "popular",
        label: "Popular",
      },
    ];
  }, []);

  const renderFilters = useCallback(() => {
    let response = filterObject?.map((item, index) => {
      return (
        <SortComponent
          key={index}
          value={item?.value}
          title={item?.label}
          active={activeSort === item?.value}
          onSortClick={onSortClick}
        />
      );
    });
    return response;
  }, [activeSort, filterObject, onSortClick]);

  const renderData = useCallback(() => {
    return movies_list?.map((movie: any, index: any) => (
      <Link to={`/movie/${movie?.id}`} key={cardID + index}>
        <MovieCard data={movie} />
      </Link>
    ));
  }, [movies_list]);

  const navigateToSearch = useCallback(
    (event: any) => {
      navigate(`/search?movie=${event}`);
    },
    [navigate]
  );

  return (
    <Container className="main-body">
      <div className="heroSection">
        <div className="alignMiddle">
          <h2>Welcome.</h2>
          <h3>
            Millions of movies, TV shows and people to discover. Explore now.
          </h3>

          <Search onSubmit={navigateToSearch} />
        </div>
      </div>

      <div className="moviesSection">
        <Row className="filtersSection">
          <Col xs={12} sm={12} md={6}>
            <h2>All Movies</h2>
          </Col>
          <Col xs={12} sm={12} md={6}>
            <div className="fitlers">
              <Suspense key={cardID} fallback={<Spinner animation="grow" />}>
                {renderFilters()}
              </Suspense>
            </div>
          </Col>
        </Row>

        <Row className="filtersSection">
          <Col xs={12} sm={12} md={6}>
            <div className="fitlers">
              <SortComponent
                key={"title"}
                value={"title"}
                title={"Sort By Title"}
                active={sortBy === "title"}
                onSortClick={sortByAction}
              />
              <SortComponent
                key={"vote"}
                value={"vote"}
                title={"Sort By Rating"}
                active={sortBy === "vote"}
                onSortClick={sortByAction}
              />
            </div>
          </Col>
        </Row>

        <div className="moviesGrid">
          {loading
            ? [...Array(12)].map((e, i) => <Skeleton key={i} />)
            : renderData()}
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
