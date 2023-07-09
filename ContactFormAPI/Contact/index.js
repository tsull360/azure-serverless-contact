module.exports = async function (context, req) {
    if (req.body.email) {

        let fromAddress = process.env.mailfrom;
        let toAddress = process.env.mailto;
        context.log("Have send address, will proceed.")
        context.log("Mail from value pulled from settings: ", fromAddress)
        context.log("Mail to value pulled from settings: ", toAddress)

        var mailbody = `Hi,
        You have a new webform submission from your website.
        
        Sender: ${req.body.name}
        Email Address: ${req.body.email}
        Event Date: ${req.body.edate}
        Message:
        ${req.body.message}
        
        Thanks!
        `
        var email = {
            from: {
                email: fromAddress
            },
            to: {
                email: toAddress
            },
            subject: "Contact form submission from: " + req.body.name,
            content: [{
                type: 'text/plain',
                value: mailbody
            }]
        };

        return {
            res: {
                status: 200
            },
            message: email
        };
    } else {
        return {
            res: {
                status: 400
            }
        };
    }
};