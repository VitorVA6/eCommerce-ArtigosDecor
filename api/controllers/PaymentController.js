const mercadopago = require('mercadopago')
const Payment = require('../models/PaymentModel')
const ObjectId = require('mongoose')
const sendEmail = require('../utils/sendEmail')
const templateOrder = require('../emailTemplates/templateOrder')
const templateShipment = require('../emailTemplates/templateShipment')
//const templateOrderAdmin = require('../emailTemplates/templateOrderAdmin')

module.exports = class PaymentController {
    static async processPayment(req, res){
        console.log('oi')
        let paymentData = {}
        const {
            payment_method_id, 
            transaction_amount, 
            payer,
            method,
            name,
            cpf,
            whats,
            endereco,
            cep,
            subtotal,
            delivery_rate,
            products
        } = req.body

        let description = ''

        products.forEach((el, index) => {
            if (index !== products.length - 1) description+= `${el.qty}x ${el.name} + `
            else description+= `${el.qty}x ${el.name}`
        });

        console.log(description)

        if(method === 'credit_card'){
            paymentData = {
                installments: req.body.installments,
                token: req.body.token, 
                issuer_id: req.body.issuer_id, 
                payment_method_id, 
                transaction_amount, 
                payer,
                description
            }
        }
        else if(method === 'bank_transfer'){
            paymentData = {
                payment_method_id, 
                transaction_amount, 
                payer,
                description
            }
        }
        else {
            res.status(422).json({ error: 'Método de pagamento da shopee.' });
        }
        mercadopago.configurations.setAccessToken(process.env.MP_TOKEN)
        try{
            const response = await mercadopago.payment.save(paymentData)        
            const { status, status_detail, id, payment_type_id, date_created } = response.body;
            const newPayment = await Payment.create({
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
                date_created })
                
                sendEmail(
                    "mandradejunior.vva@gmail.com", 
                    "Novo Pedido", 
                    templateOrder( name, newPayment._id, date_created, products, endereco, cep, payer.email, 
                        whats, cpf, payment_type_id, subtotal, transaction_amount, delivery_rate
                )).then(data=> {}).catch(err => console.log(err)) 

                return res.status(response.status).json({ status, status_detail, id });
        }
        catch(err){
            console.log(err)
            return res.status(400).json(err);
        }
        
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
            return res.status(200).json(payments.reverse())
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

    static async notifyShipment(req, res){
        const {name, products, address, cep} = req.body
        try{
            await sendEmail(
                "mandradejunior.vva@gmail.com", 
                "Seu pedido tá a caminho!", 
                templateShipment(name, products, address, cep))
            return res.status(201).json({message: "E-mail enviado com sucesso."})
        }catch(err){
            return res.status(400).json({error: "Ocorreu um erro no envio do e-mail."})
        }
    }
}