// src/pages/Receta.jsx

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Receta.css";
import axios from "axios";

function Receta() {
  const { id_receta } = useParams();
  const [receta, setReceta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReceta = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/recetas/${id_receta}/`
        );
        setReceta(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching the recipe:", err);
        setError("Error al cargar la receta");
        setLoading(false);
      }
    };

    fetchReceta();
  }, [id_receta]);

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

  if (error) {
    return <div>{error}</div>;
  }

  if (!receta) {
    return (
      <div className="receta-page">
        <Header />
        <main className="main-content">
          <h2>Receta no encontrada</h2>
          <p>La receta solicitada no existe.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="receta-page">
      <Header />
      <main className="main-content">
        <section className="contenedor-receta">
          <section className="seccion-derecha">
            <div className="seccion-atributos">
              <img
                src={receta.url_imagen}
                alt={receta.nombre_receta}
                className="receta-imagen"
              />
              <h3 className="tiempo-preparacion">
                Tiempo de preparación:{" "}
                <span style={{ color: "#000" }}>{receta.tiempo}</span>
              </h3>
              <h3 className="dificultad">
                Dificultad:{" "}
                <span style={{ color: "#000" }}>{receta.dificultad}</span>
              </h3>
            </div>

            <div className="seccion-preparacion">
              <h2 className="titulo-preparacion">Preparación</h2>
              <div className="explicacion-pasos">
                <ol>
                  {receta.pasos.map((paso, index) => (
                    <li key={index}>{paso.descripcion}</li>
                  ))}
                </ol>
              </div>
            </div>
          </section>

          <section className="seccion-izquierda">
            <div className="seccion-descripcion">
              <h2 className="nombre-receta">{receta.nombre_receta}</h2>
              <p className="descripcion">{receta.descripcion}</p>
            </div>

            <div className="seccion-ingredientes">
              <h2 className="titulo-ingredientes">Ingredientes</h2>
              <ul className="ingredientes">
                {receta.ingredientes.map((ingrediente, index) => (
                  <li key={index}>
                    {ingrediente.cantidad} {ingrediente.unidad.nombre_unidad} de{" "}
                    {ingrediente.ingrediente.nombre_ingrediente}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Receta;
