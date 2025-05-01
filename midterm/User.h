#ifndef USER_H_
#define USER_H_

#include <string>
#include "Medlogsystem.h"

using namespace std;

class User {  
public:
    User(string _username, int _age, string _email, int _phone_number);
    ~User(); //clean up memory
    void displayProfile();
    void saveUserData(string filename);
    void loadUserData(string filename);
    void startSession();

private:
    string username;
    int age;
    string email;
    int phone_number;
    MedLogSystem medlog;
};


#endif