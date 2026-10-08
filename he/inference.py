import numpy as np
import tenseal as ts
from .ckks_context import create_context


def _encrypted_linear(enc_x, weights, bias):
    # TenSEAL CKKSVector.matmul supports encrypted vector x plaintext matrix.
    y = enc_x.matmul(np.asarray(weights, dtype=float).tolist())
    return y + np.asarray(bias, dtype=float).tolist()


def encrypted_forward(features, model):
    context = create_context()
    enc = ts.ckks_vector(context, np.asarray(features, dtype=float).tolist())

    for i, layer in enumerate(model["layers"]):
        enc = _encrypted_linear(enc, layer["weights"], layer["bias"])
        if i < len(model["layers"]) - 1:
            coeffs = layer["activation"]["coefficients"]
            enc = coeffs[0] + coeffs[1] * enc
            if len(coeffs) > 2:
                enc = enc + coeffs[2] * (enc * enc)
            if len(coeffs) > 3:
                enc = enc + coeffs[3] * (enc * enc * enc)

    return enc.decrypt()[0]
