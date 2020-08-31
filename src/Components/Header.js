import React from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import Input from "./Input";
import useInput from "../Hooks/useInput";
import { Logo, Compass, HeartEmpty, User } from "./Icons";
import {gql} from "apollo-boost"
import {useQuery} from "react-apollo-hooks"

const seeMyProfile = gql`
    {
        seeMyProfile {
                username
        }
    }
`

export default withRouter((props) => {
  const search = useInput("");
  const {data} = useQuery(seeMyProfile);

  const onSearchSubmit = (e) => {
    e.preventDefault();
    props.history.push(`/search?term=${search.value}`)
  }
  return (
    <Header>
      <HeaderWrapper>
        <HeaderColumn>
          <Link to="/">
            <Logo />
          </Link>
        </HeaderColumn>
        <HeaderColumn>
        <form onSubmit={onSearchSubmit}>
        <SearchInput {...search} placeholder={"Search"} />
        </form>
        </HeaderColumn>
        <HeaderColumn>
          <HeaderLink to="/explore">
            <Compass />
          </HeaderLink>
          <HeaderLink to="/notifications">
            <HeartEmpty />
          </HeaderLink>
          <HeaderLink to={data ? data.seeMyProfile.username : "/#"}>
          <User />
        </HeaderLink>
        </HeaderColumn>
      </HeaderWrapper>
    </Header>
  );
});

// export default withRouter(Header) if not exported above

const Header = styled.header`
  width: 100%;
  border: 0;
  border-bottom: ${(props) => props.theme.boxBorder};
  border-radius: 0;
  margin-bottom: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2.5rem 0;
  background-color: #fff;
`;

const HeaderColumn = styled.div`
  /* &:first-child {
    margin-right: auto;
} */
`;

const HeaderWrapper = styled.div`
  width: 100%;
  max-width: ${(props) => props.theme.maxWidth};
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`;

const SearchInput = styled(Input)`
  background-color: ${(props) => props.theme.bgColor};
  padding: 5px;
  height: auto;
  border-radius: 2px;
  font-size: 1.4rem;
  text-align: center;
  width: 100%;
  &::placeholder {
    opacity: 0.8;
    font-weight: 200;
  }
`;

const HeaderLink = styled(Link)`
  &:not(:last-child) {
    margin-right: 3rem;
  }
`;
