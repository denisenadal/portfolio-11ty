#!/bin/bash

# Check if directory parameter is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <directory>"
  echo "Example: $0 src/work/fifco-intranet"
  exit 1
fi

DIR="$1"

# Check if directory exists
if [ ! -d "$DIR" ]; then
  echo "Directory $DIR does not exist."
  exit 1
fi

find "$DIR" -type f -iname '*.webp' | while read -r img; do
  dir=$(dirname "$img")
  filename=$(basename "$img")
  name="${filename%.*}"
  thum="$dir/${name}-sm.webp"
  
  # Only create if the small version doesn't already exist
  if [ ! -f "$thum" ]; then
    echo "Creating small version: $img -> $thum"
    cwebp -q 80 -resize 360 0 "$img" -o "$thum"
  else
    echo "Small version already exists: $thum"
  fi
done

echo "Thumbnail generation complete for $DIR"