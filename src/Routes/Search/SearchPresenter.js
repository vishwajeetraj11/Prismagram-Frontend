import styled from "styled-components";
import FatText from "../../Components/FatText";
import React from "react";
import PropTypes from "prop-types";
import Loader from "../../Components/Loader";
import UserCard from "../../Components/UserCard";
import SquarePost from "../../Components/SquarePost";

const Wrapper = styled.div`
  height: 50vh;
  text-align: center;
`;

const PageWrapper = styled.div`
min-height: 70vh;
`

const Section = styled.div`
  margin-bottom: 5rem;
  display: grid;
  grid-gap: 2.5rem;
  grid-template-columns: repeat(5, 160px);
  grid-template-rows: 16rem;
  grid-auto-rows: 16rem;
`;

const EFatText = styled(FatText)`
  text-align: left;
`;

const SearchPresenter = ({ term, loading, data }) => {
  if (term === undefined) {
    return (
      <Wrapper>
        <FatText text={"Search for something"}></FatText>
      </Wrapper>
    );
  } else if (loading === true) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if (data && data.searchUser && data.searchPost) {
    return (
      <PageWrapper>
        <Section>
          {data.searchUser.length === 0 ? (
            <EFatText text="No Users Found" />
          ) : (
            data.searchUser.map((user) => (
              <UserCard
                key={user.id}
                id={user.id}
                username={user.username}
                isFollowing={user.isFollowing}
                url={user.avatar}
                isSelf={user.isSelf}
                is={user.id}
              />
            ))
          )}
        </Section>
        <Section>
          {data.searchPost.length === 0 ? (
            <EFatText text="No Post Found" />
          ) : (
            data.searchPost.map((post) => {
               
                return (
              <SquarePost
                key={post.id}
                likeCount={post.likeCount}
                commentCount={post.commentCount}
                file={post.files[0].url}
              />
            )})
          )}
        </Section>
      </PageWrapper>
    );
  }

  //     {!loading && data && data.searchUser && data.searchUser.length === 0 && (<FatText text={"No Users found"}></FatText>)}
  //     {!loading && data && data.searchUser && data.searchPost.length === 0 && (<FatText text={"No Posts found"}></FatText>)}
};

SearchPresenter.propTypes = {
  searchTerm: PropTypes.string,
  loading: PropTypes.bool,
};

export default SearchPresenter;
