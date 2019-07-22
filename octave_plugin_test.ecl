import octave;

boolean maximum(real a,real b):=embed(octave)
    if(a>b)
        max = true;
    else 
        max = false;
    endif
    max
endembed;
//output(maximum(4,3));

real tangent(real deg):= embed(octave)
    ra = deg2rad(deg)
    tan(ra)
endembed;
//output(tangent(45));

real sumof(set of real x):= embed(octave)
    sum= 0;
    for i = x
        sum+=i;
    endfor
    sum
endembed;
//output(sumof([1,5,4]));

real sumoferr(set of real y):= embed(octave)
    sum= 0;
    for i = x
        sum+=i;
    endfor
    sum
endembed;
//output(sumoferr([1,5,4]));
//error: 'x' undefined near line 1 column 13

boolean isa(integer a, string cls):= embed(octave) isa(a,cls) endembed;
//output(isa(45,'int64'));
//true
//output(isa(45,'int32'));
//false

set of unsigned2 generateArr(unsigned front,unsigned elast,unsigned linspace):= embed(octave)
    if(linspace <= 0)
        a = front  : elast;
    else 
        a = front : linspace : elast ;
    endif
    a = uint16(a)
endembed;
//output(generateArr(2,100,5));
//[2,7,12,17,22,27,32,37,42,47,52,57,62,67,72,77,82,87,92,97]
//output(generateArr(50,70,0));
//[50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70]
