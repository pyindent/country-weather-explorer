import React from "react";

interface MapProps {
  coord: {
    lat: string;
    lon: string;
  };
  name: string;
}

const Map: React.FC<MapProps> = ({ coord, name }) => (
  <div className="flex-1">
    <iframe
      src={`https://www.google.com/maps?q=${coord.lat},${coord.lon}&z=5&ie=UTF8&iwloc=&output=embed`}
      frameBorder="0"
      scrolling="no"
      className="w-full h-80 rounded-lg shadow-md"
      title={`${name} Map`}
    ></iframe>
  </div>
);

export default Map;
