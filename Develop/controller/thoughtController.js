const { User, Thoughts } = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thoughts.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req, res) {
        Thoughts.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then((thought) => 
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thought)
                )
                .catch((err) => res.status(500).json(err));
    },
    createThought(req, res) {
        Thoughts.create(req.body)
            .then((thought) => {  
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: thought._id } },
                    { new: true }
                )
            })
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
    updateThought(req, res) {
        Thoughts.findByIdAndUpdate(
            { _id : req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((thought) => 
            !thought
                ? res.status(404).json({ message: 'No thought with that ID' })
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    deleteThought(req, res) {
        Thoughts.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) => 
                !thought
                    ? res.status(404).json({ message: "No such thought exists"})
                    : res.json({ message: 'Thought successfully deleted' })
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            })
    }
}