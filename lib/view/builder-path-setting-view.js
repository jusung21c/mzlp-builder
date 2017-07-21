'use babel';
import remote from 'remote';
window.$ = window.jQuery = require('jquery');


export default class BuilderSettingView{
  constructor(serializedState) {
    const builderList = atom.config.get('mzlp-builder.builderList');
    this._builderlist = builderList.replace(/ /g, '').split(',');

    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('mzlp-builder');
    this.element.appendChild(document.createTextNode("빌더 경로 설정"))
    for(let i in this._builderlist){
      this.element.appendChild(this.getConfigElements(this._builderlist[i]));
    }
    this.element.appendChild(this.getButton("OK"));


  }


  // Returns an object that can be retrieved when package is activated
  // serialize() {
  //   console.log("진입")
  //   this.settingClickListener()
  //
  // }
  initialize(){
  }

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

  getButton(string){
    var btn_div = document.createElement('div');
    btn_div.classList.add('block')

    var btn = document.createElement('button');
    btn.classList.add('btn','btn-primary','inline-block-tight');
    btn.appendChild(document.createTextNode(string));
    btn.setAttribute('id',"btn_settings_"+string);
    btn_div.appendChild(btn);
    return(btn_div);
  }




    getRootPath(){
        var treeView;
        if(atom.packages.isPackageLoaded("tree-view")){
            treeView = atom.packages.getLoadedPackage("tree-view");
            treeView = treeView.mainModule.treeView;
            return treeView.list.querySelector('.project-root-header').children[0].getAttribute('data-path');
        }
    }
    getPathFromTreeview(){
        var treeView;
        if(atom.packages.isPackageLoaded("tree-view")){
            treeView = atom.packages.getLoadedPackage("tree-view");
            treeView = treeView.mainModule.treeView;
            return treeView.selectedPath;
        }
    }

}
