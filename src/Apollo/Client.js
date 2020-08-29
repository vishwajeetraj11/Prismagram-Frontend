import ApolloClient from "apollo-boost";
import {defaults, resolvers} from "./LocalState"

export default new ApolloClient({
    uri: "http://localhost:4000",
    // cache: new InMemoryCache()
    clientState: {
        defaults,
        resolvers
    }
})