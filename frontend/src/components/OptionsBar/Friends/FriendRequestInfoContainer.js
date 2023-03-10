import { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFriendRequest } from "../../../store/friendRequests";
import { fetchUser, getUser } from "../../../store/users";
import ProfilePopUp from "../../ProfileModal/ProfilePopUp";
import './Friends.css'


const FriendRequestInfoContainer = ({request, showPendingModal, setPendingShowModal, closeAllModals, prevId, setPrevId, open, }) => {
    const dispatch = useDispatch();
    const receiver = useSelector(getUser(request.receiver))
    const [selectedUserId, setSelectedUserId] = useState('')
    const [visible, setVisible] = useState(false)
    
    useEffect(() => {
        dispatch(fetchUser(request.receiver))
    }, [dispatch])


    const handleDeleteRequest= e => {
        e.preventDefault();
        dispatch(deleteFriendRequest(request._id))
    }

    const closeVisible = () => {
        setVisible(false)
    }

    // const resetModal = () => {
    //     debugger
    //     if(prevUserId){
    //         const friend = document.getElementById(prevUserId)
    //         reactDom.unmountComponentAtNode(friend)
    //     }
    // }

    // let prevId

    // function handleSelected () {
    //     debugger
    //     if (user){
    //         let friend = document.getElementById(user)
    //         reactDom.unmountComponentAtNode(friend)
    //         setUser(receiver._id)
    //         setSelectedUserId(receiver._id)
    //     } else {
    //         debugger
    //         setUser(receiver._id)
    //         debugger
    //         setSelectedUserId(receiver._id)
    //     }
    //     debugger
    // }

    // const runTest = () => {
    //     debugger
    // }

    const closeSiblings = (id) => {
        debugger
        if (prevId) {
            debugger
            // let portal= document.getElementById("portal")
            let prev = document.getElementById(prevId)
            let self = document.getElementById(id)
            debugger

            if (!prev){
                setPrevId(id)
            } else if(!self){
                prev.classList.add("hidden")
            } else if (self.classList.contains("hidden") && !prev.classList.contains("hidden")){
                self.classList.remove("hidden")
                prev.classList.add("hidden")
            } else {

            }
            debugger
            // reactDom.unmountComponentAtNode(friend)
            // if (friend){
            //     portal.removeChild(friend)
            // }
            // debugger
            // friend.innerHTML = ("")
        }
        debugger
        setPrevId(id)
        debugger
    }

    // if (!open) return null
    if (!receiver) return null;

    return (
        <div className="request-info-container">
            <button className="friend-info" onClick={() => {
                closeSiblings(request.receiver)
                closeVisible()
                closeAllModals();
                // resetModal()
                setPendingShowModal(true);
                setVisible(true)
                // handleSelected()
                setSelectedUserId(receiver._id)
                // runTest()
                }}>
                <div>
                    <img className="profile-friend-image" src={receiver.profileImageUrl}/>
                </div>
            </button>
            <div className="pending-info">
                <p>{receiver.name} & {receiver.puppyName}</p>
                <button onClick={handleDeleteRequest} className="delete-request" id="unfriend-button">-Delete Request-</button>
            </div>
            <div>
                {<ProfilePopUp userId={selectedUserId} open={showPendingModal} profileClose={() => setPendingShowModal(false)} visible={visible} setVisible={setVisible} closeVisible={closeVisible}></ProfilePopUp>}
            </div>
        </div>
    )
};

export default FriendRequestInfoContainer;