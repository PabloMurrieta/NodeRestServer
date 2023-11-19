import express from 'express';
import cors from 'cors';

import { createServer } from 'http';
import { Server } from 'socket.io';

import fileUpload from 'express-fileupload';

import { router } from '../routes/userRoutes.js';
import routerLogin from '../routes/auth.js'
import routerCategories from '../routes/categoriesRoutes.js';
import { routerProducts } from '../routes/productsRoutes.js';
import { routerBuscar } from '../routes/buscarRoutes.js';

import { dbConnection } from '../db/config.js';
import { routerOploads } from '../routes/uploadsRoutes.js';
import { socketController } from '../sockets/socketController.js';




class Servidor {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = createServer(this.app);
        this.io = new Server(this.server)

        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            categories: '/api/categories',
            usuarios: '/usuarios/api',
            products: '/api/products',
            uploads: '/api/uploads'
        }

        this.conectarDB();

        this.middleware();

        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));

        this.routes();

        //sockets
        this.sockets();


    }


    async conectarDB() {
        await dbConnection();
    }

    middleware() {
        //cors
        this.app.use(cors());

        this.app.use(express.json());

        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.paths.auth, routerLogin);
        this.app.use(this.paths.categories, routerCategories);
        this.app.use(this.paths.usuarios, router);
        this.app.use(this.paths.products, routerProducts);
        this.app.use(this.paths.buscar, routerBuscar);
        this.app.use(this.paths.uploads, routerOploads);
    }

    sockets() {

        this.io.on('connection', (socket) => socketController(socket, this.io))
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log('servidor corriendo en el puerto:', this.port);
        });
    }
}

export default Servidor;