#!/bin/bash

# Stop the script if any command fails
set -e

echo "Validating EJS templates..."

# Directory to search for EJS files (adjust if needed)
TEMPLATE_DIR="./emails"

# Check if the EJS CLI is installed
if ! command -v ejslint &> /dev/null; then
    echo "ejslint not found! Installing..."
    npm install ejs-cli
fi

# Find all .ejs files in the specified directory
EJS_FILES=$(find "$TEMPLATE_DIR" -type f -name "*.ejs")

# If no .ejs files are found, exit
if [ -z "$EJS_FILES" ]; then
    echo "No EJS templates found in $TEMPLATE_DIR."
    exit 0
fi

# Validate each .ejs file
ERROR_COUNT=0
for file in $EJS_FILES; do
    echo "Checking $file..."
    if ! ejslint "$file"; then
        echo "❌ Error found in $file"
        ERROR_COUNT=$((ERROR_COUNT + 1))
    fi
done

# Display the final result
if [ "$ERROR_COUNT" -eq 0 ]; then
    echo "✅ All EJS templates are valid!"
else
    echo "❌ Validation failed! $ERROR_COUNT template(s) have errors."
    exit 1
fi
