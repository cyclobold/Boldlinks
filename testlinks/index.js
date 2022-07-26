const boldlinks = require("boldlinks");

boldlinks.generateAccountActivationLink("Activate Account", "theoafactor@gmail.com").then((data) => {

    console.table(data)

})