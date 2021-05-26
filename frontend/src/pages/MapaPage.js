import React, { useEffect, useContext } from "react";
import { useMapbox } from "../hooks/useMapbox";
import { SocketContext } from "../contexts/SocketContext";

const puntoInicial = {
  lng: 5,
  lat: 34,
  zoom: 4,
};

export const MapaPage = () => {
  const {
    coords,
    setRef,
    nuevoMarcador$,
    movimientoMarcador$,
    agregarMarcador,
    actualizarPosicion,
  } = useMapbox(puntoInicial);

  const { socket } = useContext(SocketContext);

  useEffect(() => {
    nuevoMarcador$.subscribe((marker) => {
      socket.emit("marcador-nuevo", marker);
    });
  }, [nuevoMarcador$, socket]);

  useEffect(() => {
    movimientoMarcador$.subscribe((marker) => {
      socket.emit("marcador-actualizado", marker);
    });
  }, [movimientoMarcador$, agregarMarcador, socket]);

  useEffect(() => {
    socket.on("marcador-actualizado", (marker) => {
      actualizarPosicion(marker);
    });
  }, [socket, actualizarPosicion]);

  useEffect(() => {
    socket.on("marcador-nuevo", (marker) => {
      agregarMarcador(marker, marker.id);
    });
  }, [socket, agregarMarcador]);

  useEffect(() => {
    socket.on("marcadores-activos", (markers) => {
      Object.keys(markers).forEach((key) => {
        agregarMarcador(markers[key], key);
      });
    });
  }, [socket, agregarMarcador]);

  return (
    <>
      <div className="info">
        Lng: {coords.lng} | lat: {coords.lat} | zoom: {coords.zoom}
      </div>
      <div className="mapContainer" ref={setRef} />
    </>
  );
};
