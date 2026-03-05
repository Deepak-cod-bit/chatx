import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";

// Haversine formula
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI/180;
  const dLon = (lon2 - lon1) * Math.PI/180;
  const a =
    Math.sin(dLat/2) ** 2 +
    Math.cos(lat1 * Math.PI/180) * Math.cos(lat2 * Math.PI/180) *
    Math.sin(dLon/2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

const Home = ({ setActiveChat }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [radius, setRadius] = useState(5);
  const [nearbyUsers, setNearbyUsers] = useState([]);
  const [followed, setFollowed] = useState([]);
  const navigate = useNavigate();

  const usersData = [
    { name: "Alice", lat: 19.315, lon: 84.792 },
    { name: "Bob", lat: 19.320, lon: 84.800 },
    { name: "Charlie", lat: 20.297, lon: 85.825 },
  ];

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      (err) => console.log("Geolocation error", err)
    );
  }, []);

  useEffect(() => {
    if (!userLocation) return;
    const nearby = usersData.filter(u => 
      getDistance(userLocation.lat, userLocation.lon, u.lat, u.lon) <= radius
    );
    setNearbyUsers(nearby);
  }, [userLocation, radius]);

  const handleFollow = (user) => {
    if (!followed.includes(user.name)) {
      setFollowed([...followed, user.name]);
    }
    // Set active chat and navigate
    setActiveChat(user.name);
    navigate("/chat");
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-blackbg text-white px-4 py-6">
      <motion.h1 className="text-5xl font-bold text-darkviolet mb-6" initial={{ opacity:0 }} animate={{ opacity:1 }}>
        Nearby People
      </motion.h1>

      {/* Radius input */}
      <div className="mb-4 w-64">
        <label className="block mb-1">Radius (km)</label>
        <input
          type="number"
          value={radius}
          onChange={(e) => setRadius(Number(e.target.value))}
          className="w-full p-2 rounded-lg text-black"
          min={1}
          max={50}
        />
      </div>

      {/* Nearby users list */}
      <div className="flex flex-col gap-2 mb-6">
        {nearbyUsers.length === 0 ? (
          <p className="text-gray-400">No one nearby</p>
        ) : (
          nearbyUsers.map((u, i) => (
            <div key={i} className="flex justify-between items-center w-64 bg-darkviolet p-2 rounded-lg">
              <span>{u.name}</span>
              {!followed.includes(u.name) ? (
                <button onClick={() => handleFollow(u)} className="bg-darkgreen px-2 py-1 rounded">
                  Follow & Chat
                </button>
              ) : (
                <span className="text-darkgreen font-bold">Following</span>
              )}
            </div>
          ))
        )}
      </div>

      {/* Map */}
      {userLocation && (
        <MapContainer center={[userLocation.lat, userLocation.lon]} zoom={13} className="w-full max-w-4xl h-96 rounded-xl">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap'
          />
          <Marker position={[userLocation.lat, userLocation.lon]}>
            <Popup>You are here</Popup>
          </Marker>
          {nearbyUsers.map((u, i) => (
            <Marker key={i} position={[u.lat, u.lon]}>
              <Popup>{u.name} {followed.includes(u.name) && "(Following)"}</Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  );
};

export default Home;