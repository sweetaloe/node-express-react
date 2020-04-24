#!/usr/bin/python
import sys, random, json, math

def parseData(data_mas):
    value = []
    yearmonth = []  
    for i in range(len(data_mas)):
        s = data_mas[i]
        s = s.replace(':', '')
        s = s.replace('\n', '')
        mas = s.split(' ')
        mas = list(filter(None, mas))

        if len(mas) == 6:
            [y, m, d, t, s, n] = mas
        else:
            [y, m, d, t, s, n, c] = mas
        
        value.append(float(t))
        yearmonth.append(m + '/'+y)
 
    return value, yearmonth

def parsePredict(data_mas):
    value = []
    yearmonth = []
    ranges = []
    for i in range(len(data_mas)):
        s = data_mas[i]
        s = s.replace(':', '')
        mas = s.split(' ')
        [y, m, d, f, u] = list(filter(None, mas)) 

        value.append(float(f))
        yearmonth.append(m + '/'+y)
        ranges.append([round(float(f)-float(u), 2), round(float(f)+float(u),2)])
    return value, yearmonth, ranges


fileNames = {
    '1': "SN_m_tot_V2.0",
    '2': "SN_ms_tot_V2.0",
    '3': "KFprediSC",
    '4': "KFprediCM",
    '5': "KFprediML"
}

isData = {
    '1': True,
    '2': True,
    '3': False,
    '4': False,
    '5': False
}
filename = "./data/" + fileNames[sys.argv[1]] + ".txt"
f = open(filename, 'r')

data_mas = f.readlines()
ranges = []
if isData[sys.argv[1]]: 
    value, yearmonth = parseData(data_mas)
else:
    value, yearmonth, ranges = parsePredict(data_mas)

print(json.dumps({'title': sys.argv[1],  'value': value, 'yearmonth':yearmonth, 'ranges':ranges}))
sys.stdout.flush()