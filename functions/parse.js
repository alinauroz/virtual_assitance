const lex = str => str.split (" ").map(s => s.trim()).filter(s => s.length);

const foodathome = tokens => {
    let requiredMinParams = 1;
    
    if (tokens.length < requiredMinParams)
        return {"err" : "Incomplete Input"}

    if (isNaN(tokens[1]))
        return {"command" : tokens[0], help : true}

    return {"command" : tokens[0], people : tokens[1]}
}

const fundtransfer = tokens => {

    if (tokens[2] && isNaN(tokens[2]))
        return {"err" : "invalid amount"}
    
    if (isNaN(tokens[1]))
        return {"command" : tokens[0], help : true}

    return {"command" : tokens[0], "to" : tokens[1], "amount" : tokens[2]}
}

/* 
    Register parser function for every service
*/ 
const tokenFunction = {
    "foodathome" : foodathome,
    "fundtransfer" : fundtransfer
}

const parse = str => {
    let tokens = lex(str);
    try {
        return tokenFunction[tokens[0]](tokens);
    }
    catch (err) {
        return {err};
    }
}

module.exports = parse;