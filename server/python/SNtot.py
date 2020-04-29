#!/usr/bin/python
import sys, random, json, math


filename = "./data/" + sys.argv[1] + ".txt"
f = open(filename, 'r')


data_mas = f.readlines()

year = []
month = []
decimalDate = []
totalSunspotNumber = []
standardDeviation = []
numberOfObservations = []
indicator = []
yearmonth = []


for i in range(len(data_mas)):
    s = data_mas[i]
    s = s.replace(':', '')
    s = s.replace('\n', '')
    mas = s.split(' ')
    mas = list(filter(None, mas))

    if len(mas) == 6:
        [y, m, d, t, s, n] = mas
        c = ""
    else:
        [y, m, d, t, s, n, c] = mas
        
    
    year.append(int(y))
    month.append(int(m))
    decimalDate.append(float(d))
    totalSunspotNumber.append(float(t))
    standardDeviation.append(float(s))
    numberOfObservations.append(int(n))
    indicator.append(str(c))
    

    yearmonth.append(m + '/'+y)
 



#Data - totalSunspotNumber, X - yearmonth
print(json.dumps({'title': sys.argv[1], 'year':year, 'month': month,'decimalDate': decimalDate, 'totalSunspotNumber': totalSunspotNumber, 'standardDeviation': standardDeviation, 'numberOfObservations':numberOfObservations,'yearmonth':yearmonth, 'indicator':indicator}))
sys.stdout.flush()