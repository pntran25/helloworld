#include "User.h"
#include "Medlogsystem.h"
#include "Medication.h"
#include <iostream>
#include <string>

using namespace std;

int main() {
    int choice;
    User* currentUser = nullptr;

    while (true) {
        cout << "\n==== MEDLOG MAIN MENU ====" << endl;
        cout << "1. Load User Profile\n2. Create New User\n3. Exit\n";
        cin >> choice;
        if (choice == 1) {
            string file;
            cout << "Enter .txt file:";
            cin >> file;
            currentUser = new User("temp", 0, "none", 0); //needed to initialize the user constructor
            currentUser->loadUserData(file);
            currentUser->startSession();
        } else if (choice == 2) {
            string name, email;
            int age, phone;
            cout << "Enter name, age, email, phone: ";
            cin >> name >> age >> email >> phone;
            currentUser = new User(name, age, email, phone);
            currentUser->startSession();
        } else break; //exit
    }
    delete currentUser;
    return 0;
}