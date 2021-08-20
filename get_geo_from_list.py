import sys
f = open(sys.argv[1],'r')
fo = open(sys.argv[2],'w')
lines = f.readlines()

for line in lines:
	lat = line.split()[0]
	lng = line.split()[1]
	fo.write("{ lat: " + lat + " , lng: " + lng + " },\n")
f.close()
fo.close()
