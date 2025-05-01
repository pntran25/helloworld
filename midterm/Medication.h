#ifndef MEDICATION_H_
#define MEDICATION_H_

#include <iostream>
#include <vector>

using namespace std;

class Medication { //abstract class
public:
    Medication(string _name, string _dosage, int _frequency_per_day);
    virtual void markAsTaken();
    virtual void resetForNewDay(); //make sure these virtual functions can be accessed by other classes
    virtual void display() const; 
    virtual string getType() const; //later overwritten by the type of medication
    
    virtual ~Medication() {} // virtual destructor for proper cleanup
    Medication() {} //copy constructor for User

    // setters and getters
    string getName() {return name;} const
    string getDosage() {return dosage;} const
    int getFrequencyPerDay() {return frequency_per_day;} const
    bool getTakenToday() {return taken_today;} const

    void setName(string _name) {name = _name;} ;

protected:
    string name;
    string dosage;
    int frequency_per_day;
    bool taken_today;

};

#endif