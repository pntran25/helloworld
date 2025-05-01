#ifndef PILL_H
#define PILL_H

#include "Medication.h"

class Pill : public Medication {
public:
    Pill(string name, string dosage, int frequency_per_day);
    void display() const override;
    string getType() const override;
};

#endif
