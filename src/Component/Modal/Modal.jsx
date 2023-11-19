import React from "react";
import "./Modal.css";
import useApi from "../../hooks/useApi";
import { USER_POSTS_URL } from "../../utils/constants";

const Modal = ({ setShowModal, clickedId }) => {
  const { data, isLoading } = useApi(`${USER_POSTS_URL}/${clickedId}`);

  console.log(isLoading);

  return (
    <div className="main_modal">
      <p onClick={() => setShowModal(false)}>Close</p>
      {isLoading && <h2>Loading...</h2>}
      <h2>{data?.title}</h2>
      <p>{data?.body}</p>
    </div>
  );
};

export default Modal;
