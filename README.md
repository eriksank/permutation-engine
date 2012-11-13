Permutation Engine
==================

Javascript library for mapping permutations onto numbers which allows for looping through a set of permutations and skipping ranges.

Installation
------------

PermutationEngine can be installed for [Node](http://nodejs.org) using [`npm`](http://github.com/isaacs/npm/).

Using npm:

    npm install permutation-engine


Example problem
---------------

Consider the following table:

<table>
  <tr>
    <td></td>
    <td></td>
    <td></td>
    <th>dia1:15</th>
  </tr>
  <tr>
    <td>1</td>
    <td>2</td>
    <td>3</td>
    <th>hor1:6</th>
  </tr>
  <tr>
    <td>4</td>
    <td>5</td>
    <td>6</td>
    <th>hor2:15</th>
  </tr>
  <tr>
    <td>7</td>
    <td>8</td>
    <td>9</td>
    <th>hor3:24</th>
  </tr>
  <tr>
    <th>ver1:12</th>
    <th>ver2:15</th>
    <th>ver3:18</th>
    <th>dia2:15</th>
  </tr>
</table>

**hor1**, **hor2**, and **hor3** are the sums for each row; **ver1**, **ver2**, and **ver3** are the sums for each column; **dia1** and **dia2** are the sums along the diagonals. We would like to arrange the numbers in the table in such a way that:

	hor1 = hor2 = hor3 = ver1 = ver2 = ver3 = dia1 = dia2 = 15


The problem is permutational
----------------------------

The original arrangement in the numbers is: 

	[ 1 2 3 4 5 6 7 8 9 ]

Here are a few other randomly-picked alternatives:

	[ 1 2 9 4 3 6 8 7 9 ]
	[ 9 2 3 4 6 5 7 8 1 ]
	[ 1 2 8 6 5 4 7 3 9 ]

There are **9!** i.e. **362 880** different permutations possible. However, only a few of these permutations will satisfy the constraint. In order to find these permutations that satisfy the constraint, we want to:

- be able to enumerate them from **0** to **362 879**
- avoid checking all different possibilities


The permutation for a number
----------------------------

###The first permutation

Each number between **0** and **362 879** maps to a different permutation.

The first number **0** is mapped to:

	[ 1 2 3 4 5 6 7 8 9 ]

We can obtain the first permutation with the function `engine.initialPerm()`:

```javascript
var permutationEngine=require('engine.js');
var engine=new permutationEngine(9); 
var perm=engine.initialPerm();
console.log('the initial permutation is: '+perm);
```
Output:

	the initial permutation is: 1,2,3,4,5,6,7,8,9

The `initialPerm()` function is equivalent to:

```javascript
var perm=engine.index2perm(0);
```

###The last permutation

The last number **362 879** is mapped to:

	[ 9 8 7 6 5 4 3 2 1 ]

```javascript
var engine=new permutationEngine(9); 
var perm=engine.lastPerm();
console.log('the last permutation is: '+perm);
```

Output:

	the last permutation is: 9,8,7,6,5,4,3,2,1


Calling the `lastPerm()` function is equivalent to calling the `index2perm()` function with the last number:

```javascript
var perm=engine.index2perm(362879);
```

Or to calling the `index2perm()` function with `engine.indexCount`:

```javascript
var perm=engine.index2perm(engine.indexCount);
```

###The permutation for any number

There is a permutation for any number between the first (zero) and the last number (`n!-1`). A permutation _P1_ is smaller than _P2_, if by scanning both permutations from left to right, we run into an element that is smaller in _P1_ than in _P2_. 

For example:

	247 [1 2 3 6 4 7 ---5--- 9 8]
	248 [1 2 3 6 4 7 ---8--- 5 9]

Since **5** is smaller than **8**, the combination with index **247** is smaller than the one with index **248**. We can use the `engine.index2perm(index)` function to retrieve the permutation for a number:

```javascript
var engine=new permutationEngine(9); 
var perm=engine.index2perm(247);
console.log('index 247 is mapped to: '+perm);
var perm=engine.index2perm(248);
console.log('index 248 is mapped to: '+perm);
```

Output:

	index 247 is mapped to: 1,2,3,6,4,7,5,9,8
	index 248 is mapped to: 1,2,3,6,4,7,8,5,9


You can find a full explanation for the [factorial number system](http://en.wikipedia.org/wiki/Factoradic) in Wikipedia.


The number for a permutation
----------------------------

We can also find the permutation to any particular number. For example, if we want the number for the permutation:

	[ 1 2 8 6 5 4 7 3 9 ]

we can call the javascript function `engine.perm2index(perm)`:

```javascript
var engine=new permutationEngine(9); 
var index=engine.perm2index([ 1,2,8,6,5,4,7,3,9 ]);
console.log('permutation [ 1 2 8 6 5 4 7 3 9 ] is mapped to: '+index);
```

Output:

	permutation [ 1 2 8 6 5 4 7 3 9 ] is mapped to: 4016

We can see that it is mapped to index **4016**.


The next permutation in a row
-----------------------------

_Note: We can find the next permutation by looking up its index with `index=engine.perm2index(perm)` and then increment the index with `index++` and then find the permutation for this next index with `perm=engine.index2perm(index)`._

There is also a direct way through the function `engine.nextPerm(perm)` to finding the next permutation for a given permutation:

```javascript
var engine=new permutationEngine(9); 
var next=engine.nextPerm([ 1,2,8,6,5,4,7,3,9 ]);
var index=engine.perm2index(next);
console.log('the next permutation for [ 1 2 8 6 5 4 7 3 9 ] is : '+next+' with index: '+index);
```

Output:

	the next permutation for [ 1 2 8 6 5 4 7 3 9 ] is : 1,2,8,6,5,4,7,9,3 with index: 4017


Skipping a range of permutations
--------------------------------

Imagine we are evaluating the permutation **[ 1 2 8 6 5 4 7 3 9 ]**. We can see that the sum for **[ 1 2 8 ]** is not equal to **15**. In fact, there is no point in evaluating any permutation that starts with **[ 1 2 8 ]**. We can use the `next=skipForward([1,2,8,6,5,4,7,3,9],3)` function call to skip the range with prefix **[ 1 2 8 ]**. The next permutation will start with the successor prefix for **[ 1 2 8 ]**; in this case **[ 1 2 9 ]**.

```javascript
var engine=new permutationEngine(9); 
var next=engine.skipForward([ 1,2,8,6,5,4,7,3,9 ],3);
var index=engine.perm2index(next);
console.log('the next interesting permutation for [ 1 2 8 6 5 4 7 3 9 ] is : 
	'+next+' with index: '+index);
```

Output:

	the next interesting permutation for [ 1 2 8 6 5 4 7 3 9 ] is : 1,2,9,3,4,5,6,7,8 with index: 4320

Without skipping ranges of permutations, a permutational problem is always [NP-complete](http://en.wikipedia.org/wiki/NP-complete). The potential total number of evaluations to make is `n!`. This ordinarily means that the problem cannot be solved for larger dimensions. However, if this problem can be addressed by judiciously skipping entire ranges of permutations, it may be possible to solve a large permutational problem anyway. The earlier you can detect that a range is invalid, the better. For example, it is better to detect that the following prefix is invalid:

	[ 1 2 8 ] [ . . . . . . ]  6!=720 possibilities skipped

than only seeing it later:

	[ 1 2 8 6 5 4 ] [ . . . ]  only 3!=6 possibilities skipped 


For example, solving the [Travelling salesman problem](http://en.wikipedia.org/wiki/Travelling_salesman_problem) amounts to discovering a permutation-skipping strategy leaving a number of permutations to evaluate that does not grow factorially with the number of cities.


Solution to the example problem
-------------------------------

You can find the complete solution in the file `test/test-3x3.js`. 

```javascript
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

```

Output:

	solution:1
	2 7 6
	9 5 1
	4 3 8
	solution:2
	2 9 4
	7 5 3
	6 1 8
	...
	(There are 8 solutions in total)
	...
	permutations:362880
	evaluated:8376
	evaluated perc:2.31%


As you can see, the skipping strategy implemented brought down the number of permutations to evaluate from **362 880** to **8 376**, i.e. to around **2%** of the total.


API Summary
-----------

<table>

<tr>
<td>
1. <i>perm = initialPerm()</i>
</td>
<td>
Returns the first permutation.
</td>
</tr>

<tr>
<td>
2. <i>perm = lastPerm()</i>
</td>
<td>
Returns the last permutation.
</td>
</tr>

<tr>
<td>
3. <i>perm = index2perm(index)</i>
</td>
<td>
Returns the permutation for an index.
</td>
</tr>

<tr>
<td>
4. <i>index = perm2index(perm)</i>
</td>
<td>
Returns the index for a permutation.
</td>
</tr>

<tr>
<td>
5. <i>next = nextPerm(perm)</i>
</td>
<td>
Returns the next permutation.
</td>
</tr>

<tr>
<td>
6. <i>next = skipForward(perm, prefixSize)</i>
</td>
<td>
Returns the next permutation by skipping the range prefixed by <i>prefixSize</i> number of elements in the permutation <i>perm</i> supplied.
</td>
</tr>

</table>


License
-------
	Copyright (c) 2012 Erik Poupaert.
	Licensed under the Library General Public License (LGPL).
