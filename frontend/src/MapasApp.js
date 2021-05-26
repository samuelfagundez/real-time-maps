import React from "react";
import { MapaPage } from "./pages/MapaPage";
import { SocketProvider } from "./contexts/SocketContext";

export const MapasApp = () => {
  return (
    <SocketProvider>
      <MapaPage />
    </SocketProvider>
  );
};
