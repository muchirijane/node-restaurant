module.exports  = (card, product) => {
    let output = card.replace(/{%PRODUCT__NAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%TIME%}/g, product.time);
    output = output.replace(/{%CHEF%}/g, product.Chef);
    output = output.replace(/{%SERVERS%}/g, product.servers);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%ID%}/g, product.id);
    output = output.replace(/{%TITLE__ONE%}/g, product.titleOne);
    output = output.replace(/{%STEP__ONE%}/g, product.stepOne);
    output = output.replace(/{%TITLE__TWO%}/g, product.titleTwo);
    output = output.replace(/{%STEP__TWO%}/g, product.stepTwo);
    output = output.replace(/{%TITLE__THREE%}/g, product.titleThree);
    output = output.replace(/{%STEP__THREE%}/g, product.stepThree);
    output = output.replace(/{%TITLE__FOUR%}/g, product.titleFour);
    output = output.replace(/{%STEP__FOUR%}/g, product.stepFour);
    output = output.replace(/{%TITLE__FIVE%}/g, product.titleFive);
    output = output.replace(/{%STEP__FIVE%}/g, product.stepFive);


    if(!product.vegetarian) output = output.replace(/{%NOT__VEGETARIAN%}/g, 'not-vegetarian');
    return output;
}