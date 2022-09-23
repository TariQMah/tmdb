import { Link } from "react-router-dom";
import { movie_uri } from "../../constant/baseUrl";

import "./castCard.scss";
interface IProps {
  data: {
    adult: boolean;
    cast_id: number;
    character: string;
    credit_id: string;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    order: number;
    original_name: string;
    popularity: number;
    profile_path: string;
  };
}
const Index = ({ data }: IProps) => {
  const image = data?.profile_path
    ? movie_uri + "original" + data?.profile_path
    : "/placeholder.jpg";
  return (
    <div className="castCard">
      <img src={image} alt={data?.name} />
      <div className="content">
        <Link to={"#"}>
          <h3>{data?.name}</h3>
        </Link>
        <p>{data?.character}</p>
      </div>
    </div>
  );
};

export default Index;
