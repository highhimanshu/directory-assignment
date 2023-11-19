import React, { useEffect, useState } from "react";
import "./ProfilePage.css";
import {
  COUNTRY_API,
  USER_DETAIL_URL,
  USER_POSTS_URL,
} from "../../utils/constants";
import useApi from "../../hooks/useApi";
import { useNavigate, useParams } from "react-router-dom";

const ProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");
  const [currentTime, setCurrentTime] = useState(null);

  const {
    data: userDetails,
    isLoading,
    error,
  } = useApi(`${USER_DETAIL_URL}/${id}`);

  const { data: allPost } = useApi(`${USER_POSTS_URL}?userId=${id}`);
  const { data: countryList } = useApi(COUNTRY_API, selected);
  const { data: time } = useApi(`${COUNTRY_API}/${selected}`, selected);

  const handleSelect = (e) => {
    const val = e.target.value;
    setSelected(val);
    setCurrentTime(time);
  };

  return (
    <div>
      <div className="profile__heading">
        <button onClick={() => navigate(-1)}>Back</button>

        <div style={{ display: "flex", gap: "5px" }}>
          <div>
            <select onChange={handleSelect}>
              {countryList?.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div>
            <span>
              {currentTime === null || currentTime === undefined
                ? "00:00:00"
                : currentTime?.datetime?.substring(11, 19)}
            </span>
            <button>Pause/Start</button>
          </div>
        </div>
      </div>

      <h2>Profile Page</h2>

      <div className="profile__wrapper">
        <div>
          <p>{userDetails?.name}</p>
          <p>
            {userDetails?.username} | {userDetails?.company?.catchPhrase}
          </p>
        </div>
        <div>
          <p>{userDetails?.address?.street}</p>
          <p>
            {userDetails?.email} | {userDetails?.phone}
          </p>
        </div>
      </div>

      <div className="post__container">
        {allPost &&
          allPost?.map((post) => (
            <div key={post?.id} className="singlepost__container">
              <h2>{post?.title}</h2>
              <p>{post?.body}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProfilePage;
