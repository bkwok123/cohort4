# define attributes / variables
# number
# string
# boolean
# array
# dictionary / objects
# undefined
# sample if / else
# functions
# parameters
# returns
# arrays
# add to the front
# add to the end
# update values
# loops 
# for
# for/in
# while
# do while
# forEach (with array and function)
# Objects / Dictionaries
# declare object
# lookup key to retrieve value

###################################################
# String formatting in Python
###################################################
name = "Bob"
print(f"Hello, {name}")

name = "Rolf"
greeting = "Hello, {}"
with_name = greeting.format(name)
print(with_name)
longer_phrase = "Hello, {}. Today is {}."
formatted = longer_phrase.format("Rolf", "Monday")
print(formatted)

###################################################
#  Getting user input
###################################################
size_input = input("How big is your house (in square feet): ")
square_feet = int(size_input)
square_metres = square_feet / 10.8
print(f"{square_feet} square feet is {square_metres:.2f} square metres.")

###################################################
#  Lists, tuples, and sets
###################################################
l = ["Bob", "Rolf", "Anne"]
t = ("Bob", "Rolf", "Anne")
s = {"Bob", "Rolf", "Anne"}

print(l)
l.append("Smith")
print(l)
l.remove("Bob")
print(l)

print(s)
s.add("Smith")
print(s)
s.remove("Bob")
print(s)

###################################################
# Advanced set operations
###################################################
friends = {"Bob", "Rolf", "Anne"}
abroad = {"Bob", "Anne"}

local_friends = friends.difference(abroad)
print(local_friends)

local = {"Rolf"}
abroad = {"Bob", "Anne"}
friends = local.union(abroad)
print(friends)

art = {"Bob", "Jen", "Rolf", "Charlie"}
science = {"Bob", "Jen", "Adam", "Anne"}
both = art.intersection(science)
print(both)

###################################################
# If statements with the 'in' keyword
###################################################
number = 7
user_input = input("Enter 'y' if you would like to play: ").lower()

if user_input == "y":
    user_number = int(input("Guess our number: "))
    if user_number == number:
        print("You guessed correctly!")
    elif abs(number - user_number) in (1, -1):
        print("You were off by one.")
    else:
        print("Sorry, it's wrong!")

###################################################
# Loops in Python
###################################################
while True:
    user_input = input("Would you like to play? (Y/n) ")

    if user_input == "n":
        break

    user_number = int (input("Guess our number: "))
    if user_number == number:
        print("You guessed correctly!")
    elif abs(number - user_number) == 1:
        print("You were off by one.")
    else:
        print("Sorry, it's wrong!")

friends = ["Rolf", "Jen", "Bob", "Anne"]

for friend in friends:
    print(f"{friend} is my friend.")

for friend in range(4):
    print(f"{friend} is my friend.")

grades = [35, 67, 98, 100, 100]
total = sum(grades)
amount = len(grades)

print(total / amount)

###################################################
# List comprehensions in Python
###################################################
numbers = [1, 3, 5]
doubled = [x * 2 for x in numbers]

friends = ["Rolf", "Sam", "Samantha", "Saurabh", "Jen"]
start_s = [friend for friend in friends if friend.startswith("S")]
print(friends)
print(start_s)
print(friends is start_s)
print("friends: ", id(friends), "start_s: ", id(start_s))

###################################################
# Dictionaries
###################################################
friend_ages = {"Rolf": 24, "Adam": 30, "Anne": 27}
friend_ages["Rolf"] = 20
print(friend_ages)

friends = [
    {"name": "Rolf", "age": 24},
    {"name": "Adam", "age": 30},
    {"name": "Anne", "age": 27},
]
print(friends[1]["name"])

student_attendance = {"Rolf": 96, "Bob": 80, "Anne": 100}
for student, attendance in student_attendance.items():
    print(f"{student}: {attendance}")

if "Bob" in student_attendance:
    print(f"Bob: {student_attendance['Bob']}")
else:
    print("Bob is not a student in this class.")

attendance_values = student_attendance.values()
print(sum(attendance_values) / len (attendance_values))

