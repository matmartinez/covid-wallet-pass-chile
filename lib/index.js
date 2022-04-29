import DataDetector from "./detector/DataDetector.js";
import ChileanVaccinationPassParser from "./parser/ChileanVaccinationPassParser.js";
import PassGenerator from "./pass/PassGenerator.js";
import { saveAs } from 'file-saver';
import readFile from "./utilities/FileReader+Async.js";

class PassManager {
  
  async addPassForPDF(file){
    const contentBuffer = await readFile(file);
    const detector = new DataDetector(contentBuffer);
    const matches = await detector.matches();
    
    for (const match of matches) {
      const { pageText, detectedCode } = match;
      
      if (!detectedCode) {
        throw new Error("QR code couldn't be extracted.");
        
        break;
      }
      
      if (!pageText) {
        throw new Error("PDF text couldn't be extracted.");
        
        break;
      }
      
      let URLFromDetectedCode;
      try {
        const convertedToURL = new URL(detectedCode.data);
        
        URLFromDetectedCode = convertedToURL.toString();
      } catch (error) {
        throw new Error("An URL couldn't be obtained from the QR code.", { cause: error });
        
        break;
      }
      
      try {  
        let parser = new ChileanVaccinationPassParser();
        let data = parser.parse(pageText);
        
        let generator = new PassGenerator();
        let pass = await generator.data({ user: data, barcodeURL: URLFromDetectedCode });
        
        saveAs(pass, "pass.pkpass");
        
        break;
      } catch (error) {
        throw new Error("The pass couldn't be signed.", { cause: error });
      }
    }
  }
  
}

export { PassManager };
