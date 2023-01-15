import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name is required'
    },
    email: {
        type: String,
        trim: true,
        required: 'Email is required',
        unique: true,
    },
    password:{
        type: String,
        required: true,
        min: 6,
        max: 64,
    },
    stripe_account_id: '',
    stripe_seller: {},
    stripeSession: {}
    }, { timestamps: true });

userSchema.pre("save", function (next){
    let user = this;
    console.log("userrr ",user);
    if(user.isModified('password')){
        console.log("Bcrypt starting");
        return bcrypt.hash(user.password, 12, function(err, hash){
            if(err){
                console.log("Bcrypt hash error ", err);
                return next(err);
            }
            user.password = hash;
            console.log("Userrr After ",user);
            return next();
        })
    } else{ 
        return next();
    }
})

userSchema.methods.comparePassword = function(passw, next) {
    bcrypt.compare(passw, this.password, function(err, isMatch) {
      if (err) {
        // console.log("Error while comparing password", err);
        return next(err, false);
      }
    //   console.log("Is Password Matched ", isMatch);
      return next(null, isMatch);
    });
  };

export default mongoose.model('User', userSchema);