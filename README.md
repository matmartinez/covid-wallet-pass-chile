# Source for covid-pass.matias.ma

This repository contains the source code for [this website](https://covid-pass.matias.ma). It takes a "Mobility Pass" (Pase de Movilidad) issued by the Chilean government and generates an Apple Wallet pass from it.

## How this is put together

The pass itself is completely **built inside the browser**. No user information is ever sent or stored on a server. How? Sweet open source projects:

1. Text is extracted using [PDFJS](https://github.com/mozilla/pdf.js).
2. QR codes are detected with [jsQR](https://github.com/cozmo/jsQR).
3. Parsed into pass data with some terrible JS.
3. Signature is returned from a _serverless_ function by sending over _hashes_ of pass data (more on that below).
4. Packaging with [JSZip](https://github.com/Stuk/jszip).

## Signing API

See the `/api/signature` folder for reference on how the _serverless_ function provides a signature when receiving hashes. It's Node and [Forge](https://github.com/digitalbazaar/forge). This is deployed on [Vercel](https://vercel.com).

## More acknowledgements

Some manifest signing code was borrowed from [pass-js](https://github.com/walletpass/pass-js). 

