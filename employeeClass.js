// מחלקת עובד
class EmploeeC{
 constructor(tz,fname,lname,address,phone,mail){
    this.fname=fname;
    this.lname=lname;
    this.mail=mail;
    this.tz=tz;
    this.phone=phone;
    this.address=address;
    this.isActive=true;
}
getFname(){
    return this.fname;
}

setFname(fname){
 this.fname=fname;
}
getlname(){
    return this.lname;
}

setlname(lname){
 this.lname=lname;
}
getmail(){
    return this.mail;
}

setmail(mail){
 this.mail=mail;
}
gettz(){
    return this.tz;
}

settz(tz){
 this.tz=tz;
}
getphone(){
    return this.phone;
}

setphone(phone){
 this.phone=phone;
}
getaddress(){
    return this.address;
}

setphone(address){
 this.address=address;
}
getaddress(){
    return this.isActive;
}

setphone(isActive){
 this.isActive=isActive;
}
}
module.exports=EmploeeC;