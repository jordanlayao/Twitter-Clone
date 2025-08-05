#!/bin/bash
npm run build
cp -r images dist/
echo "Build complete! Images copied to dist folder." 