const router = require('express').Router();

const controllerUtilizador = require('../controllers/utilizador.controller.js');
const controllerComentario = require('../controllers/comentario.controller.js');
const controllerPublicacao = require('../controllers/publicacao.controller.js');
const controllerParque = require('../controllers/parque.controller.js');


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

router.post('/registoManutencao', (req,res)=>{
  controllerUtilizador.registoManutencao(req, function(result){

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

router.get('/getIdTipoUtilizador', (req,res)=>{
  controllerUtilizador.getIdTipoUtilizador(req, function(result){

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

router.post('/fazerpublicacao', (req,res)=>{
  controllerPublicacao.fazerpublicacao(req, function(result){

    res.send(result);

    }
  );
});

router.post('/criarParque', (req,res)=>{
  controllerParque.criarParque(req, function(result){

    res.send(result);

    }
  );
});

router.put('/editarParque', (req,res)=>{
  controllerParque.editarParque(req, function(result){

    res.send(result);

    }
  );
});

router.delete('/apagarParque', (req,res)=>{
  controllerParque.apagarParque(req, function(result){

    res.send(result);

    }
  );
});