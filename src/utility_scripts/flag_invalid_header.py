#!/usr/bin/env python3
import os

"""
flag_invalid_hader.py - Find image files with a bad header (usually means bad extension)
Requires: python 3
Author: num0005
"""

found = False

def check_png(path: str):
    global found
    with open(path, 'rb') as f:
        header = [int(c) for c in f.read(8)]
        if header != [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]:
            print(f"Invalid header {header} in file {path}")
            found = True
            
def check_jpeg(path: str):
    global found
    with open(path, 'rb') as f:
        header = [int(c) for c in f.read(2)]
        if header != [0xFF, 0xD8]:
            print(f"Invalid header {header} in file {path}")
            found = True
        

for subdir, dirs, files in os.walk(os.path.join("..", "content")):
    for file in files:
        ext = os.path.splitext(file)[-1].lower()
        file_path = os.path.join(subdir, file)
        if ext == ".png":
            check_png(file_path)
        if ext == ".jpg" or ext == ".jpeg":
            check_jpeg(file_path)
            


print("You need to take action" if found else "No action required")
print("Have a great day!")