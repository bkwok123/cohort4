import pytest
import os
from pathlib import Path
from openpyxl import load_workbook
from generateExInv import generateExInv, validateInvInput, loadWStoDictionary

# def pytest_namespace():
#     return {"dirpath": Path("C:/code/cohort4/python-Excel"), 
#             "outfilePrefix": "Excel Invoice",
#             "infile": "Python Excel Invoice.xlsx"}

@pytest.fixture
def dirpath():
    return Path("C:/code/cohort4/python-Excel")
@pytest.fixture    
def outfilePrefix():
    return "Excel Invoice"
@pytest.fixture    
def infile():
    return "Python Excel Invoice.xlsx"

#################################################################
# Exercise - Populate the data
#################################################################    
def test_generateExInv(monkeypatch, dirpath, outfilePrefix):    

    # dirpath = Path("C:/code/cohort4/python-Excel")        
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

def test_loadWStoDictionary(dirpath, infile):

    fields = ["customer_id", "first_name", "last_name", "phone", "address", "city", "province", "postal_code"]

    filename = os.path.join(dirpath, infile)
    input_exist = os.path.isfile(filename)
    if input_exist:
        wb = load_workbook(filename)
        ws = wb["Customer"]        
        dictionary = loadWStoDictionary(ws, fields)

        for field in fields:
            assert (field, 1) in dictionary.keys()

def test_validateCustomer():

    return                                    