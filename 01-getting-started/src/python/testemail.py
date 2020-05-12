# https://docs.pytest.org/en/latest/reference.html
import pytest
from simpleemail import email

def setup_function(function):
    if function == test_email:
        print ("\nEmail function test begin")
    
def teardown_function(function):
    if function == test_email:
        print ("\nEmail function test end")

def test_email():  
    assert email("larry", "shumlich") == "larry.shumlich@evolveu.ca"
    assert email("heiko", "peters") == "heiko.peters@evolveu.ca"