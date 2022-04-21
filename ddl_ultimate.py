# Essential Libraries
import json
from _curses import *
import os
import re
from sqlite3 import DatabaseError
import sys
import configparser
import mysql.connector
from detect_delimiter import detect

# Create File Method. Take 2 parameters:1)Filename 2)Data
def createFile(fName, data):
    file = open(fName, 'w+')
    file.write(data)
    file.close()
    return "SQL Created"




inputFile = sys.argv[1]
tableName = sys.argv[2]
host = sys.argv[3]
username = sys.argv[4]
password = sys.argv[5]
dbname = sys.argv[6]



# From which file the column names are to be extracted.
flag_header = 0
f = open(inputFile, 'r')
print(f.name)
line = f.readline()  # Retrieves the first line of the input file
print(line)
delim = detect(line) #identify delimiter
print("Delimiter is "+str(delim))
content = f.readlines()
print(content[0])
# Splits the line based on delimiter and adds it to the header list
header = line.split(delim)
print("header" + str(header))
cont1 = content[0].split(delim)
print("hello"+str(cont1))
f.close()








list = []

for i in range(len(content)):
    contq = content[i].split(delim)
    # list.append(i)
    list.append(contq)
    # print(list)
    # for j in range(len(header)):
    #     list.append(contq[i])
# print("wwwssss"+list)
# flag_primary = 0;
# print("q-"+str(list[1][1]))
# print("a-"+str(list))
# for i in range(len(list)):
#     for j in range(len(list)):
#         for k in range(len(list)):
#             if(list[j][i] != list[k][i]):
#                 if(j != k):
#                     flag_primary = i  
#                     print("Trial"+list[j][i]+"--"+list[k][i]+str(i)+str(j)+str(k))
#                 break
#                 print("qq"+str(k)+" "+str(j)+" "+str(i))
                
#             print("qqw"+str(k)+" "+str(j)+" "+str(i))
             
#         break
#         # if(k == 2):
#         #     flag_primary = i
#         # break
#         print("qqeeeeeee"+str(k)+" "+str(j)+" "+str(i))



    # if header[i].isnumeric() :
    #     flag_header = 0;
    #     print("hel000000"+str(i))
    #     break
    # elif cont1[i].isalpha() and not(header[i].isnumeric()) : 
    #     flag_header = 1;
    #     print("hel"+str(i))
    #     break
    # elif cont1[i].isnumeric() and not(header[i].isnumeric()) : 
    #     flag_header = 1;
    #     print("helpppp"+str(i))
    # else :
    #    break

def sumofnum(N):
    n = N
    sum = n*(n-1)/2
    return sum
    
    

flag_primary = None;
for i in range(len(list[0])):
    count = 0;
    for j in range(len(list)):
        for k in range(len(list)):
            if(list[j][i] != list[k][i] and j <= k):
                if(j != k): 
                    # print("Trial"+list[j][i]+"-"+list[k][i]+str(i)+str(j)+str(k))
                    count = count + 1
                    # print("count---"+str(count)+"---"+list[j][i]+"-"+list[k][i]+str(i)+str(j)+str(k))
                if count == sumofnum(len(list)) :
                    flag_primary = i

















#function foridentify the datatype of table value 
def typeconst(c) :
    if c.isalpha() == True :
        return "VARCHAR("+str(len(c))+")"
    else :
        return "INT("+str(len(c)+3)+")"


for i in range(len(header)):
   
    if header[i].isnumeric() :
        flag_header = 0;
        break
    elif cont1[i].isalpha() and not(header[i].isnumeric()) : 
        flag_header = 1;

        break
    elif cont1[i].isnumeric() and not(header[i].isnumeric()) : 
        flag_header = 1;
    else :
       break

    # if header[i].isnumeric() :
    #     for j in range(len(header)) :
    #         prev = j - 1;
    #         next = j + 1;
    #         if j == len(header) - 1 : 
    #             next = 0;
    #         if header[j] != header[prev] and header[j] != header[next] :
    #             flag_header = 0;
    #             print("hellocjcjcjj"+str(j))
    #             break
    #     break

    # if cont1[i].isalpha() and not(header[i].isnumeric()) : 
    #     flag_header = 1;
    #     print("hel"+str(i))
    #     break
    # else :
    #     flag_header = 0;
    # if cont1[i].isnumeric() and not(header[i].isnumeric()) : 
    #     flag_header = 1;
    #     print("helpppp"+str(i))
    #     break
    # else :
    #     flag_header = 0;


















statement_prefix = "CREATE TABLE " + tableName + "("
#loop for creating core query 
for i in range(len(header)):
    X = typeconst(cont1[i])
    if flag_header == 1 :
        if flag_primary == i :
            print("fp"+str(flag_primary))
            statement_prefix = statement_prefix + \
            ("{} "+ X +",").format(header[i].upper().strip()+"  PRIMARY KEY ", str(header))
        else:
            statement_prefix = statement_prefix + \
            ("{} "+ X +",").format(header[i].upper().strip(), str(header))
    else:
        statement_prefix = statement_prefix + \
         ("{} "+ X +",").format("Column"+ str(i+1))
    # Appends every element from list to the file with datatype String
statement_suffix = "\n" + "COMMENT 'This is an example table'" + "\n" + "ROW FORMAT DELIMITED" + \
    "\n" + "FIELDS TERMINATED BY '|'" + "\n" + \
    "STORED AS TEXTFILE" + "\n" + "LOCATION '/etlhive';"

# Merge all the elements into one string
statement_sql = statement_prefix[:-1] + ")"

# Call the createFile method to create the hql
createFile("./tmps/"+tableName + ".txt", statement_sql)
hello = statement_sql
# print(hello)
jason = "["+"{"+'"Delimiter":'+'"'+str(delim)+'"'+","+'"header":'+'"'+str(header) +'"'+","+'"Query":'+'"'+hello+'"'+"}"+"]"

json_object = json.loads(jason)
json_str = json.dumps(json_object, indent=2)
print(json_str)

mydb = mysql.connector.connect(
    host = host,
    user = username,
    password = password,
    database = dbname,
    port = 3306
)

print(mydb)

mycursor = mydb.cursor()

mycursor.execute(statement_sql)
