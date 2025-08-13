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

  rel_imgname="${img#$DIR/}"
  out_dir="_site/$(dirname "$rel_imgname")"
  bk_file_loc="_unused/original_imgs/${$rel_imgname}"
  mkdir -p "$out_dir"
  mkdir -p "$bk_dir"
  
  # Generate output names
  filename=$(basename "$img")
  name="${filename%.*}"
  out="$out_dir/${name}.webp"
  thum="$out_dir/${name}-sm.webp"
  
  echo "Converting $img -> $out"
  cwebp -q 80 "$img" -o "$out"
  cwebp -q 80 -resize 360 0 "$img" -o "$thum"
  mv $img $bk_file_loc
done

echo "Conversion complete."

TODO save webp to original dir, and prioginal png tpo bk fi,der in unused