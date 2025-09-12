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
  out_dir="src/$(dirname "$rel_imgname")"
  bk_file_loc="_unused/original_imgs/$(dirname "$rel_imgname")"
  mkdir -p "$out_dir"
  mkdir -p "$bk_file_loc"
  
  # Generate output names
  filename=$(basename "$img")
  name="${filename%.*}"
  out="$out_dir/${name}.webp"
  thum="$out_dir/${name}-sm.webp"
  bk_file="$bk_file_loc/${filename}" 
  
  #echo $img $rel_imgname $filename $name $out $thum $bk_file_loc

  # img = src/work/pm-iq/02-process/iq-screens-group.png 
  #rel_imgname = work/pm-iq/02-process/iq-screens-group.png 
  #filename = iq-screens-group.png 
  #name = iq-screens-group 
  #out = _site/work/pm-iq/02-process/iq-screens-group.webp 
  #thum = _site/work/pm-iq/02-process/iq-screens-group-sm.webp 
  #bkfile_loc_unused/original_imgs/work/pm-iq/02-process/iq-screens-group.png
  echo "Converting $img -> $out"
  cwebp -q 90 -short "$img" -o "$out"
  cwebp -q 90 -resize 360 0 -short "$img" -o "$thum"
  #mv "$img" "$bk_file"
done

echo "Conversion complete."

