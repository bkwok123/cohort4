# 1. Install virtual environment if not installed
# pip install pipenv
# 2. Switch to virtual environment
# pipenv shell
# 3. Install pytest if not installed
# pipenv install pytest
# 4. Run test
# pytest -v
#       - only works when test file start with test_ or end with _test
#         Report in verbose mode
# pytest -q
#       - Run in quiet mode (can be helpful when running hundreds or thousands of tests at once).
# pytest -s
#       - Don't capture console output (show print statements on the console).
# pytest --ignore
#       - Ignore the specified path when discovering tests.
# pytest --maxfail
#       - Stop after the specified number of failures.
# pytest "testname"
#       - specifies the module name to run only the tests in that module
# DirectoryName/
#       - runs any tests found in the specified directory
# -k "expression"
#       - matches tests found that match the evaluatable expression in the string.
#         The string values can include module, class and function names
#         (i.e. "TestClass and TestFunction").
# -m "expression"
#       - matches tests found that have a "pytest.mark" decorator that matches the
#       specified expression.
# 5. Deactivate virtual environment
# deactivate
# exit
import os
import pytest
from pytest import raises
from unittest.mock import MagicMock
from Checkout import Checkout

lineCnt = 0

@pytest.fixture()
def checkout():
    checkout = Checkout()
    checkout.addItemPrice("a", 1)
    checkout.addItemPrice("b", 2)
    return checkout

def test_canCalculateTotal(checkout):
    checkout.addItem("a")
    assert checkout.calculateTotal() == 1

def test_getCorrectTotalWithMultipleItems(checkout):
    checkout.addItem("a")
    checkout.addItem("b")
    assert checkout.calculateTotal() == 3

def test_canAddDiscountRule(checkout):
    checkout.addDiscount("a", 3, 2)

def test_canApplyDiscountRule(checkout):
    checkout.addDiscount("a", 3, 2)
    checkout.addItem("a")
    checkout.addItem("a")
    checkout.addItem("a")
    assert checkout.calculateTotal() == 2

def test_exceptionWithBadItem(checkout):
    with pytest.raises(Exception):
        checkout.addItem("c")

def test_verifyReadPricesFile(checkout, monkeypatch):
    mock_file = MagicMock()
    mock_file.__enter__.return_value.__iter__.return_value = ["c 3"]
    mock_open = MagicMock(return_value = mock_file)
    monkeypatch.setattr("builtins.open", mock_open)
    mock_exists = MagicMock(return_value=True)
    monkeypatch.setattr("os.path.exists", mock_exists)
    checkout.readPricesFile("testfile")
    checkout.addItem("c")
    result = checkout.calculateTotal()
    mock_open.assert_called_once_with("testfile")
    assert result == 3

def test_verifyReadFileException(checkout, monkeypatch):
    mock_file = MagicMock()
    mock_file.__enter__.return_value.__iter__.return_value = ["c 3"]
    mock_open = MagicMock(return_value=mock_file)
    monkeypatch.setattr("builtins.open", mock_open)
    mock_exists = MagicMock(return_value=False)
    monkeypatch.setattr("os.path.exists", mock_exists)
    with raises(Exception):
        checkout.readPricesFile("testfile")