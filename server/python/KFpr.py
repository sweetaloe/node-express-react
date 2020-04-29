#!/usr/bin/python
import sys, random, json, math


def parse(data_mas):
    for i in range(len(data_mas)):
        s = data_mas[i]
        s = s.replace(':', '')
        mas = s.split(' ')
        [y, m, d, f, u] = list(filter(None, mas)) 
        year.append(int(y))
        month.append(int(m))
        value.append(float(f))
        uncertainty.append(float(u))
        yearmonth.append(m + '/'+y)
        ranges.append([round(float(f)-float(u), 2), round(float(f)+float(u),2)])
pass


filename = "./data/" + sys.argv[1] + ".txt"
f = open(filename, 'r')

data_mas = f.readlines()
a = ""
year = []
month = []
value = []
uncertainty = []
yearmonth = []
ranges = []
 
parse(data_mas)

#Data - forecastedValue, X - yearmonth
print(json.dumps({'title': sys.argv[1], 'year':year, 'month': month, 'forecastedValue': value, 'uncertainty': uncertainty, 'yearmonth':yearmonth, 'ranges':ranges}))
sys.stdout.flush()