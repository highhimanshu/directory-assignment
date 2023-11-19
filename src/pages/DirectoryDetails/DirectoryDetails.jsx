import React, { useEffect, useState } from "react";
import "./DirectoryDetails.css";
import { Link } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { USER_POSTS_URL } from "../../utils/constants";

const DirectoryDetails = () => {
  const { data: posts, isLoading, error } = useApi(USER_POSTS_URL);
  const [postCount, setPostCount] = useState([]);

  useEffect(() => {
    const postCountsByUser = posts.reduce((acc, post) => {
      const userId = post.userId;
      if (!acc[userId]) {
        acc[userId] = { userId, count: 1 };
      } else {
        acc[userId].count += 1;
      }
      return acc;
    }, {});

    // convert object into an array
    const postCountsArray = Object.values(postCountsByUser);
    setPostCount(postCountsArray);
  }, [posts]);

  // organize posts by user ID

  console.log(posts);
  return (
    <div>
      <h2>Directory Details</h2>
      {isLoading && <p>Loading...</p>}
      {postCount &&
        postCount?.map(({ userId, count }) => (
          <div key={userId}>
            <Link to={`/${userId}`} style={{ textDecoration: "none" }}>
              <div className="directory__container">
                <h2>Name : {userId} </h2>
                <h2>Posts: {count} </h2>
              </div>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default DirectoryDetails;
