const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtsById,
    addThought,
    removeThought,
    updateThought,
    addReaction,
    removeReaction
  } = require('../../controllers/thoughts-controller');


  
// /api/Thoughts/<userId>
router
    .route('/:userId')
    .post(addThought)
    .get(getAllThoughts);

// /api/Thoughts/<userId>/<ThoughtId>
// /api/Thoughts/:userId/:ThoughtId

router
  .route('/:userId/:thoughtId')
  .get(getThoughtsById)
  .put(updateThought)
  .put(addReaction)
  .delete(removeThought);

// /api/Thoughts/:userId/:ThoughtId/:reactionId
router.route('/:userId/:thoughtId/:reactionId').put(removeReaction);



module.exports = router;