#include "Medication.h"
#include "User.h"
#include "Medlogsystem.h"
#include <iostream>
#include <vector>
#include <string>

using namespace std;

Medication::Medication(string _name, string _dosage, int _frequency_per_day) {
    name = _name;
    dosage = _dosage;
    frequency_per_day = _frequency_per_day;
    taken_today = false;
}

string Medication::getType() const {
    return "Medication";
}

void Medication::markAsTaken(){ //taken today
    taken_today = true;
}

void Medication::resetForNewDay(){ //resets to false
    taken_today = false;
}

void Medication::display() const { //displays medication info
    cout << "Medication Name: " << name << endl;
    cout << "Dosage: " << dosage << endl;
    cout << "Frequency per Day: " << frequency_per_day << endl;
    if (taken_today)
    {
        cout << "Taken Today: Yes" << endl;
    }
    else
    {
        cout << "Taken Today: No" << endl;
    }
}