import math


def _poly_depth(degree: int) -> int:
    if degree <= 1:
        return 0
    return math.ceil(math.log2(degree))


def analyze_depth(model):
    depth = 0
    details = []
    for i, layer in enumerate(model["layers"][:-1]):
        degree = len(layer["activation"]["coefficients"]) - 1
        added = _poly_depth(degree)
        depth += added
        details.append({"layer": i + 1, "polynomial_degree": degree, "depth_added": added, "depth_after_layer": depth})
    return {"multiplicative_depth": depth, "layers": details}
