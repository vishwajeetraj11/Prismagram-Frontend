import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { HeartFull, CommentFull } from "./Icons";

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: all 0.2s linear;
  svg {
    fill: white;
  }
`;

const Container = styled.div`
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center;
  cursor: pointer;

  &:hover {
    ${Overlay} {
      opacity: 1;
    }
  }

`;

const Number = styled.div`
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;

  &:first-child {
    margin-right: 30px;
  }
`;

const NumberText = styled.span`
  margin-left: 10px;
  font-size: 1.6rem;
`;

const SquarePost = ({ likeCount, commentCount, file }) => {
  return (
    <Container bg={file}>
      <Overlay>
        <Number key={"like"}>
          <HeartFull />
          <NumberText>{likeCount}</NumberText>
        </Number>
        <Number key={"comment"}>
          <CommentFull />
          <NumberText>{commentCount}</NumberText>
        </Number>
      </Overlay>
    </Container>
  );
};

SquarePost.propTypes = {
  likeCount: PropTypes.number.isRequired,
  commentCount: PropTypes.number.isRequired,
  file: PropTypes.string.isRequired,
};

export default SquarePost;
