'use strict';

import * as forge from 'node-forge';

const APPLE_CA_CERTIFICATE = forge.pki.certificateFromPem(
  process.env.APPLE_WWDR_CERT_PEM ||
    `-----BEGIN CERTIFICATE-----
MIIEIjCCAwqgAwIBAgIIAd68xDltoBAwDQYJKoZIhvcNAQEFBQAwYjELMAkGA1UE
BhMCVVMxEzARBgNVBAoTCkFwcGxlIEluYy4xJjAkBgNVBAsTHUFwcGxlIENlcnRp
ZmljYXRpb24gQXV0aG9yaXR5MRYwFAYDVQQDEw1BcHBsZSBSb290IENBMB4XDTEz
MDIwNzIxNDg0N1oXDTIzMDIwNzIxNDg0N1owgZYxCzAJBgNVBAYTAlVTMRMwEQYD
VQQKDApBcHBsZSBJbmMuMSwwKgYDVQQLDCNBcHBsZSBXb3JsZHdpZGUgRGV2ZWxv
cGVyIFJlbGF0aW9uczFEMEIGA1UEAww7QXBwbGUgV29ybGR3aWRlIERldmVsb3Bl
ciBSZWxhdGlvbnMgQ2VydGlmaWNhdGlvbiBBdXRob3JpdHkwggEiMA0GCSqGSIb3
DQEBAQUAA4IBDwAwggEKAoIBAQDKOFSmy1aqyCQ5SOmM7uxfuH8mkbw0U3rOfGOA
YXdkXqUHI7Y5/lAtFVZYcC1+xG7BSoU+L/DehBqhV8mvexj/avoVEkkVCBmsqtsq
Mu2WY2hSFT2Miuy/axiV4AOsAX2XBWfODoWVN2rtCbauZ81RZJ/GXNG8V25nNYB2
NqSHgW44j9grFU57Jdhav06DwY3Sk9UacbVgnJ0zTlX5ElgMhrgWDcHld0WNUEi6
Ky3klIXh6MSdxmilsKP8Z35wugJZS3dCkTm59c3hTO/AO0iMpuUhXf1qarunFjVg
0uat80YpyejDi+l5wGphZxWy8P3laLxiX27Pmd3vG2P+kmWrAgMBAAGjgaYwgaMw
HQYDVR0OBBYEFIgnFwmpthhgi+zruvZHWcVSVKO3MA8GA1UdEwEB/wQFMAMBAf8w
HwYDVR0jBBgwFoAUK9BpR5R2Cf70a40uQKb3R01/CF4wLgYDVR0fBCcwJTAjoCGg
H4YdaHR0cDovL2NybC5hcHBsZS5jb20vcm9vdC5jcmwwDgYDVR0PAQH/BAQDAgGG
MBAGCiqGSIb3Y2QGAgEEAgUAMA0GCSqGSIb3DQEBBQUAA4IBAQBPz+9Zviz1smwv
j+4ThzLoBTWobot9yWkMudkXvHcs1Gfi/ZptOllc34MBvbKuKmFysa/Nw0Uwj6OD
Dc4dR7Txk4qjdJukw5hyhzs+r0ULklS5MruQGFNrCk4QttkdUGwhgAqJTleMa1s8
Pab93vcNIx0LSiaHP7qRkkykGRIZbVf1eliHe2iK5IaMSuviSRSqpd1VAKmuu0sw
ruGgsbwpgOYJd+W+NKIByn/c4grmO7i77LpilfMFY0GCzQ87HUyVpNur+cmV6U/k
TecmmYHpvPm0KdIBembhLoz2IYrF+Hjhga6/05Cdqa3zr/04GpZnMBxRpVzscYqC
tGwPDBUf
-----END CERTIFICATE-----`,
);

