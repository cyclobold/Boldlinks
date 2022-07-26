(function(){

    if(document.querySelector("#create-address-form")){
        const createAddressForm = document.querySelector("#create-address-form");

        createAddressForm.addEventListener("submit", async function(event){
            event.preventDefault();

            const feedback = await axios.post("http://localhost:3000/create-btc-address")

            console.log(feedback);

        })

    }


}())