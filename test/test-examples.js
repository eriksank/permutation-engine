#!/usr/bin/env node
/*
	Permutation Engine
	Written by Erik Poupaert, November 2012
	Licensed under the Library General Public License (LGPL).
*/

//initialize the permutation engine

var permutationEngine=require('../lib/permutation-engine.js');

/* 1. initialPerm() */

var engine=new permutationEngine(9); 
var perm=engine.initialPerm();
console.log('the initial permutation is: '+perm);

/* 2. lastPerm() */

var engine=new permutationEngine(9); 
var perm=engine.lastPerm();
console.log('the last permutation is: '+perm);

/* 3. index2perm(index) */

var engine=new permutationEngine(9); 
var perm=engine.index2perm(247);
console.log('index 247 is mapped to: '+perm);
var perm=engine.index2perm(248);
console.log('index 248 is mapped to: '+perm);

/* 4. perm2index(perm) */

var engine=new permutationEngine(9); 
var index=engine.perm2index([ 1,2,8,6,5,4,7,3,9 ]);
console.log('permutation [ 1 2 8 6 5 4 7 3 9 ] is mapped to: '+index);

/* 5. nextPerm(perm) */

var engine=new permutationEngine(9); 
var next=engine.nextPerm([ 1,2,8,6,5,4,7,3,9 ]);
var index=engine.perm2index(next);
console.log('the next permutation for [ 1 2 8 6 5 4 7 3 9 ] is : '+next+' with index:'+index);

/* 6. skipForward(perm,prefixSize) */

var engine=new permutationEngine(9); 
var next=engine.skipForward([ 1,2,8,6,5,4,7,3,9 ],3);
var index=engine.perm2index(next);
console.log('the next interesting permutation for [ 1 2 8 6 5 4 7 3 9 ] is : '+next+' with index: '+index);

