import pytest
from pathlib import Path
from testfixtures import TempDirectory
from pythonio import readfile, writefile, countlines, countcontent, countcodestmt

# https://testfixtures.readthedocs.io/en/latest/files.html
# https://docs.python.org/3/reference/lexical_analysis.html#string-and-bytes-literals

# Exercise - Reading a file
@pytest.fixture(params=[
        {"content": 'Test File Content\n123\n456', 
        "len": 23, "line": 3, "word": 5, 
        "stmt": "else", "comment": {"scomment": "//", "mcommento": "/*", "mcommentc": "*/"}, "stmtcount": 0},
        {"content": 'Test 2 Write Content\nabc\ndef\nxyz', 
        "len": 29, "line": 4, "word": 7, 
        "stmt": "else", "comment": {"scomment": "//", "mcommento": "/*", "mcommentc": "*/"}, "stmtcount": 0},
        {"content": 'Test 3 else Content\n else // else abc\n /* else */ else def\nxyz', 
        "len": 59, "line": 4, "word": 14, 
        "stmt": "else", "comment": {"scomment": "//", "mcommento": "/*", "mcommentc": "*/"}, "stmtcount": 3},        
    ])

def setup(request):
    retVal = request.param
    print("\nSetup! retVal = {}".format(retVal))
    return retVal

def test_readfile(setup):
    with TempDirectory() as d:
        d.write('test.txt', setup["content"],"ascii")
        filecontent = readfile(d.path, 'test.txt')              
    assert filecontent == setup["content"]

def test_writefile(setup):
    with TempDirectory() as d:      
        writefile(d.path, 'test.txt', setup["content"])              
        filecontent = d.read('test.txt',"ascii")       
    assert filecontent.replace("\r","") == setup["content"] + "\n"

def test_countlines(setup):
    with TempDirectory() as d:
        d.write('test.txt', setup["content"],"ascii")
        lines = countlines(d.path, 'test.txt')        
    assert lines == setup["line"]

def test_countcontent(setup):
    with TempDirectory() as d:
        d.write('test.txt', setup["content"],"ascii")
        filecontent = countcontent(d.path, 'test.txt')        
    assert filecontent["line"] == setup["line"]    
    assert filecontent["word"] == setup["word"]    
    assert filecontent["char"] == setup["len"]    

def test_countcodestmt(setup):
    with TempDirectory() as d:
        d.write('test.txt', setup["content"],"ascii")
        stmtcount = countcodestmt(d.path, 'test.txt', setup["stmt"], setup["comment"])
    assert stmtcount == setup["stmtcount"]
    # stmt = countcodestmt(Path("C:/code/cohort4/01-getting-started/src/scripts/"), "syntax.js", "else", {"scomment": "//", "mcommento": "/*", "mcommentc": "*/"})    
    # assert stmt == 0


# https://docs.pytest.org/en/latest/capture.html

# Exercise - Reading Directories
def test_myoutput(capsys):  # or use "capfd" for fd-level
    print("hello")
    captured = capsys.readouterr()
    assert captured.out == "hello\n"