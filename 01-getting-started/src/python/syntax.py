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