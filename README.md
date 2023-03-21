# Puppy Play Dates

## Puppy Play Dates
Puppy Play Dates is an interactive social application that connects dog owners to one another to socialize and walk their pets.

![app-preview](./frontend/src/images/apppreview.png)
[Puppy Play Dates](https://puppy-play-dates.herokuapp.com/)


## Background and Overview
During your puppy’s first three months of life, they will experience a socialization period that will permanently shape their future personality and how they will react to their environment as an adult dog. Gently exposing them to a wide variety of people, places, and other dogs will make a huge, permanent difference in their temperament.
This application allows dog owners to find other dogs in their area for their pet to socialize with making sure that they won't be overly fearful or aggressive towards other dogs. Users will sign up for an account, upload a profile picture and provide details about their pet including name, age, temperament, and vaccination status. Filtering will allow users to see which of their friends are online and in the area, as well as searching for other dogs that may be suitable friends for their pup. Once friendship is established, users may interact with each other by messaging one another and setting up time/places for their dogs to socialize.

## Functionality

### Start by adding friends!
Users are able to view profiles by clicking the photos on the centralized map. Clicking the 'Add Friend' button will send a request to the user, to accept or decline friendship. Once confirmed, new friends, will appear in the friends panel along with friendship requests, and pending user requests.

### Now create a play date!
By clicking on a friend's profile picture within the friend panel, you can create a date to walk your dogs or find a dog park for your pups to play. This request can be confrmed, declined, or edited by the other party. 

### Search for your friends!
The search feature at teh top of the screen allows you to search for on of your friend's profiles even if they are offline.

### Lookup Pet Business Info
The orange icons on the map show local pet stores, veteranary offices, groomers, and dog parks. Click on their icon to view location, hours of operation, and more!

### Single Page App Design
This application makes use of reactDom portals to display information to the user.



## Technologies Used
Puppy Play dates relies on Geolocation and Google Maps Platform to display access the locational information of users, businesses, and parks and display them on a centralized map. The implementation Amazon Web Services allows users to upload their own profile pictures. Upcoming features will employ Websockets to allow live chat between users.

Backend: MongoDB/Express

Frontend: React/Node.js, AWS, Google API Geolocation and Websockets

```js
</GoogleMap>
<div className='map-center-button'>
    <button onClick={() => {
        const currentUser = users[sessionUser._id]
        setCenter({
            lat: currentUser.latitude,
            lng: currentUser.longitude
        })
        map.setZoom(17)
    }}><i className="fa-solid fa-location-crosshairs crosshairs"></i>
    </button>
</div>
```

###  Future Functionality Implementation
 LiveChat between using websockets
 Map my walk feature tracking walks with your pup

## Technical challenges:
Implementation of Google Maps and using locational data to plot the exact location of users in relation to their surroundings. Fetching location information for other users from the backend. Filtering to display other users/businesses within a specific location radius. Livechat messaging for users to plan play-dates/walks. 

## Original Concept

![Original Concept](./frontend/src/images/interface_wireframe.png)