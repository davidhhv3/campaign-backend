const express = require("express");
const camController= require("../controllers/cam_controller");


class CamRoutes{
    api=express.Router();
    constructor(){
        this.config();
    }
    config(){
        this.api.get('/camPrueba',camController.prueba);
        this.api.get('/campanhas',camController.getCampanhas);
        this.api.get('/campanha/:id',camController.getCampanha.bind(camController));
        this.api.post('/createCampanha',camController.createCampanha.bind(camController));
        this.api.put('/updateCampanha/:id',camController.updateCampanha.bind(camController));
        this.api.delete('/deleteCampanha/:id',camController.deleteCampanha.bind(camController));

        this.api.get('/tipos',camController.getTipos);
        this.api.get('/estatus',camController.getEstatus);
    }
    
}

const cr = new CamRoutes();
module.exports=cr.api;