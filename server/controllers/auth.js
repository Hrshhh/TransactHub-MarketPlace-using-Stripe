// export const showMessage = (req,res) => {
//     res.status(200).send(req.params.message);
// }
import User from "../models/user";
import jwt from "jsonwebtoken";
require("dotenv").config();

export const register = async (req, res) => {
    console.log("From frontend Register:- ",req.body);
    const {name, email, password} = req.body;

    if(!name) return res.status(400).send("Name is required");
    if(!password || password.length < 6){
        return res.status(400).send("Password is required and should be of min 6 letters");
    }
    let userExist = await User.findOne({email}).exec()
    if(userExist) return res.status(400).send("Email is taken");

    console.log("USERR ", User);
    const user = new User(req.body);
    console.log("User created", user);
    
    try{
        console.log("Under try");
        user.save().then(userr => {
            console.log("Data is saved in database")
        });
        console.log("After saving");
        
        return res.status(200).json({ok: true});
    } catch(err){
        console.log("Created user Failed ", err);
        return res.status(400).send("Error. Try again");
    }
};

export const login = async(req, res) => {
    console.log("From Frontend Login:- ", req.body);
    const {email, password} = req.body;

    try{
        let user = await User.findOne({ email }).exec();
        if(!user){
            res.status(400).send("User with that email is not found");
        }
        if(user){
            user.comparePassword(password, function(err, match) {
                // console.log("Compare password in login err", err);
                if(!match || err) return res.status(400).send("Wrong password");
                console.log("Generate a Jwt token and send it to client");
                let token = jwt.sign({_id: user._id}, "secret", {
                    expiresIn: "7d",
                });
                // console.log("Jwt created")
                res.json({token, user:{
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                    stripe_account_id: user.stripe_account_id,
                    stripe_seller: user.stripe_seller,
                    stripeSession: user.stripeSession
                }});
            })
        }
        
    }
    catch(err) {
        console.log("LOGIN ERROR ", err);
        res.status(400).send('Signin failed');
    }
}