###################################################
# Destructuring variables
###################################################
t = 5, 11
x, y = t

print(x, y)

people = [("Bob", 42, "Mechanic"), ("James", 24, "Artist"), ("Harry", 32, "Lecturer")]

for name, age, profession in people:
    print(f"Name: {name}, Age: {age}, Profession: {profession}")

for person in people:
    print(f"Name: {person[0]}, Age: {person[1]}, Profession: {person[2]}")

person = ("Bob", 42, "Mechanic")
name, _, profession = person
print(name, profession)

head, *tail = [1, 2, 3, 4, 5]
print(head)
print(tail)

*head, tail = [1, 2, 3, 4, 5]
print(head)
print(tail)

###################################################
# Function arguments and parameters
###################################################
def divide(dividend, divisor):
    if divisor != 0:
        print(dividend / divisor)
    else:
        print("You fool!")

divide(15, 0)
divide(dividend=15, divisor=0)
divide(15, divisor=0)

###################################################
# Default parameter values
###################################################
def add(x, y=8):
    print(x + y)

###################################################
# Functions returning values
###################################################
def divide2(dividend, divisor):
    if divisor != 0:
        return dividend / divisor
    else:
        return "You fool!"

###################################################
# Lambda functions in Python
###################################################
sequence = [1, 3, 5, 9]
doubled = [(lambda x: x*2)(x) for x in sequence]
doubled = list(map(lambda x: x*2, sequence))

###################################################
# Dictionary comprehensions
###################################################
users = [
    (0, "Bob", "password"),
    (1, "Rolf", "bob123"),
    (2, "Jose", "long4assword"),
    (3, "username", "1234"),
]

username_mapping = {user[1]: user for user in users}
print(username_mapping)

username_input = input("Enter your username: ")
password_input = input("Enter your password: ")

_, username, password = username_mapping[username_input]

if password_input == password:
    print("Your details are correct!")
else:
    print("Your details are incorrect.")

###################################################
# Unpacking arguments
###################################################
def multiply(*args):
    print(args)
    total = 1
    for arg in args:
        total = total * arg

    return total

print(multiply(1, 3, 5))

def apply(*args, operator):
    if operator == "*":
        return multiply(*args)       # *******NOTICE the * to unpack the tuple******
    elif operator == "+":
        return sum(args)
    else:
        return "No valid operator provided to apply()."

print(apply(1, 3, 6, 7, operator="*"))

###################################################
# Unpacking keyword arguments
###################################################
def named(name, age):
    print(name, age)

details = {"name": "Bob", "age": 25}

named(**details)

def named2(**kwargs):
    print(kwargs)

details = {"name": "Bob", "age": 25}

named2(**details)

def bothf(*args, **kwargs):
    print(args)
    print(kwargs)
bothf(1, 3, 5, name="Bob", age=25)

###################################################
# Object-Oriented Programming in Python
###################################################
class Student:
    def __init__(self, name, grades):
        self.name = name
        self.grades = grades
    
    def average_grade(self):
        return sum(self.grades) / len(self.grades)

student = Student("Bob", (100, 100, 93, 78, 90))
student2 = Student("Rolf", (90, 90, 93, 78, 90))

print(student.name)
print(student.average_grade())
print(student2.average_grade())

###################################################
# Magic methods: __str__ and __repr__
###################################################
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def __str__(self):
        return f"Person {self.name}, {self.age} years old"

    def __repr__(self):
        return f"Person {self.name}, {self.age}"

bob = Person("Bob", 35)
print(bob)

###################################################
# @classmethod and @staticmethod
###################################################
class ClassTest:    # Need an instance to call this method
    def instance_method(self):
        print(f"Called instance_method of {self}")

    @classmethod    # Don't need an instance to call this method
    def class_method(cls):
        print(f"Called class_method of {cls}")        

    @staticmethod   # Rarely used, only for organization purpose
    def static_method(cls):
        print(f"Called static method")        

ClassTest.class_method()

