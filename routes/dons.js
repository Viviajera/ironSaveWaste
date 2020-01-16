// const express = require('express');
// const router  = express.Router();

// const Don = require('../models/don.js');

// // --------------------------------------GET view liste de dons
// router.get('/', (req, res, next) => {
//     res.render('dons/index');
//   });

// //----------------------------POST formulaire ajouter un nouveau don
// router.get('/new', function(req,res,next){
//     res.render('dons/new')
//   })

//   router.post('/new', function(req,res,next){
//     const donNom = req.body.donNom;
//     const donType = req.body.donType;
//     const donPoids = req.body.donPoids;
//     const doneur = req.body.doneur;
//     const donStatus = req.body.donStatus;
//     const preneur = req.body.preneur;

//    Don.create({
//         donNom,
//         donType,
//         donPoids,
//         doneur,
//         donStatus,
//         preneur,

//     }).then(
//       res.redirect('/dons/index') // Pas sure
//     )
//   })
// //---------------------------------------------- Editer un don
// router.get('/:id/edit', function(req,res,next){
//     Don.findById(req.params.id).then (function(celebrity){
//       res.render('dons/edit',{
//         don:don,
//       }).catch(err=>next(err));
//     })
//     router.post('/:id/edit', function(req,res,next){
//       Don.update({_id:req.query.don_id},{$set:{
//         donNom : req.body.donNom,
//         donType : req.body.donType,
//         donPoids : req.body.donPoids,
//         doneur : req.body.doneur,
//         donStatus : req.body.donStatus,
//         preneur : req.body.preneur,
//       }}).then (function(){
//       res.redirect(`/dons/${req.query.don_id}`)
//       }).catch(err=>next(err))
//     })
//  //------------------------------------------------supprimer un don
//   router.post('/:id/delete', function(req,res,next) {
//     Don.findByIdAndRemove(req.params.id)
//       .then(() => {
//         console.log('check');
//         res.redirect('/dons')// A vérifier
//       }).catch(err => next(err));
//   })

//   })
// module.exports = router;
