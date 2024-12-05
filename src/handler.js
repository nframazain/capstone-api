const { nanoid } = require('nanoid')
const users = require(/*dari db*/)

const addUserHandler = (request, h) => {
    const {
        name,
        email,
        phone,
        address,
        role,
        organizationName
    } = request.payload;

    if (role != "donor" && role != "recipient") {
        const response = h.respones({
            status: "fail",
            message: "Invalid role. Role must be filled",
        });
        response.code(400);
        return response;
    }

    const userId = nanoid(16);
    
    const newUser = {
        userId, 
        name, 
        email, 
        phone, 
        role
    };

    users.push(newUser);

    if(isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'User successfully added',
        })
        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Unable to add new user',
    })
    response.code(500);
    return response; 
};