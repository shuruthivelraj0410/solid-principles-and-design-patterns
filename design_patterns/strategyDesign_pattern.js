// strategy design pattern - behavourial design pattern 
// encapsulate the unwanted details 
// makes interchangeable easy




class PaymentMethod{
    pay(amount){}
}

class gPay extends PaymentMethod{
    constructor(upid){
        super();
        this.upid = upid
    }
    pay(amount){
        console.log("Amount received through gpay",amount)
    }
}

class creditCard extends PaymentMethod{
    constructor(cardDetails){
        this.cardDetails = cardDetails;
    }
    pay(amount){
        console.log("Payment received through credit card",amount)
    }
}

class PayAmount{
    constructor(mode){
        this.paymentMode = mode
    }
    sendMoney(amount){
        this.paymentMode.pay(amount)
    }
}

const gpay = new gPay("shuruthi@okaxis");
const pay_amt = new PayAmount(gpay);
pay_amt.sendMoney(10000) 