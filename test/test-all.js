#!/usr/bin/env node

scripts=[
      'examples'
    , 'fac'
    , 'index2perm'
    , 'nextperm'
    , 'remainingchoices'
    , 'firstchoiceforindex'
    , 'indexstartforfirstchoice'
    , 'perm2index'
    , '3x3'
]

for(var i=0; i<scripts.length; i++)
    require('./test-'+scripts[i]+'.js');

