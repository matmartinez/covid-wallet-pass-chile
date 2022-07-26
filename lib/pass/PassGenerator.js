import Template from "./Template.js";
import JSZIP from "jszip";

class PassGenerator {

  async data(state) {
    const pass = new Template().build(state);
    const passJSON = JSON.stringify(pass);

    let manifest = {
      "icon.png": "0bad882eb1ec07982911651d63fe104c2101feed",
      "icon@2x.png": "6311feec240c62ffc3f259a49b3b71338ed70fec",
      "icon@3x.png": "e8b46d9e639b9af90084f7b3daec8448a5a1a613",
      "logo@2x.png": "c3c36c53e05a367090158d182f40537cb2db7528",
      "logo@3x.png": "39fce158fecd963711800ba86d56e3ef05ab9985"
    };

    const sha = await shaOne(passJSON);
    manifest["pass.json"] = hex(sha);

    // Create a ZIP:
    let passbook = new JSZIP();

    // Add manifest and pass to it:
    passbook.file("pass.json", passJSON);
    passbook.file("manifest.json", JSON.stringify(manifest));

    // Add assets:
    passbook.file("icon.png", await asset("/pass/icon.png"));
    passbook.file("icon@2x.png", await asset("/pass/icon@2x.png"));
    passbook.file("icon@3x.png", await asset("/pass/icon@3x.png"));
    passbook.file("logo@2x.png", await asset("/pass/logo@2x.png"));
    passbook.file("logo@3x.png", await asset("/pass/logo@3x.png"));

    // Signature:
    try {
      let response = await fetch("/api/signature/", {
        method: "POST",
        body: JSON.stringify(manifest)
      });

      if (!response.ok || response.status !== 200) {
        throw new Error(response.statusText);
      }

      let signature = await response.text();
      passbook.file("signature", signature, { base64: true, binary: true });

    } catch (error) {
      throw new Error("Couldn't sign the pass", { cause: error });
    }

    // Generate blob:
    let blob = await passbook.generateAsync({ type: "blob", mimeType: "application/vnd.apple.pkpass" });

    return blob;
  }

}

async function asset(name) {
  const response = await fetch(name);
  const contents = await response.blob();
  return contents;
}

function shaOne(str) {
  const buffer = new TextEncoder("utf-8").encode(str);
  return crypto.subtle.digest("SHA-1", buffer);
}

function hex(buffer) {
  const hashArray = Array.from(new Uint8Array(buffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export default PassGenerator;
