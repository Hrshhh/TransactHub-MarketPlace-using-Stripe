import User from "../models/user";
const queryString = require('querystring');
const stripe = require('stripe')
('sk_test_51MLkBfSA2R3C3haDKCAqt4AErd6G8fOfBy0KoiFlgC5ZtlHxx2gbnomXbyfKU74V1mCecJlqZ6Gagc2478nZbnLz00DUJ0fEJQ');

export const createConnectAccount = async (req, res) => {
    const user = await User.findById(req.auth._id);
    console.log("User>> ", user);

    if(!user.stripe_account_id){
        const account = await stripe.accounts.create({
            type: 'standard',
            email: user.email
        });
        console.log("Stripe Account =>> ", account);
        user.stripe_account_id = account.id;
        user.save();
    }
    
    let onBoardingLink = await stripe.accountLinks.create({
        account: user.stripe_account_id,
        refresh_url: process.env.STRIPE_REDIRECT_URL,
        return_url: process.env.STRIPE_REDIRECT_URL,
        type: "account_onboarding"

    });
    console.log("On Boarding Link>> ", onBoardingLink)
    onBoardingLink = Object.assign(onBoardingLink, {
        "stripe_user[email]": user.email || undefined,
    });
    console.log("On Boarding Link>> ", onBoardingLink)

    let link = `${onBoardingLink.url}?${queryString.stringify(onBoardingLink)}`;
    console.log("Link sent to frontend for onBoarding>> ",link)
    res.send(link);
}



export const getAccountStatus = async(req, res) => {
    console.log("Account aaya backend me");
    const user = await User.findById(req.auth._id);
    
    const account = await stripe.accounts.retrieve(user.stripe_account_id);

    // console.log("Account>> ", account);
    const updatedUser = await User.findByIdAndUpdate(
        user._id,
        {
            stripe_seller: account,
        },
        {new: true}
    ).select("-password")
    
    // console.log(updatedUser);
    res.json(updatedUser);
    
}

export const getAccountBalance = async(req, res) => {
    const user = await User.findById(req.auth._id);
    try{
        const balance = await stripe.balance.retrieve({
            stripeAccount: user.stripe_account_id,
        });
        console.log("Balance >>> ", balance);
        res.json(balance);
    }
    catch(err) {
        console.log(err);
    }
}

