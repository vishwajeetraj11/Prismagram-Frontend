import React from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
// import {Helmet} from "rl-react-helmet";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Loader from "../Components/Loader";
import Post from "../Components/Post/index";

const FEED_QUERY = gql`
  {
    seeFeed {
      id
      location
      caption
      user {
        id
        avatar
        username
      }
      files {
        id
        url
      }
      isLiked
      likeCount
      comments {
        id
        text
        user {
          id
          username
        }
      }
      createdAt
    }
  }
`;

export default () => {
  const { data, loading } = useQuery(FEED_QUERY);

  return (
    <Wrapper>
    <Helmet><title>Feed | Prismagram</title></Helmet>
      {loading && <Loader />}
      {!loading &&
        data &&
        data.seeFeed &&
        data.seeFeed.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            user={post.user}
            files={post.files}
            likeCount={post.likeCount}
            isLiked={post.isLiked}
            location={post.location}
            comments={post.comments}
            createdAt={post.createdAt}
            caption={post.caption}
            />
        ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  min-height: 67vh;
`;
