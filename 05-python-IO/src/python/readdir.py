import os

#################################################################
# Exercise - Reading Directories
#################################################################
# ●	read all the files and their sizes from a directory
# ●	print a nice little report that tells us the number of files and the total size of the directory
# https://docs.python.org/3/library/os.html#os.stat_result.st_size
def readdirectory(dirpath):
    totalsize = 0
    files = os.listdir(dirpath)    
    print(f"Number of files: {len(files)}")
    for filename in files:            
        path = os.path.join(dirpath, filename)
        totalsize += os.stat(path).st_size
        print(f"{filename} with {os.stat(path).st_size} bytes")
    print(f"{dirpath} with {totalsize} bytes")

    return totalsize