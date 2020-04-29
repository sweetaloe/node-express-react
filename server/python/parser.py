#!/usr/bin/python
import sys, random, json, math
from datetime import datetime, date, time

def parseData(data_mas):
    values = []
    
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
        
        if float(t) != -1:                       
            values.append([float(d), float(t)])

    return values

def parsePredict(data_mas):
    values = []
   
    ranges = []
    for i in range(len(data_mas)):
        s = data_mas[i]
        s = s.replace(':', '')
        mas = s.split(' ')
        [y, m, d, f, u] = list(filter(None, mas)) 

        #dates = datetime(int(y), int(m), 1).timestamp()
        #yearmonth = y + "-" + m
        #dates.append(yearmonth)
        values.append([float(d), float(f)])
        ranges.append( [float(d), round(float(f)-float(u), 2), round(float(f)+float(u),2)])
    return values, ranges

graphNames = {
    '1': "Monthly mean total",
    '2': "13-month smoothed monthly total",
    '3': "Standard method prediction",
    '4': "Combined method prediction",
    '5': "McNish & Lincoln method prediction"
}

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
#filename="D:/programming/lessons/node-express-react/backend/data/SN_m_tot_V2.0.txt"
filename = "./data/" + fileNames[sys.argv[1]] + ".txt"
f = open(filename, 'r')

data_mas = f.readlines()
ranges = []

if isData[sys.argv[1]]: 
    values = parseData(data_mas)
    titleY = "Total sunspot number"
else:
    values, ranges = parsePredict(data_mas)
    titleY = "Forecasted value"

title = graphNames[sys.argv[1]]
print(json.dumps({'title': title, 'titleY': titleY,  'values': values, 'ranges':ranges}))
sys.stdout.flush()