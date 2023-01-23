#!/bin/bash
docker build -t jobsity . 
open http://localhost:3000
docker run --name jobsity -it -p 3000:3000 jobsity