#!/usr/bin/env node
/*
	Permutation Engine
	Written by Erik Poupaert, November 2012
	Licensed under the Library General Public License (LGPL).
*/

//initialize the permutation engine
var permutationEngine=require('../lib/permutation-engine.js');
var n=5;
var engine=new permutationEngine(n); 

for(var m=1; m<=n; m++)
{
	for(var i=0; i<engine.fac(m); i++)
		console.log('m:'+m+' i:'+i+' first choice:'+engine.firstChoiceForIndex(i,m));
	console.log('');
}
