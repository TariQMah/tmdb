import { useCallback, useEffect, useState, useRef } from "react";

import "./details.scss";
import { AiOutlineUnorderedList } from "@react-icons/all-files/ai/AiOutlineUnorderedList";
import { AiFillStar } from "@react-icons/all-files/ai/AiFillStar";
import { AiFillHeart } from "@react-icons/all-files/ai/AiFillHeart";
import { AiFillFacebook } from "@react-icons/all-files/ai/AiFillFacebook";
import { AiOutlineTwitter } from "@react-icons/all-files/ai/AiOutlineTwitter";
import { AiOutlineInstagram } from "@react-icons/all-files/ai/AiOutlineInstagram";
import { BsDot } from "@react-icons/all-files/bs/BsDot";
import { BsFillBookmarkFill } from "@react-icons/all-files/bs/BsFillBookmarkFill";
import { BsFillPlayFill } from "@react-icons/all-files/bs/BsFillPlayFill";
import { BsCollectionPlayFill } from "@react-icons/all-files/bs/BsCollectionPlayFill";
import { IoIosShareAlt } from "@react-icons/all-files/io/IoIosShareAlt";

import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { movie_uri } from "../../constant/baseUrl";
import {
  Col,
  Container,
  OverlayTrigger,
  Overlay,
  Row,
  Tooltip,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import Dount from "../../chart/Donut/dount";
import CastCard from "../../components/CastCard";
import RecommendationsCard from "../../components/Recommendations";
import Skeleton from "../../components/Skeleton";
import MovieApi from "../../services/movie";
import moment from "moment";
import { currencyFormat, getTimeFromMins, renderLanguage } from "../../utils";

const DetailsPage = () => {
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState<number>();
  const [ratingRes, setRatingRes] = useState<string>("");
  const target = useRef<any>(null);

  let { id } = useParams();

  const [toaster, setToaster] = useState(false);
  const [detailsData, setDetailsData] = useState<any>({});

  const [rating, setRating] = useState(0);

  let { loading, guestID } = useAppSelector((state: any) => state?.authModal);

  const rateMovie = useCallback(
    async (e: number) => {
      setRating(e);
      const url = `/movie/${id}/rating?guest_session_id=${guestID}`;
      const ratingSubmit = await MovieApi.set(url, {
        value: e,
      });

      const { data, status } = ratingSubmit;
      setStatus(status);
      setRatingRes(data?.status_message);
      setToaster(true);
      setShow(false);
    },
    [id, guestID]
  );

  const getMovieDetails = useCallback(async () => {
    try {
      let url = `/movie/${id}`;
      let creditsUrl = `/movie/${id}/credits`;
      let keyWords = `/movie/${id}/keywords`;
      let recommendations = `/movie/${id}/recommendations`;
      const returnApi = await Promise.all([
        MovieApi.get(url),
        MovieApi.get(creditsUrl),
        MovieApi.get(keyWords),
        MovieApi.get(recommendations),
      ]);

      setDetailsData({
        movie: returnApi[0]?.data,
        castCrew: returnApi[1]?.data,
        keyWords: returnApi[2]?.data,
        recommendations: returnApi[3]?.data,
      });
    } catch (error) {
      console.log("error: ", error);
    }
  }, [id]);

  useEffect(() => {
    getMovieDetails();
  }, [id]);

  let { movie, castCrew, keyWords, recommendations } = detailsData;

  const renderCrew = useCallback(() => {
    let response = [];

    response = castCrew?.crew?.slice(0, 12).map((item: any, index: any) => {
      return (
        <div key={index + item?.id}>
          <h4>
            <Link to={item?.id}>{item?.name}</Link>
          </h4>

          <span>{item?.known_for_department}</span>
        </div>
      );
    });
    return response;
  }, [castCrew?.crew]);

  const renderTopBilledCast = useCallback(() => {
    return castCrew?.cast?.map((item: any, index: number) => {
      return <CastCard key={index + "-" + item?.cast_id} data={item} />;
    });
  }, [castCrew?.cast]);

  const renderRecommendations = useCallback(() => {
    return recommendations?.results?.map((item: any, index: number) => {
      return <RecommendationsCard key={index + item?.id} data={item} />;
    });
  }, [recommendations?.results]);

  const renderTags = useCallback(() => {
    return keyWords?.keywords?.map((item: any, index: number) => {
      return (
        <Link to={"#"} key={index}>
          <div className="keyword">{item?.name}</div>
        </Link>
      );
    });
  }, [keyWords?.keywords]);

  return (
    <div className="detailsContainer">
      <ToastContainer className="toasterSetting" position={"top-end"}>
        <Toast
          bg={status === 201 ? "success" : "warning"}
          onClose={() => setToaster(false)}
          show={toaster}
          delay={3000}
          autohide
        >
          <Toast.Body>{ratingRes}</Toast.Body>
        </Toast>
      </ToastContainer>
      <div
        className="mainPoster"
        style={{
          backgroundImage: `url('${movie_uri}t/p/original${movie?.backdrop_path}')`,
        }}
      >
        <div className="overlay">
          <Container>
            <Row>
              <Col xs={12} sm={12} md={3} lg={3}>
                <div className="poster">
                  <img
                    src={movie_uri + "original" + movie?.poster_path}
                    alt={movie?.title}
                  />
                </div>
              </Col>
              <Col xs={12} sm={12} md={9} lg={9}>
                <div className="movieDetailsBlock">
                  <div className="title">
                    <h2>
                      <Link to={movie?.id}>{movie?.title}</Link>{" "}
                    </h2>

                    <span>({moment(movie?.release_date).format("YYYY")})</span>
                  </div>
                  <div className="movieFacts">
                    {movie?.adult ? (
                      <span className="certificate">R</span>
                    ) : (
                      <span className="certificate">PG-13</span>
                    )}

                    <span>
                      {moment(movie?.release_date)
                        .utcOffset(60)
                        .format("DD/MM/YYYY")}{" "}
                      (US)
                    </span>

                    <span>
                      <BsDot />
                      {movie?.genres?.map(
                        (item: any, index: any) =>
                          item?.name +
                          (movie?.genres?.length - 1 !== index ? "," : "") +
                          " "
                      )}
                    </span>
                    <span>
                      {" "}
                      <BsDot />
                      {getTimeFromMins(movie?.runtime)}
                    </span>
                  </div>

                  <div className="actions">
                    <div className="pieChart">
                      <div className="chart">
                        <Dount data={[{ value: 20 }]} />
                      </div>
                      <span>User Score</span>
                    </div>
                    <OverlayTrigger
                      key={"add-to-list"}
                      placement={"bottom"}
                      overlay={
                        <Tooltip id={`tooltip-bottom`}>Add to list</Tooltip>
                      }
                    >
                      <div className="icon">
                        <AiOutlineUnorderedList />
                      </div>
                    </OverlayTrigger>

                    <OverlayTrigger
                      key={"mark-as-list"}
                      placement={"bottom"}
                      overlay={
                        <Tooltip id={`tooltip-bottom`}>
                          Mark as favorite
                        </Tooltip>
                      }
                    >
                      <div className="icon">
                        <AiFillHeart />
                      </div>
                    </OverlayTrigger>
                    <OverlayTrigger
                      key={"add-to-watchlist"}
                      placement={"bottom"}
                      overlay={
                        <Tooltip id={`tooltip-bottom`}>
                          Add to your watchlist
                        </Tooltip>
                      }
                    >
                      <div className="icon">
                        <BsFillBookmarkFill />
                      </div>
                    </OverlayTrigger>
                    <Overlay
                      key={"rate-now"}
                      placement={"bottom"}
                      target={target?.current}
                      show={show}
                    >
                      <Tooltip id={`tooltip-bottom`}>
                        {[1, 2, 3, 4, 5].map((value) => (
                          <AiFillStar
                            key={value}
                            className={
                              value <= rating ? "selectedStars" : "stars"
                            }
                            //filled={value <= rating}
                            onClick={() => rateMovie(value)}
                          />
                        ))}
                      </Tooltip>
                    </Overlay>
                    <OverlayTrigger
                      key={"Rate-Now"}
                      placement={"bottom"}
                      overlay={
                        <Tooltip id={`tooltip-bottom`}>Rate Now</Tooltip>
                      }
                    >
                      <div
                        className="icon"
                        ref={target}
                        onClick={() => setShow(!show)}
                      >
                        <AiFillStar />
                      </div>
                    </OverlayTrigger>

                    {movie?.video && (
                      <div className="playTrailer">
                        <BsFillPlayFill />
                        <span>Play Trailer</span>
                      </div>
                    )}
                  </div>

                  <div className="details">
                    <span>{movie?.tagline}</span>

                    <h3>Overview</h3>
                    <p>{movie?.overview}</p>
                    <div className="mainCast">{renderCrew()}</div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>

      <Container className="contentArea">
        <Row>
          <Col sm={9}>
            <div className="castContainer">
              <h2>Top Billed Cast</h2>
              <div className="castGrid">
                <div className="overlay">
                  {loading
                    ? [...Array(12)].map((e, i) => (
                        <Skeleton cssClass="castCard skeletonCast" key={i} />
                      ))
                    : renderTopBilledCast()}
                </div>
              </div>
              <br />
              <br />
              <h2>Recommendations</h2>
              <div className="castGrid">
                <div className="overlay">
                  {loading
                    ? [...Array(12)].map((e, i) => (
                        <Skeleton
                          cssClass="castCard skeletonRecommend"
                          key={i}
                        />
                      ))
                    : renderRecommendations()}
                </div>
              </div>
            </div>
          </Col>
          <Col sm={3}>
            <div className="rightSideBar">
              <div className="socialIcons">
                <OverlayTrigger
                  key={"Facebook"}
                  placement={"bottom"}
                  overlay={
                    <Tooltip id={`tooltip-bottom`}>Visit Facebook</Tooltip>
                  }
                >
                  <div className="icon">
                    <AiFillFacebook />
                  </div>
                </OverlayTrigger>
                <OverlayTrigger
                  key={"twitter"}
                  placement={"bottom"}
                  overlay={
                    <Tooltip id={`tooltip-bottom`}>Visit Twitter</Tooltip>
                  }
                >
                  <div className="icon">
                    <AiOutlineTwitter />
                  </div>
                </OverlayTrigger>
                <OverlayTrigger
                  key={"instagram"}
                  placement={"bottom"}
                  overlay={
                    <Tooltip id={`tooltip-bottom`}>Visit Instagram</Tooltip>
                  }
                >
                  <div className="icon">
                    <AiOutlineInstagram />
                  </div>
                </OverlayTrigger>
                <OverlayTrigger
                  key={"play"}
                  placement={"bottom"}
                  overlay={<Tooltip id={`tooltip-bottom`}>Visit Play</Tooltip>}
                >
                  <div className="icon">
                    <BsCollectionPlayFill />
                  </div>
                </OverlayTrigger>
                <OverlayTrigger
                  key={"share"}
                  placement={"bottom"}
                  overlay={<Tooltip id={`tooltip-bottom`}>Visit Share</Tooltip>}
                >
                  <div className="icon">
                    <IoIosShareAlt />
                  </div>
                </OverlayTrigger>
              </div>
              <p>
                <b>Status</b>
                {movie?.status}
              </p>
              <p>
                <b>Original Language</b>
                {renderLanguage(
                  movie?.spoken_languages,
                  movie?.original_language
                )}
              </p>
              <p>
                <b>Budget</b>
                {movie?.budget === 0
                  ? "-"
                  : currencyFormat.format(movie?.budget)}
              </p>
              <p>
                <b>Revenue</b>
                {currencyFormat.format(movie?.revenue)}
              </p>
              <p>
                <b>Keywords</b>
              </p>
              <div className="keywords">{renderTags()}</div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DetailsPage;
