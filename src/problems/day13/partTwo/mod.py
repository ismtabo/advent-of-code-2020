from functools import reduce
import sys


def xgcd(a, b):
    if b == 1:
        return 1
    olb_b = b
    r, s = 0, 1
    while a > 1:
        q = a // b
        a, b = b, a % b
        r, s = s - q * r, r
    if s < 0:
        s += olb_b
    return s


with open(sys.argv[1]) as file:
    [_, numbers] = file.readlines()
numbers = [[int(n), (int(n) - a) % int(n)]
           for a, n in enumerate(numbers.split(',')) if n != 'x']
N = reduce(lambda x, y: x * y, [n for n, _ in numbers])


def element_i(n, a):
    n_i = N // n
    s_i = xgcd(n_i, n)
    return a * s_i * n_i


x = sum(element_i(n, a) for n, a in numbers)
print(x % N)
