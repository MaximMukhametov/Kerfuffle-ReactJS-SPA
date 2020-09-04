import React, {useState} from "react";
import ProfileStatus from "./ProfileStatus";
import userPhoto from "../../../media/userPhoto.jpg";
import classes from "./ProfileInfo.module.css"
import ProfileDataForm from "./ProfileDataForm";
import Preloader from "../../common/preloader/preloader";
import {animated, useSpring} from "react-spring";
import MyPostsContainer from "../MyPosts/MyPostsContainer";
import editPhoto from "../../../media/editphoto.png"
import editBackgroundPhoto from "../../../media/edit_background_photo.png"
import imageLoader from "../../../media/VdOY.gif"
import {
    EditButton,
    ExitEditModeButton,
    SendButton
} from "../../common/buttons/Buttons";


const calc = (x, y) => [-(y - window.innerHeight / 6) / 30,
    (x - window.innerWidth / 2) / 30, 1.1];
const trans = (x, y, s) => `perspective(500px) rotateX(${x}deg) 
rotateY(${y}deg) scale(${s})`;

// Component for displaying personal data about the user and his contacts
const ProfileInfo = ({
                         profile, status, updateStatus, history, saveBackgroundPhoto,
                         isOwner, savePhoto, saveProfile, isLoadingPhoto,
                         ...props
                     }) => {
    const [animateProps, set] = useSpring(() => ({
        xys: [0, 0, 1],
        config: {mass: 5, tension: 350, friction: 40}
    }));

    let [editMode, setEditMod] = useState(false);
    let [isLoadingBackgroundPhoto,
        setIsLoadingBackgroundPhoto] = useState(false);

    const {background_photo, photos, ...initialProfileValues} = profile;

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    };

    const onBackgroundPhotoSelected = (e) => {
        if (e.target.files.length) {
            setIsLoadingBackgroundPhoto(!isLoadingBackgroundPhoto);
            saveBackgroundPhoto(e.target.files[0]).then(r => {
                setIsLoadingBackgroundPhoto(false);
            })
        }
    };

    const getFollowers = () => {
        history.push('/users/?followers_by_userid=' + profile.id)
    };
    const getfollowing = () => {
        history.push('/users/?following_by_userid=' + profile.id)
    };

    const onSubmit = (formData) => {
        saveProfile(formData, isOwner).then(response => {
            if (!response) return setEditMod(false)
        });
    };


    return (
        <div className={classes.descriptionBlock}>

            <div className={classes.photo_block}>
                <img className={classes.back_photo}
                     src={background_photo} alt=""/>
                {isOwner &&
                <label htmlFor='upload-background-photo'
                       className={classes.label_edit_back_photo}>

                    {!isLoadingBackgroundPhoto ? <img
                            className={classes.edit_back_photo}
                            src={editBackgroundPhoto} alt=""/> :
                        <img
                            className={classes.edit_back_photo}
                            src={imageLoader} alt=""/>}
                    <input accept="image/png,image/jpeg" type={"file"}
                           id={'upload-background-photo'}
                           className={classes.upload_background_photo_input}
                           onChange={onBackgroundPhotoSelected}/></label>}

                <animated.div
                    onMouseMove={({clientX: x, clientY: y}) => set({xys: calc(x, y)})}
                    onMouseLeave={() => set({xys: [0, 0, 1]})}
                    style={{transform: animateProps.xys.interpolate(trans)}}
                    className={classes.main_photo}>
                    <div className={classes.photo_area}/>
                    <div
                        onClick={getFollowers}
                        className={classes.main_photo_followers}>
                        FOLLOWERS<p>{profile.followers}</p></div>
                    {!isLoadingPhoto ?
                        <div className={classes.main_photo_avatar}>
                            <img className={classes.main_photo_photo}
                                 src={(photos && (photos.large_img
                                     || photos.large)) || userPhoto}/>
                            {isOwner &&
                            <div>
                                <label htmlFor="upload-photo"><img
                                    className={classes.main_photo_editPhoto}
                                    src={editPhoto} alt='empty photo'/>
                                    <input accept="image/png,image/jpeg"
                                           type={"file"} id={'upload-photo'}
                                           className={classes.upload_photo}
                                           onChange={onMainPhotoSelected}/></label>
                            </div>}
                        </div> :
                        <Preloader/>
                    }
                    <div onClick={getfollowing}
                         className={classes.main_photo_followed}>
                        FOLLOWED <p>{profile.following}</p></div>
                    <div
                        className={classes.main_photo_user_name}>
                        {profile.name.toUpperCase()}
                        <div className={classes.status_bar}>
                            <ProfileStatus
                                status={status}
                                updateStatus={updateStatus}
                                isOwner={isOwner}/></div>
                    </div>
                </animated.div>


            </div>
            <div className={classes.profile_info}>

                <div className={classes.profile_info_contacts}>{editMode ?
                    <div>
                        <ProfileDataForm initialValues={initialProfileValues}
                                         profile={profile}
                                         onSubmit={onSubmit}/>
                        <ExitEditModeButton
                            onClickEvent={() => setEditMod(!editMode)}/>
                    </div> :
                    <ProfileData profile={profile} isOwner={isOwner}
                                 routing={history}
                                 goToEditMode={() => setEditMod(true)}/>}</div>
                <div className={classes.posts}><MyPostsContainer/></div>


            </div>
        </div>
    )
};

const ProfileData = ({profile, isOwner, goToEditMode, routing}) => {
    return (
        <div>
            {!isOwner &&
            <SendButton
                onClickEvent={() => routing.push("/dialogs/" + profile.id)}/>
            }
            <div>
                <b> Full name:</b> {profile.full_name}
            </div>
            <div>
                <b> Looking for a
                    job:</b> {profile.looking_for_a_job ? "yes" : "no"}
            </div>
            {profile.looking_for_a_job &&
            <div>
                <b> My professional
                    skills:</b> {profile.looking_for_a_job_description}
            </div>
            }
            <div>
                <b> Contacts:</b> {profile.contacts && Object.keys(profile.contacts).map(key => (
                <Contact contactTitle={key}
                         contactValue={profile.contacts[key]}/>))}
            </div>
            {isOwner &&
            <div>
                <EditButton onClickEvent={goToEditMode}/>
            </div>}
        </div>
    )

};


export const Contact = ({contactTitle, contactValue}) => {
    return <div className={classes.contact}>
        <b>{contactTitle}:</b> {contactValue}
    </div>
};

export default ProfileInfo