###################################################
# Class inheritance
###################################################
class Device:
    def __init__(self, name, connected_by):
        self.name = name
        self.connected_by = connected_by
        self.connected = True
    
    def __str__(self):
        return f"Device {self.name!r} ({self.connected_by})"    # !r calls __repr__ method of self.name
    
    def disconnect(self):
        self.connected = False
        print("Disconnected.")

class Printer(Device):                      # Inheritance in Python is rarely used, recommened using Composition instead
    def __init__(self, name, connected_by, capacity):
        super().__init__(name, connected_by)
        self.capacity = capacity
        self.remaining_pages = capacity
    
    def __str__(self):
        return f"{super().__str__()} ({self.remaining_pages} pages remaining)"

    def print(self, pages):
        if not self.connected:
            print("Your printer is not connected!")
            return
        print("Printing {pages} pages.")
        self.remaining_pages -= pages

printer = Printer("Printer", "USB", 500)
printer.print(20)

print(printer)

printer.disconnect()
printer.print(30)

###################################################
# Class composition
###################################################
class BookShelf:
    def __init__(self, *books):
        self.books = books
    
    def __str__(self):
        return f"BookShelf with {len(self.books)} books."

class Book:
    def __init__(self, name):
        self.name = name

    def __str__(self):
        return f"Book {self.name}"

book = Book("Harry Potter")
book2 = Book("Python 101")
shelf = BookShelf(book, book2)

print(shelf)

###################################################
# Type hinting in Python 3.5+
###################################################
def list_avg(sequence: list) -> float:      # Use list object as hinting is not recommended, use:
    return sum(sequence) / len(sequence)    #   from typing import List
                                            #   def list_avg(sequence: List) -> float:
                                            # Hinting does not produce error, only generate warnings.

class Booktype:
    TYPES = ("hardcover", "paperback")

    def __init__(self, name: str, book_type: str, weight: int):
        self.name = name
        self.book_type = book_type
        self.weight = weight
    
    def __repr__(self) -> str:
        return f"<Book {self.name}, {self.book_type}, weighing {self.weight}g>"
    
    @classmethod
    def hardcover(cls, name: str, page_weight: int) -> "Booktype":      # use "Booktype" if hinting self class, otherwise use ClassName (no "")
        return cls(name, cls.TYPES[0], page_weight + 100)

    @classmethod
    def paperback(cls, name: str, page_weight: int) -> "Booktype":
        return cls(name, cls.TYPES[1], page_weight)

###################################################
# Relative imports in Python
###################################################
# from .mymodule import divide
# from ..mylib import *
# Recommend always using absoulte import instead of relative import in Python        

###################################################
# Errors in Python
###################################################
def divide3(dividend, divisor):
    if divisor == 0:
        raise ZeroDivisionError("Divisor cannot be 0.")

    return dividend/divisor

grades = []

print("Welcome to the average grade program.")
try:
    average = divide3(sum(grades), len(grades))
except ZeroDivisionError:
    print("There are no grades yet in your list.")

print(f"The average grade is {average}.")

###################################################
# Custom error classes
###################################################
# raise TooManyPagesReadError("Custom Error message")
class TooManyPagesReadError(ValueError):
    pass

###################################################
# First-class functions
###################################################
def divide4(dividend, divisor):
    if divisor == 0:
        raise ZeroDivisionError("Divisor cannot be 0.")

    return dividend/divisor

def calculate(*values, operator):
    return operator(*values)

result = calculate(20, 4, operator=divide4)



def search(sequence, expected, finder):
    for elem in sequence:
        if finder(elem) == expected:
            return elem
    raise RuntimeError(f"Could not find an element with {expected}.")

friends = [
    {"name": "Rolf Smith", "age": 24},
    {"name": "Adam Wool", "age": 30},
    {"name": "Anne Pun", "age": 27},
]

def get_friend_name(friend):
    return friend["name"]

print(search(friends, "Bob Smith", get_friend_name))

###################################################
# Simple decorators in Python
###################################################

###################################################
# The 'at' syntax for decorators
###################################################

###################################################
# Decorating functions with parameters
###################################################

###################################################
# Decorators with parameters
###################################################

###################################################
# Mutable default parameters (and why they're a bad idea)
###################################################