// Trong getPostController.js

import { PostModel } from "../models/postModel.js";

export const getPost = async(req, res) => {
    try {
        const posts = await PostModel.find();
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ err: err });
    }
}

export const createPost = async(req, res) => {
    try {
        const updatePost = req.body;

        const post = new PostModel(updatePost);
        await post.save();

        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ err: err });
    }
}

export const updatePost = async(req, res) => {
    try {
        const updatePost = req.body;

        const post = await PostModel.findOneAndUpdate({ _id: updatePost._id }, updatePost, { new: true });
        await post.save();

        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ err: err });
    }
}