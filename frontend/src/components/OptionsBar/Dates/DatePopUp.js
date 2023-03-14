import reactDom from "react-dom"


export default function DatePopUp({open, closeDate, date, request, otherUser}) {

  // function date () {
  //   if (request) {
  //     return (
  //       <>
  //         <div>{request.name}</div> 
  //         <div>{request.date.slice(0,10)}</div>
  //         <div>{request.description}</div>
  //       </>
  //     )
  //   } else{
  //     return null
  //   }
  // }

  if(!date) return null

  if (!open) return null
  return reactDom.createPortal(
    <>
        <div className="profile-modal">
        <button onClick={() => {closeDate(false)}} className="modal-close">&times;</button>
            {/* {date()} */}
            <div className="other-user-info">
              <p>Play Date with {otherUser.puppyName ? otherUser.puppyName : `${otherUser.username}'s puppy`}</p>
              <img className="profile-friend-image" src={otherUser.profileImageUrl}/>
            </div>
            <div>
              <div>{date?.name} on {date?.date.slice(0,10)}</div>
              <div>Location:</div>
                    <div>Latitude: {date.latitude}</div>
                    <div>Longitude: {date.longitude}</div> 
              {date.description}
            </div>
        </div>
    </>,
  document.getElementById('portal')
  )
}
