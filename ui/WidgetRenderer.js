class WidgetRenderer {
  
  constructor(options){
    const { container, actions } = options;
    
    this.container = container;
    this.actions = { ... actions };
  }
  
  render(widget){
    const { actions, container } = this;
    const { render } = widget;
    
    container.innerHTML = render.bind(widget)();
    
    for (const [key, action] of Object.entries(actions)) {
      const dashed = key.replace(/[A-Z]/g, m => "-" + m.toLowerCase());
      const attribute = `data-action-${dashed}`
      
      for (const element of container.querySelectorAll(`[${attribute}]`)) {
        element.addEventListener("click", action);
      }
    }
  }
  
  attach(widget, state){
    widget.renderer = this;
    widget.set = (newState) => {
      widget.state = newState;
      this.render(widget);
    };
    
    if (state){
      widget.set(state);
    }
  }
  
}

export default WidgetRenderer;
