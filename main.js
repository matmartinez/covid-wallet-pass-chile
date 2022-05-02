import { PassManager } from "./lib/index.js";
import { WidgetRenderer } from "./ui/index.js";

class Widget {
  
  render(){
    const { state } = this;
    
    return `<div class="widget">
      <button class="add-to-wallet" data-action-add-to-wallet ${(state == WidgetState.adding || state == WidgetState.unsupported) ? "disabled" : ""} aria-label="Añadir a Apple Wallet">${this.addToAppleWalletIcon()}</button>
      
      <figure class="icon">${this.accessoryIconForState(state)}</figure>
      <span class="label">${this.labelForState(state)}</span>
    </div>`;
  }
  
  labelForState(state){
    return {
      initial: "Añadir el pase requiere el PDF de tu Comprobante de Vacunación.",
      adding: "Generando el pase…",
      done: "¡Listo!",
      error: `Hubo un problema al intentar generar el pase. Puedes intentarlo otra vez con un archivo diferente o <a href="https://twitter.com/martinez">escribirme</a>.`,
      unsupported: "Abre este sitio web desde Safari para generar el pase."
    }[state];
  }
  
  accessoryIconForState(state){
    const name = {
      initial: "doc",
      adding: "progress",
      done: "check",
      error: "exclamation",
      unsupported: "browser"
    }[state];
    
    return `<svg width="22" height="22" aria-hidden="true">
      <use xlink:href="#${name}"></use>
    </svg>`;
  }
  
  addToAppleWalletIcon(){
    return `<svg width="202" height="63" aria-hidden="true">
      <use xlink:href="#add-to-apple-wallet"></use>
    </svg>`;
  }
  
}

const WidgetState = {
  initial: "initial",
  adding: "adding",
  done: "done",
  error: "error",
  unsupported: "unsupported"
};

const main = () => {
  let inputElement;
  let widgetUI;
  
  const fileSectionChangeHandler = async (event) => {
    widgetUI.set(WidgetState.adding);
    
    try {
      const file = inputElement.files[0];
      
      const manager = new PassManager();
      await manager.addPassForPDF(file);
      
    } catch(exception) {
      console.log("Dang it. The pass couldn't be added.", exception);
      widgetUI.set(WidgetState.error);
      return;
    }
    
    widgetUI.set(WidgetState.done);
  };
  
  // Binds UI with actions:
  const bind = () => {
    const form = document.querySelector("form");
    
    inputElement = form.source;
    inputElement.onchange = fileSectionChangeHandler;
    
    widgetUI = new Widget();
    
    const renderer = new WidgetRenderer({
      container: document.querySelector(".widget-container"),
      actions: {
        addToWallet() {
          form.reset();
          inputElement.click();
        }
      }
    });
    
    renderer.attach(widgetUI, WidgetState.initial);
    
    // Unsupported browser hack:
    // For some reason, Chrome for iOS won't handle passes correctly.
    // Note: "CriOS" matches Chrome for iOS https://developer.chrome.com/docs/multidevice/user-agent/
    const unsupportedMobileSafari = (navigator.userAgent.match("CriOS"));
    if (unsupportedMobileSafari) {
      widgetUI.set(WidgetState.unsupported);
    }
  };
  
  document.addEventListener("DOMContentLoaded", bind);  
};

main();
