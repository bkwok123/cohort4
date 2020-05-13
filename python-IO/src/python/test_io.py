import pytest
from testfixtures import TempDirectory
from pythonio import readfile, analyzefile, writefile

# https://testfixtures.readthedocs.io/en/latest/files.html
# https://docs.python.org/3/reference/lexical_analysis.html#string-and-bytes-literals
@pytest.fixture(params=[
    {"content": b'Test File Content', "len": 17, "fname": r"C:\code\cohort4\python-IO\pout1.txt"},
    {"content": b'Test 2 Write Content', "len": 20, "fname": r"C:\code\cohort4\python-IO\pout1.txt"},    
    ])

def setup(request):
    retVal = request.param
    print("\nSetup! retVal = {}".format(retVal))
    return retVal

def test_readfile(setup):
    with TempDirectory() as d:
        d.write('test.txt', setup["content"])
        filecontent = readfile(d.path, 'test.txt')              
    assert filecontent == setup["content"]

def test_writefile(setup):
    with TempDirectory() as d:
        print("d.path: ", d.path)        
        writefile(d.path, 'test.txt', setup["content"].decode("ascii"))              
        filecontent = d.read('test.txt')        
    assert filecontent == setup["content"] + b"\r\n"

def test_analyzefile(setup):
    with TempDirectory() as d:
        d.write('test.txt', setup["content"])
        filelen = analyzefile(d.path, 'test.txt')
    assert filelen == setup["len"]