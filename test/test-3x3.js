#!/usr/bin/env node
/*
	Permutation Engine
	Written by Erik Poupaert, November 2012
	Licensed under the Library General Public License (LGPL).

	1+5+9=15	7+5+3=15
	\		/
	1	2	3	--> sum=6
	4	5	6	--> sum=15
	7	8	9	--> sum=24
	|	|	|
	12	15	18

	Question: 	find the arrangements for the numbers 1 to 9 that have horizontal, 
			vertical, and diagonal sums equal to 15.

*/


function sum_horizontal_block(perm,row)
{
    var sum=0;
    for(var i=3*(row-1); i<3*row; i++)
    {
        sum+=perm[i];
    }
    return sum;
}

function sum_vertical_block(perm,column)
{
    var sum=0;
    for(var i=0; i<3; i++)
    {
        sum+=perm[(column-1)+3*i];
    }
    return sum;
}

function sum_diagonal_1(perm)
{
 	return perm[0]+perm[4]+perm[8];
}

function sum_diagonal_2(perm)
{
    	return perm[2]+perm[4]+perm[6];
}

/*
     0  1  2
     3  4  5
     6  7  8
*/

function print_matrix(ch)
{
    for(var i=0;i<3;i++)
    {
        console.log(ch[3*i]+' '+ch[3*i+1]+' '+ch[3*i+2]);
    }        
}

function is_solution(perm)
{
	for(var i=1; i<=3; i++)
	{
		if(sum_horizontal_block(perm,i)!=15)
			return false;
		if(sum_vertical_block(perm,i)!=15)
			return false;
	}
	if(sum_diagonal_1(perm)!=15) return false;
	if(sum_diagonal_2(perm)!=15) return false;
	return true;
}

//initialize the permutation engine
var permutationEngine=require('../lib/engine.js');
var engine=new permutationEngine(9); 

//init searching
var solutions=0;
var evaluations=0;
perm=engine.initialPerm();

while(perm!=null)
{
	evaluations++;

	//check if the first horizontal block is compliant; skip the entire range, if not.
	if(sum_horizontal_block(perm,1)!=15) { perm=engine.skipForward(perm,3); continue; }

	//check if the second horizontal block is compliant; skip the entire range, if not.
	if(sum_horizontal_block(perm,2)!=15) { perm=engine.skipForward(perm,6); continue; }

	if(is_solution(perm))
	{
		solutions++;
		console.log('solution:'+solutions);
		print_matrix(perm);
	}
	perm=engine.nextPerm(perm);
}

console.log('permutations:'+engine.indexCount);
console.log('evaluated:'+evaluations);
var evaluated_perc=(evaluations/engine.indexCount*100).toFixed(2);
console.log('evaluated perc:'+evaluated_perc+'%');
console.log('');
console.log('remaining choices cache: '+engine.remainingChoicesCache.report());

