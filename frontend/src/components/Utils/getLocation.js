// export function getLocation(){
//     navigator.geolocation.getCurrentPosition(function(position){
//         return([position.coords.latitude, position.coords.longitude])
//     })
// };

// export function getLocation(){
//     navigator.geolocation.getCurrentPosition(function(position){
//         return([position.coords.latitude, position.coords.longitude])
//     })
// };

// export function getLocation(){
//     return new Promise((resolve, reject) => {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           resolve([position.coords.latitude, position.coords.longitude]);
//         },
//         (error) => {
//           reject(error);
//         }
//       );
//     });
// };
  
export function getLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        position => resolve([position.coords.latitude, position.coords.longitude]),
        error => reject(error)
      );
    });
  }
  
