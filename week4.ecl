import octave;
//#option('saveCppTempFiles',true);
boolean retb(boolean x):= embed(octave)
    x==false
endembed;

unsigned unsignp(unsigned x):= embed(octave)
    x=x+23;
    23+x;
endembed;

real realp(real x , real y):= embed(octave)
    x+y
endembed;

set of utf8 vecutf() :=embed(octave)
    ['℀℀ ℁ ℂ'
     '℁' 
     'ℂ']
endembed;


set of boolean setB(set of boolean x) := embed(octave)
    x==false
endembed;

set of integer setI(set of integer x) := embed(octave)
    x+1
endembed;

set of real setR(set of real x) := embed(octave)
    x*2
endembed;

string setI1(set of integer1 x) := embed(octave)
    typeinfo(x)
endembed;

set of string setS(set of string x) := embed(octave)
    x           //I didn't find any specific operation to perform
endembed;

set of varstring setVS(set of varstring x) := embed(octave)
    x
endembed;

set of utf8 setU(set of utf8 x) := embed(octave)
    x
endembed;

set of utf8 u:= [U'abcdë' ,U'abcd\353'];
set of string s:=['hello' , 'hi','jake'];
set of varstring vs:=['hello' , 'hi','jake'];
set of boolean b:= [true ,false ,true];
set of integer1 i:= [1 ,5 ,11];
set of real r:=[2.4, 5.6, 4 ,4];

DataRec := RECORD
    boolean y;
    real q;
END;


DataRec recordc():= embed(octave)
    x.b=true;
    x.a=2
    x
endembed;


result1:=recordc();

