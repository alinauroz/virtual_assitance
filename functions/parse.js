const lex = str => str.split (" ").map(s => s.trim()).filter(s => s.length);

const foodathome = tokens => {
    if (isNaN(tokens[1]))
        return {"command" : tokens[0], help : true}

    return {"command" : tokens[0], people : tokens[1]}
}

const fundtransfer = tokens => {

    if (tokens[2] && isNaN(tokens[2]))
        return {"err" : "invalid amount"}
    
    if (isNaN(tokens[1]))
        return {"command" : tokens[0], help : true}

    return {"command" : tokens[0], "to" : tokens[1], "amount" : Number(tokens[2])}
}

const shopping = tokens => {
    
    if (tokens[1] == "list") {
        return {"command" : "shopping", "list" : true}
    }
    else if (/^\d+$/.test(tokens[1])) {
        //this means the second token is an integer which is the id of the product that user wants to buy
        return {"command" : "shopping" , "id" : tokens[1]}
    }
    else {
        return {"command" : "shopping" , "help" : true}
    }

}

/* 
    Register parser function for every service
*/ 
const tokenFunction = {
    "foodathome" : foodathome,
    "fundtransfer" : fundtransfer,
    "shopping" : shopping,
}

const parse = str => {
    let tokens = lex(str);
    tokens[0] = tokens[0].toLowerCase();
    try {
        return tokenFunction[tokens[0]](tokens);
    }
    catch (err) {
        return {err};
    }
}

module.exports = parse;