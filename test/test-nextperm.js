#!/usr/bin/env node
/*
	Permutation Engine
	Written by Erik Poupaert, November 2012
	Licensed under the Library General Public License (LGPL).
*/

//initialize the permutation engine
var permutationEngine=require('../lib/engine.js');
var engine=new permutationEngine(5); 

var i=0;
var perm=engine.index2perm(i); //first permutation
while(perm!=null)
{
	var permIndex=engine.index2perm(i);
	var detail='i:'+i+' next perm:'+perm+' perm according to index:'+permIndex;
	if(JSON.stringify(perm)==JSON.stringify(permIndex))
		console.log('OK:'+detail);
	else console.log('ERROR:'+detail);
	perm=engine.nextPerm(perm);
	i++;		
}

