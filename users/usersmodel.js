const db = require('../server/dbconfig.js');

module.exports={
    add,
    findAllUsers,
    findAllDepartments,
    findUsersBy,
    findUsersByDepartment,
    findById
}
function findAllUsers(){
    return db('users')
}
function findAllDepartments(){
    return db('departments')
}
function findUsersBy(filter){
    return db('users')
            .where(filter)
            .orderBy('id')
}
function findUsersByDepartment(filter){
    return db('users')
            .where('users.dept_id', filter)
            .join('departments as d', 'd.id', '=', 'users.dept_id')
}
function findById(id){
    return db('users')
            .where({id})
            .first()
}
async function add(user){
    try{
        const [id] = await db('users')
                            .insert(user, "id")
                        return findById(id)
    } catch(error){
        throw error;
    }
}