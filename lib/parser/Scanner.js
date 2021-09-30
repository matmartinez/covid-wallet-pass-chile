class Scanner {
  
  constructor(string){
    this.string = string || "";
    this.location = 0;
    this.caseSensitive = false;
    this.charactersToBeSkipped = [];
  }
  
  scanString(stringToScan){
    const { string, location } = this;
    
    const idx = string.indexOf(stringToScan, location);
    const advances = (idx == location);
    
    if (advances) {
      this.location = location + stringToScan.length;
      
      return string.substring(location, this.location);
    }
    
    return undefined;
  }
  
  scanUpToString(stopString){
    const { string, location } = this;
    
    const idx = string.indexOf(stopString, location);
    const matches = (idx != -1);
    
    if (matches) {
      this.location = idx + stopString.length;
      
      return string.substring(location, this.location);
      
    } else {
      this.location = string.length; // At end.
      
      return string.substring(location);
    }
  }
  
  scanCharacters(){
    
  }
  
  scanUpToCharacters(){
    
  }
  
}

export default Scanner;
