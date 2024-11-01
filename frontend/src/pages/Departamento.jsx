// src/pages/Departamento.jsx

import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import recetasData from "../data/recetasData";
import "../styles/Departamento.css";
import SeccionRecetas from "../components/SeccionRecetas"; // Importar el componente
import "../styles/SeccionRecetas.css"; // Importar los estilos

function Departamento() {
  const { nombre } = useParams();
  const departamento = nombre;

  // Definir los tipos en el orden especificado
  const tiposOrdenados = [
    "bebidas",
    "entradas",
    "plato-principal",
    "postres",
    "reposteria",
    "sopas",
  ];

  // Filtrar las recetas por departamento
  const recetasDelDepartamento = Object.values(recetasData).filter(
    (receta) => receta.departamento === departamento
  );

  if (recetasDelDepartamento.length === 0) {
    return (
      <div className="page">
        <Header />
        <main className="main-content">
          <h2>No se encontraron recetas para {departamento}</h2>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page">
      <Header />
      <main className="main-content">
        <h2 className="departamento-titulo">
          {departamento.charAt(0).toUpperCase() + departamento.slice(1)}
        </h2>

        {tiposOrdenados.map((tipo) => {
          // Filtrar las recetas por tipo y departamento
          const recetasPorTipo = recetasDelDepartamento.filter(
            (receta) => receta.tipo === tipo
          );

          // Si no hay recetas de este tipo, no renderizamos la sección
          if (recetasPorTipo.length === 0) return null;

          return (
            <SeccionRecetas key={tipo} tipo={tipo} recetas={recetasPorTipo} />
          );
        })}
      </main>
      <Footer />
    </div>
  );
}

export default Departamento;
