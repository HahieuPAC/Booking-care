import express from "express";
import db from '../../models/index';
import {createNewUser, getAllUser, getUserInfoById, updateUserData, putCRUD } from "../service/CRUDService";


let getHomePage = async (req,res) => {
    try {
        let data = await db.user.findAll();
        return res.render('homePage', {
            data: JSON.stringify(data),
        });
    } catch (error) {
        console.log(error)
    }
}

let getAboutPage = (req,res) => {
        return res.render('test/about');
}

let getCRUD = (req,res) => {
    return res.render('crud');
}

let postCRUD = async (req,res) => {
    let message = await createNewUser(req.body);
    console.log(message);
    return res.send('postCRUD from sv');
}

let displayGetCRUD = async (req, res) => {
    let data = await getAllUser();
    return res.render('displayCRUD', {
        dataTable: data,
    });
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await getUserInfoById(userId);
        return res.render('editCRUD',{
            dataTable: userData,
        });
    }
    else {
        return res.send('user not found');
    }
}

let putCRUD = async (req, res) => {
    let data = req.body;
    await updateUserData(data);
    return res.send('update done');
}


module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD,
    displayGetCRUD,
    getEditCRUD,
    putCRUD,
}