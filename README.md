#ECL Octave Plugin

This is the ECL plugin for embedding octave queries within the ECL definitions.

#Introduction and Working

Octave plugin enables to bring octave queries within ECL. All the queries within the embedded context is evaluated using octave interpreter. Each statement or a query has its own return type. In some cases, the return value in octave CUI and embed Octave differs, especially in data containers and conditional statements. To make sure we get the proper output, the last statement should always be the required return value.

```
Example:
If the output required is a structure, then the embedded code should always follow the below syntax

>x.a = 9
>x.b= 'Hello'
>....
>X

The last statement returns the strucure which is the required return value. If we consider the statement "x.b = 'Hello'", the return value in octave CUI is a structure, but the return value is a string in embedded context.
```

Similar syntax to be followed in condtional statements and iterative statements. If not parse error is generated, although the syntax of embedded octave code is authentic.

```
>x = blah...
>if(for)
>    x = blah blah..
>    body
>endif(endfor)
x               //If X is the required value.
```

#Mapping

1.Boolean
    Boolean type is mapped to logical in octave. If the return type is mismatched, error is generated.

2.Real
    Both single and double type in octave are mapped to real in ECL. Real4 parameter is mapped to single and both real and real8 are mapped to double.

3.Signed
    Integer is mapped to int type in octave. If the size of integer is not mentioned, value is mapped to int64 type. Standard size 1, 2, 4, 8 bytes are supported. If any other size is used, plugin throws an exception.

    [Info: To check the type of the binding use octave funtion class() whose return type is string]