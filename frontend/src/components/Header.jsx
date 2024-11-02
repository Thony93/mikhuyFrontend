// src/components/Header.jsx

// Importaciones necesarias
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.css';
import { FaHome } from 'react-icons/fa'; // Importamos el icono de casa




function Header({query, setQuery, onSearch}) {

  const [searchVisible, setSearchVisible] = useState(true); // Estado para controlar la visibilidad del buscador
  const header = document.querySelector('.header');
  const searchButton = document.querySelector('.search-button');
  const searchContainer = document.querySelector('.search-container');
  const navigate = useNavigate(); // Hook para navegar a otra ruta
  

  // Asegura que el cuadro de búsqueda esté oculto al cargar la página
  useEffect(() => {
    setSearchVisible(false);
  }, []);

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
    header.classList.toggle('expanded');
    searchContainer.classList.toggle('expanded');
  };
   
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    //onSearch(); // Llama a la función onSearch pasada desde Home cuando se hace clic en "Buscar"
    navigate(`/results?query=${query}`);
  };

  

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
            {/* Botón de Recetas */}
            <Link to="/recetas" className="nav-link">Recetas</Link>
            <button  
              className="search-button" 
              onClick={toggleSearch}
              title="Buscar" // Tooltip
              Header

            >
              🔍
            </button>
          </nav>
        </div>
      </div>
      {searchVisible && (
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Buscar audiolibros..." 
            className="search-input" 
            value={query}
            onChange={handleInputChange} 
          />
          <button className="search-btn" onClick={handleSearch}>Buscar</button>
        </div>
      )}
      
    </header>
  );
}

export default Header;
