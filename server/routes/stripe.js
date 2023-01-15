import express  from "express";
import { createConnectAccount, getAccountStatus, getAccountBalance } from "../controllers/stripe";
import { requireSignIn } from "../middlewares/index";

const router = express.Router();

router.post('/create-connect-account', requireSignIn, createConnectAccount);

router.post('/get-account-status', requireSignIn, getAccountStatus);
module.exports = router;

router.post('/get-account-balance', requireSignIn, getAccountBalance);
module.exports = router;
