// src/pages/Recetas.jsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import recetasData from "../data/recetasData";
import "../styles/Recetas.css";

import axios from "axios";

function Recetas() {
  const [recetas, setRecetas] = useState([]); // Estado para almacenar los libros (los datos)
  const [loading, setLoading] = useState(true); // Estado para manejar el loading

  useEffect(() => {
    // Función para obtener los libros desde la API
    const fetchRecetas = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/recetas/");
        setRecetas(response.data); // Guardamos las recetas en el estado
        setLoading(false); // Desactivamos el estado de loading
      } catch (error) {
        console.error("Error fetching the recipes", error);
      }
    };

    fetchRecetas(); // Llamamos a la función cuando el componente se monta
  }, []);

  if (loading) {
    return (
      <div className="spinner center">
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
      </div>
    );
  }

  return (
    <div className="recetas-page">
      <Header />
      <main className="recetas-main-content">
        {/* Recuadro superior en el body */}

        {/* Título "Empieza a cocinar" */}
        <h2 className="recetas-section-title">EMPIEZA A COCINAR</h2>

        {/* Grid de recetas */}
        <section className="recetas-grid">
          {recetas.map((receta) => (
            <div className="recetas-card" key={receta.id_receta}>
              <img src={receta.url_imagen} alt={receta.nombre_receta} />
              <Link
                to={`/receta/${encodeURIComponent(receta.id_receta)}`}
                className="recetas-name"
              >
                {receta.nombre_receta}
              </Link>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Recetas;
