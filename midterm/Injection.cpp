#include "Injection.h"

Injection::Injection(string name, string dosage, int frequency_per_day) : Medication(name, dosage, frequency_per_day) {}

void Injection::display() const {
    cout << "[Injection] ";
    Medication::display();
}

string Injection::getType() const {
    return "Injection";
}