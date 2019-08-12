ECL Octave Plugin
=================
This is the ECL plugin for embedding octave queries within the ECL definitions.


Introduction and Working
-------------------------
Octave plugin enables to bring octave queries within ECL. All the queries within the embedded context is evaluated using octave interpreter. Each statement or a query has its own return type. In some cases, the return value in octave CUI and embed Octave differs, especially in data containers and conditional statements. To make sure we get the proper output, the last statement should always be the required return value.

#### Example: ####
If the output required is a structure, then the embedded code should always follow the below syntax
```
structure returnStruct():=embed(octave)
x.a = 9
x.b= 'Hello'
....
x
endembed
```
The last statement returns the structure which is the required return value.   
If we consider the statement  `x.b = 'Hello'` , the return value in octave CUI is a structure, but the return value is a string in embedded context.


Similar syntax has to be followed in conditional statements and iterative statements. If not parse error is generated, although the syntax of embedded octave code is authentic.

```c++
x = blah...
if(for)
   x = blah blah..
   body
endif(endfor)
x               //If X is the required value.
```

Mapping
-------
| ECL Type | Octave-Type | Notes |
|  :----: | :----: |:----: |
| Boolean | Logical | Default Value is false |
| Real | double | Default Value is 0 |
| Real4 |  single |  |
| Real8 | double |  |
| Integer | int64 | Default Value is 0 |
| Integer1 | int8 | For types other than standard size 
| Integer2 | int16 | plugin throws an error |
| Integer4 | int32 |  |
| Integer8 | int64 |  |
| Unsigned | uint64 | Default Value is 0 |
| Unsigned1 | uint8 |  |
| Unsigned2 | uint16 |  |
| Unsigned4 | uint32 |  |
| Unsigned8 | uint64 |  |
| String | String | Default Value is an empty string and belongs to char class |
| Set of Real | double row vector |  |
| Set of Real4 | double row vector |  |
| Set of Real8 | double row vector|  |
| Set of Boolean | logical row vector |  |
| Set of Integer | int64 row vector |  |
| Set of Integer1 | int8 row vector |  |
| Set of Integer2 | int16 row vector |  |
| Set of Integer4 | int32 row vector |  |
| Set of Integer8 | int64 row vector |  |
| Set of Unsigned | uint64 row vector |  |
| Set of Unsigned1 | uint8 row vector |  |
| Set of Unsigned2 | uint16 row vector |  |
| Set of Unsigned4 | uint32 row vector |  |
| Set of Unsigned8 | uint64 row vector |  |
| Set of String | char matrix | Additional characters are filled with space character |
| Set of utf8 | char matrix |  |
| Record | structure |  |
| Dataset | struct-array |  |
| Set Of Record | Unsupported | It implies array of structure which is mapped to Dataset | 

`Octave plugin doesn't support data type and unicode type. Set of record and set of dataset is not supported`

   [Info: To check the type of the binding use octave function class() whose return type is string]

Record, Dataset and Numerical Matrix
------------------------------------
As mentioned matrices are bound to specific definition of dataset. The definition is;   
```
Identifier := Record
   set of real(integer/unsigned/boolean) identifier;
end;

Dataset(Identifier)
```
This is the only way to define an octave matrix definition in ECL. Few points to add:        
* To get a matrix result from embedded script, matrix can be real, integer, unsigned and boolean. Only these four specified type are supported. As char matrix is already mapped to a set of strings, usage of string implies multi-dimensional char matrix whose support is not provided.   
* To pass a matrix to the embedded script as a parameter, matrix of type real is allowed. No other type can be passed as a parameter. If any other types are required, casting can be done within the embedded code. Remember most of the computations in octave are performed by implicitly converting to double type.

* To pass a matrix parameter following syntax is recommended.
```
matrix := record
   set of real x;
end;   

Parameter := Record
   ....
   Dataset(matrix) mat
   ....
end;

returnType Definition(Parameter x):=embed(octave)
   .....
endembed;

or

returnType Definition(Dataset(Parameter) x):=embed(octave)
   .....
endembed;
```
This implies matrix to be passed as a parameter can be a part of record or dataset, but can't be passed individually. If passed it will be mapped to structure array, where each structure consists of a row vector.

* No dataset should follow the specified syntax below to pass a parameter.
```
prototypeBad := record
   set of real x;
   ....
end;
(Will generate errors)

prototypeGood := record
   ....
   set of real x;
   ....
end;
```
This implies record used as a template for dataset, can't start with set of type as a part of its definition. Mapping holds good for placing set of type at bottom or in between. Placing at top will generate error.

Following are points necessary for octave plugin usage:
1. Record can have a sub-record definition mapping to structure within a structure.
2. Record can have a dataset definition mapping to struct-array within a structure.
3. Record can have matrix definition.
4. To obtain the output and pass the parameter, matrix can be a part of struct-array, implies matrix definition can be a part dataset definition representing struct-array.
5. Record can have both matrix and dataset as fields.

These restrictions are imposed because of the reason that dataset supports two different types (matrix and struct-array) and differentiating definitions of dataset or record is complicated at interfacing level. The reason to support matrix in spite of complication is matrices are important mathematical assets, they represent a wide range of information and is commonly used in numerical computations. Most of the restrictions are for parameters passing.

