import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchDates, getDates } from "../../store/dates"
import { fetchFriends, getFriends } from "../../store/friends"
import { selectCurrentUser } from "../../store/session"
import { fetchUsers, getUsers } from "../../store/users"
import ProfilePopUp from "../ProfileModal/ProfilePopUp"

const Search = () => {
    const dispatch = useDispatch()
    const currentUser = useSelector(selectCurrentUser)
    const friends = useSelector(getFriends)
    const users = useSelector(getUsers)
    const dates = useSelector(getDates)
    const [selectedUserId, setSelectedUserId] = useState('')
    const [showModal, setShowModal] = useState(false);
    const [searchWord, setSearchWord] = useState('')
    const friendsInfo = []
    const datesInfo = []


    friends.map((friend) => {
        friendsInfo.push(users[friend.friend])
    })

    dates.map((date) => {
        datesInfo.push(users[date.invitee])
    })

    // console.log("start")
    // console.log(friendsInfo)
    // console.log(datesInfo)
    // console.log(users)
    // console.log(friends)

    useEffect(() => {
        dispatch(fetchFriends(currentUser._id))
        dispatch(fetchUsers())
        dispatch(fetchDates(currentUser._id))
    }, [dispatch])

    const handleChange = (e) => {
        setSearchWord(e.target.value)
    }

    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     setSearchWord(searchWord)
    // }

    return (
        <div>
        {/* <form onSubmit={handleSubmit}> */}
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search by friend name"
            onChange={handleChange}
          />
          {
          friendsInfo.filter((friendInfo) => {
            if(searchWord === "") return false
            const friendUsername = friendInfo.username.toLowerCase()
            const searchUsername = searchWord.toLowerCase()
            for (let i = 0; i < friendInfo.username.length; i++) {
                if (searchWord === friendInfo.username){
                    return true
                } else if((friendUsername.indexOf(searchUsername) > -1)) {
                        return true
                } else {
                    return false
                }
            }
                }).map((friendInfo) => {
                    return (
                    <button onClick={() => {
                        setShowModal(true)
                        setSelectedUserId(friendInfo._id)
                    }}>
                        <img className="profile-friend-image" src={friendInfo.profileImageUrl} />
                        <p>{friendInfo.username}</p>
                    </button>
                    )
            })}
            {<ProfilePopUp userId={selectedUserId} open={showModal} profileClose={() => setShowModal(false)}></ProfilePopUp>}
        {/* {datesInfo.filter((dateInfo) => {
            if (searchWord === dateInfo.username){
              return true
            } 
            return false
          }).map((dateInfo) => {
            return (
              <div>
                <img src={dateInfo.profileImageUrl} />
                <p>{dateInfo.username}</p>
              </div>
            )
          })} */}
          
         {/* <button type="submit">Search</button> */}
        {/* </form> */}
        </div>
      );      
}

export default Search