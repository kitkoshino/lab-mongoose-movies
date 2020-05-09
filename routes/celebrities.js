//todas as ações que envolvem celebrities devem estar nesse "arquivo"
// '/' neste arquivo refere-se ao caminho /celebrities

const express = require('express');
const celebrityRouter = express.Router();
const Celebrity = require('./../models/celebrity');

//Get a list of all celebrities

celebrityRouter.get('/', (req, res, next) => {
  console.log('rota');
  Celebrity.find()
    .then((result) => {
      res.render('celebrities/index', { celebrities: result });
    })
    .catch((error) => {
      next(error);
    });
});

//rota para exibir celebs criadas
celebrityRouter.get('/create', (req, res) => {
  console.log('Oi eu sou o Goku!');
  res.render('celebrities/create');
});

//rota  para os detalhes das celebs
celebrityRouter.get('/:id', (req, res, next) => {
  const celebrityId = req.params.id;

  Celebrity.findById(celebrityId)
    .then((celebrityDetails) => {
      console.log(celebrityDetails);
      res.render('celebrities/show', { celebrityDetails: celebrityDetails });
    })
    .catch((error) => {
      next(error);
    });
});

//rota para criar nova celeb
celebrityRouter.post('/', (req, res, next) => {
  console.log('rota post');
  const newCelebrity = {
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase,
  };

  Celebrity.create(newCelebrity)
    .then(() => {
      res.redirect('celebrities');
    })
    .catch((error) => {
      res.render('celebrities/create');
    });
});

//Deletar celebs
celebrityRouter.post('/:id/delete', (req, res, next) => {
  const celebrityId = req.params.id;

  Celebrity.findByIdAndRemove(celebrityId)
    .then(() => {
      console.log('DELETE');
      res.redirect('/celebrities');
    })
    .catch((error) => {
      console.log('ERRO: ', error);
      next(error);
      return error;
    });
});

//rota para editar celebs
celebrityRouter.get('/:id/edit', (req, res, next) => {
  const celebrityId = req.params.id;

  Celebrity.findById(celebrityId)
    .then((celebrityDetails) => {
      console.log('DETAIL: ', celebrityDetails);
      res.render('celebrities/edit', { celebrityDetails });
    })
    .catch((error) => {
      next(error);
    });
});

//editar celebs
celebrityRouter.post('/:id', (req, res, next) => {
  const celebrityId = req.params.id;
  const celebrityData = {
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase,
  };

  Celebrity.findByIdAndUpdate(celebrityId, celebrityData)
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = celebrityRouter;
