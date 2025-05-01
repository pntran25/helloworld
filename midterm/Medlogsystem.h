#ifndef MEDLOGSYSTEM_H_
#define MEDLOGSYSTEM_H_

#include "Medication.h"
#include "Pill.h"
#include "Injection.h"
#include <vector>
#include <string>
#include <iostream>
#include <fstream>
using namespace std;

class MedLogSystem {
    public:
        ~MedLogSystem();
        MedLogSystem();
        void addMedication();
        void displayAll();
        void markDose();
        void resetAll();
        void saveToFile(string filename); // save medications to a file
        void loadFromFile(string filename); // load medications from a file
        void displayMenuHeader() const;

    private:
        vector<Medication*> meds; // list of medications
};

#endif