#!/usr/bin/env node

var crypto = require('crypto');


var BASE =57; 

function peer(name) {
  this.name = name;
  while (!this.level || this.level==1)
    this.level = parseInt(crypto.randomBytes(1)[0]) % 20; // not crypto secure, just for testing.
  
  this.myPublic =  Math.pow(BASE, this.level);
};

peer.prototype.setPeerPublic = function (pp) {
  this.sharedSecret = Math.pow(pp, this.level);
};


peer.prototype.print = function () {
  console.log(this); //TODO
};

//
//

var A = new peer('Alice');
var B = new peer('Bob');

console.log('## BEFORE '); 
A.print();
B.print();

// key exchange
A.setPeerPublic(B.myPublic);
B.setPeerPublic(A.myPublic);


console.log('## AFTER '); 
A.print();
B.print();
