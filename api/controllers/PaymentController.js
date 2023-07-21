const mercadopago = require('mercadopago')
const Payment = require('../models/PaymentModel')
const ObjectId = require('mongoose')

module.exports = class PaymentController {
    static async processPayment(req, res){
        const {
            token, 
            issuer_id, 
            payment_method_id, 
            transaction_amount, 
            installments, 
            payer,
            name,
            cpf,
            whats,
            endereco,
            cep,
            subtotal,
            delivery_rate,
            products
        } = req.body
        mercadopago.configurations.setAccessToken('TEST-462015067611172-063011-b3e5d6ffd1265f43497f38b1a4341944-517694611')
        mercadopago.payment.save({
            token, issuer_id, payment_method_id, transaction_amount, installments, payer
        })
        .then(function(response) {
            const { status, status_detail, id, payment_type_id, date_approved } = response.body;
            Payment.create({
                name,
                subtotal,
                delivery_rate,
                transaction_amount,
                products,             
                whats,
                email: payer.email,
                cpf,
                endereco,
                cep,
                payment_type_id,
                status,
                payment_id: id,
                date_approved
            })
            res.status(response.status).json({ status, status_detail, id });
        })
        .catch(function(error) {
            console.log(error);
        });
    }

    static async getPaymentById(req, res){
        console.log('oi')
        const id = req.params.id 
        mercadopago.configurations.setAccessToken('TEST-462015067611172-063011-b3e5d6ffd1265f43497f38b1a4341944-517694611')

        if (!ObjectId.isValidObjectId(id)){
            return res.status(422).json({error: 'ID inválido'})   
        }

        const payment = await Payment.findById({_id:id})

        if(!payment){
            return res.status(404).json({error: 'Pagamento não existe!'})
        }

        if(payment.status === 'pending'){
            mercadopago.payment.findById(id)
            .then(function(response) {
                const data = response.body;
                payment.status = data.status
            })
            .catch(function(error) {
                console.log(error);
            });
        }
        res.status(200).json(payment);
    }

    static async getAll(req, res){
        try{
            const payments = await Payment.find()
            return res.status(200).json(payments)
        }catch(err){
            return res.status(400).json({error: "Não possível carregar os dados dos pedidos."})
        }
    }
}