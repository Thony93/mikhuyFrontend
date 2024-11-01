// src/main.jsx

// Importaciones principales
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App"; // Componente principal de la aplicación
import "./styles/index.css"; // Estilos globales

// Crea el root para renderizar la aplicación en el elemento con id 'root'
const root = ReactDOM.createRoot(document.getElementById("root"));

// Renderiza la aplicación dentro de React.StrictMode y BrowserRouter
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
