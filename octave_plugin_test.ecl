import octave;
#option('saveCppTempFiles',true);

real maximum(real a,real b):=embed(octave)
    if(a>b)
        max = a;
    else 
        max = b;
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

set of real strfind(string text,string pat,boolean overlap):=embed(octave)
        if(overlap == true)
            sf = findstr(text,pat,1)
        else 
            sf = findstr(text,pat,0)
        endif
        sf
endembed;

//output(strfind('ababa','a',false));
//[1.0,3.0,5.0]
//output(strfind('abababa','aba',true));
//[1.0,3.0,5.0]
//output(strfind('abababa','aba',false));
//[1.0,5.0]

boolean issingle(real4 a):=embed(octave)    isa(a,'single') endembed;
//output(issingle(4));
//true --> real4 is mapped to single type
//info ::) real4 is mapped to single type. Real and real8 is mapped to double type.
//         In Octave generally all numerical computations are converted to double type.

unsigned distance(unsigned x,unsigned y):=embed(octave)
    dis = sqrt(x*x+y*y)
    uint64(dis)
endembed;

//output(distance(5,5));
//7
//info ::) if the output of octave query is negative, we get 0. If we pass negative to unsigned parameter
//         number is transformed to a positive number according to 2^n-1 circle.(2's complement) 

utf8 copying(utf8 x):=embed(octave)
    c = x
    c
endembed;

//output(copying(U'abcd\353   Hello  Noe#'));
//No Idea to do any specific operation on utf8

set of real addVec(set of real x,set of real y):= embed(octave)
    sb = x + y
    sb
endembed;

//output(addVec([12 , -9,334,-0.8,9],[4,54,23,-7,7]));
//[16.0,45.0,357.0,-7.8,16.0]

check := sumof([1,2,3,4])+maximum(10,8);
//output(check);
//20  --> Each definitions are given a single instance of 

trignometry := RECORD
    boolean b;
    real c;
    real s;
    real t;
    real radvalue;
END;

trignometry genTrig(real dAngle):=embed(octave)
    rad = deg2rad(dAngle);
    x.b = true;
    x.c = cos(rad);
    x.s = sin(rad);
    x.t = tan(rad);
    x.radvalue = rad;
    x
endembed;

//output(genTrig(45),Named('RecordResult'));
//true,0.7071067811865476,0.7071067811865475,0.9999999999999999,0.7853981633974483

stringrec :=RECORD
    real x;
    string y;
END;

stringrec stringrect():=embed(octave)
    x.x = 777;
    x.y = 'hello'
    x
endembed;
//output(stringrect(),named('RecordResult'));

real average(set of integer x):= embed(octave)
    function retval = avg (v)
        retval = 0;
    if (isvector (v))
        retval = sum (v) / length (v);
    else
        error ("avg: expecting vector argument");
    endif
    endfunction
    avg(x)
endembed;

//output(average([1,2,3,4,5,6,7,8,9]));
//5.0 ---> Octave definition can be defined within the plugin. But make sure the last query returns something.

set of unicode  testt():=embed(octave)
    ['dsf';'fvgs']
endembed;
//output(testt());
//EXCEPTION: UNSUPPORTED feature: UNICODE not supported in Octave plugin

string testType(real4 x):=embed(octave)
    class(x)
endembed;

output(testType(4));
//single
//Info      ---> Real4 is mapped to single and Real8 and real is mapped to double
