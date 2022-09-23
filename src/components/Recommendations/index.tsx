import moment from "moment";
import { Link } from "react-router-dom";
import Dount from "../../chart/Donut/dount";
import { movie_uri } from "../../constant/baseUrl";

import "./recommendation.scss";
interface IProps {
  data: {
    adult: boolean;
    backdrop_path: string;
    genre_ids: any;
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    title: string;
    video: string;
    vote_average: number;
    vote_count: number;
  };
}
const Index = ({ data }: IProps) => {
  const image = data?.backdrop_path
    ? movie_uri + "original" + data?.backdrop_path
    : "/placeholder.jpg";

  const votes = [{ value: data?.vote_average * 10 }];

  return (
    <div className="recommendationCard">
      <img src={image} alt={data?.title} />
      <div className="content">
        <div className="left">
          <Link to={"#"}>
            <h3>{data?.title}</h3>
          </Link>
          <p>{moment(data?.release_date).format("YYYY")}</p>
        </div>

        <div className="right">
          <div className="chart">
            <Dount data={votes} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
