
const getAllUsers= (req, res) => {
    res.send('all users');
}

const getUserById = (req, res) => {
    res.send(`user id: ${req.params.id}`);
}

export { getAllUsers, getUserById };