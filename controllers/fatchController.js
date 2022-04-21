const express = require("express");
const bigPromise = require("../middlewares/bigPromise");
const { json } = require("express/lib/response");
const axios = require('axios');
const User = require("../models/userModel");

exports.index = bigPromise(async (req, res, next) => {
  
      res.render('index');
});

exports.ddl = bigPromise(async (req, res, next) => {
  var path = req.body.path;
  res.download(path);
});


exports.logi = bigPromise(async (req, res, next) => {
  
  res.render('login');
});
exports.signup_get = bigPromise(async (req, res, next) => {
  
  res.render('signup');
});
exports.dashboard = bigPromise(async (req, res, next) => {
//   User.find({}, function(err,data){
// if(err) throw err;
//     res.render('dashboard',{user:data});
//     console.log(id)
//   })
  // res.render('dashboard');
  res.send("hello");
});

exports.records = bigPromise(async (req, res, next) => {
  const email = req.body.email;
  console.log(email)
  User.findOne({email:email}, function(err,data){
if(err) throw err;
    res.render('records',{user:data});
    console.log(data)
  })
  
});