// src/pages/TipoDeRecetas.jsx

// Importaciones necesarias
import React from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import recetasData from "../data/recetasData";
import "../styles/TipoDeRecetas.css";

// Componente que muestra las recetas filtradas por tipo
function TipoDeRecetas() {
  const { tipo } = useParams();

  // Filtrar las recetas por tipo
  const recetas = Object.values(recetasData).filter(
    (receta) => receta.tipo === tipo
  );

  // Si no se encuentran recetas, mostrar un mensaje
  if (recetas.length === 0) {
    return (
      <div className="page">
        <Header />
        <main className="main-content">
          <h2>No se encontraron recetas para {tipo}</h2>
        </main>
        <Footer />
      </div>
    );
  }

  // Renderizar las recetas encontradas
  return (
    <div className="page">
      <Header />
      <main className="main-content">
        <h2>{tipo.charAt(0).toUpperCase() + tipo.slice(1)}</h2>
        <div className="recetas-grid">
          {recetas.map((receta) => (
            <div className="receta-card" key={receta.nombre}>
              <img src={receta.imagen} alt={receta.nombre} />
              <Link to={`/receta/${receta.nombre}`} className="receta-button">
                {receta.nombre}
              </Link>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default TipoDeRecetas;
