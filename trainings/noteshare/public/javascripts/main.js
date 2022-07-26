(function(){

    //1. Handle Registration
   if(document.querySelector("#register-form-id")){
    const registerForm = document.querySelector("#register-form-id");

    registerForm.addEventListener("submit", async function(event){
        event.preventDefault();
        const firstname = this.firstname.value.trim();
        const lastname = this.lastname.value.trim();
        const username = this.username.value.trim();
        const email = this.email.value.trim();
        const password = this.password.value.trim();
        const password_confirm = this.password2.value.trim();

        if(password != password_confirm){
            //
        }else{
            //proceed
            const feedback = await axios.post("/register-user", {
                firstname: firstname,
                lastname: lastname, 
                username: username,
                password: password,
                email: email
            });

            if(feedback){
                if(feedback.data.code == "success"){
                    
                    document.querySelector("#form-info").innerHTML=`
                    <div>${feedback.data.message}. <a href='/login'>Log in here</a></div>`
                }else{
                    //
                }
               
            }



        }



    });


   }else{
    //
   }



   // 2. Handle Login
   if(document.querySelector("#login-form-id")){
    const loginForm = document.querySelector("#login-form-id");

    loginForm.addEventListener("submit", async function(event){
        event.preventDefault();

        const username = this.username.value.trim();
        const password = this.password.value.trim();

        const feedback = await axios.post("/login-user", {
            username: username,
            password: password
        });

        if(feedback.data.code == "authenticated"){
            console.log(feedback.data); 
            location.href="/user";


        }else{
            document.querySelector("#form-info").innerHTML=`
                    <div class='alert alert-danger border-0'>${feedback.data.message}</div>`
        }





    })

   }


   const logoutForm = document.querySelector("#logout-form-id");

   logoutForm.addEventListener("submit", async function(event){
        event.preventDefault();

        const feedback = await axios.post("/logout-user");

   })

    

}())