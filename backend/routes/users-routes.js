const express = require('express');

const router = express.Router();

const DummyUsersList = [
    {
        id: '1',
        fullName: 'Remy John',
        placeCount: 2,
    },
    {
        id: '2',
        fullName: 'John Sina',
        placeCount: 1,
    },
]

router.get('/:uid', (req, res, next) => {
    const userId = req.params.uid
    const user = DummyUsersList.find((u) => u.id === userId);

    res.json({user})
});

module.exports = router;
