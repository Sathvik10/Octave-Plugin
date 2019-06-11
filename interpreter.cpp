#include <octave-5.1.0/octave/oct.h>
#include <octave-5.1.0/octave/octave.h>
#include <octave-5.1.0/octave/interpreter.h>
#include <octave-5.1.0/octave/parse.h>
#include <iostream>
#include <boost/algorithm/string.hpp>
#include <vector>

int main(){
    std::string s;
    octave::interpreter exec;
    octave::execution_exception h;
    std::string input;
    
    int status;
    status = exec.execute();
    //std::cout << status;

    std::cout << "Enter the string\n";
    std::cin >> input;
    octave_value_list out;
    octave_value temp;
    int parse_status=0;
    std::vector<std::string> statement;
    boost::split(statement,input,boost::is_any_of("\n"));

    try{
    int count = statement.size();
    for(int i=0;i<1;i++){
        std::cout << input <<" ";
        const std::string query=input;    
        temp=exec.eval_string(query,true,parse_status);
        out.prepend(temp);
    }
    if(!out.empty()){
        if(!out(0).isempty()){
            if(out(0).is_string()){
                std::cout << out(0).string_value();
            }
        }
    }
    }    
    catch(const octave::execution_exception& e){
        std::cout << e.info();
        std::cout << "error\n";
        exec.recover_from_exception();
    }
    return 0;
}
