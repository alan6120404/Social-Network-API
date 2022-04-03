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
  .put(addReaction)
  .put(updateThought)
  .delete(removeThought);

// /api/Thoughts/:userId/:ThoughtId/:replyId
router.route('/:userId/:thoughtId/:reactionId').delete(removeReaction);



module.exports = router;