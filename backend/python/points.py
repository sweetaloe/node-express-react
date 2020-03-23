#!/usr/bin/python
import sys, random, json, math

x = []
y = []
y2 = []
for i in range(1, 100):
    x.append(i/10)
    y.append(round(math.sin(i/10),2))
    y2.append(round(math.cos(i/10),2))




print(json.dumps({'x': x, 'y': [y, y2]}))
sys.stdout.flush()