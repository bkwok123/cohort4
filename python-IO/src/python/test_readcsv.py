import pytest
import os
from pathlib import Path
from testfixtures import TempDirectory
from readcsv import readcsv
from readfile import readfile

#################################################################
# Exercise - Working with data
#################################################################
def test_readcsv(capsys):
    dirpath = Path("C:/code/cohort4/python-IO")
    filename = "Census_by_Community_2019.csv"
    hdr = "************************************************************\n"
    hdr += "**************  Calgary Public Data Summary  ***************\n"
    hdr += "************************************************************\n"
    content1 = "Residential and SOUTH:"
    content2 = "Industrial and NORTH:"
    content3 = "Overall Total: "
    content4 = "Total number of records: "
    ftr = "************************************************************\n"        
    ftr += "***************  End of Report Summary  ********************\n"
    ftr += "************************************************************\n"        
    
    result = readcsv(dirpath, filename)
    captured = capsys.readouterr()
    reportdata = readfile(dirpath, "report.txt")

    assert result == {"keyvaluepair": {"RES_CNT": 10, "CLASS": 1, "SECTOR": 5}, "linenum": 308}    
    assert hdr in captured.out
    assert ftr in captured.out
    assert content1 in captured.out
    assert content2 in captured.out
    assert content3 in captured.out
    assert content4 in captured.out
    assert os.path.isfile(os.path.join(dirpath, "report.txt")) == True
    assert content1 in reportdata
    assert content2 in reportdata
    assert content3 in reportdata
    assert content4 in reportdata    