const PASS_CERTIFICATE = forge.pki.certificateFromPem(
  process.env.PASS_CERT_PEM ||
`-----BEGIN CERTIFICATE-----
MIIGNTCCBR2gAwIBAgIQNeTixh4rIPefDNUA0Hc64zANBgkqhkiG9w0BAQsFADB1
MUQwQgYDVQQDDDtBcHBsZSBXb3JsZHdpZGUgRGV2ZWxvcGVyIFJlbGF0aW9ucyBD
ZXJ0aWZpY2F0aW9uIEF1dGhvcml0eTELMAkGA1UECwwCRzQxEzARBgNVBAoMCkFw
cGxlIEluYy4xCzAJBgNVBAYTAlVTMB4XDTIyMTExNDE2NTcwOVoXDTIzMTIxNDE2
NTcwOFowgaUxLzAtBgoJkiaJk/IsZAEBDB9wYXNzLm1hLm1hdGlhcy5jb3ZpZC12
YWNjaW5lLWlkMTYwNAYDVQQDDC1QYXNzIFR5cGUgSUQ6IHBhc3MubWEubWF0aWFz
LmNvdmlkLXZhY2NpbmUtaWQxEzARBgNVBAsMClgyNVM4RzY4R1YxGDAWBgNVBAoM
D01hdGlhcyBNYXJ0aW5lejELMAkGA1UEBhMCQ0wwggEiMA0GCSqGSIb3DQEBAQUA
A4IBDwAwggEKAoIBAQCenNYqQXmguN+UHfdLQUI5LwWaSvm8P3CeZHLxL2Gp3gMe
EupfSwwmHq6gmbXxhOacZ+pfzKqeF+L4t0oI3JOVMf82RcsrbrRQFnBLs6x34GZz
EMl+4GkiAYkC1ptbiIS857FHToRSjDTd0D8Yh4tSc85cVHBKq6dl7LLwYegQPXHM
yjSqtu9S70GYM1xhQoqv2WJ9ETbYDR5/I9JVq9BJIdiA4HkvRd79Imx+SEIkMYmF
N1rHzkMgnIfsVAqaonioZWMzs/7NQxKTe+j97T0jHlvemcIRBX3z4zhE1D81++Ux
HkL6O6BqFFfnTqlCgzg1wdOmEnlJmJ5pjRBrxFW/AgMBAAGjggKOMIICijAMBgNV
HRMBAf8EAjAAMB8GA1UdIwQYMBaAFFvZ+h3nmhoLo5l2IlCGPpHIW3eoMHAGCCsG
AQUFBwEBBGQwYjAtBggrBgEFBQcwAoYhaHR0cDovL2NlcnRzLmFwcGxlLmNvbS93
d2RyZzQuZGVyMDEGCCsGAQUFBzABhiVodHRwOi8vb2NzcC5hcHBsZS5jb20vb2Nz
cDAzLXd3ZHJnNDA0MIIBHgYDVR0gBIIBFTCCAREwggENBgkqhkiG92NkBQEwgf8w
gcMGCCsGAQUFBwICMIG2DIGzUmVsaWFuY2Ugb24gdGhpcyBjZXJ0aWZpY2F0ZSBi
eSBhbnkgcGFydHkgYXNzdW1lcyBhY2NlcHRhbmNlIG9mIHRoZSB0aGVuIGFwcGxp
Y2FibGUgc3RhbmRhcmQgdGVybXMgYW5kIGNvbmRpdGlvbnMgb2YgdXNlLCBjZXJ0
aWZpY2F0ZSBwb2xpY3kgYW5kIGNlcnRpZmljYXRpb24gcHJhY3RpY2Ugc3RhdGVt
ZW50cy4wNwYIKwYBBQUHAgEWK2h0dHBzOi8vd3d3LmFwcGxlLmNvbS9jZXJ0aWZp
Y2F0ZWF1dGhvcml0eS8wHgYDVR0lBBcwFQYIKwYBBQUHAwIGCSqGSIb3Y2QEDjAz
BgNVHR8ELDAqMCigJqAkhiJodHRwOi8vY3JsLmFwcGxlLmNvbS93d2RyZzQtMTAu
Y3JsMB0GA1UdDgQWBBR66OarEbnNftPcw/CAyqZ+/VpxrDAOBgNVHQ8BAf8EBAMC
B4AwLwYKKoZIhvdjZAYBEAQhDB9wYXNzLm1hLm1hdGlhcy5jb3ZpZC12YWNjaW5l
LWlkMBAGCiqGSIb3Y2QGAwIEAgUAMA0GCSqGSIb3DQEBCwUAA4IBAQDQE7JENT1w
iIzW6+vahne7xdhg19wAObsyWBa+0ZpvQQHDIvcP+0WVmkWaB/fOiEoDQVYCNsPW
J5FRSVAjuW3ogUqufkJT5DIRW7LXOE1c4lYaHx85fCGeBtb7SuiL1gBCzY50/GHh
PrIveaYMFpzgcbG2fPE4yfjQ+FFSTsN0BskpERl/C4fw7WxISSaZ2ukfIwmgDm8N
1RNTG+eVePq5wofjAWFYAgWdlg0x477oftT1um9D/REF3VB/cY/zSK0/jjTDGKvQ
S2upKWFGdLaZYDkxhqNp3MwSqVhrud3IcXdLjtU6cAm7MPPkJyai9n7p1B40+rBP
8Z1VTff0Pv+1
-----END CERTIFICATE-----`,
);

