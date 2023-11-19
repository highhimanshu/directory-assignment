import React, { useEffect, useState } from "react";
import "./ProfilePage.css";
import {
  COUNTRY_API,
  USER_DETAIL_URL,
  USER_POSTS_URL,
} from "../../utils/constants";
import useApi from "../../hooks/useApi";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../../Component/Modal/Modal.jsx";

const ProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [clickedId, setClickedId] = useState("");

  const {
    data: userDetails,
    isLoading: userDetailLoading,
    error,
  } = useApi(`${USER_DETAIL_URL}/${id}`);
  const { data: allPost, isLoading: loadingPost } = useApi(
    `${USER_POSTS_URL}?userId=${id}`
  );
  const handleSelect = (e) => {
    setSelected(e.target.value);
  };
  const { data: countryList } = useApi(COUNTRY_API, selected);
  const { data: time } = useApi(`${COUNTRY_API}/${selected}`, selected);

  return (
    <div style={{ position: "relative" }}>
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
              {Object.keys(time).length > 0
                ? time?.datetime?.substring(11, 19)
                : "00:00:00"}
            </span>
            <button>Pause/Start</button>
          </div>
        </div>
      </div>

      <h2>Profile Page</h2>

      <div className="profile__wrapper">
        {userDetailLoading && <h2>User Details Loading...</h2>}
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
        {loadingPost && <h2>Posts Loading...</h2>}
        {allPost &&
          allPost?.map((post) => (
            <div
              key={post?.id}
              className="singlepost__container"
              onClick={() => {
                setClickedId(post?.id);
                setShowModal(true);
              }}
            >
              <h2>{post?.title}</h2>
              <p>{post?.body}</p>
            </div>
          ))}
      </div>
      {showModal && <Modal setShowModal={setShowModal} clickedId={clickedId} />}
    </div>
  );
};

export default ProfilePage;
