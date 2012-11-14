#!/usr/bin/env node
/*
	Permutation Engine
	Written by Erik Poupaert, November 2012
	Licensed under the Library General Public License (LGPL).
*/

//initialize the permutation engine
var permutationEngine=require('../lib/permutation-engine.js');
var engine=new permutationEngine(5); 

for(var i=0; i<engine.indexCount; i++)
{
	var perm=engine.index2perm(i);
	var i_calc=engine.perm2index(perm);
	var detail='perm:'+perm+' i:'+i+' i_calc:'+i_calc;
	if(i==i_calc)
		console.log('OK: '+detail);
	else
		console.log('ERROR: '+detail);
}

