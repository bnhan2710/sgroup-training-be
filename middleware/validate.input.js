function Validateprice(price) {
    if(!price || price <= 0) {
        return false
    }
     return true
}

function Validatequantity(quantity) {
    if(!quantity || quantity <= 0) {
        return false
    }
     return true

}
function Validatename(name) {
    if(!name) {
        return false
    }
     return true
}

const Validate = (req,res,next) => {
    const {name,price, quantity} = req.body

    if(Validatename(name) && Validateprice(price) && Validatequantity(quantity)) {
        next()
    }
     return  res.status(400).json({message: 'Invalid data'})
}

module.exports = Validate