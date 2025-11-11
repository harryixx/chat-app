#!/bin/bash
# Bash script to update MongoDB URI in .env file
# Usage: ./update-mongo-uri.sh "your_connection_string_here"

if [ -z "$1" ]; then
    echo "Error: Connection string required!"
    echo "Usage: ./update-mongo-uri.sh \"your_connection_string_here\""
    exit 1
fi

CONNECTION_STRING="$1"
ENV_FILE=".env"

if [ ! -f "$ENV_FILE" ]; then
    echo "Error: .env file not found!"
    exit 1
fi

# Update MONGO_URI in .env file
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    sed -i '' "s|^MONGO_URI=.*|MONGO_URI=$CONNECTION_STRING|" "$ENV_FILE"
else
    # Linux
    sed -i "s|^MONGO_URI=.*|MONGO_URI=$CONNECTION_STRING|" "$ENV_FILE"
fi

echo "✓ MongoDB URI updated successfully!"
echo "Updated connection string: $CONNECTION_STRING"

