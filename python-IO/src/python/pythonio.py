import os

# Exercise - Reading a file
# ●	Write a python program that will read your JavaScript syntax program as input into your program
# ●	Determine the number of lines in the JavaScript program and display it to the user
# ●	Determine how many “else” statements are in the JavaScript program
# ●	How many characters(total) are in the JavaScript Program?
def readfile(dirpath, filename):

    path = os.path.join(dirpath, filename)
    # 'r' - This is the default mode. It Opens file for reading.
    # 'w' - This Mode Opens file for writing. If file does not exist,
    #       it creates a new file. If file exists it truncates the file.
    # 'x' - Creates a new file. If file already exists, the operation fails.
    # 'a' - Open file in append mode. 
    #       If file does not exist, it creates a new file.
    # 't' - This is the default mode. It opens in text mode.
    # 'b' - This opens in binary mode.
    # '+' - This will open a file for reading and writing (updating)
    with open(path, 'rb') as input:
        data = input.read()   
    return data

def writefile(dirpath, filename, content):
    
    path = os.path.join(dirpath, filename)
    # w+ - write and will create a file if it does not exist in library
    # a+ - plus sign indicates that it will create a new file if it does not exist
    with open(path, 'w+') as output:
        output.write(f"{content}\n")    

def analyzefile(dirpath, filename):

    filestr = readfile(dirpath, filename).decode("ascii")
    filelen = len(filestr)
        
    return filelen


# Exercise - Reading Directories
# ●	read all the files and their sizes from a directory
# ●	print a nice little report that tells us the number of files and the total size of the directory




# Exercise - Working with data
# For this exercise do not use Pandas or any other numerical library. 
# ●	Search for “Calgary Public Data”
# ●	You will find a link <Open Calgary>; select that link
# ●	Have a look at what data is available. Is there any data that may interest you?
# ●	Search for “Census by Community 2018” on the Calgary open data site
# ●	Download the data in “csv” format
# ●	write a python program that will:
# ○	only read the csv file once. Do not load the file into memory and then process it. The intent of this exercise is to pretend that the file is so massive it can only be read once and can not fit into memory.
# ○	use a dictionary to total “res_cnt” by “CLASS” and “SECTOR”. Do not use lists, or sort the file, or any other library. You do not know from execution to execution what the Class or Sector names will be. Write the code so there is only one loop through the data. 
# ○	Create a total line for each of the following independently:
# ■	CLASS
# ■	SECTOR
# ○	count the number of lines
# ○	print a nice little report at the end
# ○	as a stretch goal; can you do this with no “if” statement 
# ●	write the report to a file called report.txt.