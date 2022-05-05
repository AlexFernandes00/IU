const router = require('express').Router();

const controllerUtilizador = require('../controllers/utilizador.controller.js');

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Connected!' });
  });

  module.exports = router;

router.post('/registo', (req,res)=>{
  controllerUtilizador.registo(req, function(result){

    res.send(result);

    }
  );
});

router.post('/login', (req,res)=>{
  controllerUtilizador.registo(req, function(result){

    res.send(result);

    }
  );
});