import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { thunkUpdateProfile } from "../../../store/profile";



function ProfileUpdate({ currProfile, setShowModal }) {

    const dispatch = useDispatch();

    const [avatar, setAvatar] = useState(currProfile?.avatar)
    const [bio, setBio] = useState(currProfile?.bio)
    const [description, setDescription] = useState(currProfile?.description)
    const [validations, setValidations] = useState([])
    // console.log("updateprofile---currprofile", currProfile)
    let profileId = currProfile.id
    // console.log("profileId", profileId)
    const [bioChar, setBioChar] = useState(0);
    useEffect(() => {
      setBioChar(bio.length);
    }, [bio]);

    const [descriptionChar, setDescriptionChar] = useState(0);
    useEffect(() => {
      setDescriptionChar(description.length);
    }, [description]);

    useEffect(() => {
        const errors = []
        if (avatar &&
            ((!avatar.includes("jpg") &&
                !avatar.includes("png") &&
                !avatar.includes("jpeg") &&
                !avatar.includes("svg")) ||
                (!avatar.includes("https") && !avatar.includes("http")))
        )
            errors.push("Please enter a valid url image");
        setValidations(errors)
    }, [avatar])

    const onSubmit = async (event) => {
        event.preventDefault();
        // setSubmit(!submit);
        const payload = {
            id: profileId,
            bio,
            description,
            avatar,

        };

        let updatedProfile =
            await dispatch(thunkUpdateProfile(payload));

        if (updatedProfile) {
            setShowModal(false)
        }
    }

    return (
        <div className="create_question_main">
            <div className="create-question-top">
                <div onClick={() => setShowModal(false)}><i class="fa-solid fa-x"></i></div>
                <div className="create-question-top-title">Update Profile</div>
            </div>

            <form className="create_question_form" onSubmit={onSubmit}>
                <div className="create_question_input">

                    <div>
                        <input
                            type="text"
                            placeholder="librarian in New York, reads constantly"
                            name="bio"
                            maxLength='60'
                            value={bio}
                            className="edit_profile_input_bio"
                            onChange={(event) => setBio(event.target.value)}

                        ></input>
                        <div className="edit_profile_input_biochar">{60-bioChar}</div>
                    </div>
                </div>
                <div className="create_question_input">

                    <div>
                        <textarea
                            type="text"
                            placeholder="Write a description about yourself"
                            name="description"
                            maxLength='255'
                            value={description}
                            className="edit_profile_input_des"
                            onChange={(event) => setDescription(event.target.value)}
                        ></textarea>
                        <div className="edit_profile_input_deschar">{255-descriptionChar}</div>
                    </div>
                </div>

                <div className="create_question_input">

                    <div>
                        <input
                            type="text"
                            placeholder="Update image(optional)"
                            name="avatar"
                            value={avatar}
                            className="create_question_input_inner"
                            onChange={(event) => setAvatar(event.target.value)}
                        ></input>
                    </div>
                </div>
                {validations.length > 0 ? (
                    <div className="create_question_empty">
                        <div className="create_question_error">
                            {validations.map((error, i) => (
                                <div key={i}>{error}</div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="create_question_empty"></div>
                )}
                <div className="create_question_footer">


                    <button
                        className="create_question_cancel"
                        onClick={() => setShowModal(false)}
                    >
                        Cancel
                    </button>

                    <button
                        className="create_question_button"
                        type="submit"
                        disabled={validations.length > 0}
                    >
                        Update Profile
                    </button>

                </div>
            </form>

        </div>
    )


}

export default ProfileUpdate
