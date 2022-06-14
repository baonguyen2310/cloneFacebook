import { useState, useCallback } from "react";
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const Map = () => {
    //getPosition
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

    navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
    });


    //show Map
    const containerStyle = {
        width: "100%",
        height: "400px"
    };

    const center = {
        lat: latitude,
        lng: longitude
    };

    return (
        <LoadScript
            googleMapsApiKey="AIzaSyDaFR-u9Z4t2z81jxcUTQCLAEy2aj1Ncak"
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={15}
            >
            </GoogleMap>
        </LoadScript>
    )
}

export default Map;