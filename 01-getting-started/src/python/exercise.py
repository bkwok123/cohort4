################################################################
# Coding Exercise 1: Variables
################################################################
# Create two variables, var1 and var2, both with the same value.
var1 = "hi"
var2 = "hi"

# Create two variables, num1 and num2, which multiply together to give 16.
num1 = 4
num2 = 4


################################################################
# Coding Exercise 2: Lists, tuples, and sets
################################################################
# Create a list, called my_list, with three numbers. The total of the numbers added together should be 100.
my_list = [100, 0, 0]

# Create a tuple, called my_tuple, with a single value in it
my_tuple = 15,

# Modify set2 so that set1.intersection(set2) returns {5, 77, 9, 12}
set1 = {14, 5, 9, 31, 12, 77, 67, 8}
set2 = {5, 77, 9, 12}


################################################################
# Coding Exercise 3: Flow control—loops and ifs
################################################################
# This coding exercise has two steps.
# 1. Modify the code so that the evens list contains only the even numbers of the numbers list. 
#    You do not need to print anything.
# 2. For part 2, add a clause to the if statement such that if the user's input is "q", 
#    your program prints "Quit".
# Remember that for these coding exercises, Python will care about uppercase and lowercase letters, so make sure to use the right ones!

# -- Part 1 --
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]

evens = []
for number in numbers:
    if number % 2 == 0:
        evens.append(number)

# -- Part 2, must be completed before submitting! --
user_input = input("Enter your choice: ")
if user_input == "a":
    print("Add")
elif user_input == "q":
    print("Quit")


################################################################
# Coding Exercise 4: Functions
################################################################
# Functions
# Complete the function return_42 , by making it return 42 .
# Create a function, which must be called my_function , which takes two arguments 
# and returns the result of its two arguments multiplied together.
# Complete the function by making sure it returns 42. .
def return_42():    
    # Complete function here
    # 'pass' just means "do nothing". Make sure to delete this!
    return 42

# Create a function below, called my_function, that takes two arguments and returns 
# the result of its two arguments multiplied together.
def my_function(arg1, arg2):
    return arg1 * arg2


################################################################
# Coding Exercise 5: Dictionaries and students
################################################################
# This coding exercise has three parts. See them outlined in detail in the coding exercise, 
# as comments.
# Create a dictionary variable, called student .
# Modify a variable, grades , so it contains the value of a dictionary's key.
# Implement a function calculating a total average grade for a class of students.

# Create a variable called student, with a dictionary.
# The dictionary must contain three keys: 'name', 'school', and 'grades'.
# The values for each must be 'Jose', 'Computing', and a tuple with the values 66, 77, and 88.
student = {"name": "Jose", "school": "Computing", "grades": (66, 77, 88)}

# Assume the argument, data, is a dictionary.
# Modify the grades variable so it accesses the 'grades' key of the data dictionary.
def average_grade(data):
    grades = data["grades"]
    return sum(grades) / len(grades)


# Implement the function below
# Given a list of students (a list of dictionaries), calculate the average grade received on an exam, for the entire class
# You must add all the grades of all the students together
# You must also count how many grades there are in total in the entire list
def average_grade_all_students(student_list):
    total = 0
    count = 0
    for student in student_list:
        total = total + sum(student["grades"])
        count = count + len(student["grades"])

    return total / count


################################################################
# Coding Exercise 6: Classes and objects
################################################################
# This coding exercise requires you to complete an implementation of three methods of a class:
# The __init__  method, which should take an argument, name . It should initialise self.name
# to be the argument, and self.items  to be an empty list.
# The add_item  method, which should append a dictionary representing an item to the store's items  property. The dictionary should have keys name  and price .
# The stock_price  method, which should add up each item price inside self.items
# to come up with a total, and return that.
# Good luck!
class Stores:
    def __init__(self, name):
        # You'll need 'name' as an argument to this method.
        # Then, initialise 'self.name' to be the argument, and 'self.items' to be an empty list.
        self.name=name
        self.items=[]
    
    def add_item(self, name, price):
        # Create a dictionary with keys name and price, and append that to self.items.
        item={"name": name, "price": price}
        self.items.append(item)

    def stock_price(self):
        # Add together all item prices in self.items and return the total.
        return sum([item["price"] for item in self.items])


################################################################
# Coding Exercise 7: @classmethod and @staticmethod
################################################################
# This coding exercise requires you to complete two method implementations.
# The franchise  method, which takes in a store as argument. It should return a new Store
# object, with a name equal to the argument + " - franchise" .
# The store_details  method, which also takes in a store as argument. It should return a 
# string representing the argument.
# A few examples:
# store = Store("Test")
# store2 = Store("Amazon")
# store2.add_item("Keyboard", 160)
 
# Store.franchise(store)  # returns a Store with name "Test - franchise"
# Store.franchise(store2)  # returns a Store with name "Amazon - franchise"
 
# Store.store_details(store)  # returns "Test, total stock price: 0"
# Store.store_details(store2)  # returns "Amazon, total stock price: 160"
# When completing the store_details  method, you may need to convert the output of 
# store.stock_price  to an integer. You can do this like so: int(store.stock_price).
# Good luck!

class Store:
    def __init__(self, name):
        self.name = name
        self.items = []

    def add_item(self, name, price):
        self.items.append({
            'name': name,
            'price': price
        })

    def stock_price(self):
        total = 0
        for item in self.items:
            total += item['price']
        return total

    @classmethod
    def franchise(cls, store):
        # Return another store, with the same name as the argument's name, plus " - franchise"
        return cls(store.name + " - franchise")        

    @staticmethod
    def store_details(store):
        # Return a string representing the argument
        # It should be in the format 'NAME, total stock price: TOTAL'
        return "{}, total stock price {}".format(store.name, int(store.stock_price()))
