import { useCallback, useEffect, useState } from "react";

import "./stats.scss";
import MovieApi from "../../services/movie";
import BarChart from "../../chart/BarChat";
import { setMovieList } from "../../redux/movies";
import { Col, Container, Row } from "react-bootstrap";

const StatsPage = () => {
  const [topTenRated, setTopTenRated] = useState<IData[]>([]);
  const [topTenRated2, setTopTenRated2] = useState<IData[]>([]);

  function sortArray(array: any) {
    var temp = 0;
    for (var i = 0; i < array.length; i++) {
      for (var j = i; j < array.length; j++) {
        if (array[j] < array[i]) {
          temp = array[j];
          array[j] = array[i];
          array[i] = temp;
        }
      }
    }
    return array;
  }

  const getMovies = useCallback(async () => {
    try {
      let url = `/movie/top_rated`;
      let { data } = await MovieApi.get(url);

      let tenRcords = data?.results
        .sort((a: any) => sortArray(a?.vote_average)) // rating
        .slice(0, 10);

      let tenRcords2 = data?.results
        .sort((a: any) => sortArray(a?.vote_count)) // count
        .slice(0, 10);

      const formated = tenRcords?.map((item: any, index: any) => {
        return { label: item?.title, value: 10 - index };
      });

      const formated2 = tenRcords2?.map((item: any, index: any) => {
        return { label: item?.title, value: item.vote_count };
      });
      //setMovieList(tenRcords);

      setTopTenRated(formated);
      setTopTenRated2(formated2);
    } catch (error) {}
  }, []);

  useEffect(() => {
    getMovies();
  }, []);

  interface IData {
    label: string;
    value: number;
  }

  return (
    <div className="statsContainer">
      <Container>
        <Row>
          <Col sm={12} className={"my-5"}>
            <div className="graphContainer">
              <h2>Graph By Rating</h2>
              <BarChart data={topTenRated} />
            </div>
          </Col>
          <Col sm={12}>
            <div className="graphContainer">
              <h2>Graph By Vote Count</h2>
              <BarChart data={topTenRated2} />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default StatsPage;
