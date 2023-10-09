# Banker's Algorithm and request allocation algorithm written in JS

## Requirements
- Nodejs installed

## How to run
    $ node banker.js <filename.txt>

### Input File formatting
    5 #number of processes

    4 # types of process


    #Allocation Matrix
    0 0 1 2
    1 0 0 0
    1 3 5 4
    0 6 3 2
    0 0 1 4

    #Max matrix
    0 0 1 2
    1 7 5 0
    2 3 5 6
    0 6 5 2
    0 6 5 6

    #Available Vector
    1 5 2 0

    #Process Id: Request Vector
    1:0 4 2 0

### Output format
    There are 5 processes in the system


    There are 4 resource types.


    The Allocation Matrix is...
    A B C D 
    0: 0 0 1 2 
    1: 1 0 0 0 
    2: 1 3 5 4 
    3: 0 6 3 2 
    4: 0 0 1 4 

    The Max Matrix is...
    A B C D 
    0: 0 0 1 2 
    1: 1 7 5 0 
    2: 2 3 5 6 
    3: 0 6 5 2 
    4: 0 6 5 6 

    The Need Matrix is...
    A B C D 
    0: 0 0 0 0 
    1: 0 7 5 0 
    2: 1 0 0 2 
    3: 0 0 2 0 
    4: 0 6 4 2 

    The Available vector is...
    A B C D  
    1 5 2 0

    THE SYSTEM IS IN SAFE STATE

    The request vector is:
    A B C D 
    1: 0 4 2 0

    THE REQUEST CAN BE GRANTED!

    The available vector is 
    A B C D 
    1 1 0 0

## Logic
1. Prints everything after calculating need matrix
2. Calculate if the system is in safe state
3. Calculate if the request can be allocated
   - If the request<sub>i</sub> is less than need<sub>i</sub> and available vector, and the system will be in safe state, request can be allocated
   - If any criteria fails, request cannot be allocated

## Tests availabe
    safe.txt
    deadlock.txt

### Submitted by
> Gaurab Sapkota
