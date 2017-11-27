import operator as op
import numpy as np
import matplotlib.pyplot as plt

from functools import reduce

# variant 5 data
values = [
    (1, 5),
    (2, 2.5),
    (3, 1.66),
    (4, 1.25),
    (6, 0.83),
    (7, 0.714),
    (8, 0.625),
]

def interpolate(x, pred_values):
    k = len(pred_values)
    def _basis(j):
        return reduce(
            op.mul, 
            ((x - pred_values[m][0]) / (pred_values[j][0] - pred_values[m][0])
                for m in range(k)
                if m != j),
            1
        )
    if len(pred_values) == 0:
        raise RuntimeError('You should pred_values have data')
    return sum(
        _basis(k) * pred_values[k][1]
        for k in range(k)
    )

if __name__ == '__main__':
    plot = plt.plot(
        list(range(-50, 50, 1)),
        [interpolate(x, values) for x in range(-50, 50, 1)])
    plt.show()

