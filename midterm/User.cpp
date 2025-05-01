#include "User.h"
#include <iostream>
#include <vector>
#include <string>
#include <fstream>

using namespace std;

User::User(string _username, int _age, string _email, int _phone_number) : username(_username), age(_age), email(_email), phone_number(_phone_number), medlog() {}

User::~User() {}

void User::displayProfile() {
    cout << "Username: " << username << endl;
    cout << "Age: " << age << endl;
    cout << "Email: " << email << endl;
    cout << "Phone Number: " << phone_number << endl;
}

void User::saveUserData(string filename) {
    ofstream outFile(filename);
    if (!outFile) {
        cerr << "Error opening file for writing: " << filename << endl;
        return;
    }
    outFile << username << endl;
    outFile << age << endl;
    outFile << email << endl;
    outFile << phone_number << endl;
    outFile.close();
    medlog.saveToFile(filename); // Pass filename as a string
    cout << "User data saved to " << filename << endl;
}

void User::loadUserData(string filename) {
    ifstream inFile(filename);
    if (!inFile) {
        cerr << "Error opening file for reading: " << filename << endl;
        return;
    }
    inFile >> username >> age >> email >> phone_number;
    inFile.close();
    medlog.loadFromFile(filename); // Pass filename as a string
    cout << "User data loaded from " << filename << endl;
}

void User::startSession(){
    int choice;
    do {
        medlog.displayMenuHeader(); // Display ASCII header
        cout << "Session started for user: " << username << endl;
        cout << "1. Add Medication" << endl;
        cout << "2. Display All Medications" << endl;
        cout << "3. Mark Dose" << endl;
        cout << "4. Reset For a New Day" << endl;
        cout << "5. Save User Data" << endl;
        cout << "6. Load User Data" << endl;
        cout << "7. Display User Profile" << endl;
        cout << "8. Return to Main Menu" << endl;
        cout << "==============================" << endl;
        cout << "Choose an option: ";
        cin >> choice;
        switch (choice) {
            case 1:
                medlog.addMedication();
                break;
            case 2:
                medlog.displayAll();
                break;
            case 3:
                medlog.markDose();
                break;
            case 4:
                medlog.resetAll();
                break;
            case 5:
                cout << "Enter filename to save user data: ";
                {
                    string filename;
                    cin >> filename;
                    saveUserData(filename);
                }
                break;
            case 6:
                cout << "Enter filename to load user data: ";
                {
                    string filename;
                    cin >> filename;
                    loadUserData(filename);
                }
                break;
            case 7: 
                displayProfile();
                break;
            default:
                cout << "Invalid choice. Please try again." << endl;
        }
    } while (choice != 8); // Loop until user chooses to exit
    cout << "Session ended for user: " << username << endl;
}
