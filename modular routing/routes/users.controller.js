import { users } from "../../data/users.js";
import { item } from "../../data/items.js";
import {v4 as uuidv4} from 'uuid';

export const getAllUsers = (req, res) => {
    res.json(users);
}


export const getUserById= (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id))
    user ? res.send(user) : res.status(404).send('User not found');
}

export const createUser = (req, res) => {
    const { username, email } = req.body;
    if (!username || !email) {
        return res.status(400).send('Username and email are required');
    }



    const newUser = {id: uuidv4() , username, email };

    users.push(newUser);
    res.status(201).send(newUser);
}
    

    export const updateUser = (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found');
    user.username = req.body.username || user.username;
    res.json(user);
}

export const deleteUser = (req, res) => {
    const index = users.findIndex(u=> u.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('user not found');
    const removedUser = users.splice(index, 1);
    res.json(removedUser[0])

}

export const addItem = (req, res) => {
    const { name, price } = req.body;
    if (!name || !price) {
        return res.status(400).send('Name and price are required');
    }
    const newItem = { id: uuidv4(), name, price};
    item.push(newItem);
    res.status(201).send(newItem);
}

export const listItems = (req, res) => {
    res.json(item);
}