# UHBC_TP_REASEAU

## List of Students

- Kellouche Dhiya - IL G02

<div class="page" />

## List of contents

1. [AES](#aes)
    1. [AES-128](#aes-128)
    2. [Lib Crypto.Cipher](#lib-cryptocipher)
    3. [AES in C++](#aes-in-c)
2. [Application architecture](#application-architecture)
    1. [Client](#client)
    2. [Server](#server)
    3. [Protocol](#protocol)
3. [How to start the app](#how-to-start-the-app)
    1. [Server](#server-1)
    2. [Client](#client-1)
    3. [Docker](#Docker)
4. [Result](#result)
    1. [Banchmark](#banchmark)
    2. [Test](#test)
5. [Conclusion](#conclusion)
6. [References](#references)

<div class="page" />

## AES

### AES-128

AES is a symmetric block cipher algorithm and it is a successor of DES. AES is a symmetric key encryption cipher. It is available in different key lengths. AES-128 uses a 128-bit key length to encrypt and decrypt a block of messages, while AES-192 uses a 192-bit key length and AES-256 a 256-bit key length to encrypt and decrypt messages.

### Lib Crypto.Cipher

The Crypto.Cipher package provides algorithms and components for performing encryption and decryption on streams. It includes both high level packages that perform a specific function and lower level functions that may be used by advanced programmers to construct their own encryption and decryption schemes.

#### Example

```python
# aes.py
from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes

# get user input
message = input("Enter your message: ")

# generate a random key
key = get_random_bytes(16)

# create cipher
cipher = AES.new(key, AES.MODE_EAX)

# encrypt message
ciphertext, tag = cipher.encrypt_and_digest(message.encode('ascii'))
print("Encrypted message: ", ciphertext)
```

```bash
# output
python3 aes.py

Enter your message: Hello World
Encrypted message:  b'\x8c\x8a\x1c\x1c\x8f\x8f\x1f\x1f\x8f\x8f\x1f\x1f\x8f\x8f\x1f\x1f'
```

<div class="page"/>

### AES in C++

#### Example

```cpp
// aes.cpp
#include <iostream>
#include <string>
#include <cryptopp/aes.h>
#include <cryptopp/modes.h>
#include <cryptopp/filters.h>
#include <cryptopp/hex.h>
#include <cryptopp/osrng.h>

using namespace std;
using namespace CryptoPP;

int main(int argc, char* argv[]) {
    // get user input
    string message;
    cout << "Enter your message: ";
    getline(cin, message);

    // generate a random key
    AutoSeededRandomPool rnd;
    byte key[AES::DEFAULT_KEYLENGTH];
    rnd.GenerateBlock(key, sizeof(key));

    // create cipher
    byte iv[AES::BLOCKSIZE];
    rnd.GenerateBlock(iv, sizeof(iv));
    CFB_Mode<AES>::Encryption cfbEncryption(key, sizeof(key), iv);
    StreamTransformationFilter stfEncryptor(cfbEncryption, new StringSink(message));
    stfEncryptor.Put(reinterpret_cast<const unsigned char*>(message.c_str()), message.length() + 1);
    stfEncryptor.MessageEnd();

    // encrypt message
    string cipher = "";
    StringSource(message, true, new HexEncoder(new StringSink(cipher)));
    cout << "Encrypted message: " << cipher << endl;

    return 0;
}
```

<div class="page" />

```bash
# output
g++ aes.cpp -o aes -lcryptopp
./aes

Enter your message: Hello World
Encrypted message: '\x8c\x8a\x1c\x1c\x8f\x8f\x1f\x1f\x8f\x8f\x1f\x1f\x8f\x8f\x1f\x1f'
```

<div class="page" />

## Application architecture

