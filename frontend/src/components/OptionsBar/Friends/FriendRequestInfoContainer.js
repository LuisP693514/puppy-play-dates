import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFriendRequest } from "../../../store/friendRequests";
import { fetchUser, getUser } from "../../../store/users";
import ProfilePopUp from "../../ProfileModal/ProfilePopUp";
import './Friends.css'


const FriendRequestInfoContainer = ({ request, showPendingModal, setVisible, setPendingShowModal, closeAllModals, setPrevId }) => {
    const dispatch = useDispatch();
    const receiver = useSelector(getUser(request.receiver))
    const [selectedUserId, setSelectedUserId] = useState('');
    
    


    useEffect(() => {
        dispatch(fetchUser(request.receiver));
    }, [dispatch])


    const handleDeleteRequest = e => {
        e.preventDefault();
        dispatch(deleteFriendRequest(request._id))
    }

    const closeVisible = () => {
        setVisible(false)
    }

    const closeSiblings = (id) => {

        const portal = document.getElementById('portal') // every profile that exists
        
        // hide all the children
        for (let i = 0; i < portal.children.length; i++) {
            const element = portal.children[i];
            if (Array.from(element.classList).includes('profile-modal')){
                element.classList.add('hidden')
            }
        }


        const profile = document.getElementById(id)
        if (profile && Array.from(profile.classList).includes('hidden')) {
            profile.classList.remove('hidden')
        }

    }

    if (!receiver) return null;

    return (
        <div className="request-info-container">
            <button className="friend-info" onClick={() => {
                closeVisible()
                closeAllModals();
                setPendingShowModal(true);
                setVisible(true)
                setSelectedUserId(receiver._id)
                closeSiblings(request.receiver)
            }}>
                <div>
                    <img className="profile-friend-image" src={receiver.profileImageUrl} />
                </div>
            </button>
            <div className="pending-info">
                <div><p>{receiver.name} & {receiver.puppyName}</p></div>
                <div><button onClick={handleDeleteRequest} className="delete-request" id="unfriend-button">-Delete Request-</button> </div>    
            </div>
            <div>
                
            </div>
        </div>
    )
};

export default FriendRequestInfoContainer;