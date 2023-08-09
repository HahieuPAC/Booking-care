import express from "express";
import db from '../../models/index';


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

module.exports = {
    getHomePage: getHomePage,
}