#ECL Octave Plugin

This is the ECL plugin for embedding octave queries within the ECL definitions.

#Introduction and Working

Octave plugin enables to bring octave queries within ECL. All the queries within the embedded context is evaluated using octave interpreter. Each statement or a query has its own return type. In some cases, the return value in octave CUI and embed Octave differs, especially in data containers and conditional statements. To make sure we get the proper output, the last statement should always be the required return value.

```
Example:
If the output required is a structure, then the embedded code should always follow the below syntax

x.a = 9
x.b= 'Hello'
....
X

The last statement returns the strucure which is the required return value. If we consider the statement "x.b = 'Hello'", the return value in octave CUI is a structure, but the return value is a string in embedded context.
```

Similar syntax to be followed in condtional statements and iterative statements. If not parse error is generated, although the syntax of embedded octave code is authentic.

```
x = blah...
if(for)
    x = blah blah..
    body
endif(endfor)
x               //If X is the required value.
```

#Mapping

1.Boolean:
    Boolean type is mapped to logical in octave. If the return type is mismatched, error is generated.

2.Real:
    Both single and double type in octave are mapped to real in ECL. Real4 parameter is mapped to single and both real and real8 are mapped to double.

3.Signed:
    Integer is mapped to int type in octave. If the size of integer is not mentioned, value is mapped to int64 type. Standard size 1, 2, 4, 8 bytes are supported. If any other size is used, plugin throws an exception.

    [Info: To check the type of the binding use octave funtion class() whose return type is string]

4.Unsigned:
    Unsigned is mapped to uint (unsigned integer) type in octave. If the size of unsigned type is not mentioned, value is mapped to uint64 type. Standard size 1, 2, 4, 8 bytes are supported. If any other size is used, plugin throws an exception.

5.String:
    String is mapped to single quoted string and belongs to char class

6.UTF8:
    UTF8 is mapped to single quoted string and belongs to char class.

7.Unicode:
    There is no support for unicode type in octave plugin. Although there are functions in octave for converting native to unicode type, octave API support for unicode is missing.

8.Data:
    Octave plugin doesn't support data type.

9.Set Of:

    a.Numerical: All numerical set of type is mapped to row vectors of corresponding type and size except real. Set of type is mapped to double vector irrespective of size

    b.String: Set of string is mapped to char matrix, where each string represents each row in the matrix. Same implies for obtaining set of string output. Octave-5.1.0 doesn't have support for string matrix, mapping to char matrix is the suitable choice. Additional spaces are filled by space character.

    c.Record: Set of record implies structure array which is mapped to Dataset. There is no support for set of record in octave plugin.

    d.Dataset: There is no support for set of dataset in octave plugin.

8.Record:
    Record is mapped with struct type in octave. Both being data containers resembles in many ways. Additional information about record is give in next section.

9.Dataset:
    Dataset is mapped with structure array in octave. Dataset with specific record definition as a template is mapped to numerical matrix. Additional information is given in the next section.

#Record, Dataset and Numerical Matrix
    As mentioned matrices are bound to specific definition of dataset. The definition is;
     ```
    Identifier := Record
        set of real(integer/unsigned/boolean) indetifier2;
    end;

    Dataset(Identifier)
    ```
    This is the only way to define a octave matrix definition in ECL. Few points to add
    1. To get a matrix result from embedded script, matrix can be real, integer, unsigned and boolean. Only these four specified type are supported. As char matrix is already mapped to set of strings, usage of string implies multi-dimensional char matrix whose support is not provided.

    2. To pass a matrix to the embedded script as a parameter, matrix of type real is allowed. No other type can be passed as a parameter. If any other types are required, casting can be done within the embedded code. Remember most of the computations in octave are performed by implicitly converting to double type.

    3. To pass a matrix parameter following syntax is recommended.
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
    This implies matrix to be passed as a parameter can be a part of record or dataset, can't be parsed indivisually. If passed it will be mapped to structure array, where each structure consists of a row vector.

    4. No dataset should follow the specified syntax below to pass a parameter.
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
    2. Record can have a dataset definition mapping to stuct-array within a structure.
    3. Record can have matrix definition.
    4. To pass a parameter, don't include matrix within a struct-array, implies matrix definition should not be a part of dataset definition representing struct-array.
    5. To obtain the output, matrix can be a part of struct-array, implies matrix definition can be a part dataset definition representing struct-array.
    6. Record can have both matrix and dataset as fields.

    These restrictions are imposed because of the reason that differentiating definitions of dataset or record is complicated at intefacing level. The reason to support matrix inspite of complication is matrices are important mathematical assests, they represent wide range of information and is commonly used in numerical computations. Most of the restrictions are for parameters passing.

