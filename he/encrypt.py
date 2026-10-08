from .ckks_context import create_context


def encrypt_vector(values):
    context = create_context()
    encrypted = context.encryptor().encrypt(values)
    return context, encrypted
