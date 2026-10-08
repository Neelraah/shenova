def evaluate_feasibility(depth_result, max_depth):
    depth = depth_result["multiplicative_depth"]
    return {
        "feasible": depth <= max_depth,
        "multiplicative_depth": depth,
        "max_multiplicative_depth": max_depth,
        "status": "PASS" if depth <= max_depth else "REJECTED",
    }
