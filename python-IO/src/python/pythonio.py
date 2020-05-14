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
    with open(path, 'r') as input:
        data = input.read()  

    return data

def writefile(dirpath, filename, content):
    
    path = os.path.join(dirpath, filename)
    # w+ - write and will create a file if it does not exist in library
    # a+ - plus sign indicates that it will create a new file if it does not exist
    with open(path, 'a+') as output:
        output.write(f"{content}\n")    

def countlines(dirpath, filename):

    path = os.path.join(dirpath, filename)
    # Without the 'rb' argument to open, this will work anywhere, 
    # but performance may suffer greatly on Windows or Macintosh platforms.
    count = 0
    with open(path, 'rb') as input:        
        for line in input:
            count += 1
    return count

# https://kite.com/python/answers/how-to-count-the-lines,-word,-and-characters-within-a-text-file-in-python
def countcontent(dirpath, filename):

    path = os.path.join(dirpath, filename)
    number_of_lines = 0
    number_of_words = 0
    number_of_characters = 0
    with open(path, 'rb') as input:        
        for line in input:
            line = line.decode("ascii").strip("\n")
            words = line.split()
            
            number_of_lines += 1
            number_of_words += len(words)
            number_of_characters += len(line)

    return {"line": number_of_lines, "word": number_of_words, "char": number_of_characters}

def countcodestmt(dirpath, filename, codekeyword, commentdictionary):

    path = os.path.join(dirpath, filename)
    number_of_lines = 0
    number_of_words = 0
    number_of_stmt = 0
    number_of_characters = 0
    wpos = 0
    lpos = -1
    scpos = -1
    mcowpos = -1
    mccwpos = -1
    with open(path, 'rb') as input:        
        for line in input:
            line = line.decode("ascii").strip("\n")
            words = line.split()

            for word in words:
                wpos += 1                 
                if word.startswith(commentdictionary["scomment"]):
                    # Track single line comment symbol position                    
                    lpos =  number_of_lines
                    scpos = wpos                 
                elif word.startswith(commentdictionary["mcommento"]):
                    mcowpos = wpos                    
                elif word.endswith(commentdictionary["mcommentc"]):
                    mccwpos = wpos         
                elif word==codekeyword:
                    if (mcowpos < 0):
                        # No mutiple line comment opening symbol
                        if (wpos < scpos):
                            # Before single line comment symbol position
                            number_of_stmt +=1
                        elif (lpos != number_of_lines):
                            # After single line comment symbol position but not on the same line
                            number_of_stmt +=1  
                    elif (mcowpos < mccwpos):
                        # Mutiple line comment closing symbol position is after opening symbol position
                        if (wpos > mccwpos):
                            # After mutiple line comment closing symbol position
                            if (wpos < scpos):
                                # Before single line comment symbol position
                                number_of_stmt +=1
                            elif (lpos != number_of_lines):
                                # After single line comment symbol position but not on the same line
                                number_of_stmt +=1                    

            number_of_lines += 1
            number_of_words += len(words)
            number_of_characters += len(line)

    return number_of_stmt

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