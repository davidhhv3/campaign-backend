const pool = require('../db');
const Campanha = require('../models/campanhas_model');

class CamController{
    campanhaRegistrada;
    campanhaMos;

    prueba(req,res){
        res.status(200).send({message:"funciona"});
    }

    async buscar(valorBuscar,atributo){         
        try {  
            const campanha = await pool.query('SELECT * FROM `Campanha` WHERE ' +atributo+ ' = ?', [valorBuscar]);
            if(campanha.length==0){               /* si  no existe hace: */
                this.campanhaRegistrada = false;            
            }else{                                  /* si Existe hace: */
                this.campanhaRegistrada= true;              
                this.campanhaMos=campanha;                     
            } 
              
        } catch (error) {
            console.log(error);                
        }                             
    }
    async getCampanhas(req,res){
        try {
            const camps = await pool.query('SELECT Campanha.`idCampanha`,Campanha.idCampanha,Tipo.tipo as Tipo_idTipo,Estatus.estatus as Estatus_idEstatus,Campanha.`num_users`,Campanha.titulo, Campanha.creacion,Campanha.envio FROM `Campanha` INNER JOIN Estatus on Campanha.Estatus_idEstatus = Estatus.idEstatus INNER JOIN Tipo on Campanha.Tipo_idTipo=Tipo.idTipo');  
            if(camps.length==0){
                return res.status(404).json({message: 'No hay Campañas disponibles'});            
            }else{          
                return res.status(200).json(camps);
            }                 
        } catch (error) {
            console.log(error);        
            return res.status(500).send({message: 'Ha ocurrido un error'});
        }           
    }
    async getCampanha(req,res){
        var {id} = req.params;
        await this.buscar(id,"idCampanha");        
        try {
            if(this.campanhaRegistrada == true){            
                return res.status(200).json(this.campanhaMos[0]);
            }else{
                return res.status(404).send({message: 'La campaña no  esta registrada'});
            }            
        } catch (error) {
            console.log(error);
            return res.status(500).send({message: 'Ha ocurrido un error'});            
        }         
    }
    async  createCampanha(req,res){
        var params = req.body; 
        var campanha = new Campanha(params.titulo,params.Tipo_idTipo,params.Estatus_idEstatus,params.num_users,params.creacion,params.envio);
       
        try {
            const result = await pool.query('INSERT INTO `Campanha` set ?', [campanha]);/* inserta informacion */
            return res.status(200).json([{status:'succes'},{message: 'Campaña creada'}]);                                         
        } catch (error) {
            console.log(error);
            return res.status(500).send({message: 'Error, No se pudo registrar la campaña'});            
        }
    }
    async updateCampanha(req,res){
        const { id } = req.params;    
        var params = req.body;
        
        await this.buscar(id,"idCampanha");
            if(this.campanhaRegistrada == true){/* si  esta registrado hace: */
                try {
                    var campanha = new Campanha(params.titulo,params.Tipo_idTipo,params.Estatus_idEstatus,params.num_users,params.creacion,params.envio);
                    console.log(campanha);                    
                    await pool.query('UPDATE Campanha set ? WHERE idCampanha = ?', [campanha, id]);
                    return res.status(200).json({message: 'La Campaña fue modificada'});                                                               
                } catch (error) {
                    console.log(error);
                    return res.status(500).send({message: 'Error, No se ha modificado la persona'});            
                }
            }else{
                return res.status(404).send({message: 'El id no coincide con ninguna campaña'});
            }
    }
    async deleteCampanha(req,res){        
        var {id} = req.params;
        await this.buscar(id,"idCampanha");
        if(this.campanhaRegistrada == true){
            try {
                await pool.query('DELETE FROM Campanha WHERE idCampanha = ?', [id]);
                return  res.status(200).json({ message: "Campaña Eliminada" });           
            } catch (error) {
                console.log(error);        
                return res.status(500).send({message: 'Ha ocurrido un error'});                    
            }       

        }else{
            res.status(200).send({message: "La Campaña no esta registrada"});
        }
    }

    async getTipos(req,res){
        try {
            const tipos = await pool.query('SELECT * FROM `Tipo`');  
            if(tipos.length==0){
                return res.status(404).json({message: 'No hay tipos disponibles'});            
            }else{          
                return res.status(200).json(tipos);
            }                 
        } catch (error) {
            console.log(error);        
            return res.status(500).send({message: 'Ha ocurrido un error'});
        }  
    }

    async getEstatus(req,res){
        try {
            const estatus = await pool.query('SELECT * FROM `Estatus` ');  
            if(estatus.length==0){
                return res.status(404).json({message: 'No hay estatus disponibles'});            
            }else{          
                return res.status(200).json(estatus);
            }                 
        } catch (error) {
            console.log(error);        
            return res.status(500).send({message: 'Ha ocurrido un error'});
        }  
    }
}
const cc = new CamController();
module.exports = cc;