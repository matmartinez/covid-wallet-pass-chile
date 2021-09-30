const pdfjs = require("pdfjs-dist");
pdfjs.GlobalWorkerOptions.workerSrc = require("pdfjs-dist/build/pdf.worker.entry.js");

const jsQR = require("jsqr");

const detect = async (pdf, pageNumber) => {
  const page = await pdf.getPage(pageNumber);
  
  // Text:
  const tokenizedText = await page.getTextContent();
  const pageText = tokenizedText.items.map(token => token.str).join(" ");
  
  // QRs:
  const viewport = page.getViewport({ scale: 1.5 });
  const ctx = create2DContext(viewport.width, viewport.height);
  
  const renderTask = await page.render({ canvasContext: ctx, viewport: viewport }).promise;
  const imageData = ctx.getImageData(0, 0, viewport.width, viewport.height);
  const detectedCode = jsQR(imageData.data, viewport.width, viewport.height);
  
  // Data:
  return { pageText, detectedCode };
};

const create2DContext = (width, height) => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  
  return canvas.getContext("2d");
};

class DataDetector {
  
  constructor(buffer){
    if (!buffer) {
      throw "A buffer must be passed."
    }
    
    this.buffer = buffer;
  }
  
  async matches(){
    const pdf = await pdfjs.getDocument(this.buffer).promise;
    
    const maxPages = pdf.numPages;
    const detectorPromises = [];

    for (let pageNo = 1; pageNo <= maxPages; pageNo += 1) {
      detectorPromises.push(detect(pdf, pageNo));
    }
    
    const matches = await Promise.all(detectorPromises);
    
    return matches;
  }
  
}

export default DataDetector;
