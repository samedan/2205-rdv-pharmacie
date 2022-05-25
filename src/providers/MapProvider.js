import React, { createContext, useContext, useRef } from "react";
import tt from "@tomtom-international/web-sdk-maps";
import axios from "axios";

const MapContext = createContext(null);

export const MapProvider = ({ children, apiKey }) => {
  // CACHE for TomTom
  const cache = useRef({});

  const normalizeLocation = (location) => {
    return location.replace(/\s/g, "").toLowerCase();
  };
  const cacheLocation = (location, position) => {
    // normalize location "new york, 16 avenue pasteur"
    const locationKey = normalizeLocation(location);

    return (cache.current[locationKey] = position);
  };

  const getCachedLocation = (location) => {
    const locationKey = normalizeLocation(location);
    return cache.current[locationKey];
  };

  const initMap = () => {
    const map = tt.map({
      // 'apiKey' from App.js
      key: apiKey,
      container: "bwm-map",
      style: "tomtom://vector/1/basic-main",
      zoom: 15,
      // disables Zoom on mouse
      scrollZoom: false,
    });
    // Adds ZOOM Buttons
    map.addControl(new tt.NavigationControl());
    // console.log("cache ", cache.current);
    return map;
  };

  const setCenter = (map, position) => {
    map.setCenter(new tt.LngLat(position.lon, position.lat));
  };

  const addMarker = (map, position) => {
    const markerDiv = document.createElement("div");
    markerDiv.className = "bwm-marker";
    new tt.Marker({
      // custom MARKER for Map
      element: markerDiv,
    })
      .setLngLat([position.lon, position.lat])
      .addTo(map);
  };

  const addPopupMessage = (map, message) => {
    new tt.Popup({
      className: "bwm-popup",
      closeButton: false,
      closeOnClick: false,
    })
      .setLngLat(new tt.LngLat(0, 0))
      .setHTML(`<p>${message}</p>`)
      .addTo(map);
  };

  const getGeoPosition = (location) => {
    // console.log("decide if have Cache or Not");
    const cachedPosition = getCachedLocation(location);
    // if (cachedPosition) {
    //   console.log("Yes, cache");
    // } else {
    //   console.log("NO cache");
    // }
    return cachedPosition
      ? Promise.resolve(cachedPosition)
      : requestGeoLocation(location);
  };

  const requestGeoLocation = (location) => {
    // console.log("Getting the Position from TomTom");
    // check cache first
    return axios
      .get(
        `https://api.tomtom.com/search/2/geocode/${location}.JSON?key=${apiKey}`
      )
      .then((res) => res.data)
      .then((tomRes) => {
        const results = tomRes.results;
        if (results && results.length > 0) {
          // if more results come from TomTom
          const { position } = results[0];
          // store location in cache
          cacheLocation(location, position);
          return position;
        }
        return Promise.reject("Location not found");
      })
      .catch(() => Promise.reject("Location not found"));
  };

  const mapApi = {
    initMap,
    getGeoPosition,
    setCenter,
    addMarker,
    addPopupMessage,
  };

  return <MapContext.Provider value={mapApi}>{children}</MapContext.Provider>;
};

export const useMap = () => {
  return useContext(MapContext);
};
