const userModel = require('../models/usermodel')
const userRoleModel = require('../models/userrolemodel');
const roleModel = require('../models/rolemodel');

async function getAllUsers(req, res) {
    try {
        const users = await userModel.getAllUsers();
        res.json(users);
    } catch (error) {
        console.error('Error fetcing users:', error);
        res.status(500).send('Error fetching users');
    }
}

async function getUserById(req, res) {
    const { id } = req.params;
    try {
        const user = await userModel.getUserById(id);
        if (!user) {
            return res.status(404).send('User not Found');
        }
        const roles = await userRoleModel.getRolesByUserId(id);
        user.roles = roles;
        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send('Error fetching user');
    }
}

async function createUser(req, res) {
    const { username, email, password, full_name, address, city, state, zip_code, country, phone_number, role_id } = req.body;
    if (!username || !email || !password) {
        return res.status(400).send('Username,email and password are required');
    }
    try {
        const newUser = await userModel.createUser(username, email, password, full_name, address, city, state, zip_code, country, phone_number);
        // Assign role to the user if provided
        const defaultRoleId = role_id || 1; // Assume 1 is the default role ID
        await userRoleModel.assignRoleToUser(newUser.id, defaultRoleId);

        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user', error);
        res.status(500).send('Error creating user');
    }
}

async function updateuser(req, res) {
    const { id } = req.params;
    const { username, email, password, full_name, address, city, state, zip_code, country, phone_number, role_id } = req.body;
    if (!username || !email || !password) {
        return res.status(400).send('Username, email and password are required');
    }
    try {
        const affectedRows = await userModel.updateUser(id, { username, email, password, full_name, address, city, state, zip_code, country, phone_number })
        if (affectedRows === 0) {
            return res.status(404).send('User not found');
        }
        // Assign role to the user if provided
        if (role_id) {
            await userRoleModel.assignRoleToUser(id, role_id);
        }
        res.json({ id, username, email, password, full_name, address, city, state, zip_code, country, phone_number });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Error updating user');
    }
}

async function deleteUser(req, res) {
    const { id } = req.params;
    try {
        const affectedRows = await userModel.deleteUser(id);
        if (affectedRows === 0) {
            return res.status(404).send('User not found');
        }
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send('Error deleting user');
    }
}


module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateuser,
    deleteUser
};  