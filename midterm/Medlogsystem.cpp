#include "Medlogsystem.h"
#include "Medication.h"
#include "User.h"
#include <iostream>
#include <vector>
#include <string>
#include <fstream>

using namespace std;

MedLogSystem::~MedLogSystem() {
    for (Medication* i : meds) {
        delete i; // free memory allocated for each medication
    }
}

MedLogSystem::MedLogSystem() {}

void MedLogSystem::addMedication(){
    string name, dosage, type;
    int frequency_per_day;

    cout << "Enter medication name: ";
    cin >> name;
    cout << "Enter dosage: ";
    cin >> dosage;
    cout << "Enter frequency per day: ";
    cin >> frequency_per_day;
    cout << "Enter type (Pill/Injection): ";
    cin >> type;

    if (type == "Pill" || type == "pill") {
        meds.push_back(new Pill(name, dosage, frequency_per_day));
    }
    else if (type == "Injection" || type == "injection") {
        meds.push_back(new Injection(name, dosage, frequency_per_day));
    } 
    else {
        cout << "Invalid type. Defaulting to Medication." << endl;
    }    
}

void MedLogSystem::displayAll() {
    cout << "All Medications:" << endl;
    for (int i = 0; i < meds.size(); ++i) {
        cout << "Medication " << i + 1 << ":\n" << endl;
        meds[i]->display();
        cout << endl;
    }
}

void MedLogSystem::markDose() {
    string name;
    cout << "Enter medication name to mark as taken: ";
    cin >> name;

    for (Medication* i : meds) {
        if (i->getName() == name) {
            i->markAsTaken();
            cout << name << "Marked as taken.\n" << endl;
            return;
        }
    }
    cout << "Medication not found.\n" << endl;
}

void MedLogSystem::resetAll() {
    for (int i = 0; i < meds.size(); ++i) {
        meds[i]->resetForNewDay();
    }
    cout << "It's a new day." << endl;
}

void MedLogSystem::saveToFile(string filename) {
    ofstream outFile(filename);
    if (!outFile) {
        cerr << "Error opening file for writing: " << filename << endl;
        return;
    }
    outFile << meds.size() << endl; // Save the number of medications
    for (int i = 0; i < meds.size(); ++i) {
        outFile << meds[i]->getName() << endl;
        outFile << meds[i]->getDosage() << endl;
        outFile << meds[i]->getFrequencyPerDay() << endl;
        outFile << meds[i]->getTakenToday() << endl;
    }
    outFile.close();
    cout << "Medications saved to " << filename << endl;
}

void MedLogSystem::loadFromFile(string filename)  {
    ifstream in(filename);
    string type, name;
    bool taken;
    meds.clear();
    while (in >> type >> name >> taken) {
        Medication* med;
        if (type == "Pill")
        {
            med = new Pill(name, "300mg", 2);
        } 
        else if (type == "Injection") 
        {
            med = new Injection(name, "8ml", 1);
        }
        else 
        {
            med = new Medication(name, "Unknown", 1);
        }
        if (taken) 
        {
            med->markAsTaken();
        }
        meds.push_back(med);
    }
    in.close();
    cout << "Loaded from " << filename << endl;
}

// ASCII header for menu
void MedLogSystem::displayMenuHeader() const {
    cout << "===============================" << endl;
    cout << "  MedLog - Medication Tracker  " << endl;
    cout << "===============================\n" << endl;
}
