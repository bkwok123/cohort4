import pytest
from testfixtures import TempDirectory
from pythonio import readfile

# https://testfixtures.readthedocs.io/en/latest/files.html
# https://docs.python.org/3/reference/lexical_analysis.html#string-and-bytes-literals
def test_readfile():
    with TempDirectory() as d:
        d.write('test.txt', b'Test File Content')
        filecontent = readfile(d.path, 'test.txt')
        d.read('test.txt')
    assert filecontent == b'Test File Content'