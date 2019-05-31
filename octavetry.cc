#include <octave/octave.h>
#include <octave/interpreter.h>
#include <octave/oct.h>
#include <iostream>
#include <string>

int main(){
  
    int status=1;
  //  std::cout << "welcome ";
    
    /*  string_vector argv(2);
    argv(0)="embedded";
    argv(1)= "-q";
    octave_main(2,argv.c_str_vec(),1);
    */
    static octave::interpreter exec;
    //status = exec.execute();
   
    
    // const std::__cxx11::string *expr,s="1+2";
    // expr=&s;
    
    std::cout << "hello";
    return 0;

}