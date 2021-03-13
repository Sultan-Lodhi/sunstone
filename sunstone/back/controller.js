module.exports = {
    getListing,
    addUser,
    updateUser,
    deleteUser
}
const CURRENT_DATE_TIME = new Date().toISOString().slice(0, 10); // convrerting datetime into date format - yyyy-mm-dd

async function getListing(req,res){ // getting list os studenty and faculty
    try{
        res.setHeader('Access-Control-Allow-Origin', '*');
        let query = "SELECT * FROM add_users ORDER BY creation_date DESC";
        let data = [];
        await db.query(query, (err, result) => {
            if (err) throw err;
            data = Object.values(JSON.parse(JSON.stringify(result)));
            sendJson(res, result, false, 'Listing fetched successfully', 200, 1);
        });
    }
    catch(err){
        console.log(err);
        sendJson(res, err, true, 'Listing failed!', 406);
    }
}
async function addUser(req,res){ // adding new user to database
    try{
        res.setHeader('Access-Control-Allow-Origin', '*');
        let insertData = {name: req.body.name, email: req.body.email, subject: req.body.subject, user_type: req.body.type, image: req.body.image, creation_date: CURRENT_DATE_TIME};
        db.query('INSERT INTO add_users SET ?', insertData, (err, result) => {
            if (err) throw err;
            sendJson(res, {data:1}, false, 'Inserted successfully', 200, 1);
        });
    }
    catch(err){
        console.log(err);
        sendJson(res, err, true, 'Insertion failed!', 406);
    }
}
async function updateUser(req,res){ // updating the existing user on the basis of email
    try{
        let updateData = {}, update = [];
        if (req.body.name) {
            updateData = {
                ...updateData,
                name: req.body.name
            };
        }
        if (req.body.subject) {
            updateData = {
                ...updateData,
                subject: req.body.subject
            };
        }
        if (req.body.type) {
            updateData = {
                ...updateData,
                user_type: req.body.type
            };
        }
        if (req.body.image) {
            updateData = {
                ...updateData,
                image: req.body.image
            };
        }
        if(updateData){
            update = [updateData, req.body.email];
            db.query('UPDATE add_users SET ? WHERE email = ?', update, (err, result) => {
                if (err) throw err;
                sendJson(res, { data: 1}, false, 'User Updated successfully', 200, 1);
            });
        }
    }
    catch(err){
        console.log(err);
        sendJson(res, err, true, 'Update failed!', 406);
    }
}
async function deleteUser(req,res){ // deleting user on the basis of email
    try{
        db.query('DELETE FROM add_users WHERE email = ?', [req.body.email], (err, result) => {
            if (err) throw err;
            sendJson(res, { data:1 }, false, 'User Deleted successfully', 200, 1);
        });
    }
    catch(err){
        console.log(err);
        sendJson(res, err, true, 'Deletion failed!', 406);
    }
}
function sendJson(res, data, error, message, statusCode) { // sending backend data to front in a particular json format
    return res.json({
        data,
        error,
        message,
        statusCode
    });
}