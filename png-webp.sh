#!/bin/bash
# Usage: ./_src/webp.sh directoryRelativeToProjectRoot
# automatically converts jpgs and pngs to webp

if [ -z "$1" ]; then
  echo "Checking for images in: $0 <directory>"
  exit 1
fi

DIR="$1"

if [ ! -d "$DIR" ]; then
  echo "Directory $DIR does not exist."
  exit 1
fi

# Convert jpg/jpeg/png to webp
find "$DIR" -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' \) | while read -r img; do
  out="${img%.*}.webp"
  echo "Converting $img -> $out"
  cwebp -q 80 "$img" -o "$out"
done

echo "Conversion complete."