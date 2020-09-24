import React from "react"
import {withRouter} from "react-router-dom"
import SearchPresenter from "./SearchPresenter";
import { useQuery } from "react-apollo-hooks";
import {SEARCH} from "./SearchQueries";


export default withRouter((props) => {
    const term = props.location.search.split("=")[1];
    const {data, loading} = useQuery(SEARCH, {
        // skip: term  skips the query if the search term is not avalable, and the query fires automatically, on load
        skip: term === undefined,
        variables: {
            term
        }
    });
    console.log(data)

    return (
        <SearchPresenter term={term} loading={loading} data={data} />
    )
});