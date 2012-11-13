/**
	Permutation Engine
	Written by Erik Poupaert, November 2012
	Licensed under the Library General Public License (LGPL).
*/

/**
	@class defines functions on permutations
*/

function engine(n)
{

	if(n<2) throw new Error('Cannot initialize engine; n must not be smaller than 2');

	this.n=n;

	function cache()
	{
		this.hits=0;
		this.misses=0;
		this.enabled=true;
	}

	cache.prototype.report=function()
	{
		var total=this.hits+this.misses;
		if(total)
		{
			var perc_hits=Math.floor(this.hits/total*100);
			return 'count='+(Object.keys(this).length-3)+' hits='+this.hits+' misses='+
				this.misses+' total='+total+' hits perc='+perc_hits+'%';
		}
		else
		{
			return 'function was never called';
		}
	}

	/** 
		@method fac(k)

		computes fac(k) as k! 
	*/

	this.facCache=new cache();
	this.fac=function(k)
	{
		if(k<1) throw new Error('called fac(k) with negative or zero k:'+k);
		if(k==1) return 1;
		//check if we can serve from cache
		if(this.facCache.enabled)
			if(this.facCache[k])
			{
				this.facCache.hits++;
				return this.facCache[k];
			}
		//the calculation itself
		var result=k*this.fac(k-1);
		//cache the results
		this.facCache.misses++;
		if(this.facCache.enabled)
			this.facCache[k]=result;
		//return the result
		return result;
	}

	/** 
		number of indexes for permutations with n elements
	 */

	this.indexCount=this.fac(n);

	/**
		@method firstChoiceForIndex(index,m)

		calculates the first choice for an index for permutations with m elements

		the index runs from 0 ... m!-1
		for example, if m=5, then the index run from 0..5!-1, 
			that is, from 0..120 - 1, 
			that is, from 0..119

		for m=5, there are 5 choices possible for the first element.
		There are always 4!=24 remaining choices
		choice	index_start	index_end
		1	(1-1)*24=0	0 +(24-1)=23
		2	(2-1)*24=24	24+(24-1)=47
		3	(3-1)*24=48	48+(24-1)=71
		4	(4-1)*24=72	72+(24-1)=95
		5	(5-1)*24=96	96+(24-1)=119	

		in general:
		1	(1-1)*(m-1)!	(1-1)*(m-1)!+(m-1)
		k	(k-1)*(m-1)!	(k-1)*(m-1)!+(m-1)	

		so, the relationship between index and k is:
		(k-1)*(m-1)! <= index <= (k-1)*(m-1)!+(m-1)

		k <= index/(m-1)!+1 which will be a fractional number
		k <= index/(m-1)!
		k_low=floor(k)
		k_high=floor(k+1)


	*/

	this.firstChoiceCache=new cache();
	this.firstChoiceForIndex=function(index,m)
	{
		if(index==0) return 1;
		//check if we can serve from cache
		var key=JSON.stringify(arguments);
		if(this.firstChoiceCache.enabled)
			if(this.firstChoiceCache[key]) 
			{
			    this.firstChoiceCache.hits++;
			    return this.firstChoiceCache[key];
			}
		//the calculation itself
		var k=index/this.fac(m-1);
		var k_low=Math.floor(k);
		var k_high=k_low+1;
		//cache the results
		this.firstChoiceCache.misses++;
		if(this.firstChoiceCache.enabled)
			this.firstChoiceCache[key]=k_high;
		//return the result
		return k_high;
	}

	/**
		@method remainingChoices(prefix)

		calculates the remaining choices given a set of choices (=prefix)
		
		for example, if for n=7, we choose the prefix [1 4 2]
		the remaining choices are [2 3 5 6 7]
		another example, n=5, prefix=[5 1], then remaining choices=[2 3 4]
	*/

	this.remainingChoicesCache=new cache();
	this.remainingChoices=function(prefix)
	{
		var key=JSON.stringify(prefix);
		//check if we can serve from cache
		if(this.remainingChoicesCache.enabled)
			if(this.remainingChoicesCache[key]) 
			{
			    this.remainingChoicesCache.hits++;
			    return this.remainingChoicesCache[key];
			}
		//the calculation itself
		result=[];
		for(var i=1; i<=n; i++)
		{
			if(prefix.indexOf(i)==-1) result.push(i);
		}
		//cache the results
		this.remainingChoicesCache.misses++;
		if(this.remainingChoicesCache.enabled)
			this.remainingChoicesCache[key]=result;
		//return the result
		return result;
	}

	/**
		@method indexStartForFirstChoice(index,m)

		for example m=5
		choice	index_start
		1	(1-1)*24=0
		2	(2-1)*24=24
		3	(3-1)*24=48
		4	(4-1)*24=72
		5	(5-1)*24=96

		we first calculate the choice for the index (firstChoiceForIndex) and then the index_start for the index

	*/

	this.indexStartForFirstChoiceCache=new cache();
	this.indexStartForFirstChoice=function(index,m)
	{
		var key=JSON.stringify(arguments);
		//check if we can serve from cache
		if(this.indexStartForFirstChoiceCache.enabled)
			if(this.indexStartForFirstChoiceCache[key]) 
			{
			    this.indexStartForFirstChoiceCache.hits++;
			    return this.indexStartForFirstChoiceCache[key];
			}
		//the calculation itself
		result=(this.firstChoiceForIndex(index,m)-1)*this.fac(m-1);
		//cache the results
		this.indexStartForFirstChoiceCache.misses++;
		if(this.indexStartForFirstChoiceCache.enabled)
			this.indexStartForFirstChoiceCache[key]=result;
		//return the result
		return result;
	}

	/**
		@method indexStartForFirstChoice(index,m)

		for example m=5
		choice	index_start
		1	(1-1)*24=0
		2	(2-1)*24=24
		3	(3-1)*24=48
		4	(4-1)*24=72
		5	(5-1)*24=96

		we first calculate the choice for the index (firstChoiceForIndex) and then the index_start

	*/
	
	this.index2permCalc=function (index,m,prefix)
	{
		var remainingChoices=this.remainingChoices(prefix);
		var choice=remainingChoices[this.firstChoiceForIndex(index,m)-1];
		prefix.push(choice);
		if(prefix.length<n) this.index2permCalc(index-this.indexStartForFirstChoice(index,m),m-1,prefix);
		return prefix;
	}

	/**
		@method index2perm(index)
		Computes the permutation for an index
	*/

	this.index2perm=function (index)
	{
	    return this.index2permCalc(index,this.n,[]);		
	}

	/**
		@method nextPerm(perm)
		Computes the next permutation for a given permutation
	*/

	this.nextPerm=function(perm)
	{
		perm=perm.slice(0); //create a copy
		while(perm.length!=0)
		{
			perm.pop(); //remove one element
			var remainingChoices=this.remainingChoices(perm);
			var lastChoice=perm.slice(-1)[0]; //last element
			//look for element that is larger in remaining choices
			for(var i=0; i<remainingChoices.length; i++)
			{
				var candidate=remainingChoices[i];
				//next element found
				if(candidate>lastChoice)
				{
					perm[perm.length-1]=candidate;
					remainingChoices=this.remainingChoices(perm);
					return perm.concat(remainingChoices);
				}
			}
		}
		return null;
	}

	/*
		@method perm2index(perm)

		Example: n=5, index of [3 2 1 4 5]
		choice 	remaining choices	count 	index	index_start	
		3	[1 2 3 4 5]		5	3	(3-1)*(5-1)! 	48
		2	[1 2 4 5]		4	2	(2-1)*(4-1)!	6
		1	[1 4 5]			3	1	(1-1)*(3-1)!	0
		4	[4 5]			2	1	(1-1)*(2-1)!	0
		5	last element never contributes to the index
										---
									index=	54
		In general
		index of [a1 a2 a3 ... an]
		contribution of ak to index: (index(k,remainingChoices)-1)*(remainingChoices.count-1)!
	*/

	this.perm2index=function(perm)
	{
	    var sum=0;
	    for(var i=0;i<this.n-1; i++)
	    {
		    var prefix=perm.slice(0,i);
		    var remainingChoices=this.remainingChoices(prefix);
		    var factorIndex=remainingChoices.indexOf(perm[i]);
		    var factorFac=this.fac(this.n-1-i);
		    sum+=factorIndex*factorFac;
	    }
	    return sum;
	}

	/*
		@method skipForward(perm,prefixSize)

        Example: [1 2 3] [4 9 5 7 8 6]
        We know, according to external rules, that [1 2 3] is an invalid permutation.
        Therefore, there is no point in evaluating the entire range of [1 2 3] [. . . . . .]
        It saves us 6!=24 evaluations.
        We know that range [1 2 3] ends with remaining choices [9 8 7 6 5 4]. After that, range [1 2 4] starts.

        call the function to return the next permutation, that is the first one starting with [1 2 4]: 

            nextPermutation=skipForward([1 2 3 4 9 5 7 8 6],4);
	*/
    
    this.skipForward=function(perm,prefixSize)
    {
	    var prefix=perm.slice(0,prefixSize);
	    //last permutation for prefix is by sorting the remaining choices from high to low
	    var lastPermForPrefix=this.remainingChoices(prefix).slice(0).reverse();
	    perm=prefix.concat(lastPermForPrefix);
	    return this.nextPerm(perm);
    }


    /** the initial permutation */

    this.initialPerm=function()
    {
        return this.index2perm(0);
    }

    /** the last permutation */

    this.lastPerm=function()
    {
        return this.initialPerm().reverse();
    }

}

module.exports=engine;

