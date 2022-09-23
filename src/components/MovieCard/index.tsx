import React from "react";
import Dount from "../../chart/Donut/dount";
import moment from "moment";
import { movie_uri } from "../../constant/baseUrl";
interface dataProps {
  backdrop_path: string;
  id: number;
  original_language: string;
  original_title: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: number;
}
interface DountIProps {
  data: dataProps;
}
const Index = ({ data }: DountIProps) => {
  const votes = [{ value: data?.vote_average }];

  return (
    <div className="fadeCard">
      <div className="poster">
        <img src={movie_uri + "w300/" + data?.poster_path} alt={data?.title} />
        <div className="rating">
          <Dount data={votes} />
        </div>
      </div>
      <div className="heading">
        <h2>{data?.title}</h2>
        <p>{moment(data?.release_date).format("MMM Do YYYY")}</p>
      </div>
    </div>
  );
};

export default React.memo(Index);
