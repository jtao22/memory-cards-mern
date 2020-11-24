import express from 'express';
import mongoose from 'mongoose';
import PostMessage from '../models/postmessage.js';

export const getPost = async (req,res) =>{
    try{
        const post = await PostMessage.find();
        console.log(post);
        res.status(200).json(post);
    }catch (error){
        res.status(404).json({message: error.message});
    }
}
export const createPost = async (req,res) =>{
    const post = req.body;
    const newpost = new PostMessage(post);
    try {
        await newpost.save();
        res.status(201).json(newpost);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}
export const changePost = async (req,res) =>{
    const {id: _id}= req.params;
    const post = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('No post with that ID!');
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(_id,{...post,_id},{new: true});
    res.json(updatedPost);
}

export const deletePost = async (req,res) => {
    const {id}= req.params;
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send('No post with that ID!');
    }
    await PostMessage.findByIdAndRemove(id);
    res.json({message: "Post deleted successfully!"}); 
}

export const likePost = async (req,res) => {
    const {id}= req.params;
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send('No post with that ID!');
    }
    const post = await PostMessage.findById(id);
    const updatedpost = await PostMessage.findByIdAndUpdate(id,{likeCount: post.likeCount+1}, {new: true});
    res.json(updatedpost);
}
