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

# String formatting in Python
name = "Bob"
print(f"Hello, {name}")

name = "Rolf"
greeting = "Hello, {}"
with_name = greeting.format(name)
print(with_name)
longer_phrase = "Hello, {}. Today is {}."
formatted = longer_phrase.format("Rolf", "Monday")
print(formatted)

#  Getting user input
size_input = input("How big is your house (in square feet): ")
square_feet = int(size_input)
square_metres = square_feet / 10.8
print(f"{square_feet} square feet is {square_metres:.2f} square metres.")

#  Lists, tuples, and sets
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

# Advanced set operations
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

# If statements with the 'in' keyword
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

# Loops in Python
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

# List comprehensions in Python
numbers = [1, 3, 5]
doubled = [x * 2 for x in numbers]

friends = ["Rolf", "Sam", "Samantha", "Saurabh", "Jen"]
start_s = [friend for friend in friends if friend.startswith("S")]
print(friends)
print(start_s)
print(friends is start_s)
print("friends: ", id(friends), "start_s: ", id(start_s))

# Dictionaries
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

# Destructuring variables
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

# Function arguments and parameters
def divide(dividend, divisor):
    if divisor != 0:
        print(dividend / divisor)
    else:
        print("You fool!")

divide(15, 0)
divide(dividend=15, divisor=0)
divide(15, divisor=0)

# Default parameter values
def add(x, y=8):
    print(x + y)

# Functions returning values
def divide2(dividend, divisor):
    if divisor != 0:
        return dividend / divisor
    else:
        return "You fool!"

# Lambda functions in Python
sequence = [1, 3, 5, 9]
doubled = [(lambda x: x*2)(x) for x in sequence]
doubled = list(map(lambda x: x*2, sequence))

# Dictionary comprehensions
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

# username_mapping
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