function signManifest(key, manifest){
  // create PKCS#7 signed data
  const p7 = forge.pkcs7.createSignedData();
  p7.content = manifest;
  p7.addCertificate(PASS_CERTIFICATE);
  p7.addCertificate(APPLE_CA_CERTIFICATE);
  p7.addSigner({
    key: forge.pki.privateKeyToPem(key),
    certificate: PASS_CERTIFICATE,
    digestAlgorithm: forge.pki.oids.sha1,
    authenticatedAttributes: [
      {
        type: forge.pki.oids.contentType,
        value: forge.pki.oids.data,
      },
      {
        type: forge.pki.oids.messageDigest,
        // value will be auto-populated at signing time
      },
      {
        type: forge.pki.oids.signingTime,
        // value will be auto-populated at signing time
        // value: new Date('2050-01-01T00:00:00Z')
      },
    ],
  });

  /**
   * Creating a detached signature because we don't need the signed content.
   */
  p7.sign({ detached: true });
  
  return Buffer.from(forge.asn1.toDer(p7.toAsn1()).getBytes(), 'binary');
}

module.exports = async (event, response) => {
  const manifest = event.body;
  
  try {
    const parsedManifest = JSON.parse(manifest);

    // validate manifest
    if (typeof parsedManifest !== 'object') {
      return response.status(400).send('manifest is malformed');
    }
    const keys = Object.keys(parsedManifest).sort()
    const refKeys = ["icon@2x.png", "icon@3x.png", "logo@2x.png", "logo@3x.png", "pass.json"]

    if (JSON.stringify(keys) !== JSON.stringify(refKeys)) {
      return response.status(400).send('manifest missing mandatory keys. Got ' + JSON.stringify(keys) + ' but waiting ' + JSON.stringify(refKeys));
    }
    
    for (const e of keys) {
      if ((typeof e !== "string") || e.length <= 0) {
        return response.status(400).send('manifest keys missing values');
      }
    }
  } catch (e) {
    return response.status(400).send('manifest is malformed');
  }
  
  // Key:
  const signerKeyMessage = process.env.KEY;
  const signerKeyPassphrase = process.env.KEY_PASSPHRASE;
  
  let key = forge.pki.decryptRsaPrivateKey(signerKeyMessage, signerKeyPassphrase);
  
  if (!key) {
    return response.status(400).send('the private key cannot be decrypted');
  }
  
  // Sign manifest:
  try {
      const signature = signManifest(key, manifest);
      const base64data = signature.toString('base64');
      
      return response.status(200).send(base64data);
  
  } catch (error) {
      return response.status(500).send(error.status + error.message);
  }
}
