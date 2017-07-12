'use babel';
import remote from 'remote';
window.$ = window.jQuery = require('jquery');

export default class BuilderSettingView{
  // getBuilderList(){
  //   let builder_list=["tableBuilder","indexDBBuilder","lexDBBuilder","grammarDBBuilder","programDBBuilder","dialogDBBuilder","scenarioDBBuilder","promptDBBuilder","referenceDBBuilder"];
  //   return builder_list;
  // }

  constructor(serializedState) {
    const builderList = atom.config.get('mzlp-builder.builderList');
    var builder_list = builderList.replace(/ /g, '').split(',');

    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('mzlp-builder');

    for(let i in builder_list){
      console.log(builder_list[i]);
      this.element.appendChild(this.getConfigElements(builder_list[i]));
    }

  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

  getConfigElements(builder){
    var configelement = document.createElement("div");
    configelement.classList.add('block');

    var icon=document.createElement("label");
    icon.classList.add('icon','icon-file-directory');
    icon.appendChild(document.createTextNode(builder));
    var pathform = document.createElement("input");
    var button = document.createElement("button");
    button.classList.add('btn','icon','icon-gear','inline-block-tight');
    button.appendChild(document.createTextNode("Setting"));
    button.setAttribute("id","btn_"+builder);


    pathform.classList.add('input-text');
    pathform.setAttribute("value", atom.config.get("mzlp-builder."+builder));
    pathform.setAttribute("id", "path_"+builder);


    configelement.appendChild(icon);
    configelement.appendChild(button);
    configelement.appendChild(pathform);

    return configelement;
  }




}
