# udemy-courses: [functional-programming-in-7-days](https://www.udemy.com/course/functional-programming-in-7-days/learn/lecture/13111628#overview)

**Branch**: fp-python


# Section 1


## What is FP?

The FP paradigm is decomposition of problems in smaller chunks therefore focusing on what to do to solve the problem(i.e. how to decompose the problem) rather than how to do it(i.e The imperative approach, a detailed implementation of the solution)

Properties
- No loops
- Pure functions
- Immutable Data
- Functions as first class citizens

Advantages:
- Easier debugging
- Modular
- Parallel ready
- Reusability
- Smaller function

Disadvantages:
- IO become problematic as non pure cannot mix with pure functions
- Immutable Data can lead to memory waste

## Immutability and Mutability

First,
```
x = 123
```
means 
- a table is created in the backscene
  - id:       123456789 
  - type:     int
  - value:    123
  - variable: x
- a hash of the value is created
- a dictionary of variables is updated: hash is key, table is value


Second,
```
y = 123
```
means 
- a hash of the value is created
- that hash is already in the dict
- the table associated is updated
  - id:       123456789 
  - type:     int
  - value:    123
  - variable: x, y
  

Third,
```
y = 124
```
means 
- a hash of the value is created, since it is not in the dict
- the table associated is created
  - id:       123456788 
  - type:     int
  - value:    124
  - variable: y

The first table is udpated to
  - id:       123456789 
  - type:     int
  - value:    123
  - variable: x




```
1. Data Space

list of linkedlist of ITS items with same value

ITS: Identity, Type, State (Value)
id(), type()



2. on Retrieval

id = resolveVarToDataSpace(var)
return id if id else None



3. on State Mutation

if type is mutable:
  id->value = newValue
  return id
else
  id = resolveValToDataSpace(newValue)
  return id if id else createDataSpaceEntry(type, newValue)



4. resolveXXXToDataSpace probably uses some dictionary magic to resolve the input
```



## First Class Objects

Functions are first class objects in python and javascript.

Any ops that applies to first class data types will apply to functions:
- Function params
- Assignments
- Are Data Type
- Stored in Collection Data Types