const express = require('express');
const cors = require('cors');
const campanhaR = require('./routes/cam_routes');

class Server{
    app=express();

    constructor(){ 
        this.config();
        this.router();       
    }
    config(){
        this.app.set('port',process.env.PORT || 3000);

        /* Middleware */
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(cors());
    }
    router(){
        this.app.use('/api',campanhaR);
    }
    start(){
        this.app.listen(this.app.get('port'),()=> {
            console.log('Servidor corriendo en http://localhost:'+this.app.get('port'));
        });
    }
}
const s1= new Server();
s1.start();