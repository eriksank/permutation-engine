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
	console.log('i:'+i+' perm:'+engine.index2perm(i));
}

