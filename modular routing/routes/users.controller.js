import { users } from "../../data/users.js";
import { item } from "../../data/items.js";
import {v4 as uuidv4} from 'uuid';
import validator from 'validator';

export const getAllUsers = (req, res) => {
    res.json(users);
}


export const getUserById= (req, res) => {
    if(!req.params.id) {
        return res.status(400).json({error: 'User ID is required'});
    }
    if(!validator.isUUID(req.params.id)) {
        return res.status(400).json({error: 'Invalid user ID format'});
    }
    const user = users.find(u => u.id === parseInt(req.params.id))
    user ? res.send(user) : res.status(404).send('User not found');
}

export const getUserWithFilter = (req, res) => {
    if(!req.query.username) {
        return res.status(400).json({error: 'Username query parameter is required'});
    }
    const {username} = req.query;
    let filteredUsers = users;
    if (username) {
        filteredUsers = filteredUsers.filter(u =>u.username.toLowerCase().includes((username.toLowerCase()))
    );
    
    }
    res.status(200).json(filteredUsers);
};


export const createUser = (req, res) => {
    const token = req.headers['x-custom-token'];
    if(token !== 'my-secret-token-123'){
        return res.status(403).send('Forbidden: Invalid token');
    }
    const { username, email } = req.body;
    if (!username || !email) {
        return res.status(400).send('Username and email are required');
    }



    const newUser = {id: uuidv4() , username, email };

    users.push(newUser);
    res.status(201).send(newUser);
}
    

    export const updateUser = (req, res) => {
    if(!req.params.id) {
        return res.status(400).json({error: 'User ID is required'});
    }
        if(!validator.isUUID(req.params.id)) {
        return res.status(400).json({error: 'Invalid user ID format'});
    }
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found');
    user.username = req.body.username || user.username;
    res.json(user);
}


export const getUsers = (req, res)=> {
    res.setHeader('halo', 'world');
    const {username,page = 1,limit = 3, sort='asc'  } = req.query;
    if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
    return res.status(400).send("Page and limit must be valid positive numbers");
}
    if (sort && !["asc", "desc"].includes(sort)) {
    return res.status(400).send("Invalid sort order. Use 'asc' or 'desc'");
}

    let filteredUsers = users;
    if (username){
    filteredUsers = filteredUsers.filter(u => u.username.toLowerCase().includes(username.toLowerCase()));
    }

    if(!filteredUsers.length) {
        return res.status(404).json({error: 'No users found'});
    }

    if(sort==='asc'){
        filteredUsers.sort((a,b)=>
            a.username.localeCompare(b.username)
        );
    }
        else if(sort==='desc'){
            filteredUsers.sort((a,b)=>
                b.username.localeCompare(a.username)
            );
    }


    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
    
    res.status(200).json(paginatedUsers);
    
}



export const deleteUser = (req, res) => {
    if(!req.params.id) {
        return res.status(400).json({error: 'User ID is required'});
    }
    if(!validator.isUUID(req.params.id)) {
        return res.status(400).json({error: 'Invalid user ID format'});
    }
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
    const  { page = 1, limit = 10, product, sort='asc' } = req.query;
    if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
    return res.status(400).send("Page and limit must be valid positive numbers");
}
    if (sort && !["asc", "desc"].includes(sort)) {
    return res.status(400).send("Invalid sort order. Use 'asc' or 'desc'");
}


    let filteredItems = item;
    if(product){
    filteredItems = item.filter(i => i.name.toLowerCase().includes(product.toLowerCase()));
    }

    if(!filteredItems.length) {
        return res.status(404).json({error: 'No items found'});
    }

    if(sort==='asc'){
        filteredItems.sort((a,b)=>
            a.name.localeCompare(b.name)
        );
    }
        else if(sort==='desc'){
            filteredItems.sort((a,b)=>
                b.name.localeCompare(a.name)
            );
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedItems = filteredItems.slice(startIndex, endIndex);
    res.status(200).json(paginatedItems);
}