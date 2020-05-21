import pytest
import os
import datetime
from pathlib import Path
from openpyxl import load_workbook
from generateExInv import generateExInv, validateInvInput, loadWStoDictionary, validateCustomer

@pytest.fixture
def dirpath():
    return Path("C:/code/cohort4/python-Excel")
@pytest.fixture    
def outfilePrefix():
    return "Excel Invoice"
@pytest.fixture    
def infile():
    return "Python Excel Invoice.xlsx"

@pytest.fixture(params=[
        {"fields": ["customer_id", "first_name", "last_name", "phone", "address", "city", "province", "postal_code"],
         "wsname": "Customer"},
        {"fields": ["invoice_id", "customer_id", "invoice_date"],
         "wsname": "Invoice"},         
        {"fields": ["invoice_line_Item_id", "invoice_id", "product_id", "item_ref", "quantity"],
         "wsname": "Invoice Line Item"},                  
        {"fields": ["product_id", "name", "description", "unit_price"],
         "wsname": "Product"},                           
    ])

def setup(request):
    retVal = request.param
    # print("\nSetup! retVal = {}".format(retVal))
    return retVal

#################################################################
# Exercise - Populate the data
#################################################################    
def test_generateExInv(monkeypatch, dirpath, outfilePrefix):    

    outfile = outfilePrefix

    # https://docs.pytest.org/en/latest/reference.html?highlight=monkeypatch#_pytest.monkeypatch.MonkeyPatch.undo
    # https://docs.python.org/3/library/builtins.html
    with monkeypatch.context() as m:
        m.setattr('builtins.input', lambda x: 1)               
        i = input("Enter an invoice number for printing: ")
        create_status = generateExInv(dirpath,outfile,i)
        outfile = f"{outfile} {i}.xlsx"
        
    assert os.path.isfile(os.path.join(dirpath, outfile)) == True
    assert create_status == True

#################################################################
# Exercise - Validate the data
#################################################################
def test_validateInvInput(monkeypatch, capsys, dirpath, infile):

    filename = os.path.join(dirpath, infile)
    
    ws1_exist = False
    ws2_exist = False
    ws3_exist = False
    ws4_exist = False    

    input_exist = os.path.isfile(filename)
    if input_exist:
        wb = load_workbook(filename)
        if "Customer" in wb.sheetnames:
            ws1_exist = True
        if "Invoice" in wb.sheetnames:
            ws2_exist = True 
        if "Invoice Line Item" in wb.sheetnames:        
            ws3_exist = True
        if "Product" in wb.sheetnames:
            ws4_exist = True               

    valid_status = validateInvInput(dirpath, infile)
    missing_ws = ws1_exist & ws2_exist & ws3_exist & ws4_exist
    captured = capsys.readouterr()

    assert valid_status == input_exist & missing_ws
    if (missing_ws == False):
        assert "Missing worksheets: " in captured.out
        if (ws1_exist == False):
            assert "Customer" in captured.out
        if (ws2_exist == False):
            assert "Invoice" in captured.out    
        if (ws3_exist == False):
            assert "Invoice Line Item" in captured.out
        if (ws4_exist == False):
            assert "Product" in captured.out

def test_loadWStoDictionary(dirpath, infile, setup):
    
    filename = os.path.join(dirpath, infile)
    input_exist = os.path.isfile(filename)
    if input_exist:
        wb = load_workbook(filename) 
        ws = wb[setup["wsname"]]
        dictionary = loadWStoDictionary(ws, setup["fields"])
        print(dictionary)

        for field in setup["fields"]:
            assert field in dictionary.keys()


@pytest.mark.parametrize(
    "dictionary,expected",
    [({'customer_id': {1: 1, 2: 2, 3: 3}, 
       'first_name': {1: 'John', 2: 'Jane', 3: 'Noname'}, 
       'last_name': {1: 'Doe', 2: 'Smith', 3: None}, 
       'phone': {1: 4031234567, 2: 7081234567, 3: 9051234567}, 
       'address': {1: '123 Fake Street', 2: '456 Fake Avenue', 3: '456 Test Dr'}, 
       'city': {1: 'Calgary', 2: 'Edmonton', 3: 'Halifax'}, 
       'province': {1: 'AB', 2: 'AB', 3: 'NS'}, 
       'postal_code': {1: 'T1X1N1', 2: 'D1Z1X1', 3: 'A1B1C1'}},        
      {'customer_id': {}, 'first_name': {}, 'last_name': {3: 'Empty Value'}, 
       'phone': {}, 'address': {}, 'city': {}, 'province': {}, 'postal_code': {}, 
       'MissingField': {}}),

     ({'customer_id': {1: 1, 2: 2, 3: 3}, 
       'first_name': {1: 'John', 2: 'Jane', 3: 'Noname'}, 
       'last_name': {1: 'Doe', 2: 'Smith', 3: None}, 
       'phone': {1: 4031234567, 2: 7081234567, 3: 9051234567}, 
       'address': {1: '123 Fake Street', 2: '456 Fake Avenue', 3: '456 Test Dr'},  
       'province': {1: 'AB', 2: 'AB', 3: 'NS'}},
      {'customer_id': {}, 'first_name': {}, 'last_name': {3: 'Empty Value'}, 
       'phone': {}, 'address': {}, 'province': {}, 
       'MissingField': {'city': 'city', 'postal_code': 'postal_code'}}),
    # ({'invoice_id': {1: 1, 2: 2, 3: 3}, 
    #   'customer_id': {1: 1, 2: 2, 3: 1}, 
    #   'invoice_date': {1: datetime.datetime(2020, 4, 18, 0, 0), 
    #                    2: datetime.datetime(2020, 5, 19, 0, 0), 
    #                    3: datetime.datetime(2020, 5, 19, 0, 0)}},
    #   {})
       ],                  
)

def test_validateCustomer(dictionary,expected):                
    # dictionary = {'invoice_id': {1: 1, 2: 2, 3: 3}, 
    #               'customer_id': {1: 1, 2: 2, 3: 1}, 
    #               'invoice_date': {1: datetime.datetime(2020, 4, 18, 0, 0), 
    #                                2: datetime.datetime(2020, 5, 19, 0, 0), 
    #                                3: datetime.datetime(2020, 5, 19, 0, 0)}}

    # dictionary = {'invoice_line_Item_id': {1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6}, 
    #               'invoice_id': {1: 1, 2: 1, 3: 1, 4: 2, 5: 2, 6: 3}, 
    #               'product_id': {1: 1, 2: 2, 3: 3, 4: 2, 5: 3, 6: 2}, 
    #               'item_ref': {1: 'Item 1', 2: 'Item 2', 3: 'Item 3', 4: 'Item 1', 5: 'Item 2', 6: 'Item 1'}, 
    #               'quantity': {1: 3, 2: 1, 3: 1, 4: 3, 5: 2, 6: 4}}

    # dictionary = {'product_id': {1: 1, 2: 2, 3: 3}, 
    #               'name': {1: 'Pen', 2: 'Pencil', 3: 'Eraser'}, 
    #               'description': {1: 'Ball Pointed, Black Ink', 2: 
    #               'Mechanical, 0.3mm', 3: 'White'}, 
    #               'unit_price': {1: 3, 2: 5, 3: 2}}

    errDict = validateCustomer(dictionary)    
    print(errDict)
    assert errDict == expected
                              