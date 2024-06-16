const rolemodel = require('../models/rolemodel');

async function getAllRole(req, res) {
    try {
        const roles = await rolemodel.getAllRole()
        res.json(roles);
    } catch (error) {
        console.error('Error fetching role:', error);
        res.status(500).send('error fetching role');
    }
}

async function getRoleById(req, res) {
    const { id } = req.params;
    try {
        const role = await rolemodel.getRoleById(id);
        if (!role) {
            return res.status(404).send('Role not Found');
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching role:', error);
        res.status(500).send('Error fetching role');
    }
}


async function createRole(req, res) {
    const { rolename } = req.body;
    if (!rolename) {
        return res.status(400).send('Role Name is required');
    }
    try {
        const newRole = await rolemodel.createRole(rolename);
        res.status(201).json(newRole);
    } catch (error) {
        console.error('Error creating Role', error);
        res.status(500).send('Error creating Role');
    }
}

async function updateuser(req, res) {
    const { roleid } = req.params;
    const { rolename } = req.body;
    if (!rolename) {
        return res.status(400).send('Role name is required');
    }
    try {
        const affectedRows = await rolemodel.updateUser(roleid, { rolename })
        if (affectedRows === 0) {
            return res.status(404).send('Role not found');
        }
        res.json({ roleid, rolename });
    } catch (error) {
        console.error('Error updating role:', error);
        res.status(500).send('Error updating role');
    }
}

async function deleteRole(req, res) {
    const { roleid } = req.params;
    try {
        const affectedRows = await userModel.deleteUser(roleid);
        if (affectedRows === 0) {
            return res.status(404).send('Role not found');
        }
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting role:', error);
        res.status(500).send('Error deleting role');
    }
}

module.exports = {
    getAllRole,
    getRoleById,
    createRole,
    updateuser,
    deleteRole
}