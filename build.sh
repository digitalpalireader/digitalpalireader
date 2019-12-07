#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
OUTDIR="${1:-$DIR/build}"
SOURCEDIR="${2:-$OUTDIR/..}"

echo "OUTDIR = $OUTDIR"
echo "SOURCEDIR = $SOURCEDIR"

mkdir -p $OUTDIR

cd digitalpalireader
./build.sh $OUTDIR
cd ../DPRMyanmar
./build.sh $OUTDIR
cd ../DPRThai
./build.sh $OUTDIR
cd ../sanskrit
./build.sh $OUTDIR
cd ../DPRHTML
./build.sh $OUTDIR $SOURCEDIR
cd ..

echo "Contents of OUTDIR [$OUTDIR]"
ls -laF $OUTDIR
