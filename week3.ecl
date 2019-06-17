import octave;

string hello():= embed(octave)
a='hi hi'
endembed;

unicode text() := embed(octave)
a='℀ ℁ ℂ ℃ ℄ ℅ ℆ ℇ ℈ ℉ ℊ ℋ ℌ ℍ ℎ ℏ ℐ ℑ ℒ ℓ ℔ ℕ № ℗ ';
endembed;
set of real vec() := embed(octave)
a=[ 1 3 4];
endembed;

set of boolean boolvec() := embed(octave)
[ 1==2 true 1>2 ];
endembed;

set of integer intvec() := embed(octave)
a=12
[ a+2 
3*3 
-45 
67]
endembed;

set of unsigned unsvec() := embed(octave)
[ 12 -3 323];
endembed;

set of string str() := embed(octave)
['sat' 'hvik'
'ko' 'te']
endembed;

set of varstring vstr() := embed(octave)
['a' 'b'
'c' 'd']
endembed;
output(vstr());
