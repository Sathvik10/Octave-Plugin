import octave;
//#option('saveCppTempFiles',true);

matrix :={set of boolean x};

Dataset(matrix) yyy():=embed(octave)
    a=[true true ; true false];
endembed;

mam :={dataset(matrix) y,real x};

mam uu:= embed(octave)
    x.y=[1 2;3 4];
    x.x=4;
    x
endembed;

matrix hello():= embed(octave)
    x.x=[true , true, false,true,false,true];
    x
endembed;
//output(hello(),Named('DatasetResult'));


test1 := RECORD
    boolean x;
    real r;
    integer i;
    unsigned u;
END;

real rec(test1 name,boolean t):= embed(octave)
    name.r = cos(name.i) + sin(name.u);
endembed;

//rec1 := row({true,6,7,8},test1);

//output(rec(rec1,false));

test2 := {set of real x};
audi :={set of real x};

set of real rec2(test2 name):=embed(octave)
    name.x * 2
endembed;
rec1 := row({[2,4]},test2);

//output(rec2(rec1));
inner1 := RECORD
    boolean na;
    set of real n;
END;

inner3 :=RECORD
    inner1 nam;
    dataset(audi) tt;
END;

inner2 := RECORD
    set of real na;
    boolean rr;
END;

outer4 :=RECORD
    inner3 name;
    integer i;
END;

Dataset(audi) recurs(outer4 out):=embed(octave)
    out.name.nam.n * out.name.tt ;
endembed;


ma := dataset([{[1,2]},{[4,5]}],audi);
in1 := row({true,[2 ,4 ]},inner1);
inn := row({in1,ma},inner3);
//in2 := row({[2 , 4, 5],true},inner2);
ou := row({inn,9},outer4);
output(recurs(ou),Named('RecordResult'));


test3:=RECORD
    Dataset(audi) name;
END;

Dataset(audi)  rec3(test3 tt):= embed(octave)
    tt.name * 2;
endembed;

out1 := row({ma},test3);
//output(rec3(out1),Named('RecordResult'));
