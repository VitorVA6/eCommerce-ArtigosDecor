const mercadopago = require('mercadopago')

module.exports = class PaymentController {

    static async processPayment(req, res){
        mercadopago.configurations.setAccessToken('TEST-462015067611172-063011-b3e5d6ffd1265f43497f38b1a4341944-517694611')
        mercadopago.payment.save(req.body)
        .then(function(response) {
            const { status, status_detail, id } = response.body;
            res.status(response.status).json({ status, status_detail, id });
        })
        .catch(function(error) {
            console.log(error);
        });
    }

}