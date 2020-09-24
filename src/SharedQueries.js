import {gql} from "apollo-boost"

export const seeMyProfile = gql`
{
    seeMyProfile {
            username
    }
}
`