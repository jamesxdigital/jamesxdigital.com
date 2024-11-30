#!/bin/bash

# Script to list all files and their extensions in subfolders

# Loop through all directories in the current directory
for dir in */; do
    # Check if it's a directory
    if [ -d "$dir" ]; then
        echo "Contents of directory: $dir"
        # List files and their extensions in the directory
        for file in "$dir"*; do
            if [ -f "$file" ]; then
                # Extract file name and extension
                filename=$(basename -- "$file")
                extension="${filename##*.}"
                echo "  File: $filename (Extension: $extension)"
            fi
        done
        echo ""
    fi
done
