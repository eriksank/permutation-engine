#!/usr/bin/env node
/*
	Permutation Engine
	Written by Erik Poupaert, November 2012
	Licensed under the Library General Public License (LGPL).
*/

//initialize the permutation engine
var engine=require('../lib/engine.js');
//engine for 5 elements
var test=new engine(5); 

//calculate faculties

for(var i=1; i<=10; i++)
{
	console.log('i:'+i+' i!:'+test.fac(i));
}

//calculate faculties again

for(var i=1; i<=5; i++)
{
	console.log('i:'+i+' i!:'+test.fac(i));
}

console.log(test.facCache.report());

