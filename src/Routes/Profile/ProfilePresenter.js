import React from "react";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import Avatar from "../../Components/Avatar";
import FatText from "../../Components/FatText";
import FollowButton from "../../Components/FollowButton";
import Helmet from "react-helmet"
import SquarePost from "../../Components/SquarePost"
import Button from "../../Components/Button";



export default ({ loading, data, logOut }) => {
  if (loading === true) {
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    );
  } else if (!loading && data && data.userByUsername) {
    const {
      userByUsername: {
        id,
        avatar,
        username,
        fullName,
        isFollowing,
        isSelf,
        bio,
        followingCount,
        followersCount,
        postsCount,
        posts,
      },
    } = data;

    return (
        <Wrapper>
        <Helmet>
    <title>{username} | Prismagram</title>
        </Helmet>
      <Header>
        <HeaderColumn>
          <Avatar size="lg" url={avatar} />
        </HeaderColumn>
        <HeaderColumn>
        <UsernameRow>
        <Username>{username}</Username>
        {isSelf ? <Button text="Log Out" onClick={logOut} /> : <FollowButton id={id} isFollowing={isFollowing } />}
        </UsernameRow>
          <Counts>
            <Count>
              <FatText text={String(postsCount)} /> posts
            </Count>
            <Count>
              <FatText text={String(followersCount)} /> followers
            </Count>
            <Count>
              <FatText text={String(followingCount)} /> following
            </Count>
          </Counts>
          <FullName text={fullName} />
          <Bio>{bio}</Bio>
        </HeaderColumn>
      </Header>
      <Posts>
          {
              posts && posts.map(post => (
                <SquarePost
                key={post.id}
                likeCount={post.likeCount}
                commentCount={post.commentCount}
                file={post.files[0].url}
              />
              ))
          }
      </Posts>
      </Wrapper>
    );
  }
};

const Wrapper = styled.div`
min-height: 70vh;
`

const LoaderWrapper = styled.div`
  min-height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 80%;
    margin: 0 10%;
    margin-bottom: 4rem;
`;

const HeaderColumn = styled.div`
    width: 40%;
`;

const Username = styled.span`
  font-size: 2.8rem;
  display: block;
  margin-right: 1.8rem;
`;
const Counts = styled.ul`
    display: flex;
    margin: 1.5rem 0;
 `;

const Count = styled.li`
    font-size: 1.6rem;
    &:not(:last-child) {
        margin-right: 3rem;
    }
`;

const FullName = styled(FatText)`
    font-size: 1.5rem;
`

const Bio = styled.p`
margin-top: 1.5rem;
`;

const UsernameRow = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
`

const Posts = styled.div`
display: grid;
grid-template-columns: repeat(3, 305px);
grid-gap: 1rem;
grid-template-rows: 305px;
grid-auto-rows: 305px;
`