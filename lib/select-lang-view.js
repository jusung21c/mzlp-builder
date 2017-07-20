'use babel';
import remote from 'remote';
window.$ = window.jQuery = require('jquery');

export default class SelectLangView{
  constructor(builder) {

    this._langlist = this.getLangList()
    this._builder=builder;

    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('langSelectView');

    this.element.appendChild(document.createTextNode(this._builder + "언어 선택"))
    this.element.appendChild(this.getLangElements());

    let buttons = document.createElement('div');
    buttons.appendChild(this.getButton("OK"));
    buttons.appendChild(this.getButton("Cancel"));

    this.element.appendChild(buttons);
  }


  // Returns an object that can be retrieved when package is activated
  serialize() {

  }

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

  getLangElements(){
    let langList = this.getLangList();
    let div,input,label;
    let output = document.createElement('div');
    for (let i in langList){
      div = document.createElement('div');

      input = document.createElement('input');
      input.classList.add('input-toggle');
      input.setAttribute('type','checkbox');
      input.setAttribute('unchecked','');
      input.setAttribute('id','sel_lang_'+langList[i]);

      label = document.createElement('label');
      label.classList.add('input-label')
      label.appendChild(document.createTextNode(langList[i]));
      label.classList.add("langList")

      label.appendChild(input);
      div.appendChild(label);
      output.appendChild(div);
    }
    return output;
  }

  getButton(string){

    var btn = document.createElement('button');
    btn.classList.add('btn','btn-primary','inline-block-tight');
    btn.appendChild(document.createTextNode(string));
    btn.setAttribute('id',"btn_lang_"+string);
    btn.addEventListener('click',"this.btn_lang_"+string);
    return(btn);
  }
  getPathFromTreeview(){
    var treeView;
    if(atom.packages.isPackageLoaded("tree-view")){
      treeView = atom.packages.getLoadedPackage("tree-view");
      treeView = treeView.mainModule.treeView;
      return treeView.selectedPath;
    }
  }

  getLangList(){
    let Finder = require('fs-finder');
    let path = require('path');
    let dirpath;
    let baseDir = this.getRootPath();   //02. Index DB Builder/Input 폴더 안의 언어를 탐색한다.
    let lang=[];
    try {
      let directories = Finder.in(baseDir+"/02. Index DB Builder/Input").findDirectories();
      for(let i in directories){
        dirpath= path.normalize(directories[i]);
        dirpath= path.basename(dirpath);
        if(dirpath.length==3 && dirpath==dirpath.toUpperCase()){
          lang.push(dirpath);
        }
      }
      return lang;
    } catch (e) {
      console.log(e);
      alert(e.error);
    } finally {

    }

  }

  getRootPath(){
      var treeView;
      if(atom.packages.isPackageLoaded("tree-view")){
          treeView = atom.packages.getLoadedPackage("tree-view");
          treeView = treeView.mainModule.treeView;
          return treeView.list.querySelector('.project-root-header').children[0].getAttribute('data-path');
      }
  }


}
