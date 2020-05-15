import pytest
import os
from testfixtures import TempDirectory
from readdir import readdirectory

#################################################################
# Exercise - Reading Directories
#################################################################
# https://docs.pytest.org/en/latest/capture.html
# The capsys, capsysbinary, capfd, and capfdbinary fixtures allow 
# access to stdout/stderr output created during test execution.
def test_readdirectory(capsys):  # or use "capfd" for fd-level
    totalsize = 0
    with TempDirectory() as d:
        d.write('test1.txt', "test 1 to test different size","ascii")
        d.write('test2.txt', "test 2 to test again","ascii")
        d.write('test3.txt', "test 3 to test again and againg","ascii")
        readdirectory(d.path)        
        result = f"Number of files: {len(os.listdir(d.path))}\n"
        dirpath = os.path.join(d.path, 'test1.txt')
        size = os.stat(dirpath).st_size
        totalsize += os.stat(dirpath).st_size
        result += f"test1.txt with {size} bytes\n"
        dirpath = os.path.join(d.path, 'test2.txt')
        size = os.stat(dirpath).st_size
        totalsize += os.stat(dirpath).st_size        
        result += f"test2.txt with {size} bytes\n"
        dirpath = os.path.join(d.path, 'test3.txt')
        size = os.stat(dirpath).st_size
        totalsize += os.stat(dirpath).st_size        
        result += f"test3.txt with {size} bytes\n"
        result += f"{d.path} with {totalsize} bytes\n"        
    
    captured = capsys.readouterr()
    assert captured.out == result