import pytest
from flask import json
from flask_testing import TestCase
import webserver

@pytest.fixture
def client():
    webserver.app.config['TESTING'] = True
    client = webserver.app.test_client()

    yield client

def test_dump(client):
    rv = client.get('/dump')
    assert(rv.status_code == 200)
    assert(b'Simple Dumping' in rv.data)    

# https://flask.palletsprojects.com/en/1.1.x/testing/#the-first-test
# https://pythonhosted.org/Flask-Testing/
# def test_template(client):
    
    
#     TestCase.render_templates = False
#     client.get('/template')
#     TestCase.assert_template_used('display.html')
    # assert(rv.status_code == 200)
    # TestCase.assert_template_used('display.html')
    # TestCase.assert_context("greeting", "hello")    
    # assert(b'Simple Dumping' in rv.data)     
# class TestTemplate(TestCase):
    
#     render_templates = False

#     def test_assert_mytemplate_used(self):
#         response = self.client.get("/template/")

#         self.assert_template_used('display.html') 