export function getLocation(){
    navigator.geolocation.getCurrentPosition(function(position){return([position.coords.latitude, position.coords.longitude])
    })
};