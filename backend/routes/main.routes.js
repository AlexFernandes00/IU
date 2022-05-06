const router = require('express').Router();

const controllerUtilizador = require('../controllers/utilizador.controller.js');
const controllerComentario = require('../controllers/comentario.controller.js');


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
  controllerUtilizador.login(req, function(result){

    res.send(result);

    }
  );
});

router.get('/getId', (req,res)=>{
  controllerUtilizador.getId(req, function(result){

    res.send(result);

    }
  );
});

router.post('/criarComentario', (req,res)=>{
  controllerComentario.criarComentario(req, function(result){

    res.send(result);

    }
  );
});