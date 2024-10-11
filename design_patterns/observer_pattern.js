// Observer patterns. 
// This works to notify on any change on object state.
// Hence this gets aligned well with event driven architecture.
// use : event handling and asynchronous work flow.


let count = 0

class UserAction{
    constructor(){
        this.subscribers = [];
    }
    subscribe(user){
        this.subscribers.push(user)
    }
    unsubscribe(user){
        this.subscribers = this.subscribers.filter((val)=> val!=user)
    }
    notify(){
        this.subscribers.forEach((users)=>{
            new NotificationService(users)
        }) 
    }
}

class RegisterUsers{
    constructor(name,date){
          this.name = name;
          this.date = date;
          this.userId = ++count;
          this.package = 100;
    }
}

const user1 = new RegisterUsers("shuruthi","sep10");
const user2 = new RegisterUsers("pooja","sept10");
const ua1 = new UserAction();
ua1.subscribe(user1)
ua1.subscribe(user2)
console.log(ua1)
