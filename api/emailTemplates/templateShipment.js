function generateProducts(products){
    let productsHtml = ''
    products.forEach(element => {
        productsHtml = productsHtml + `<div class="item-product"><p class="item-product_name">${element.qty}x - ${element.name}</p><a class="item-product_link" href="${element.link}">Ver produto</a></div>`
    });
    return productsHtml
}

function toFirstName(name){
    return name.split(' ')[0]
}

const templateShipment = (name, products, address, cep) => {
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
                padding-bottom: 30px
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
                text-align: center
            }
            .subtitle {
                font-size: 20px;
                margin-bottom: 10px;
                font-weight: bold
            }
            .subtitle2 {
                font-size: 18px;
                margin-bottom: 15px;
                font-weight: 500
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
                color: #101010
            }
            .text-email-gray{
                font-size: 14px;
                margin-bottom: 4px;
                color: #707070
            }
            .text-email-small{
                font-size: 14px;
                margin-bottom: 10px;
                color: #707070
            }
            .block-container-title{
                font-size: 16px;
                margin-bottom: 8px;
                font-weight: bold;
            }
            .block-price{
                padding: 25px 40px;
            }
            .cod{
                text-transform: uppercase
            }
            .footer{
                padding: 40px 40px;
            }
            @media (max-width: 768px) {
                .box-title{
                    font-size: 32px;
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
                .footer{
                    padding: 40px 15px;
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
                    <h2 class="subtitle">Olá, ${toFirstName(name)}.</h2>
                    <p class="subtitle2">Seu pedido já foi embalado e enviado!</p>
                    <p class="text-email-small">Segue abaixo os dados:</p>
                </div>
                
                <div class="block-container">
                    <h2 class="block-container-title">Produtos</h2>
                    ${generateProducts(products)}
                </div>
                <div class="block-container">
                    <h2 class="block-container-title">Endereço de entrega</h2>
                    <p class="text-email">${address}</p>
                    <p class="text-email">${cep}</p>
                </div>
                <div class="footer">
                    <p class="text-email">Atenciosamente,</p>
                    <p class="block-container-title">Artigos Decor</p>
                </div>
                
            </div>
        </div>
    </body>
    </html>`
}

module.exports = templateShipment