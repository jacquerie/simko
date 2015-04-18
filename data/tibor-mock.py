#!/usr/bin/env python

import sys

from random import randint, shuffle


ALPHABET = [
  "a", "b", "c", "d", "e",
  "f", "g", "h", "i", "j",
  "k", "l", "m", "n", "o",
  "p", "q", "r", "s", "t",
  "u", "v", "w", "x", "y",
  "z"
]

with open("tibor-mock.csv", "w") as f:
    f.write("File,L1,L2,Misses\n")

    for i in range(int(sys.argv[1])):
        shuffle(ALPHABET)

        filename = "".join(ALPHABET)[:3] + ".png"

        L1, L2, miss = 0, 0, 0
        if randint(1, int(sys.argv[2])) % 4 != 0:
            L1 = randint(1, int(sys.argv[2]))
            L2 = randint(1, int(sys.argv[3]))
        else:
            miss = randint(1, int(sys.argv[4]))

        f.write("%s,%d,%d,%d\n" % (filename, L1, L2, miss))
