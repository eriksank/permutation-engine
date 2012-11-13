#!/usr/bin/env node
/*
	Permutation Engine
	Written by Erik Poupaert, November 2012
	Licensed under the Library General Public License (LGPL).
*/

//initialize the permutation engine
var permutationEngine=require('../lib/engine.js');
var n=5;
var engine=new permutationEngine(n); 

function printTest(prefix)
{
	var remainingChoices=engine.remainingChoices(prefix);
	console.log('prefix:'+JSON.stringify(prefix)+' remaining:'+JSON.stringify(remainingChoices));
}

printTest([1]);
printTest([1,2]);
printTest([3,1]);
printTest([2,5,1]);
printTest([1,2,3,5]);
printTest([]);

