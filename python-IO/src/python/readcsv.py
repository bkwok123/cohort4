#################################################################
# Exercise - Working with data
#################################################################
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
def readcsv(dirpath, filename):
    
    # https://stackabuse.com/reading-files-with-python/
    # https://docs.python.org/2/library/functions.html#open
    path = f"{dirpath}/{filename}"

    linenum = 1
    coltitle = {}
    colKeyValue = {"CLASS": 0, "SECTOR": 0, "RES_CNT": 0}
    bufferKeyValue = {}
    resultKeyValue = {}

    with open(path, 'r') as file:

        # Mark the column index for each column        
        line = file.readline()  
        line = line.strip("\n")      
        words = line.split(",")
        col = 1                                
        for word in words:                    
            coltitle[word] = col
            col += 1                                
        colKeyValue["CLASS"] = coltitle["CLASS"]
        colKeyValue["SECTOR"] = coltitle["SECTOR"]
        colKeyValue["RES_CNT"] = coltitle["RES_CNT"]        
        linenum +=1
        
        for line in file:            
            line = line.strip("\n")
            col = 1            

            # Process the second line and beyond            
            words = line.split(",")                                
            for word in words:
                bufferKeyValue[col] = word             
                col += 1  
            
            key1 = bufferKeyValue[colKeyValue["CLASS"]]
            key2 = bufferKeyValue[colKeyValue["SECTOR"]]
            value1 = bufferKeyValue[colKeyValue["RES_CNT"]]
            
            try:
                temp = resultKeyValue[(key1, key2)]
            except KeyError:
                temp = 0

            resultKeyValue[(key1, key2)] = int(value1) + int(temp)            

            linenum +=1        
    
    content = "************************************************************\n"
    content += "**************  Calgary Public Data Summary  ***************\n"
    content += "************************************************************\n"
    for key, value in resultKeyValue.items():
        (key1, key2) = key
        content += f"{key1} and {key2}: {value}\n"
    content += "\n************************************************************\n"
    content += f"Overall Total: {sum(resultKeyValue.values())}\n"        
    content += f"Total number of records: {linenum - 1}\n"
    content += "************************************************************\n"        
    content += "***************  End of Report Summary  ********************\n"
    content += "************************************************************\n"
    print(content)
    
    path = f"{dirpath}/report.txt"
    with open(path, 'w') as output:
        output.write(f"{content}\n") 

    return {"keyvaluepair": colKeyValue, "linenum": linenum}