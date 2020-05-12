def calculate_taxamt(income):

    if (income <= 48535):
        fedtax = income * 0.15
    elif (income <= 97069):
        fedtax = (income - 48535) * 0.205 + 7280
    elif (income <= 150473):
        fedtax = (income - 97069) * 0.26 + 17230
    elif (income <= 214368):
        fedtax = (income - 150473) * 0.29 + 31115
    else:
        fedtax = (income - 214368) * 0.33 + 49645

    return fedtax

def calculate_taxrate(income):
    
    return calculate_taxamt(income)/income