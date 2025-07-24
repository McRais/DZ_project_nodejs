"use strict";
/*
//this
//ссылка на объект

console.log(this) //выдаст window

const a = () => {
    console.log(this)
}
a() // window ибо у стрелочной функции нет this

function b() {
    const a = () => {
        console.log(this)
    }
    a()
}
b() //window, если сделать "use strict" будет undefined
*

const bmw = {
    brand: "bmw",
    speed: 200,
    showMaxSpeed() {
        console.log(this.speed);
    },
};
const scooter = {
    speed: 60,
};
const kia = {
    speed: 150,
};
bmw.showMaxSpeed.call(scooter);
bmw.showMaxSpeed.apply(scooter);

function foo(){
    const x = 10

    return {
        X:10,
        bar: () => {
            console.log(this.x)
        },
        baz: function (){
            console.log(this.x)
        }

    }
}

const obj2 = foo.call({x:20})

const y = obj2.bar;
const z = obj2.baz;

y()
z()

*/ 
