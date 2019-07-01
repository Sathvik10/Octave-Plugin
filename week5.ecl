import octave;

DataRec := RECORD
    boolean y;
    integer x;
    real t;
    unsigned r;
    set of boolean yu;
END;

DataRec testing2():= embed(octave)
    e.y = true;
    e.x = int64(6);
    e.t =4;    
    e.r = uint64(4);
    x.yu=[true false];
    e
endembed;
DataRec recordc():= embed(octave)
    x.b=true;
    x.a=int64(2);
    x.r=4;
    x.rt=[true 
    false
    false];
    x.v=uint64(1);
    x
endembed;

/*DataRec2 record2():=embed(octave)
    x.b=true;
    x.a='sathvik';
    x
endembed;
*/
DataRec3 := RECORD
    set of string x;
    real size;
END;

DataRec3 record3():= embed(octave)
    x.a=['sath' 'vik'
         'ko'   'te' ]
    x.b=rows(x.a);
    x
endembed;

DataUtf := RECORD
    set of utf8 y;
    utf8 x;
    real size;
END;

DataUtf record4() := embed(octave)
    x.a = ['abc' 'dë'
            'На' ' берегу'];
    x.b = 'யாமறிந்த';
    x.c = rows(x.a);
    x
endembed;
result1:=recordc();
//result2:=record2();
result3:=record3();
result4:=record4();

Datarec4 :=RECORD
    boolean x;
    real y;
END;

examplerec := RECORD
    DATASET(Datarec4) child;
    boolean z;
END;

examplerec hello():=embed(octave)
    x.a=2;
    x.b=true;
    x
endembed;

set of real traffic():=embed(octave)
    pkg load fuzzy-logic-toolkit;
    cs = readfis('cubic_approximator.fis');
    aa = rand(1:2);
    evalfis(aa,cs);
endembed;
//output(row({DATASET([{false,1},{false,2}],Datarec4),true},examplerec));
//output(hello(),named('RecordResult'));
//output(result4,named('RecordResult'));

matrix := RECORD
    boolean  a;
    boolean y;
END;

realMat := RECORD
    DATASET(matrix) name;
END;

realMat getmat():=embed(octave)
    x.name=[true true ;false false ];
    x
endembed;

example :=RECORD
    real name;
    matrix yy;
END;

example getma():=embed(octave)
    x.name = 8;
    x.yy.a = 8;
    x.yy.y = 8;
    x
endembed;

DataRec2 := RECORD
    boolean y;
    set of real x;
END;

DataRec2 testing1 := embed(octave)
    x.y=true;
    x.x=[1 24 5];
    x
ENDembed;
output(getmat(),named('RecordResult'));