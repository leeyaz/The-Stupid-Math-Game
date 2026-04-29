# DO NOT LOOK AT THIS COED
string = "WPP"

start = 3
prop = 2
end = 48

while string != "quit":
    string = input("Enter:")
    
    sum = 0;
    
    foundFirstNum = False
    failed = False;
    for i in range(len(string)):
        if string[i].isnumeric():
            if not foundFirstNum:
                for j in range(len(str(start))):
                    if string[i + j] != str(start)[j]:
                        failed = True
                        break
                if string[i + len(str(start))].isnumeric():
                    failed = True
                foundFirstNum = True
            else:
                if string[i] != str(prop):
                    failed = True
                    break;
                sum += 1
    if failed:
        print("INVALID INPUT")
        continue
    try:
        num = eval(string)
        
        print("--------")
        if num != end:
            print("FAIL")
        else:
            print("YAY")
        print("SCORE: " + str(sum))
        print("OUTPUT: " + str(num))
        print("--------")
        
    except SyntaxError:
        print("Not Math")
        continue
    except NameError:
        print("WHAT?")
        continue
    
    
