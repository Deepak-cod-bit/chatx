import React from "react";
import Tilt from "react-parallax-tilt";

const Profile = () => (
  <div className="flex justify-center items-center h-[80vh]">
    <Tilt
      tiltMaxAngleX={15}
      tiltMaxAngleY={15}
      perspective={1000}
      transitionSpeed={1500}
      scale={1.02}
      className="parallax-effect"
    >
      <div className="bg-gradient-to-br from-darkgreen to-darkviolet p-8 rounded-2xl shadow-2xl text-white w-80 border border-white/10 backdrop-blur-sm">
        <div className="w-24 h-24 bg-blackbg rounded-full mb-4 mx-auto border-4 border-darkviolet shadow-inner flex items-center justify-center text-3xl font-bold">
          D
        </div>
        <h2 className="text-2xl font-bold mb-1 text-center">Deepak</h2>
        <p className="text-darkviolet-200 text-center text-sm mb-4 opacity-80">Premium Member</p>
        
        <div className="space-y-3 pt-4 border-t border-white/10">
          <div className="flex justify-between text-sm">
            <span className="text-gray-300">Status:</span>
            <span className="text-green-400 font-medium">Online</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-300">Messages:</span>
            <span className="font-medium">1,284</span>
          </div>
        </div>
      </div>
    </Tilt>
  </div>
);

export default Profile;