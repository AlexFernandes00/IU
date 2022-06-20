const router = require('express').Router();

const controllerUtilizador = require('../controllers/utilizador.controller.js');
const controllerComentario = require('../controllers/comentario.controller.js');
const controllerPublicacao = require('../controllers/publicacao.controller.js');
const controllerParque = require('../controllers/parque.controller.js');
const controllerParqueEstacionamento = require('../controllers/parqueestacionamento.controller.js');
const controllerAtividade = require('../controllers/atividade.controller.js');
const controllerInformacao = require('../controllers/informacao.controller.js');


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
    res.cookie("id", req.session.idUtilizador, {
      httpOnly: false,
    })
    res.cookie("isloggedIn", true, {
      httpOnly: false,
    })
    res.send(result);

    }
  );
});

//Nova rota loggedin
router.get('/user/loggedin', (req,res)=>{
  controllerUtilizador.utilizadorAutenticado(req, function(result){

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

router.put('/editarcomentario', (req,res)=>{
  controllerComentario.editarcomentario(req, function(result){

    res.send(result);

    }
  );
});

router.delete('/apagarcomentario', (req,res)=>{
  controllerComentario.apagarcomentario(req, function(result){

    res.send(result);

    }
  );
});

router.get('/listarComentarios', (req,res)=>{
  controllerComentario.listarComentarios(req, function(result){

    res.send(result);

    }
  );
});

router.get('/listarComentariosPorPost', (req,res)=>{
  controllerComentario.listarComentariosPorPost(req, function(result){

    res.send(result);

    }
  );
});

router.post('/fazerpublicacao', (req,res)=>{
  console.log("nas rotas: " + req.session.email);
  controllerPublicacao.fazerpublicacao(req, function(result){

    res.send(result);

    }
  );
});

router.put('/editarpublicacao', (req,res)=>{
  controllerPublicacao.editarpublicacao(req, function(result){

    res.send(result);

    }
  );
});

router.delete('/apagarpublicacao', (req,res)=>{
  controllerPublicacao.apagarpublicacao(req, function(result){

    res.send(result);

    }
  );
});

router.get('/listarPub', (req,res)=>{
  controllerPublicacao.listarPub(req, function(result){

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

router.post('/adicionarParqueEstacionamentoParque', (req,res)=>{
  controllerParque.adicionarParqueEstacionamentoParque(req, function(result){

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

router.get('/listarparques', (req,res)=>{
  controllerParque.listarparques(req, function(result){

    res.send(result);

    }
  );
});


router.post('/criarParqueEstacionamento', (req,res)=>{
  controllerParqueEstacionamento.criarParqueEstacionamento(req, function(result){

    res.send(result);

    }
  );
});


router.put('/editarParqueEstacionamento', (req,res)=>{
  controllerParqueEstacionamento.editarParqueEstacionamento(req, function(result){

    res.send(result);

    }
  );
});


router.delete('/apagarParqueEstacionamento', (req,res)=>{
  controllerParqueEstacionamento.apagarParqueEstacionamento(req, function(result){

    res.send(result);

    }
  );
});


router.get('/listarParquesEstacionamento', (req,res)=>{
  controllerParqueEstacionamento.listarParquesEstacionamento(req, function(result){

    res.send(result);

    }
  );
});


router.post('/criarAtividade', (req,res)=>{
  controllerAtividade.criarAtividade(req, function(result){

    res.send(result);

    }
  );
});


router.put('/editarAtividade', (req,res)=>{
  controllerAtividade.editarAtividade(req, function(result){

    res.send(result);

    }
  );
});


router.delete('/apagarAtividade', (req,res)=>{
  controllerAtividade.apagarAtividade(req, function(result){

    res.send(result);

    }
  );
});



router.get('/listarAtividades', (req,res)=>{
  controllerAtividade.listarAtividades(req, function(result){

    res.send(result);

    }
  );
});



router.post('/criarInformacao', (req,res)=>{
  controllerInformacao.criarInformacao(req, function(result){

    res.send(result);

    }
  );
});
