import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadSpotReviews } from "../../store/reviews";
import { CreateNewReviewModal } from "./CreateReviewModal";
import { useEffect, useState } from "react";
import { deleteSpotReview } from "../../store/reviews";
import "./ReviewsAll.css";

export const AllSpotReviews = ({ avgStars }) => {
  const [loadedReviews, setLoadedReviews] = useState(false);

  const dispatch = useDispatch();
  const { spotId } = useParams();
  const oldAllReviews = useSelector((state) => state.reviews.spot);
  const currUser = useSelector((state) => state.session.user);

  const currSpot = useSelector((state) => state.spots.singleSpot);

  const allReviews = Object.values(oldAllReviews);

  const avgStars2 = parseFloat(avgStars);

  const newAvgStars = avgStars2.toFixed(2);

  const numOfRev = allReviews.length;

  const specificRev = allReviews.find((rev) => currUser?.id === rev?.userId);

  useEffect(() => {
    dispatch(loadSpotReviews(spotId)).then(() => setLoadedReviews(true));
  }, [dispatch, numOfRev, newAvgStars]);

  const handleDelete = async (e) => {
    await dispatch(deleteSpotReview(specificRev));
  };
  if (!loadedReviews)
    return (
      <div className="blank-review-add-button">
        <CreateNewReviewModal alreadyRev={specificRev} />
      </div>
    );

  return (
    <div className="spot-reviews-container">
      <div className="reviews-header">
        <h3>{`${newAvgStars == "NaN" ? " " : newAvgStars + " ·"}
        ${
          numOfRev === undefined || numOfRev == "NaN"
            ? "No Reviews yet"
            : numOfRev === 1
            ? numOfRev + " Review"
            : numOfRev + " Reviews"
        }`}</h3>
        {!specificRev && <CreateNewReviewModal />}
      </div>

      <div className="inner-container-spot-rev">
        {allReviews &&
          allReviews.map(({ stars, User, review, id }) => (
            <div className="individual-review-card" key={id}>
              <div>{User.firstName} add Icon here</div>
              <div>
                review comments
                <p>{review}</p>
                {User.id === currUser?.id && (
                  <button onClick={handleDelete}>
                    Delete Your Last Review
                  </button>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllSpotReviews;
