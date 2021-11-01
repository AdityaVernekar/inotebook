const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    obj = {
        title: 'Login',
        message: 'login to add',
        error: null
    }
    res.json(obj);
})
module.exports = router;