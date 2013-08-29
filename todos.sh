#!/bin/bash

grep -rHnC3 '\[WRATH-TODO\]' webkit/Source --include='*.cpp' --include='*.h'
