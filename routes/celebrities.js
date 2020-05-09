//todas as ações que envolvem celebrities devem estar nesse "arquivo"
// '/' neste arquivo refere-se ao caminho /celebrities

const express = require('express');
const celebrityRouter = express.Router();
const Celebrity = require('./../models/celebrity');


//Get a list of all celebrities

celebrityRouter.get('/', (req, res,next) => {
  console.log('rota');
  Celebrity.find()
  .then((result) => {
    res.render('celebrities/index', {celebrities: result});
  })
  .catch(error => {
    next(error);
  });
});

//rota  para os detalhes das celebs
celebrityRouter.get('/:id', (req,res,next) => {
  const celebrityId = req.params.id;
  
  Celebrity.findById(celebrityId)
.then(celebrityDetails => {
  console.log(celebrityDetails);
  res.render('celebrities/show', {celebrityDetails: celebrityDetails})
})
.catch(error => {
  next(error);
})
})

module.exports = celebrityRouter;