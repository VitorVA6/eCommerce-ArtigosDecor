function scrollToDiv(id){
    const divElement = document.getElementById(id);
    if(divElement){
        divElement.scrollIntoView({ behavior: "smooth", block: "start" })
    }
}

export {
    scrollToDiv
}