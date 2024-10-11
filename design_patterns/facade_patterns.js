// Facade design pattern.
// This is a Structural design pattern that is used to reduce the complexity and encapsulate the complex algos or code and shoes simpler user interaction face.



import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

class Authentication{  // single responsibility 
   constructor(){
     this.tokenSecret = "shuruthi";
     this.userList = {}; // observer pattern 
    }
   async create_token(username,password){
       let salt = await bcrypt.genSalt(10);
       let hashpassword = await bcrypt.hash(password,salt); 
       let token = jwt.sign({username,hashpassword},this.tokenSecret);
       this.userList[username] = hashpassword
       return token
    }
    async verify_token(token,username,password){
        console.log("token :::::",token)
       let data = jwt.verify(token,this.tokenSecret);
       if(data){
          if(this.userList[username]){
            let hashpassword = this.userList[username];
            let verify = await bcrypt.compare(password,hashpassword)
            return verify
          }
       }else{
        throw new Error("No data found")
       }
    }
};

class ProfileManagement{
    constructor(username){
        this.post = {}
        this.username = username;
        this.post[this.username] = []
    }
    addPost(post_url){
        console.log("1111111111111111111")
    this.post[this.username].push(post_url)   
    console.log("Post Added to Profile.")
    }
    deletePost(post_url){
     if(this.post[this.username]&&this.post[this.username].length > 0){
        this.post[this.username] = this.post[this.username].filter((val)=>val != post_url)
        console.log(this.post[this.username])
        console.log("Post deleted from Profile.")
     }
     else{
        console.log("No post found")
     }
    }
}

class Payment{
    constructor(status,userId){
     this.userId = userId;
     this.status = status;
    }
    changePaymentStatus(status){ 
       this.status = status;
    }
    getPaymentStatus(){
        return this.status
    }

}

class PaymentMode{
    pay(){};
}

class Gpay extends PaymentMode{  // ocp
    constructor(userId,Amount){
        super();
        this.userId = userId;
        this.Amount = Amount;
    }
    pay(){
        let sendAmount = new Payment("intiated",this.userId)
        sendAmount.changePaymentStatus("in progress");
        sendAmount.changePaymentStatus('Received')
        return `${this.Amount} paid through Gpay status : ${sendAmount.getPaymentStatus()}`;
    }
}


class UserInterface{
    constructor(username,password,token = null){
        this.username = username;
        this.password = password;
        this.token = token;
        this.verify = false;
        this.Authentication = new Authentication();
        this.ProfileManagement = new ProfileManagement(this.username) // factory pattern 
    }
    async event(){
      if(!this.token){
        this.token = await this.Authentication.create_token(this.username,this.password);
        console.log("-------------->",this.token)
      }else{
        this.verify =  await this.Authentication.verify_token(this.token,this.username,this.password)
      }
      if(this.verify || this.token){
        this.ProfileManagement.addPost("www.google.com")
        this.ProfileManagement.addPost("www.yahoo.com")
        this.ProfileManagement.addPost("www.gmail.com")
        this.ProfileManagement.deletePost("www.gmail.com");
        const payAmount = new Gpay(123,10000);
        console.log(payAmount.pay())
    }else{
        return "Password Mismatch"
    }
    }
}


const user1 = new UserInterface("shuruthi","shuruthi");
user1.event()


