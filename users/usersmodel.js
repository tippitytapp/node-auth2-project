const db = require('../server/dbconfig.js');

module.exports={
    add,
    findAllUsers,
    findAllDepartments,
    findUsersBy,
    findUsersByDepartment,
    findById,
    findDeptById
}
function findAllUsers(){
    return db('users as u')
            .join('departments as d', 'd.id', '=', 'u.dept_id')
            .select('u.id', 'u.name', 'u.username', 'd.name as dept')
}
function findAllDepartments(){
    return db('departments')
}
function findUsersBy(filter){
    // console.log(filter)
       return db('users as u')
            .where(filter)
            .join('departments as d',  'u.dept_id','d.id')
            .select('u.id', 'u.name', 'u.username', 'u.password', 'u.dept_id', 'd.name as dept')
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
function findDeptById(id){
    return db('departments')
            .where(id)
}