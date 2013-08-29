#!/bin/bash

grep -rHnC3 '\[WRATH-DANGER\]' webkit/Source --include='*.cpp' --include='*.h'
