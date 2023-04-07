const { Thoughts, User } = require('../models');

module.exports = {
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .then((user) => 
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(user)
                )
                .catch((err) => res.status(500).json(err));
    },
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    updateUser(req, res) {
        User.findByIdAndUpdate(
            { _id : req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((user) => 
            !user
                ? res.status(404).json({ message: 'No user with that ID' })
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) => 
                !user
                    ? res.status(404).json({ message: "No such user exists"})
                    : res.json({ message: 'User successfully deleted' })
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
        })
    },
    addFriend(req, res) {
        console.log('You are adding a new friend');
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.body } },
            { runValidators: true, new: true }
        )
        .then((user) =>
            !user
                ? res
                    .status(404)
                    .json({ message: 'No user found with that ID' })
                : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: { friendId: req.params._id } } },
            { runValidators: true, new: true }
        )
            .then((user) => 
                !user
                    ? res
                        .status(404)
                        .json({ message: 'No user found with this ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    
}