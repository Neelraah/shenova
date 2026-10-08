import time


def benchmark(fn, *args):
    start = time.perf_counter()
    result = fn(*args)
    elapsed_ms = (time.perf_counter() - start) * 1000
    return result, elapsed_ms
