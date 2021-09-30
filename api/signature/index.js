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
MIIGBDCCBOygAwIBAgIIfKvB+mwAIUQwDQYJKoZIhvcNAQEFBQAwgZYxCzAJBgNV
BAYTAlVTMRMwEQYDVQQKDApBcHBsZSBJbmMuMSwwKgYDVQQLDCNBcHBsZSBXb3Js
ZHdpZGUgRGV2ZWxvcGVyIFJlbGF0aW9uczFEMEIGA1UEAww7QXBwbGUgV29ybGR3
aWRlIERldmVsb3BlciBSZWxhdGlvbnMgQ2VydGlmaWNhdGlvbiBBdXRob3JpdHkw
HhcNMjEwOTIwMjE0NDQ0WhcNMjIwOTIwMjE0NDQzWjCBpTEvMC0GCgmSJomT8ixk
AQEMH3Bhc3MubWEubWF0aWFzLmNvdmlkLXZhY2NpbmUtaWQxNjA0BgNVBAMMLVBh
c3MgVHlwZSBJRDogcGFzcy5tYS5tYXRpYXMuY292aWQtdmFjY2luZS1pZDETMBEG
A1UECwwKWDI1UzhHNjhHVjEYMBYGA1UECgwPTWF0aWFzIE1hcnRpbmV6MQswCQYD
VQQGEwJVUzCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAN/P6/FhZexx
kkw3R5PqX+ubEc9TfUPTtwkTH2j463bbTUXY10Nzgb6m6EP+d4dXLDrV4Bp4N9Bb
MCMRb52E1H4VDlYqYxBBJ35rZoLJnOlP3br8U8zxk7C5Vnp0FpNnui6U6LnOHICu
nTf7iY3Vc2whDcRCoZ9aLoGj7SWwPRNZNqOWqXKu34+DG4xvJ5CZnMBfrlPJSl8w
nEtIxFdtRbqHT2y+SDiSmXfB1Eeg+PhSoSzXDmRpdXfUd6oX6fOqtRMqjnWLpm96
YXLLHd9iRiH4kVV7p7uJQ00wgwKHIhy+b5GEiJQe8sHq6HpOZzXX8svvyD0B2IpR
Mk/f59vHwkkCAwEAAaOCAkMwggI/MAkGA1UdEwQCMAAwHwYDVR0jBBgwFoAUiCcX
Cam2GGCL7Ou69kdZxVJUo7cwPQYIKwYBBQUHAQEEMTAvMC0GCCsGAQUFBzABhiFo
dHRwOi8vb2NzcC5hcHBsZS5jb20vb2NzcC13d2RyMDMwggEPBgNVHSAEggEGMIIB
AjCB/wYJKoZIhvdjZAUBMIHxMCkGCCsGAQUFBwIBFh1odHRwOi8vd3d3LmFwcGxl
LmNvbS9hcHBsZWNhLzCBwwYIKwYBBQUHAgIwgbYMgbNSZWxpYW5jZSBvbiB0aGlz
IGNlcnRpZmljYXRlIGJ5IGFueSBwYXJ0eSBhc3N1bWVzIGFjY2VwdGFuY2Ugb2Yg
dGhlIHRoZW4gYXBwbGljYWJsZSBzdGFuZGFyZCB0ZXJtcyBhbmQgY29uZGl0aW9u
cyBvZiB1c2UsIGNlcnRpZmljYXRlIHBvbGljeSBhbmQgY2VydGlmaWNhdGlvbiBw
cmFjdGljZSBzdGF0ZW1lbnRzLjAeBgNVHSUEFzAVBggrBgEFBQcDAgYJKoZIhvdj
ZAQOMDAGA1UdHwQpMCcwJaAjoCGGH2h0dHA6Ly9jcmwuYXBwbGUuY29tL3d3ZHJj
YS5jcmwwHQYDVR0OBBYEFFSsc6akMzrt64UPN1Lt9go7P5QjMAsGA1UdDwQEAwIH
gDAQBgoqhkiG92NkBgMCBAIFADAvBgoqhkiG92NkBgEQBCEMH3Bhc3MubWEubWF0
aWFzLmNvdmlkLXZhY2NpbmUtaWQwDQYJKoZIhvcNAQEFBQADggEBAL52WC6RE5K2
x6Ap+gp+tuE1/TpN6r5sNfrF9cffRofhtc20kBq5smh4WLpRmXv5yT/OGc1WxACr
ATKaMJPamgaCRgQvsoKBDZipcyFgCJhw1FDwd1e3iO/CU2gClxkNh1dKc/Q7a7HP
KdHI/oG5cQogRcuvt47A5rYAQtysX0TGjW8dcm2QCbynjIcIbQNThQLQ2zCMuQwK
KtVec1ngfAID3Lwv0XCzsAZy0BGFTgZF5UtUG3kgPl0jRGlE3Pok2E0tgqsrKwkG
A5nQ78oWkl3BP7ZW+EbByP5JrcKLvFnvwSPLvc5GZ10hUNUeG5tplFiWWVPDSRYX
tooYXp9SuAk=
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
