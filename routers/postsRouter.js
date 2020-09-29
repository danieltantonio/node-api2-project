const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    try {
        res.status(200).json({ message: 'It works! '});
    } catch {
        res.status(500).json({ error: "The posts information could not be retrieved." });
    }
})

module.exports = router;