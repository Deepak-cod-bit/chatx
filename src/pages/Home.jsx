import React, { useState, useEffect, useContext } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../components/ThemeContext";
import "leaflet/dist/leaflet.css";

const createNeonIcon = (color) => L.divIcon({
  className: "custom-neon-icon",
  html: `<div style="background-color: ${color}; width: 15px; height: 15px; border-radius: 50%; box-shadow: 0 0 15px ${color}; border: 2px solid white;"></div>`,
  iconSize: [15, 15],
  iconAnchor: [7, 7],
});

const userIcon = createNeonIcon("#00ff41"); 
const peerIcon = createNeonIcon("#bc13fe"); 

function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI/180;
  const dLon = (lon2 - lon1) * Math.PI/180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

const Home = ({ setActiveChat }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const [userLocation, setUserLocation] = useState(null);
  const [radius, setRadius] = useState(5);
  const [nearbyUsers, setNearbyUsers] = useState([]);
  const navigate = useNavigate();

  const usersData = [
    { name: "Alice", lat: 19.315, lon: 84.792 },
    { name: "Bob", lat: 19.320, lon: 84.800 },
    { name: "Charlie", lat: 19.330, lon: 84.810 },
  ];

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      (err) => console.log(err),
      { enableHighAccuracy: true }
    );
  }, []);

  useEffect(() => {
    if (!userLocation) return;
    const nearby = usersData.filter(u => 
      getDistance(userLocation.lat, userLocation.lon, u.lat, u.lon) <= radius
    );
    setNearbyUsers(nearby);
  }, [userLocation, radius]);

  // Dynamic Map Tiles
  const tileUrl = isDarkMode 
    ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  return (
    <div className={`flex flex-col items-center min-h-screen p-6 transition-colors duration-300 ${isDarkMode ? "bg-black text-white" : "bg-white text-gray-900"}`}>
      <motion.h1 className={`text-4xl font-bold mb-6 ${isDarkMode ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600" : "text-purple-700"}`}>
        Neon Radar
      </motion.h1>

      <div className="mb-6 z-10 text-center">
        <label className="block text-sm font-medium mb-2">Scan Radius: {radius} km</label>
        <input 
          type="range" min="1" max="5" value={radius} 
          onChange={(e) => setRadius(Number(e.target.value))}
          className="w-64 accent-purple-500"
        />
      </div>

      {userLocation && (
        <div className={`w-full max-w-5xl h-[500px] rounded-3xl overflow-hidden border-2 transition-all ${isDarkMode ? "border-purple-500/30 shadow-[0_0_30px_rgba(188,19,254,0.2)]" : "border-gray-200 shadow-xl"}`}>
          <MapContainer key={isDarkMode} center={[userLocation.lat, userLocation.lon]} zoom={13} style={{height: "100%", width: "100%"}}>
            <TileLayer url={tileUrl} attribution='&copy; CARTO' />
            
            <Circle 
              center={[userLocation.lat, userLocation.lon]}
              radius={radius * 1000} 
              pathOptions={{ color: '#bc13fe', fillColor: '#bc13fe', fillOpacity: 0.1, weight: 2, dashArray: '5, 10' }}
            />

            <Marker position={[userLocation.lat, userLocation.lon]} icon={userIcon}>
              <Popup>You are here</Popup>
            </Marker>

            {nearbyUsers.map((u, i) => (
              <Marker key={i} position={[u.lat, u.lon]} icon={peerIcon}>
                <Popup>
                  <div className="text-black text-center">
                    <p className="font-bold">{u.name}</p>
                    <button 
                       onClick={() => { setActiveChat(u.name); navigate("/chat"); }}
                       className="mt-2 text-xs bg-purple-600 text-white px-3 py-1 rounded-full"
                    >
                      Message
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      )}
    </div>
  );
};

export default Home;