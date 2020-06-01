import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const RecetasContext = createContext();

const RecetasProvider = props => {

     const [recetas, setRecetas] = useState([]);
     const [busqueda, setBusquedaReceta] = useState({
          nombre: '',
          categoria: ''
     });
     const [consultar, setConsultar] = useState(false);

     useEffect(() => {
          if (consultar) {
               const obtenerRecetas = async () => {
                    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${busqueda.nombre}&c=${busqueda.categoria}`;
                    const resultado = await axios(url);

                    // console.log(resultado.data.drinks);
                    setRecetas(resultado.data.drinks);
               }

               obtenerRecetas();
          }
     }, [busqueda,consultar]);

     return (
          <RecetasContext.Provider
               value={{
                    recetas,
                    setBusquedaReceta,
                    setConsultar

               }}
          >
               {props.children}
          </RecetasContext.Provider>
     );
}

export default RecetasProvider;