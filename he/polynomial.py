import numpy as np


def polynomial_activation(x, coeffs):
    out = np.zeros_like(x, dtype=float) + coeffs[0]
    power = np.ones_like(x, dtype=float)
    for c in coeffs[1:]:
        power = power * x
        out = out + c * power
    return out


def polynomial_derivative(x, coeffs):
    out = np.zeros_like(x, dtype=float)
    power = np.ones_like(x, dtype=float)
    for degree, c in enumerate(coeffs[1:], start=1):
        out = out + degree * c * power
        power = power * x
    return out
