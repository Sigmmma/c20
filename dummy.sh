#!/bin/sh

base=$1
title=$2
dir="$base/$title"
file="$dir/readme.md"

mkdir -p $dir

echo "---" > $file
echo "title: $title" >> $file
echo "template: tag" >> $file
echo "stub: true" >> $file
echo "---" >> $file
echo "..." >> $file

