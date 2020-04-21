#!/usr/bin/python
import sys, random, json, math


filename = "./data/" + sys.argv[1] + ".txt"
f = open(filename, 'r')


data_mas = f.readlines()
a = ""
year = []
month = []
decimalDate = []
forecastedValue = []
uncertainty = []
yearmonth = []
ranges = []
 
#len(data_mas)
for i in range(5):
    s = data_mas[i]
    s = s.replace(':', '')
    mas = s.split(' ')
    [y, m, d, f, u] = list(filter(None, mas)) 
    
    year.append(int(y))
    month.append(int(m))
    decimalDate.append(float(d))
    forecastedValue.append(float(f))
    uncertainty.append(float(u))
    yearmonth.append(m + '/'+y)
    ranges.append([round(float(f)-float(u), 2), round(float(f)+float(u),2)])



#Data - forecastedValue, X - yearmonth
print(json.dumps({'title': sys.argv[1], 'year':year, 'month': month,'decimalDate': decimalDate, 'forecastedValue': forecastedValue, 'uncertainty': uncertainty, 'yearmonth':yearmonth, 'ranges':ranges}))
sys.stdout.flush()