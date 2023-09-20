const templateSendOTP = (url, name) => {
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
            }
            .box{
                width: 40vw;
                background-color: #f3f4f6;
                border-radius: 6px;
                margin-left: auto;
                margin-right: auto;
                text-align: left;
            }
            .box-title{
                padding-top: 20px;
                padding-bottom: 20px;
                background-color: #3b82f6;
                color: white;
                font-size: 36px;
                text-align: center
            }
            .content-container{
                padding: 46px;
            }
            .subtitle {
                font-size: 32px;
                margin-bottom: 30px;
            }
            .text-email{
                font-size: 18px;
                margin-bottom: 32px;
            }
            .btn{
                display: inline-block;
                width: 100%;
                padding-top: 15px;
                padding-bottom: 15px;
                background-color: #2563eb;
                color: white;
                text-decoration: none;
                border-radius: 8px;
                text-align: center;
                font-size: 18px;
            }
            @media (max-width: 768px) { 
                .box-title{
                    font-size: 42px;
                }
                .box{
                    width: 100vw;
                }
             }
            @media (min-width: 769px) and (max-width: 1023px) { 
                .box{
                    width: 70vw;
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
                    <h2 class="subtitle">Olá, ${name}!</h2>
                    <p class="text-email">Utilize o código abaixo para realizar a verificação da sua recuperação de senha:</p>
                    <a class="" href="${url}" target="_blank">
                        <div class="btn">
                            Redefinir senha
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </body>
    </html>`
}

module.exports = templateSendOTP