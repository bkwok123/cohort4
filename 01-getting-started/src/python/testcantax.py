import pytest
from cantax import calculate_taxamt, calculate_taxrate

def setup_function(function):    
    if function == test_calculate_taxamt:
        print ("\ncalculate_taxamt function test begin")
    elif function == test_calculate_taxrate:
        print ("\ncalculate_taxrate function test begin")
    
def teardown_function(function):
    if function == test_calculate_taxamt:
        print ("\ncalculate_taxamt function test end")
    elif function == test_calculate_taxrate:
        print ("\ncalculate_taxrate function test begin")

def test_calculate_taxamt():  
    assert calculate_taxamt(48535) == 7280.25
    assert calculate_taxamt(97069) == 17229.47
    assert calculate_taxamt(150473) == 31115.04
    assert calculate_taxamt(214368) == 49644.55
    assert calculate_taxamt(300000) == 77903.56

def test_calculate_taxrate():
    assert calculate_taxrate(48535) == pytest.approx(0.15, rel=1e-4)
    assert calculate_taxrate(97069) == pytest.approx(0.1775, rel=1e-4)
    assert calculate_taxrate(150473) == pytest.approx(0.2068, rel=1e-4)
    assert calculate_taxrate(214368) == pytest.approx(0.2316, rel=1e-4)
    assert calculate_taxrate(300000) == pytest.approx(0.2597, rel=1e-4)