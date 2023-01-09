import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { thunkUserFollow, thunkUserUnfollow } from "../../store/follow";
import { thunkGetProfile } from "../../store/profile";
import './FollowUser.css'
import { thunkGetAllQuestion } from "../../store/question";


function FollowUser() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const profile= useSelector((state) => state.profile)
    const profileArr= Object.values(profile)
    const currProfile = profileArr.find((e) => e.id)
    console.log("followprofile", currProfile)
    // console.log("followingprofile", currProfile?.following)
    // console.log("followerprofile", currProfile?.followers)
    const currUser = useSelector((state) => state.session.user)
    // console.log("checkcurruser", currUser?.id)
    const [following, setFollowing] = useState(false)
//

    useEffect(() => {
        currProfile?.followers.forEach((follower) => {

          let followerId = follower.id;
          if (currUser.id === followerId) {
            setFollowing(true);
          }
        });
      }, [currProfile?.followers, id]);

      useEffect(() => {
        dispatch(thunkGetProfile(id));
    }, [dispatch, id])

    const handleFollow = async (e) => {
        e.preventDefault();
        let followUser = await dispatch(thunkUserFollow(currProfile?.id))
        .then(dispatch(thunkGetProfile(currProfile?.id)))
        .then(dispatch(thunkGetAllQuestion()));
        if (followUser) {

            dispatch(thunkGetProfile(currProfile?.id));

        }
        setFollowing(true);
      };

      const handleUnfollow = async (e) => {
        e.preventDefault();
        let unfollowUser = await dispatch(thunkUserUnfollow(currProfile?.id))
        .then(dispatch(thunkGetProfile(currProfile?.id)))
        .then(dispatch(thunkGetAllQuestion()));
        if (unfollowUser) {

            dispatch(thunkGetProfile(currProfile?.id));

        }
        setFollowing(false);
      };



    return (
        <div>
            {following ? (
        <div className="unfollowButton-profilepage" onClick={handleUnfollow}>
         <i className="fa-solid fa-square-check fa-lg"></i> &nbsp; Following
        </div>
      ) : (
        <div className="followButton-profilepage" onClick={handleFollow}>
         <i className="fa-regular fa-square-plus fa-lg"></i> &nbsp; Follow
        </div>
      )}

        </div>
    )

}

export default FollowUser;
