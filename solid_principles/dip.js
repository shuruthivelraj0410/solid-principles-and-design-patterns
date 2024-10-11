// Dependency Inversion Principle 
// Higher module should not depend on Lower module. Instead both should depend on abstraction.
// Abstraction should not depend on details. Details should only depend on Abstraction.

class NotificationService{ // Abstraction class
    send(message){};
}

class EmailService extends NotificationService{   // lowlevel modules
    send(message){
        console.log(message)
    }
}

class SmsService extends NotificationService{   // lowlevel modules
    send(message){
        console.log(message)
    }
}

class SendService{                              // High level module --> contains all business logics
    constructor(notifyservice){
        this.notifyService = notifyservice
    }
    notifyUser(message){
     this.notifyService.send(message)
    }
}

const email = new EmailService();
const sms = new SmsService();

const service = new SendService(email);
service.notifyUser("Hi babe !!!");
