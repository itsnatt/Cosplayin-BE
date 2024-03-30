const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL|| 'postgresql://postgres:postgres@localhost:5432/firstapijs',
    ssl: process.env.DATABASE_URL ? true : false
})



const getUsers2 = async (req,res)=>{
    try
    {
        const response = await pool.query('SELECT * FROM users');
        res.status(200).json(response.rows);
    }
    catch(error){
        console.log(error);
        res.send("Error: "+error);
    }
};

const getUserById2 = async(req,res) => {
    const id = req.params.id;
    const response = await pool.query('SELECT * FROM users WHERE id = $1',[id]);
    res.json(response.rows);
};

const createUser2 = async (req,res)=>{
    const {name, email} = req.body;
    const response = await pool.query('INSERT INTO users(name, email) VALUES($1, $2)',[name, email ]);
    console.log(response);
    res.json({
        message: 'User Added Successfully',
        body:{
            user:{name,email}
        }
    });
};

const deleteUser2 = async(req,res) =>{
    const id = req.params.id;
    const response = await pool.query('DELETE FROM users WHERE id = $1',[id]);
    console.log(response);
    res.json(`User ${id} deleted successfully`);
};

const updateUser2 = async(req,res) => {
    const id = req.params.id;
    const {name, email} = req.body;
    const response = await pool.query('UPDATE users SET name = $1, email=$2 WHERE id = $3',[name, email,id]);
    console.log(response);
    res.json('User updated successfully');
};

module.exports = {
    getUsers2,
    getUserById2,
    createUser2,
    deleteUser2,
    updateUser2
}