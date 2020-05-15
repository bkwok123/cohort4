import os

#################################################################
# Exercise - Reading a file
#################################################################
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
    word_pos = 0
    line_pos = -1
    single_comment_pos = -1
    multi_comment_open_pos = -1
    multi_comment_close_pos = -1
    with open(path, 'rb') as input:        
        for line in input:
            line = line.decode("ascii").strip("\n")
            words = line.split()

            for word in words:
                word_pos += 1                 
                if word.startswith(commentdictionary["scomment"]):
                    # Track single line comment symbol position                    
                    line_pos =  number_of_lines
                    single_comment_pos = word_pos                 
                elif word.startswith(commentdictionary["mcommento"]):
                    multi_comment_open_pos = word_pos                    
                elif word.endswith(commentdictionary["mcommentc"]):
                    multi_comment_close_pos = word_pos         
                elif word==codekeyword:
                    if (multi_comment_open_pos < 0):
                        # No mutiple line comment opening symbol
                        if (word_pos < single_comment_pos):
                            # Before single line comment symbol position
                            number_of_stmt +=1
                        elif (line_pos != number_of_lines):
                            # After single line comment symbol position but not on the same line
                            number_of_stmt +=1  
                    elif (multi_comment_open_pos < multi_comment_close_pos):
                        # Mutiple line comment closing symbol position is after opening symbol position
                        if (word_pos > multi_comment_close_pos):
                            # After mutiple line comment closing symbol position
                            if (word_pos < single_comment_pos):
                                # Before single line comment symbol position
                                number_of_stmt +=1
                            elif (line_pos != number_of_lines):
                                # After single line comment symbol position but not on the same line
                                number_of_stmt +=1                    

            number_of_lines += 1
            number_of_words += len(words)
            number_of_characters += len(line)

    return number_of_stmt