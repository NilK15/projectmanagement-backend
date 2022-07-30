// Error handler function
// msg = "project array does not exist" default assignment not working
function errorHandler(res, msg, status, post = false) {
    let newMsg = msg;
    if (typeof project === 'undefined') {
        newMsg = "The project array does not exist"
        let error = new Error(newMsg);
        res.status = status;
        res.json({
            error: error.message
        })
    }
    else if (project[0] == null && post == false) {
        newMsg = msg;
        let error = new Error(newMsg);
        res.status = status;
        res.json({
            message: {
                error: error.message
            }
        })
    }
}
