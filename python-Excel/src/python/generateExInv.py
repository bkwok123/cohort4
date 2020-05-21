from openpyxl import Workbook, load_workbook
import os
# Design the spreadsheet so that you can create invoices from the data. 
# There will be 4 worksheets in this design. Design the data so it is “Normalized”. 
# (If you have not seen Larry’s lecture on SQL, ask him). The sheets should be:

# ●	customers (one row for each customer)
# ●	invoices (one row for each invoice)
# ●	invoice line items (one row for each product on the invoice)
# ●	product (one item for each product that you sell)

# Create a python program that will relate the data in the 4 tables and create an invoice. 
# The invoice does not need to be fancy. Just start with minimal sample data at first.

# Development Requirements

# ●	load the data from the worksheet into memory
# ●	use dictionaries to store the customers, invoices, line items, and products
# ●	have your program ask the user for the invoice to print
# ●	as always use the TDD approach

# The design should allow for (but do not code or develop reports as follows:

# ●	total invoiced amount to each client
# ●	the invoiced amount each day
# ●	invoices by client

# Only develop the code to create an Invoice given an existing invoice ID. 
# Use the KISS approach. No PANDAS. Hard code or enter an invoice to be generated. 
# Your output can be in the easiest format for you.


# Exercise - Populate the data

# Using the same design and template worksheet as the other students / groups, 
# add more sample data that will represent one month of data. Each group takes a different month. 
# There should be:
# ●	10 - 15 clients (use 5ish clients that are the same as another group)
# ●	3 - 4 invoices per client
# ●	1 - 5 items per invoice
# ●	about $15,000 of invoices per month
def generateExInv(dirpath, outfilePrefix, invoice):

    create_status = False
    wb = Workbook()

    try:
        path = os.path.join(dirpath, f"{outfilePrefix} {invoice}.xlsx")
        wb.save(path)
        create_status = True
    except: # catch *all* exceptions
        pass

    return create_status

# Exercise - Validate and Merge the data

# Validation
# Write python code and use the OpenPyXL package to validate that your input worksheet data is in 
# the right format and reasonable for your system. Validate all the other group’s data as well.  
# Larry will come and modify your input spreadsheet to try and break your system.  
# Your validation code should catch these problems.

# Think about how to validate your inputs from ANY source, i.e. Excel sheets, tables, etc.  
# You may not always be loading data from this spreadsheet.  Try to build your validation code 
# to handle ANY input format.
def validateInvInput(dirpath, filename):

    valid_status = False
    ws1_exist = False
    ws2_exist = False
    ws3_exist = False
    ws4_exist = False    
    missingSheets = []

    try:
        path = os.path.join(dirpath, filename)
        wb = load_workbook(path)

        if "Customer" in wb.sheetnames:
            ws1_exist = True
        else:
            missingSheets.append("Customer")            
        if "Invoice" in wb.sheetnames:
            ws2_exist = True
        else:
            missingSheets.append("Invoice")               
        if "Invoice Line Item" in wb.sheetnames:
            ws3_exist = True
        else:
            missingSheets.append("Invoice Line Item")             
        if "Product" in wb.sheetnames:
            ws4_exist = True
        else:
            missingSheets.append("Product")  

        valid_status = ws1_exist & ws2_exist & ws3_exist & ws4_exist

        if(valid_status == False):
            for wsname in missingSheets:
                msg = f"{wsname} ,"
            msg = msg.strip(" ,")
            print(f"Missing worksheets: {msg}")            

    except: # catch *all* exceptions
        pass
    
    return valid_status

# Load worksheet into a nested dictionary
# Key: title
# Value: = rows_dictionary (Key1: Row Number, Value1: cell value)
def loadWStoDictionary(ws, fields):
    titleIndex = {}
    dictionary = {}
    buffer_dict = {}
    nested_dict = {}   

    # Map the title index
    for field in fields:        
        col_index = 1
        for col in ws[1]:
            if col.value == field:                
                titleIndex[col_index] = field
            col_index += 1

    # Load the data into dictionary
    row_index = 1    
    for row in ws.values:
        col_index = 1
        for value in row:            
            if((col_index in titleIndex.keys()) & (row_index!=1)):
                key1 = titleIndex[col_index]                
                key2 = row_index - 1 
                dictionary[key1, key2] = value
            col_index += 1

        row_index += 1

    # Convert the dictionary into nested dictionary
    for title in titleIndex.values():
        buffer_dict = {}
        for key, value in dictionary.items():
            (key1, key2) = key
            if (title == key1):                
                buffer_dict[key2] = value
        nested_dict[title] = buffer_dict    
    
    return nested_dict

def validateCustomer(dictionary):
    fields = ["customer_id", "first_name", "last_name", "phone", "address", "city", "province", "postal_code"]    
    missingField = {}
    errDict = {}

    # Check all the fields exists in the dictionary and no empty field
    i = 1
    for field in fields:
        if not(field in dictionary.keys()):
            missingField[field] = field        
        else:
            # Ensure no empty field
            for key, rows in dictionary.items():
                if (key == field):
                    errRow = {}                    
                    for row, value in rows.items():
                        if (value == None):
                            errRow[row] = "Empty Value"                       

                    errDict[field] = errRow                                   
        i+=1
    
    errDict["MissingField"] = missingField    
        
    return errDict

def checkEmpty(value):
    if (value == None):
        return "Empty Value"
    else:
        return ""

def checkType(value, expected_type):
    if (type(value) is expected_type):
        return ""
    else:
        print (f"Incorrect Data Type, Expected: {expected_type}, Received: {type(value)}")
        return f"Incorrect Data Type, Expected: {expected_type}, Received: {type(value)}"

def checkPostalCode(value):
    postalcode = value.replace(" ", "")
    errMsg = ""

    if not (len(postalcode) == 6):
        errMsg = "Incorrect Postal Format"
    else:
        if not (postalcode[0].isalpha()):
            errMsg = "Incorrect Postal Format"
        elif not (postalcode[1].isdigit()):
            errMsg = "Incorrect Postal Format"
        elif not (postalcode[2].isalpha()):
            errMsg = "Incorrect Postal Format"
        elif not (postalcode[3].isdigit()):
            errMsg = "Incorrect Postal Format"
        elif not (postalcode[4].isalpha()):
            errMsg = "Incorrect Postal Format"
        elif not (postalcode[5].isdigit()):
            errMsg = "Incorrect Postal Format"                                

    return errMsg       

def checkPhone(value):
    errMsg = ""
    phone = value.replace(" ", "")
    phone = phone.replace("-", "")
    phone = phone.replace("(", "")
    phone = phone.replace(")", "")
    if not (phone.isdigit()):
        errMsg = "Incorrect Phone Format"
    elif not (len(phone) == 10):
        errMsg = "Incorrect Phone Format"

    print(errMsg)

    return errMsg

def validateInv(dictionary):
    fields = ["invoice_id", "customer_id", "invoice_date"]

    return

def validateInvItem(dictionary):
    fields = ["invoice_line_Item_id", "invoice_id", "product_id", "item_ref", "quantity"]

    return

def validateProduct(dictionary):
    fields = ["product_id", "name", "description", "unit_price"]

    return


# Merge
# Write python code to merge all the other groups’ data into a single well-formatted workbook 
# that matches your existing data model. If you are the first group, create a second one and merge it.  
# Validate the new workbook and create some invoices.
