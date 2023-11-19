import { Router } from 'express';
import { buscar } from '../controllers/buscarControllers.js';


const routerBuscar = Router();

routerBuscar.get('/:coleccion/:termino',buscar)


export {
    routerBuscar
}