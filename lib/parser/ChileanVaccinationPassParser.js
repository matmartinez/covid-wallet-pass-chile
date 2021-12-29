import Scanner from "./Scanner.js";

class Parser {
  
  constructor(expectations) {
    this.expectations = expectations;
    this.allExpectationsValues = Object.keys(expectations).map((key) => { return expectations[key]; });
  }

  parse(string){
    const { expectations, allExpectationsValues } = this; 
    
    let text = string.replace(/\s+/g, ' ').trim();
    let scanner = new Scanner(text);
    
    let description = {};
    
    for (const [key, value] of Object.entries(expectations)) {
      scanner.location = 0;
      
      // Break if label was not found:
      if (scanner.scanUpToString(value) == undefined) {
        break;
      }
      
      // Scan up to next label:
      const scannedToken = scanner.scanUpToString(":");
      
      if (!scannedToken) {
        break;
      }
      
      // Sanitize end:
      let sanitizedToken = scannedToken.trim();
      
      for (const term of allExpectationsValues) {
        let termIdx = sanitizedToken.indexOf(term);
        if (termIdx !== -1) {
          sanitizedToken = sanitizedToken.substring(0, termIdx);
        }
      }
      
      description[key] = sanitizedToken.trim();
    } 
    
    return description;
  }
  
}


class ChileanVaccinationPassParser {
  
  parse(string){
    const versions = [
      {
        name: "Nombre:",
        id: "Documento:",
        born: "Fecha de nacimiento:",
        kind: "Esquema:",
        booster_kind: "3 Dosis"
      },
      
      {
        last_name: "Apellidos / Last Name:",
        first_name: "Nombres / First and Middle Name:",
        id: "N° de Documento / Document ID:",
        born: "Fecha de Nacimiento / Date of Birth:",
        kind: "Esquema:",
        booster_kind: "Refuerzo Laboratorio fabricante / Manufacturer:"
      }
    ];
    
    let parsedResult; 
    
    for (const expectations of versions) {
      const parser = new Parser(expectations);
      const result = parser.parse(string);
      
      if (Object.keys(result).length > 0) {
        parsedResult = result;
        break;
      }
    }
    
    return this.normalize(parsedResult);
  }
  
  normalize(result){
    let normalized = { ... result };
    
    // #1: Name:
    let { name } = result;
    
    // Use a single field and format for `name`:
    if (result.first_name || result.last_name) {
      name = `${result.last_name}, ${result.first_name}`;
      
      delete normalized.first_name;
      delete normalized.last_name;
    }
    
    // Use correct capitalization for `name`:
    const toTitleCase = (phrase) => {
      return phrase
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    };
    
    const reversedName = name.split(", ").reverse().join(" ");
    name = toTitleCase(reversedName);
    
    normalized.name = name;
    
    // #2: Single field:
    for (const key of [ "born", "kind", "booster_kind" ]) {
      const value = normalized[key];
      if (value) {
        const idx = value.indexOf(" ");
        if (idx !== -1) {
          normalized[key] = value.substring(0, idx);
        }
      }
    }
    
    return normalized;
  }
  
}

export default ChileanVaccinationPassParser;
