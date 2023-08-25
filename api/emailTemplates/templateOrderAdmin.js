function generateProducts(products){
    let productsHtml = ''
    products.forEach(element => {
        productsHtml = productsHtml + `<div class="item-product"><p class="item-product_name">${element.qty}x - ${element.name}</p><a class="item-product_link" href="${element.link}">Ver produto</a></div>`
    });
    return productsHtml
}

function toCurrency(value){
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function paymentMethod(paymentMode){
    if(paymentMode === 'bank_transfer'){
        return '<p class="text-email">Pix</p>'
    }else{
        return '<p class="text-email">Cartão de crédito</p>'
    }
}

function dataConversor(data){
    const dataObj = new Date(data);
    const options = { month: "long" };
    const mesExtenso = new Intl.DateTimeFormat("pt-BR", options).format(dataObj);
    const horaFormatada = `${dataObj.getHours()}:${dataObj.getMinutes().toString().padStart(2, "0")}h`;
    const formatoDesejado = `${dataObj.getDate()} de ${mesExtenso} de ${dataObj.getFullYear()} às ${horaFormatada}`;
    return formatoDesejado
}

function toStatus(paymentStatus){
    if(paymentStatus === 'approved'){
        return '<p class="text-email"><span class="block-container-title">Status:</span> Pagamento aprovado</p>'
    }
    else if(paymentStatus === 'pending'){
        return '<p class="text-email"><span class="block-container-title">Status:</span> Pagamento pendente</p>'
    }
    else if(paymentStatus === 'authorized'){
        return '<p class="text-email"><span class="block-container-title">Status:</span> Pagamento autorizado</p>'
        }
    else if(paymentStatus === 'in_process'){
        return '<p class="text-email"><span class="block-container-title">Status:</span> Pagamento sendo processado</p>'
    }
    else if(paymentStatus === 'rejected'){
        return '<p class="text-email"><span class="block-container-title">Status:</span> Pagamento rejeitado</p>'
    }
}

const templateOrderAdmin = (paymentStatus, name, id, date, products, address, cep, email, phone, cpf, paymentMode, subtotal, total, deliveryRate) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400,500,700,900&display=swap">
        <title>Document</title>
        <style>
            html, body, div, span, applet, object, iframe,
            h1, h2, h3, h4, h5, h6, p, blockquote, pre,
            a, abbr, acronym, address, big, cite, code,
            del, dfn, em, img, ins, kbd, q, s, samp,
            small, strike, strong, sub, sup, tt, var,
            b, u, i, center,
            dl, dt, dd, ol, ul, li,
            fieldset, form, label, legend,
            table, caption, tbody, tfoot, thead, tr, th, td,
            article, aside, canvas, details, embed, 
            figure, figcaption, footer, header, hgroup, 
            menu, nav, output, ruby, section, summary,
            time, mark, audio, video {
                margin: 0;
                padding: 0;
                border: 0;
                font-size: 100%;
                font: "Roboto", sans-serif;
                vertical-align: baseline;
            }
    
            body {
                line-height: 1;
            }
            ol, ul {
                list-style: none;
            }
            * {
                font-family: "Roboto", sans-serif;
            }
            .main-container{
                text-align: center;
                width: 100%;
                background-color: #f0f0f0;
                padding-top: 30px;
                padding-bottom: 30px;
            }
            .box{
                background-color: #fff;
                width: 40vw;
                border-radius: 6px;
                margin-left: auto;
                margin-right: auto;
                text-align: left;
            }
            .block-container{
                border-bottom: 1px solid #c0c0c0;
                margin-left: 40px;
                margin-right: 40px;
                padding-top: 20px;
                padding-bottom: 10px;
            }
            .content-container{
                padding-left: 40px;
                padding-right: 40px;
                padding-top: 46px;
            }
            .box-title{
                padding-top: 20px;
                padding-bottom: 20px;
                background-color: #3b82f6;
                color: white;
                font-size: 36px;
                text-align: center;
            }
            .subtitle {
                font-size: 20px;
                margin-bottom: 10px;
                font-weight: bold;
            }
            .subtitle2 {
                font-size: 18px;
                margin-bottom: 10px;
                font-weight: 500;
            }
            .item-product{
                margin-bottom: 4px;
            }
            .item-product_name{
                font-size: 14px;
                color: #707070;
                margin-right: 10px;
                display: inline;
            }
            .item-product_link{
                font-size: 14px;
                color: #3b82f6;
                margin-right: 10px;
                text-decoration: none;
            }
            .text-email{
                font-size: 14px;
                margin-bottom: 4px;
                color: #101010;
            }
            .text-email-gray{
                font-size: 14px;
                margin-bottom: 4px;
                color: #707070;
            }
            .text-email-small{
                font-size: 14px;
                margin-bottom: 10px;
                color: #707070;
            }
            .block-container-title{
                font-size: 16px;
                margin-bottom: 8px;
                font-weight: bold;
            }
            .block-name{
                margin-bottom: 20px;
            }
            .name-purchaser{
                font-size: 16px;
                margin-right: 8px;
                font-weight: bold;
                display: inline;
            }
            .call-whats {
                font-size: 16px;
                color: #3b82f6;
                text-decoration: none;
            }
            .block-price{
                padding: 25px 40px;
            }
            .cod{
                text-transform: uppercase;
            }
            @media (max-width: 768px) {
                .box-title{
                    font-size: 28px;
                }
                .text-email{
                    margin-bottom: 8px;
                }
                .text-email-gray{
                    margin-bottom: 8px;
                }
                .block-container{
                    margin-left: 15px;
                    margin-right: 15px;
                }
                .content-container{
                    padding-left: 15px;
                    padding-right: 15px;
                }
                .block-price{
                    padding: 25px 15px;
                }
                .box{
                    width: 100vw;
                }
                .main-container{
                    background-color: #fff;
                }
             }
            @media (min-width: 769px) and (max-width: 1023px) { 
                .main-container{
                    background-color: #fff;
                }
                .box{
                    width: 70vw;
                }
                .main-container{
                    background-color: #f0f0f0;
                }
             }
            @media (min-width: 1024px) and (max-width: 1535px) { 
                .box{
                    width: 50vw;
                }
                .main-container{
                    background-color: #f0f0f0;
                }
             }
        </style>
    </head>
    <body>
        <div class="main-container">
            <div class="box">
                <div class="box-title">
                    <h1 class="">Artigos Decor</h1>
                </div>
                <div class="content-container">
                    <h2 class="subtitle2">Olá Tainar, você recebeu um novo pedido.</h2>
                    <p class="text-email-small">Veja abaixo os dados do pedido</p>
                </div>
                <div class="block-container">
                    <div class="block-name">
                        <h3 class="name-purchaser">${name}</h3>
                        <a class="call-whats" href="https://www.youtube.com/@RaffaelChess" target="_blank">Chamar no whatsapp</a> 
                    </div>
                    ${toStatus(paymentStatus)}
                    <p class="text-email">Cód.: <span class="cod">${id}</span></p>
                    <p class="text-email-gray">${dataConversor(date)}</p>
                </div>
                <div class="block-container">
                    <h2 class="block-container-title">Produtos</h2>
                    ${generateProducts(products)}
                </div>
                <div class="block-container">
                    <h2 class="block-container-title">Endereço</h2>
                    <p class="text-email">${address}</p>
                    <p class="text-email">${cep}</p>
                </div>
                <div class="block-container">
                    <h2 class="block-container-title">Dados do comprador</h2>
                    <p class="text-email">${name}</p>
                    <p class="text-email">${phone}</p>
                    <p class="text-email">${email}</p>
                    <p class="text-email">${cpf}</p>
                </div>
                <div class="block-container">
                    <h2 class="block-container-title">Forma de pagamento</h2>
                    ${paymentMethod(paymentMode)}
                </div>
                <div class="block-price">
                    <p class="text-email"><span class="text-email-gray">Subtotal: </span>${toCurrency(subtotal)}</p>
                    <p class="text-email"><span class="text-email-gray">Taxa de entrega: </span>${toCurrency(deliveryRate)}</p>
                    <p class="subtitle2">Total: ${toCurrency(total)}</p>
                </div>
            </div>
        </div>
    </body>
    </html>`
}

module.exports = templateOrderAdmin