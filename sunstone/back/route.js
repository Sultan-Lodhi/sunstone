const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/get',controller.getListing);
router.post('/post',controller.addUser);
router.put('/put',controller.updateUser);
router.delete('/delete',controller.deleteUser);
module.exports = router;