#!/usr/bin/env python3
import os

"""
png_to_jpeg.py: find and replace large PNG files with compressed JPEG files. References to the files are fixed automatically.
Requires: imagemagick
Author: num0005
"""

def ReplaceInFile(file_name, old, new):
    print(f"Replacing all occurances of {old} with {new} in {file_name}")
    with open(file_name) as file:
        newText=file.read().replace(old, new)

    with open(file_name, "w") as file:
         file.write(newText)

def FileExists(file_name):
    return os.path.exists(file_name) and os.path.isfile(file_name)
    
total_reduction = 0
files_compressed = 0
for subdir, dirs, files in os.walk(os.path.join("..", "content")):
    for file in files:
        ext = os.path.splitext(file)[-1].lower()
        if ext == ".png":
            file_path = os.path.join(subdir, file)
            if os.path.getsize(file_path) < 200 * 1024:
                print(F"{file_path} < 200 KiB, skipping compression")
            
            jpeg_name = os.path.splitext(file)[0] + ".jpg"
            jpeg_path = os.path.join(subdir, jpeg_name)
             
            if FileExists(jpeg_path):
                print(F"Skipping as {jpeg_path} already exists")
                
            print(F"Compressing {file_path} to jpeg")
            os.system(F"convert \"{file_path}\" \"{jpeg_path}\"")
            
            if not FileExists(jpeg_path):
                print(F"Failed to convert {file} to jpeg!")
                continue
            
            size_change = os.path.getsize(file_path) - os.path.getsize(jpeg_path)
            
            if size_change < 1024:
                print(F"Size change smaller than a kilobyte or negative, skipping")
                os.remove(jpeg_path)
            
            print(F"Size reduced by {size_change/1024} KiB!")
            
            total_reduction += size_change
            files_compressed += 1 
            
            yml_file_name = os.path.join(subdir, "page.yml")
            readme_file_name = os.path.join(subdir, "readme.md")
            
            print(F"Finding and fixing references.")
            if FileExists(yml_file_name):
                ReplaceInFile(yml_file_name, file, jpeg_name)
            
            if FileExists(readme_file_name):
                ReplaceInFile(readme_file_name, file, jpeg_name)
            print(F"Deletintg old png")
            os.remove(file_path)


print(f"=== {files_compressed} files compressed! ===")
print(f"=== {total_reduction / 1024} kilobytes saved! ===")
print("Have a great day!")