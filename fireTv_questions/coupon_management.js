class UserList {    // single responsibility principle
    constructor() {     
        this.userList = {}; //observer pattern
        this.unAssignedVoucher = [
            {
                voucherId : "free_1",
                applicableFor : "All",
                expiryDate : null,
                useLimit : 1
            },
            {
                voucherId : "free_2",
                applicableFor : "All",
                expiryDate : null,
                useLimit : 1
            }
        ]
    }
    AddUserCoupon(coupon, userId) {
        if (this.userList[userId]) {
            if (!this.userList[userId].coupon) {
                this.userList[userId].coupon = [];
            }
                this.userList[userId].coupon.push(coupon)
            
        } else {
            this.userList[userId] = {coupon : []};
            this.userList[userId].coupon.push(coupon)
        }
    }
    AddVoucherCoupon(voucher, userId) {
        if (this.userList[userId]) {
            if (!this.userList[userId].voucher) {
                this.userList[userId].voucher = [];
            }
        } else {
            this.userList[userId] = {};
            this.userList[userId].voucher = [];
            this.AddUnAssginedVoucher(this.userList[userId].voucher)
        }
        this.userList[userId].voucher.push(voucher)
    }
    AddUnAssginedVoucher(userVoucherArray){
        userVoucherArray.push(...this.unAssignedVoucher)
        return userVoucherArray
    }
    viewList(userId) {
        if (!this.userList[userId]) {
            return {}
        }
        return this.userList[userId]
    }

}

class Discount {
    create() { };
    delete() { };
    deactive() { };
}

class Coupon extends Discount { // ocp create the same way for vouchers too.
    constructor(userList,userId) {
        super();
        this.userId = userId;
        this.userList = userList; // facade designing pattern
    }
    create() {
        let date = new Date()
        date.setDate(date.getDate() + 5)
        let coupon = {
            couponId: this.userList.userList[this.userId] ? (this.userList.userList[this.userId].coupon ? this.userList.userList[this.userId].coupon.length + 1 : 1) : 1,
            expiryDate : date ,
            userLimit : 1,
            belongsTo : this.userId,
            amount : 1000,
            status : new Date() <= date ? "Activate" : "Inactive"
        }
        this.userList.AddUserCoupon(coupon,this.userId)
        return this.userList.viewList(this.userId) // factory patterns
    }
    delete(couponId){
     if(!this.userList.userList[this.userId]){
        return "No user Found"
     }else{
        if(this.userList.userList[this.userId].coupon){
            this.userList.userList[this.userId].coupon = this.userList.userList[this.userId].coupon.filter((val)=> val.couponId!= couponId)
            return "Deleted Successfully"
        }
        else{
            return "No coupon Found"
        }
     }
    }
    deactive(couponId){
        if(!this.userList.userList[this.userId]){
            return "No user Found"
         }else{
            let pos ;
            if(this.userList.userList[this.userId].coupon){
                this.userList.userList[this.userId].coupon.forEach((val,index) => {
                    if(val.couponId == couponId){
                        console.log("----------------->>>",val)
                        pos = index
                        console.log("&&&&&&&&&&",pos)
                        val.status = "Deactivate"
                    }

                });
                if(isNaN(pos)){
                    return 'No coupon matches this coupon Id'
                }

            }
            else{
                return "No coupon Found"
            }
         }
         return 'Deactived successfully'
    }
}

class Voucher extends Discount{
    constructor(userList,userId) {
        super();
        this.userId = userId;
        this.userList = userList; // facade designing pattern
    }
    create() {
        let date = new Date()
        date.setDate(date.getDate() + 5)
        let voucher = {
            voucherId: this.userList.userList[this.userId] ? (this.userList.userList[this.userId].voucher ? this.userList.userList[this.userId].voucher.length + 2 : 1) : 1,
            expiryDate : date ,
            userLimit : 1,
            belongsTo : this.userId,
            amount : 1000,
            status : new Date() <= date ? "Activate" : "Inactive"
        }
        this.userList.AddVoucherCoupon(voucher,this.userId)
        return this.userList.viewList(this.userId) // factory patterns
    }
    delete(voucherId){
     if(!this.userList.userList[this.userId]){
        return "No user Found"
     }else{
        if(this.userList.userList[this.userId].voucher){
            this.userList.userList[this.userId].voucher = this.userList.userList[this.userId].voucher.filter((val)=> val.voucherId!= voucherId)
            return "Deleted Successfully"
        }
        else{
            return "No coupon Found"
        }
     }
    }
    deactive(voucherId){
        if(!this.userList.userList[this.userId]){
            return "No user Found"
         }else{
            let pos ;
            if(this.userList.userList[this.userId].voucher){
                this.userList.userList[this.userId].voucher.forEach((val,index) => {
                    if(val.voucherId == voucherId){
                        console.log("----------------->>>",val)
                        pos = index
                        console.log("&&&&&&&&&&",pos)
                        val.status = "Deactivate"
                    }

                });
                if(isNaN(pos)){
                    return 'No coupon matches this coupon Id'
                }

            }
            else{
                return "No coupon Found"
            }
         }
         return 'Deactived successfully'
    }
}

class DiscountServices { // dependency inversion principle 
    constructor(userId){
        this.userId = userId;
        this.userList = new UserList(); // facade pattern
        this.coupon = new Coupon(this.userList,userId);
        this.voucher = new Voucher(this.userList,userId);
    }
    createCoupon(){   // strategy patterns
        return this.coupon.create();
    }
    createVoucher(){
        return this.voucher.create();
    }
}

const discount = new DiscountServices("12345");
console.log("------------>>>",discount.createCoupon())
console.log("------------>>>",discount.createVoucher())



