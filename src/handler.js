const { nanoid } = require('nanoid')
const user

const addUserHandler = (request, h) => {
    const {
        name,
        email,
        phone,
        address,
        role,
        organizationName
    } = request.payload;

    const
}