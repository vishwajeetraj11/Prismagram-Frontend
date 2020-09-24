import React, { useState, useEffect } from "react";
import PostPresenter from "./PostPresenter";
import PropTypes from "prop-types";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import { TOGGLE_LIKE, ADD_COMMENT } from "./PostQueries";
import { toast } from "react-toastify";
import {seeMyProfile} from "../../SharedQueries";
import {useQuery} from "react-apollo-hooks"

const PostContainer = ({
  id,
  user,
  likeCount,
  isLiked,
  location,
  comments,
  files,
  createdAt,
  caption
}) => {
    const createdAtByDate = (new Date(createdAt)).toGMTString();

    const [isLikedState, setIsLiked] = useState(isLiked);
    const [likeCountState, setLikeCount] = useState(likeCount);
    const [currentImage, setCurrentImage] = useState(0);
    const comment = useInput("")
    const [SelfCommentsState, setSelfCommentsState] = useState([]);
    const [commentInc, setCommentInc] = useState(0);
    const {data: { seeMyProfile: { username } }} = useQuery(seeMyProfile);
    const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
            variables: {
                postId: id
            }
        })
        
        const [addCommentMutation] = useMutation(ADD_COMMENT, {
            variables: { postId: id, text: comment.value }
        })
    // [
//     updateTodo,
//     { loading: mutationLoading, error: mutationError },
//   ] = useMutation(UPDATE_TODO);

    useEffect(() => {
        slide();
        // eslint-disable-next-line
    }, [currentImage])

    const toggleLike = async () => {
        if(isLikedState === true){
            setIsLiked(false);
            setLikeCount(likeCountState-1)
        } else {
            setIsLiked(true);
            setLikeCount(likeCountState+1)
        }
        try {
            await toggleLikeMutation();
        } catch(error) {
            toast.error("Can't Like")
        }
        
    }

    const onKeyPress = async (e) => {
        const {which} = e
        try {
            if(which === 13) {
                e.preventDefault()
                setCommentInc(commentInc+1);
                comment.setValue("") 
                setSelfCommentsState(SelfCommentsState.concat({
                    id: commentInc,
                    text: comment.value,
                    user: { username }
                }));
                
                // console.log("commentInc: ", commentInc)
                // console.log("SelfCommentsState: ", SelfCommentsState)
                await addCommentMutation();
        
            }
        }catch(e) {
            toast.error("Can't post comment")
            
            setSelfCommentsState(SelfCommentsState.filter( (element) => element !== {
                id: commentInc,
                text: comment.value,
                user: { username }
            } ));
            setCommentInc(commentInc-1);
            // console.log("commentInc: ", commentInc)
            // console.log("SelfCommentsState: ", SelfCommentsState)
        }
        
    }

    const slide = () => {
        const totalImages = files.length;
        if(currentImage === totalImages - 1){
            setTimeout(() => setCurrentImage(0), 6000)
            // setCurrentImage(0)
        } else {
            setTimeout(() => setCurrentImage(currentImage + 1), 6000)
            // setCurrentImage(currentImage + 1)
        }
    }
    // const slideOnClick = () => {
    //     const totalImages = files.length;
    //     if(currentImage === totalImages - 1){
    //         // setTimeout(() => setCurrentImage(0), 3000)
    //         setCurrentImage(0)
    //     } else {
    //         // setTimeout(() => setCurrentImage(currentImage + 1), 3000)
    //         setCurrentImage(currentImage + 1)
    //     }
    // }
    


  return <PostPresenter 
  user={user}
  files={files}
  likeCount={likeCountState}
  isLiked={isLikedState}
  comments={comments}
  location={location}
  createdAt={createdAtByDate}
  newComment={comment}
  setIsLiked={setIsLiked}
  setLikeCount={setLikeCount}
  caption={caption}
//   slide={slideOnClick}
  currentImage={currentImage}
  toggleLike={toggleLike}
  onKeyPress={onKeyPress}
  SelfCommentsState={SelfCommentsState}
  />;
};

PostContainer.propTypes = {
    id: PropTypes.string.isRequired,
    user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        avatar: PropTypes.string,
        username: PropTypes.string.isRequired
    }).isRequired,
    likeCount: PropTypes.number.isRequired,
    isLiked: PropTypes.bool.isRequired,
    comments: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        user: PropTypes.shape({
            id: PropTypes.string,
            username: PropTypes.string
        }).isRequired
    })).isRequired,
    files: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
    })),
    createdAt: PropTypes.string.isRequired,
    caption: PropTypes.string,
    location: PropTypes.string
}

export default PostContainer;
