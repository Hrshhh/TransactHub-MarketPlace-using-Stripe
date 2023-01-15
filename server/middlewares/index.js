var { expressjwt: jwt } = require("express-jwt");

export const requireSignIn = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"]
})