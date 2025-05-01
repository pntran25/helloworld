#include "Pill.h"

Pill::Pill(string name, string dosage, int frequency_per_day) : Medication(name, dosage, frequency_per_day) {}

void Pill::display() const {
    cout << "[Pill] ";
    Medication::display();
}

string Pill::getType() const {
    return "Pill";
}
