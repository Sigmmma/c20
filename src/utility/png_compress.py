#!/usr/bin/env python3
import os

"""
png_compress.py: Loseslessly compress all png files. This script it slow but compresses the PNGs as well as possible.
Requires: oxipng
Author: num0005
"""

total_reduction = 0
files_compressed = 0
for subdir, dirs, files in os.walk(os.path.join("..", "content")):
    for file in files:
        ext = os.path.splitext(file)[-1].lower()
        if ext == ".png":
            file_path = os.path.join(subdir, file)
            old_size = os.path.getsize(file_path)
            
            print(F"Compressing {file_path}")
            os.system(F"oxipng -o 6 --strip safe \"{file_path}\"")
            
            size_change = old_size - os.path.getsize(file_path)
            
            
            print(F"Size reduced by {size_change/1024} KiB!")
            
            total_reduction += size_change
            files_compressed += 1 
            


print(f"=== {files_compressed} files compressed! ===")
print(f"=== {total_reduction / 1024} kilobytes saved! ===")
print("Have a great day!")