// src/components/Header.jsx

// Importaciones necesarias
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import { FaHome } from 'react-icons/fa'; // Importamos el icono de casa

function Header() {
  //render del componente header
  return (
    <header className="header">
      <div className="header-content">
        <div className="left-section">
          {/* Logo del sitio */}
          <div className="logo-section">
            <Link to="/" className="logo-link">
              <img className="logo-placeholder" src="/assets/img_logo.png" alt="Logo" />
            </Link>
            <Link to="/" className="logo-link">
              <h1 className="site-name">MIKHUY</h1>
            </Link>
          </div>
          {/* Menú de navegación */}
          <nav className="nav-menu">
            {/* Botón de Inicio con icono de casa */}
            <Link to="/" className="nav-link">
              <FaHome size={20} />
            </Link>
            {/* Botón de Recetas */}
            <Link to="/recetas" className="nav-link">Recetas</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
