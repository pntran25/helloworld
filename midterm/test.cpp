#include "test.h"
#include <iostream>
using namespace std;

void Test::print() const{
    cout << "Test class print function." << endl;
}

int main(){
    Test testObj;
    testObj.print();
    return 0;
}