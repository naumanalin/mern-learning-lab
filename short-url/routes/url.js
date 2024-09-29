const express = require('express')
const router = express.Router();
import {handleGenerateNewShortUrl} from '../controllers/url';


router.get('/', handleGenerateNewShortUrl);



module.exports = router;