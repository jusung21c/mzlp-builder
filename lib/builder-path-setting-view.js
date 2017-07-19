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
      //console.log(builder_list[i]);
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
    cnosole.log('hello')
    this.settingClickListener()
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

    settingClickListener(){
      console.log("빌드 패스 설정 리스너 진입")
      let builder_list = this._builderlist
      var self = this;

      for(let i in builder_list){
          $("#btn_"+builder_list[i]).click(function(){
              const {dialog} = require('electron').remote;
              let builderpath =dialog.showOpenDialog({properties: ['openFile']});
              let configpath = "mzlp-builder."+builder_list[i];

              if(typeof builderpath !== "undefined"){
                  atom.config.set(configpath,builderpath[0]);
                  $("#path_"+builder_list[i]).attr("value",builderpath);
                  console.log(self.findDestBuilderPath(builder_list[i],self.getRootPath()));
                  self.copyFile(builderpath[0],self.findDestBuilderPath(builder_list[i],self.getRootPath()));
              }
          });
      }
      $("#btn_settings_OK").click(function(){
          $('.mzlp-builder').parent().hide()
      })
    }


    copyFile(from,to){
        var ncp=require('ncp').ncp;
        ncp(from,to,function(err){
            if(err) {
                let tmp = "abc";
                tmp += err;
                //atom.notifications.addError(err);
                return console.error(err);
            }
            console.log('done!');
        });

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
    findDestBuilderPath(buildername,rootpath){
        let destbuilderpath;
        switch (buildername) {
            case "tableBuilder":
                destbuilderpath=rootpath+'/01. Table Builder/Builder/Table Builder.exe'
                break;
            case "indexDBBuilder":
                destbuilderpath=rootpath+'/02. Index DB Builder/Builder/Index DB Builder.exe'
                break;
            case "lexDBBuilder":
                destbuilderpath=rootpath+'/03. Lex DB Builder/Builder/Lex DB Builder.exe'
                break;
            case "grammarDBBuilder":
                destbuilderpath=rootpath+'/04. Grammar DB Builder/Builder/Grammar DB Builder.exe'
                break;
            case "programDBBuilder":
                destbuilderpath=rootpath+'/05. Program DB Builder/Builder/Program Builder.exe'
                break;
            case "dialogDBBuilder":
                destbuilderpath=rootpath+'/06. Dialog DB Builder/Builder/Dialog DB Builder.exe'
                break;
            case "scenarioDBBuilder":
                destbuilderpath=rootpath+'/07. Scenario Builder/Builder/Scenario Builder.exe'
                break;
            case "promptDBBuilder":
                destbuilderpath=rootpath+'/08. Prompt DB Builder/Builder/Prompt DB Builder.exe'
                break;
            case "referenceDBBuilder":
                destbuilderpath=rootpath+'/09. Reference DB Builder/Builder/Reference DB Builder.exe'
                break;

            default:
        }
        return destbuilderpath;
    }
}
