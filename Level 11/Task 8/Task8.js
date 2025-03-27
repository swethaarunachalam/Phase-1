let person ={

    name:"swetha",
    age :20,
    city:"dharmapuri",
    hobbies :["dancing","singing"],
    greet: function(){
        return "Hello, my name is " + this.name + "!";


    }
};
console.log("Name:",person.name);
console.log("Age:",person.age);
console.log("City:",person.city);
console.log("Hobbies:",person.hobbies);

person.job ="full stack developer";
console.log("Job:",person.job);

person.age = 21;
console.log("Update Age:",person.age);

console.log(person.greet());