const express = require('express');
const router = express.Router();
const db = require('../data/db');

router.get('/', (req,res) => {
    try {
        db
        .find()
        .then(data => {
            res.status(200).json(data);
        })
    } catch {
        res.status(500).json({ error: "The posts information could not be retrieved." });
    }
});

router.get('/:id', (req,res) => {
    try {
        db
        .findById(parseInt(req.params.id))
        .then(data => {
            if(!data.length) {
                return res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
            res.status(200).json(data);
        });
    } catch {
        res.status(500).json({ error: "The posts information could not be retrieved." });
    }
});

router.get('/:id/comments', (req,res) => {
    try {
        db
        .findPostComments(parseInt(req.params.id))
        .then(data => {
            if(!data.length) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
            res.status(200).json(data);
        })
    } catch {
        res.status(500).json({ error: "The comments information could not be retrieved." });
    }
});

router.post('/', (req,res) => {
    try {
        if(!req.body.title || !req.body.contents) {
            return res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
        }

        db
        .insert(req.body)
        .then(data => {
            res.status(201).json(req.body)
        })
    } catch {
        res.status(500).json({ error: "There was an error while saving the post to the database" });
    }
});

router.post('/:id/comments', (req,res) => {
  try {
      db
      .findPostComments(parseInt(req.params.id))
      .then(data => {
          if(!data.length) {
            return res.status(404).json({ message: "The post with the specified ID does not exist." });
          }

          if(!req.body.text) {
              return res.status(400).json({ errorMessage: "Please provide text for the comment." });
          }

          const newComment = {
              ...req.body,
              post_id: parseInt(req.params.id)
          }

          db
          .insertComment(newComment)
          .then(cData => {
              res.status(201).json(req.body);
          })
      })
  } catch {
      res.status(500).json({ error: "There was an error while saving the comment to the database" });
  }
});

router.delete('/:id', (req,res) => {
    try {
        db
        .findById(parseInt(req.params.id))
        .then(data => {
            if(!data.length) {
                return res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
            
            db
            .remove(parseInt(req.params.id))
            .then(data => {
                return res.status(202)
            })
        });
    } catch {
        res.status(500).json({ error: "The post could not be removed" });
    }
});

router.put('/:id', (req,res) => {
    try {
        db
        .findById(parseInt(req.params.id))
        .then(data => {
            if(!data.length) {
                return res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
            
            if(!req.body.title || !req.body.contents) {
                return res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
            }

            db
            .update(parseInt(req.params.id), req.body)
            .then(cData => {
                res.status(200).json(req.body)
            });

        });
    } catch {

    }
});

module.exports = router;