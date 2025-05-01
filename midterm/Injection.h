#ifndef INJECTION_H
#define INJECTION_H

#include "Medication.h"

class Injection : public Medication {
public:
    Injection(string name, string dosage, int frequency_per_day);
    void display() const override;
    string getType() const override;
};

#endif