import React, { useState } from "react";
import PropTypes from "prop-types";
import { FOLLOW, UNFOLLOW } from "./FollowButtonQueries";
import {useMutation} from "react-apollo-hooks";
import FollowButtonPresenter from "./FollowButtonPresenter"
import { toast } from "react-toastify";

const FollowButtonContainer = ({isFollowing, id}) => {

    const [isFollowingState, setIsFollowing] = useState(isFollowing)

    const [followMutation] = useMutation(FOLLOW, {
        variables: {
            id
        } 
    });
    const [unfollowMutation] = useMutation(UNFOLLOW, {
        variables: {
            id
        }
    });

    const onClick = () => {
        if(isFollowingState === true) {
            try {
                unfollowMutation();
            } catch(e) {
                toast.error("Can't Unfollow")
            }
            setIsFollowing(false)
        } else {
            try {
                followMutation();
            } catch(e) {
                toast.error("Can't follow")
            }
            setIsFollowing(true)

        }
    }

    return <FollowButtonPresenter onClick={onClick} isFollowing={isFollowingState} />

};

FollowButtonContainer.propTypes = {
    isFollowing: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired
}

export default FollowButtonContainer;