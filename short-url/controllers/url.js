const shortid= require('shortid');
const URLmodel = require('../models/urls')


async function handleGenerateNewShortUrl(req, res) {
    const body = req.body;

    if(!body.url) return res.status(400).json({error: 'url is require'})

    const shortID = shortid();

    await URLmodel.create({
        shortid: shortID,
        redirectURL:body.url ,
        visitHistory: []

    })
    return res.json({id: shortID})
    
}


module.exports = {
    handleGenerateNewShortUrl,
}