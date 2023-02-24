# Puppy Play Dates

## Puppy Play Dates
Puppy Play Dates is an interactive social application that connects dog owners to one another to socialize and walk their pets.


## Background and Overview
During your puppy’s first three months of life, they will experience a socialization period that will permanently shape their future personality and how they will react to their environment as an adult dog. Gently exposing them to a wide variety of people, places, and other dogs will make a huge, permanent difference in their temperament.
This application allows dog owners to find other dogs in their area for their pet to socialize with making sure that they won't be overly fearful or aggressive towards other dogs. Users will sign up for an account, upload a profile picture and provide details about their pet including name, age, temperment, and vaccination status. Filtering will allow users to see which of their friends are online and in the area, as well as searching for other dogs that may be suitable friends for their pup. Once friendship is established, users may interact with each other by messaging one another and setting up time/places for their dogs to socialize.

## Functionality & MVP
User authorization: sign up and log in
User/Dog profile creation with images
Google Maps API displaying user location, other online users, pet-stores, parks, groomers, and veterinarians.
Informational modal displaying selected profiles and/or businesses.
Date 
Messaging between users.
Filtering/search functionality to display/hide friends, parks, businesses. 
Production README

### Bonus Features
 LiveChat between using websockets
 Map my walk feature tracking walks with your pup


## WireFrames

![](./frontend/src/images/interface_wireframe.png)

## Technologies
Puppy Play dates relies on Geolocation and Google Maps Platform to display locational information for profiles, businesses, and parks. Amazon Web Services will allow users to upload profile pictures. Future functionality will employ Websockets for live chat. 

Backend: MongoDB/Express

Frontend: React/Node.js, AWS, Google API Geolocation and Websockets


## Technical challenges:
Implementation of Google Maps and using locational data to plot the exact location of users in relation to their surroundings. Filtering to display other users/businesses within a specific location radius. Livechat messaging for users to plan play-dates/walks. 


## Group Members & Work Breakdown
    Logan Hartman - Team Lead
    Luis Perez - Backend
    Mei Huang - Frontend
    Janira Crispin - Project Flex

### Weekend
    All Members: meet to discuss application MVP and specifications, begin user authorization.

#### Monday
    Logan: Production Documentation, Wireframes, Design Concepts, Geolocation and Google Maps 
    Luis: Complete Backend User Auth and database structure
    Mei: Errorhandling for signin/signup
    Janira: AWS setup/implementation, Google Maps

#### Tuesday
    Logan: Modal implimentation for all pop-up windows, Landing Page, sitewide CSS
    Luis/Mei: Backend/frontend integration.
    Janira: Continue Google Maps and Geolocation

#### Wednesday
    Logan: Seed data, sitewide CSS
    Luis/Mei/Janira: Complete backend/frontend integration and seeding 

#### Thursday
    Logan/Janira: CSS styling
    Mei/Luis: Backend search/filtering
    Full-team: error fixing and finishing touches.
