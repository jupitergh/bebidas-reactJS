import React, { useContext, useState } from 'react';
import { ModalContext } from '../context/ModalContext';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles(theme => ({
     modal: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
     },
     paper: {
          position: 'absolute',
          width: 450,
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.shadows[5],
          border: '2px solid #000',
          padding: theme.spacing(2, 4, 3),
     },
}));

const Receta = ({ receta }) => {

     const [open, setOpen] = useState(false);

     const classes = useStyles();

     const handleOpen = () => setOpen(true);
     const handleClose = () => setOpen(false);


     const { recetaInfo, setIdReceta, setReceta } = useContext(ModalContext);


     const mostrarIngredientes = (info) => {
          let ingredientes = [];

          for (let i = 1; i < 16; i++) {
               if (info[`strIngredient${i}`]) {

                    ingredientes.push(
                         <li
                              key={`${i}`}
                         >{info[`strIngredient${i}`]} {info[`strMeasure${i}`]}</li>
                    )
               }
          }

          return ingredientes;
     }

     return (

          <div className="col-md-4 mb-3">
               <div className="card">
                    <h4 className="card-header">{receta.strDrink}</h4>
                    <img className="card-img-top" src={receta.strDrinkThumb} alt={`Imagen de ${receta.strDrink}`}></img>

                    <div className="card-body">
                         <button
                              type="button"
                              className="btn btn-block btn-primary"
                              onClick={() => {
                                   setIdReceta(receta.idDrink);
                                   handleOpen();
                              }}
                         >Ver Receta</button>

                         <Modal
                              open={open}
                              className={classes.modal}
                              onClose={() => {
                                   setIdReceta(null);
                                   setReceta({});
                                   handleClose();
                              }}
                              closeAfterTransition
                              BackdropComponent={Backdrop}
                              BackdropProps={{
                                   timeout: 500,
                              }}
                         >
                              <Fade in={open}>
                                   <div className={classes.paper}>
                                        <h2>{recetaInfo.strDrink}</h2>
                                        <h3 className="mt-4">Instrucciones</h3>
                                        <p>
                                             {recetaInfo.strInstructions}
                                        </p>
                                        <img src={recetaInfo.strDrinkThumb} className="img-fluid my-4" alt={recetaInfo.strDrink} />
                                        <h3>Ingredientes y cantidades</h3>
                                        <ul>
                                             {mostrarIngredientes(recetaInfo)}
                                        </ul>
                                   </div>
                              </Fade>
                         </Modal>
                    </div>

               </div>
          </div>
     );
}

export default Receta;
