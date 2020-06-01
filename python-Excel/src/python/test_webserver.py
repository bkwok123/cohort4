import pytest
from flask import json
import os
from pathlib import Path
import webserver
import generateExInv
import datetime

@pytest.fixture
def client():
    webserver.app.config['TESTING'] = True
    client = webserver.app.test_client()

    yield client

@pytest.fixture
def wb_test_data():

    wbdata = {'WB': 
                {'Customer': 
                    {1: {'customer_id': 1, 'first_name': 'John', 'last_name': 'Doe', 'phone': 4031234567, 'address': '123 Fake Street', 'city': 'Calgary', 'province': 'AB', 'postal_code': 'T1X1N1'}, 
                     2: {'customer_id': 2, 'first_name': 'Jane', 'last_name': 'Smith', 'phone': 7081234567, 'address': '456 Fake Avenue', 'city': 'Edmonton', 'province': 'AB', 'postal_code': 'D1Z1X1'}, 
                     3: {'customer_id': 3, 'first_name': 'Noname', 'last_name': 'OK', 'phone': 7081234567, 'address': '456 Fake Avenue', 'city': 'Edmonton', 'province': 'AB', 'postal_code': 'D1Z1X1'}, 
                     4: {'customer_id': 4, 'first_name': 'John', 'last_name': 'Doe2', 'phone': 4031234567, 'address': '123 Fake Street', 'city': 'Calgary', 'province': 'AB', 'postal_code': 'T1X1N1'}, 
                     5: {'customer_id': 5, 'first_name': 'Jane', 'last_name': 'Smith2', 'phone': 7081234567, 'address': '456 Fake Avenue', 'city': 'Edmonton', 'province': 'AB', 'postal_code': 'D1Z1X1'}}, 
                 'Invoice': 
                    {1: {'invoice_id': 1, 'customer_id': 1, 'invoice_date': datetime.datetime(2020, 4, 18, 0, 0)}, 
                     2: {'invoice_id': 2, 'customer_id': 2, 'invoice_date': datetime.datetime(2020, 5, 19, 0, 0)}, 
                     3: {'invoice_id': 3, 'customer_id': 1, 'invoice_date': datetime.datetime(2020, 5, 19, 0, 0)}, 
                     4: {'invoice_id': 4, 'customer_id': 1, 'invoice_date': datetime.datetime(2020, 4, 18, 0, 0)},
                     5: {'invoice_id': 5, 'customer_id': 4, 'invoice_date': datetime.datetime(2021, 5, 19, 0, 0)}, 
                     6: {'invoice_id': 6, 'customer_id': 5, 'invoice_date': datetime.datetime(2021, 5, 19, 0, 0)}}, 
                 'Invoice Line Item': 
                    {1: {'invoice_line_Item_id': 1, 'invoice_id': 1, 'product_id': 1, 'item_ref': 'Item 1', 'quantity': 3}, 
                     2: {'invoice_line_Item_id': 2, 'invoice_id': 1, 'product_id': 2, 'item_ref': 'Item 2', 'quantity': 1}, 
                     3: {'invoice_line_Item_id': 3, 'invoice_id': 1, 'product_id': 3, 'item_ref': 'Item 3', 'quantity': 1}, 
                     4: {'invoice_line_Item_id': 4, 'invoice_id': 2, 'product_id': 2, 'item_ref': 'Item 1', 'quantity': 3}, 
                     5: {'invoice_line_Item_id': 5, 'invoice_id': 2, 'product_id': 3, 'item_ref': 'Item 2', 'quantity': 2}, 
                     6: {'invoice_line_Item_id': 6, 'invoice_id': 3, 'product_id': 2, 'item_ref': 'Item 1', 'quantity': 4}, 
                     7: {'invoice_line_Item_id': 7, 'invoice_id': 4, 'product_id': 1, 'item_ref': 'Item 1', 'quantity': 3}, 
                     8: {'invoice_line_Item_id': 8, 'invoice_id': 4, 'product_id': 2, 'item_ref': 'Item 2', 'quantity': 1}, 
                     9: {'invoice_line_Item_id': 9, 'invoice_id': 4, 'product_id': 3, 'item_ref': 'Item 3', 'quantity': 1}, 
                     10: {'invoice_line_Item_id': 10, 'invoice_id': 5, 'product_id': 2, 'item_ref': 'Item 1', 'quantity': 3}, 
                     11: {'invoice_line_Item_id': 11, 'invoice_id': 6, 'product_id': 3, 'item_ref': 'Item 2', 'quantity': 2}, 
                     12: {'invoice_line_Item_id': 12, 'invoice_id': 6, 'product_id': 2, 'item_ref': 'Item 1', 'quantity': 4}}, 
                 'Product': 
                    {1: {'product_id': 1, 'name': 'Pen', 'description': 'Ball Pointed, Black Ink', 'unit_price': 3}, 
                     2: {'product_id': 2, 'name': 'Pencil', 'description': 'Mechanical, 0.3mm', 'unit_price': 5}, 
                     3: {'product_id': 3, 'name': 'Eraser', 'description': 'White', 'unit_price': 2}, 
                     4: {'product_id': 4, 'name': 'Pen', 'description': 'Ball Pointed, Blue Ink', 'unit_price': 3}, 
                     5: {'product_id': 5, 'name': 'Pencil', 'description': 'Wood, 0.3mm', 'unit_price': 5}, 
                     6: {'product_id': 6, 'name': 'Eraser', 'description': 'Blue', 'unit_price': 2}}}, 
             'Error': {'Customer': {'rowErrorMsg': {}, 'MissingField': {}, 'errorCount': 0}, 
                       'Invoice': {'rowErrorMsg': {}, 'MissingField': {}, 'errorCount': 0}, 
                       'Invoice Line Item': {'rowErrorMsg': {}, 'MissingField': {}, 'errorCount': 0}, 
                       'Product': {'rowErrorMsg': {}, 'MissingField': {}, 'errorCount': 0}},
             'Validation': True}

    return wbdata

def test_dump(client):
    rv = client.get('/dump')

    assert(rv.status_code == 200)
    assert(b'Simple Dumping' in rv.data)

# https://flask.palletsprojects.com/en/1.1.x/testing/#the-first-test
# https://pythonhosted.org/Flask-Testing/
def test_template(client, wb_test_data):
    
    webserver.wb = wb_test_data

    rv = client.get('/template')
    
    assert(rv.status_code == 200)
    assert(b'Invoice Workbook' in rv.data)
    assert(b'Customer' in rv.data)
    assert(b'Invoice' in rv.data)
    assert(b'Invoice Line Item' in rv.data)
    assert(b'Product' in rv.data)
    assert(b'<tr>' in rv.data)
    assert(b'<th>' in rv.data)
    assert(b'<td>' in rv.data)    
       
def test_api(client, wb_test_data):
    
    webserver.wb = wb_test_data

    rv = client.get('/api')
    
    assert(rv.status_code == 200)
    assert(b'Customer' in rv.data)
    assert(b'Invoice' in rv.data)
    assert(b'Invoice Line Item' in rv.data)
    assert(b'Product' in rv.data)

    rv2 = client.get('/')
    assert(rv2.status_code == 200)
    assert(b'Customer' in rv2.data)
    assert(b'Invoice' in rv2.data)
    assert(b'Invoice Line Item' in rv2.data)
    assert(b'Product' in rv2.data)