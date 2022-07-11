const boldlinks = (function(){
    //bring in bcryptjs

    const bcryptjs = require("bcryptjs");
    const nodemailer = require("nodemailer");
    const AccountVerification = require("./models/AccountVerification");
    const Mongoose = require("mongoose");
    require("dotenv").config(); //bring in the configuration file



    /**
     * Connection to the Database with Mongoose
     * 
     */
    const connectDB = async () => {
        try{
            await Mongoose.connect("mongodb+srv://cyclobold_user:e6b5eBt.$5PAcgx@cluster0.qcoqo.mongodb.net/?retryWrites=true&w=majority", {
                useUnifiedTopology: true,
                useNewUrlParser: true
            });

        }

        catch(error) {

        }

    }



    /**
     * Generates a single link that does not expire
     */
    const generateAccountActivationLink = async (title, email) => {

        //replace space in title with underscore
        title = title.replaceAll(" ", "_");
        title = title.toLowerCase();


        //hash the email
        const hashed_email = await bcryptjs.hash(email, 12);

        if(hashed_email){
            //this will look for the base url from the provided .env file
            //otherwise, it will attempt to read the base url from the browser 
            const verificationURL = `http://localhost:3000/${title}/${hashed_email}`;

       
            const mongoose = await Mongoose.connect("mongodb+srv://cyclobold_user:e6b5eBt.$5PAcgx@cluster0.qcoqo.mongodb.net/boldlinks?retryWrites=true&w=majority", {
                useUnifiedTopology: true,
                useNewUrlParser: true
            });

            // const mongoose = await Mongoose.connect("mongodb://cyclobold_user:e6b5eBt.$5PAcgx@cluster0.qcoqo.mongodb.net/?retryWrites=true&w=majority", {
            //     useUnifiedTopology: true,
            //     useNewUrlParser: true
            // });

            if(mongoose){
                //save this to the database 
                const findEmail = await AccountVerification.findOne({email: email}).exec()

                if(findEmail){
                    //
                    // console.log("A verification link has been created for this email already")
                    // console.log(findEmail);

                    return {
                        message: "A verification link has been created for this email already",
                        verification_link: findEmail.verification_link
                    }

                }else{
                    //save this to the database 
                    await AccountVerification.create({
                        email: email,
                        hashed_email: hashed_email,
                        verification_link: verificationURL
                    });

                    return {
                        message: "A fresh verification link has been created",
                        verification_link:  verificationURL
                    }
                }


                
            }
          

        }

        

    }


    /**
     * Sends a verification link to the user with the provided email address
     */
    const sendAccountVerificationLink = (email) => {
        //check the database 
        
        const mongoose = await Mongoose.connect("mongodb+srv://cyclobold_user:e6b5eBt.$5PAcgx@cluster0.qcoqo.mongodb.net/boldlinks?retryWrites=true&w=majority", {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });

        if(mongoose){
            const findEmail = await AccountVerification.findOne({email: email}).exec()

            if(findEmail){
                let stored_hashed_email = findEmail.hashed_email

                const verify_hash = bcryptjs.compare(email, stored_hashed_email);

                if(verify_hash){
                    //the email matched
                    //send the verification link 

                    

                }else{
                    //the email did not match


                }


            }


        }



    }






    return {
        generateAccountActivationLink: generateAccountActivationLink,
        sendAccountVerificationLink: sendAccountVerificationLink
    }



}());



module.exports = boldlinks;