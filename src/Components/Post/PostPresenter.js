import React from "react";
import styled from "styled-components";
import FatText from "../FatText";
import Avatar from "../Avatar";
import TextareaAutosize from "react-autosize-textarea";
import { HeartFull, HeartEmpty, Comment as CommentIcon } from "../Icons";
import { Link } from "react-router-dom";

export default ({
  user: { username, avatar },
  files,
  location,
  isLiked,
  likeCount,
  createdAt,
  newComment,
  slide,
  currentImage,
  toggleLike,
  comments,
  onKeyPress,
  SelfCommentsState
}) => {
  return (
    <Post>
      <Header>
        <Avatar size="sm" url={avatar} />
        <UserColumn>
        <Link to={`/${username}`} >
          <FatText text={username} />
          </Link>
          <Location>{location}</Location>
        </UserColumn>
      </Header>
      {/*<ButtonNext onClick={slide}>Next</ButtonNext>*/}
      <Files>
        {files &&
          files.map((file, index) => {
            return (
              <FileContainer key={file.id} showing={index === currentImage}>
                <File id={file.id} src={file.url} />
              </FileContainer>
            );
          })}
      </Files>
      <AllButtonContainer>
        <Buttons>
          <Button onClick={toggleLike}>
            {isLiked ? <HeartFull /> : <HeartEmpty />}
          </Button>
          <Button>
            <CommentIcon />
          </Button>
        </Buttons>
        <FatText text={likeCount === 1 ? "1 Like" : `${likeCount} Likes`} />
        <Comments>
          {comments &&
            comments.map((comment) => (
              <Comment key={comment.id}>
                <FatText text={comment.user.username} />
                {comment.text}
              </Comment>
            ))}
            {SelfCommentsState &&
              SelfCommentsState.map((comment) =>{
                return (
                <Comment key={comment.id}>
                <FatText text={comment.user.username} />
                {comment.text}
              </Comment>
              )
              })}
        </Comments>
        <TimeStamp>{createdAt}</TimeStamp>
        <Textarea
          placeholder={"Add a Comment..."}
          value={newComment.value}
          onChange={newComment.onChange}
          onKeyPress={onKeyPress}
        />
      </AllButtonContainer>
    </Post>
  );
};

// const ButtonNext = styled.button`
//   border-radius: 2px;
//   border: 0;
//   background-color: #000;
//   color: #fff;
//   position: absolute;
//   z-index: 1;
//   padding: 6px 15px;
//   right: 1rem;
//   top: 50%;
//   box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.15);
//   outline: 0;
// `;

const Post = styled.div`
  ${(props) => props.theme.whiteBox}
  width: 100%;
  max-width: 600px;
  overflow: hidden;
  margin-bottom: 2.5rem;
  position: relative;

  a {
    color: inherit;
  }
`;
const Header = styled.header`
  padding: 15px;
  display: flex;
  align-items: center;
`;
const UserColumn = styled.div`
  margin-left: 1.5rem;
`;
const Location = styled.span`
  display: block;
  margin-top: 5px;
  font-size: 12px;
`;

const Files = styled.div`
  height: 600px;
  position: relative;
`;

const FileContainer = styled.div`
  position: absolute;
  top: 0;
  width: 600px;
  height: 600px;
  opacity: ${(props) => (props.showing ? 1 : 0)};
  transition: all 0.6s;
`;

const File = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const Buttons = styled.div`
  & > * {
    margin-right: 1.5rem;
  }
  margin-bottom: 1rem;
`;
const Button = styled.span`
  cursor: pointer;
`;
const AllButtonContainer = styled.div`
  padding: 1.5rem;
`;

const TimeStamp = styled.span`
  font-weight: 400;
  font-size: 12px;
  text-transform: uppercase;
  color: ${(props) => props.theme.lightGreyColor};
  opacity: 0.5;
  display: block;
  margin: 10px 0;
  padding-bottom: 10px;
  border-bottom: ${(props) => props.theme.lightGreyColor} 1px solid;
`;

const Textarea = styled(TextareaAutosize)`
  border: none;
  width: 100%;
  resize: none;
  font-size: 14px;
  font-family: "Lato";
  &:focus {
    outline: none;
  }
`;

const Comments = styled.ul`
  margin: 10px 0;
`;
const Comment = styled.li`
  margin-bottom: 8px;
  span {
    margin-right: 10px;
  }
`;
