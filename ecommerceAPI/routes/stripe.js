const router = require("express").Router();
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);
//implementing stripe in node

router.post("/payment", (req,res) => {
    stripe.charges.create(
        {
           source: req.body.tokenId,
           amount: req.body.amount, 
           currency: "usd",
        }, 
        (stripeErr, stripeREs) => {
            if (stripeErr){
                res.status(500).json(stripeErr);
            }else{
                res.status(200).json(stripeREs)
            }
        }
    ) 
    
});

module.exports = router;