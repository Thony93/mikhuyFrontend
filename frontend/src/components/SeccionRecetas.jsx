// src/components/SeccionRecetas.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/SeccionRecetas.css';

function SeccionRecetas({ tipo, recetas }) {
  const [indice, setIndice] = useState(0);
  const maxVisible = 3; // Número máximo de recetas visibles

  // Funciones para manejar los botones de siguiente y anterior
  const siguiente = () => {
    if (indice + maxVisible < recetas.length) {
      setIndice(indice + maxVisible);
    }
  };

  const anterior = () => {
    if (indice - maxVisible >= 0) {
      setIndice(indice - maxVisible);
    }
  };

  // Obtener las recetas visibles
  const recetasVisibles = recetas.slice(indice, indice + maxVisible);

  // Formatear el título del tipo
  const tituloTipo = tipo
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <section className="seccion-recetas">
      <h3 className="titulo-seccion">{tituloTipo}</h3>
      <div className="recetas-fila">
        <button onClick={anterior} disabled={indice === 0} className="boton-navegacion">
          &#60;
        </button>
        <div className="recetas-container">
          {recetasVisibles.map((receta) => (
            <div className="receta-card" key={receta.nombre}>
              <img src={receta.imagen} alt={receta.nombre} />
              <Link to={`/receta/${receta.nombre}`} className="receta-button">
                {receta.nombre}
              </Link>
            </div>
          ))}
        </div>
        <button
          onClick={siguiente}
          disabled={indice + maxVisible >= recetas.length}
          className="boton-navegacion"
        >
          &#62;
        </button>
      </div>
    </section>
  );
}

export default SeccionRecetas;
