const generateXML = (products) => {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">\n';
    xml += '  <channel>\n';
    xml += '    <title>Artigos Decor</title>\n';
    xml += `    <link>${process.env.BASE_URL}</link>\n`;
    xml += '    <description>0</description>\n';

    for (const product of products) {
        xml += '    <item>\n';
        xml += `      <g:id>${product._id}</g:id>\n`;
        xml += `      <g:title>${product.title}</g:title>\n`;
        xml += `      <g:description>${product.desc}</g:description>\n`;
        xml += `      <g:link>${process.env.BASE_URL}produto/${product.desc}</g:link>\n`;
        xml += `      <g:quantity_to_sell_on_facebook>9999</g:quantity_to_sell_on_facebook>\n`;
        xml += `      <g:image_link>${process.env.AWS_URL}${product.img[0]}</g:image_link>\n`;
        if(product.img.length > 1){
            var aditionalImgs = `${process.env.AWS_URL}${product.img[0]}`
            for (var i = 1; i<product.img.length; i++){
                aditionalImgs += `, ${process.env.AWS_URL}${product.img[i]}`
            }
            xml += `<g:additional_image_link>${aditionalImgs}</g:additional_image_link>\n`
        }
        xml += `      <g:brand>null</g:brand>\n`;
        xml += `      <g:condition>new</g:condition>\n`;
        xml += `      <g:availability>in stock</g:availability>\n`;
        xml += `      <g:price>${product.preco}</g:price>\n`;
        xml += `      <g:google_product_category>138</g:google_product_category>\n`;
        xml += '    </item>\n';
    }

    xml += '  </channel>\n';
    xml += '</rss>';

    return xml;
}

module.exports = generateXML