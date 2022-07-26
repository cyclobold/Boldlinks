(function(){

    //
    setTimeout(function(){
        // const jqueryScript = document.createElement("script");
        // jqueryScript.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js";
        // jqueryScript.async = true;
        // document.head.appendChild(jqueryScript);

        //Process Login
        if(document.querySelector("#login-user-form")){
            const loginForm = document.querySelector("#login-user-form");
            
            loginForm.addEventListener("submit", async function(event){
                event.preventDefault();
        
                let username = this.username.value.trim().length > 0 ? this.username.value.trim() : null;
                let password = this.password.value.trim().length > 0 ? this.password.value.trim() : null;
        
                if(username != null && password != null){
                    //proceed
                    const userData = {
                        username: username,
                        password: password
                    }
        
                    const feedback = await axios.post("http://localhost:4333/login-user", userData)
        
                    if(feedback){
                        console.log(feedback)
                    }
                    
                }else{
                    //error
                }
        
        
            })
        
        
        }
        //End of Process Login 


        // Get News 
        $("#get-news-btn").click(async function(){

            const feedback = await axios.get("http://localhost:4333/api/news?");

            console.log(feedback.data.data);

        })

        // End of Get News



        





    })

    
    

}())