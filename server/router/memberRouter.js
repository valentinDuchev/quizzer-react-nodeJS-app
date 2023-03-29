const router = require('express').Router();

const {getAllMembers, createCard, getMemberByCardNumber } = require ('../controllers/memberController')


router.get('/allMembers', async (req, res) => {
    const result = await getAllMembers();

    res.status(200).json({ result, message: 'success'})
})

module.exports = router;
