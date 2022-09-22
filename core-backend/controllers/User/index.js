const jwt = require("jsonwebtoken");
const express = require("express");
const User = require("../../models/auth/index");
const bcrypt = require("bcryptjs");

const getUser = async (req, res) => {
    try {
      const data = await User.find();
      
      res.status(200).json({ code: 200, message: "success", data })
    
    } catch (e) {
      res.status(400).json({ code: 400, message: e });
    }
  };


const createUser = async (req, res) => {
  console.log(req,"req.file.filename")
    // const image = req.file.filename;
    const newPassword = await bcrypt.hash(req.body.password, 10);
  try {
    const { first_name, last_name, email } = req.body;
    console.log(req.body,"req.body")
    const data = new User({
      first_name,
       last_name,
        email,
        password:newPassword
    });
    const saved_data = await data.save();
    
    res.status(200).json({ code: 200, message: "success", data: saved_data })
  
  } catch (e) {
    res.status(400).json({ code: 400, message: e });
  }
};

const getUserById = async (req, res) => {

  try {
    const _id = req.params.id;
    console.log(_id,"req.body")
    const found = await User.findById({_id});
    if(!found)
    return res.status(404).json({ code: 404, message: "user not exist" });
    
    res.status(200).json({ code: 200, message: "success", data: found })
  
  } catch (e) {
    res.status(400).json({ code: 400, message: e });
  }
};

const updateUser = async (req, res) => {

  try {
    const _id = req.params.id;
    console.log(req.body,"req.body")
    const { first_name, last_name, email } = req.body;
    const found = await User.findById({_id});
    if(!found)
    return res.status(404).json({ code: 404, message: "user not exist" });
    const data = await User.updateOne({_id},
      {$set: {
          first_name,
           last_name,
            email
      }});
    
    res.status(200).json({ code: 200, message: "success", data })
  
  } catch (e) {
    res.status(400).json({ code: 400, message: e });
  }
};

const deleteUser = async (req, res) => {

    try {
      const _id = req.params.id;
      console.log(req.body,"req.body")
      const found = await User.findById({_id});
      if(!found)
      return res.status(404).json({ code: 404, message: "user not exist" });
      const data = await User.deleteOne({_id});
      
      res.status(200).json({ code: 200, message: "success", data })
    
    } catch (e) {
      res.status(400).json({ code: 400, message: e });
    }
  };

module.exports = {
    createUser,
    getUser,
    getUserById,
    updateUser,
    deleteUser
  };