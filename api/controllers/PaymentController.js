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
        .then(async function(response) {
            const { status, status_detail, id, payment_type_id, date_created } = response.body;
            await Payment.create({
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
                date_created
            })
            return res.status(response.status).json({ status, status_detail, id });
        })
        .catch(function(error) {
            res.status(400).json(error);
        });
    }

    static async getPaymentById(req, res){
        const id = req.params.id 
        mercadopago.configurations.setAccessToken('TEST-462015067611172-063011-b3e5d6ffd1265f43497f38b1a4341944-517694611')

        if (!ObjectId.isValidObjectId(id)){
            return res.status(422).json({error: 'ID inválido'})   
        }

        const payment = await Payment.findById({_id:id})

        if(!payment){
            return res.status(404).json({error: 'Pagamento não existe!'})
        }
        mercadopago.payment.findById(payment.payment_id)
        .then(function(response) {
            const data = response.body;
            payment.status = data.status
        })
        .catch(function(error) {
            return res.status(404).json({error: 'Erro na obtenção dos dados do pagamento.'})
        });
        return res.status(200).json(payment);
    }

    static async getAll(req, res){
        try{
            const payments = await Payment.find()
            return res.status(200).json(payments)
        }catch(err){
            return res.status(400).json({error: "Não foi possível carregar os dados dos pedidos."})
        }
    }

    static async cancelPayment(req, res){
        const id = req.params.id 
        mercadopago.configurations.setAccessToken('TEST-462015067611172-063011-b3e5d6ffd1265f43497f38b1a4341944-517694611')

        if (!ObjectId.isValidObjectId(id)){
            return res.status(422).json({error: 'ID inválido'})   
        }
        const payment = await Payment.findById({_id:id})
        if(!payment){
            return res.status(404).json({error: 'Pagamento não existe!'})
        }
        if(payment.status === 'cancelled'){
            return res.status(201).json({message: 'Pagamento já foi cancelado.'})
        }
        mercadopago.payment.cancel(payment.payment_id)
        .then( async (response) => {
            const {status} = response.body
            console.log(status)     
            payment.status = status
            await Payment.findOneAndUpdate({_id: id}, payment)   
            return res.status(201).json({message: 'Pagamento cancelado com sucesso.'})
            
        }).catch(err => {
            console.log(err)
            return res.status(400).json({error: 'Não foi possível cancelar o pagamento.'})
        })
    }
}