'use babel';

import BuilderSettingView from './builder-path-setting-view';
import SelectLangView from './select-lang-view';
import { CompositeDisposable } from 'atom';
import path from 'path';
import fs from 'fs';
import remote from 'remote';

export default {
  config: require('./config'),
  mzlpBuilderView: null,
  modalPanel: null,
  builderPathSettingPanel:null,
  selectLangPanel:null,
  subscriptions: null,

  activate(state) {
    this.BuilderSettingView = new BuilderSettingView(state.BuilderSettingViewState);

    this.builderPathSettingPanel = atom.workspace.addModalPanel({
      item: this.BuilderSettingView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'mzlp-builder:builderPathSettingToggle': () => this.builderPathSettingToggle()
    }));
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'mzlp-builder:selectLangViewToggle': () => this.selectLangViewToggle()
    }));
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'mzlp-builder:tableBuilder': () => this.tableBuilder()
    }));
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'mzlp-builder:indexDBBuilder': () => this.indexDBBuilder()
    }));
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'mzlp-builder:lexDBBuilder': () => this.lexDBBuilder()
    }));
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'mzlp-builder:grammarDBBuilder': () => this.grammarDBBuilder()
    }));
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'mzlp-builder:programDBBuilder': () => this.programDBBuilder()
    }));
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'mzlp-builder:dialogDBBuilder': () => this.dialogDBBuilder()
    }));
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'mzlp-builder:scenarioDBBuilder': () => this.scenarioDBBuilder()
    }));
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'mzlp-builder:promptDBBuilder': () => this.promptDBBuilder()
    }));
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'mzlp-builder:referenceDBBuilder': () => this.referenceDBBuilder()
    }));

    this.settingClickListener();
  },

  deactivate() {
    this.builderPathSettingPanel.destroy();
    this.selectLangPanel.destroy();
    this.subscriptions.dispose();
    this.mzlpBuilderView.destroy();
    this.SelectLangView.destroy();
  },

  builderPathSettingToggle(){
    return (
      this.builderPathSettingPanel.isVisible() ?
      this.builderPathSettingPanel.hide() :
      this.builderPathSettingPanel.show()
    );
  },
  selectLangViewToggle(){
    return (
      this.selectLangPanel.isVisible() ?
      this.selectLangPanel.hide() :
      this.selectLangPanel.show()
    );
  },

  toggle() {
    console.log('MzlpBuilder was toggled!');
    return (
      this.builderPathSettingPanel.isVisible() ?
      this.builderPathSettingPanel.hide() :
      this.builderPathSettingPanel.show()
    );
  },

  serialize() {
    return {
      BuilderSettingViewState: this.BuilderSettingView.serialize()
    };
  },

  tableBuilder(){
    console.log("Table Builer was executed");
    this.SelectLangView = new SelectLangView();
    this.selectLangPanel = atom.workspace.addModalPanel({
      item: this.SelectLangView.getElement(),
      visible: false
    });
    this.LangClickListener();

    this.selectLangPanel.show()
    console.log(this.getPathFromTreeview());
    let lang = "KOK"
    let inputFilePath = this.getPathFromTreeview()+"/input/"+lang+"/DIALOG."+lang+".TABLE.DEFINITION";

    let exec = require("child_process").exec;
    let builderpath = "C:/LP_Data/LP Tools/01. Table Builder/Builder/Table Builder.exe";

    let command ="cd " + this.makeDoubleQuotes(path.dirname(builderpath)) +" && ";
    command += this.makeDoubleQuotes(builderpath) + " -V " + this.makeDoubleQuotes(inputFilePath);
    console.log("command String : " + command);
    exec(command);
  },
  indexDBBuilder(){
    console.log("Index DB Buiilder was executed");

  },
  lexDBBuilder(){
    console.log("Lex DB Builer was executed");

  },
  grammarDBBuilder(){
    console.log("Grammar DB Builer was executed");

  },
  programDBBuilder(){
    console.log("Program DB Builer was executed");

  },
  dialogDBBuilder(){
    console.log("Dialog DB Builer was executed");

  },
  scenarioDBBuilder(){
    console.log("Scenario DB Builer was executed");

  },
  promptDBBuilder(){
    console.log("Prompt DB Builer was executed");

  },
  referenceDBBuilder(){
    console.log("Reference DB Builer was executed");

  },
  getPathFromTreeview(){
    var treeView;
    if(atom.packages.isPackageLoaded("tree-view")){
      treeView = atom.packages.getLoadedPackage("tree-view");
      treeView = treeView.mainModule.treeView;
      return treeView.selectedPath;
    }
  },
  getLangList(){
    let Finder = require('fs-finder');
    let path = require('path');
    let dirpath;
    // 해당 디렉토리 설정
    let baseDir = this.getPathFromTreeview();
    let lang=[];
    Finder.in(baseDir+"/Input").findDirectories(function(directories) {
      for(var i in directories){
        dirpath= path.normalize(directories[i]);
        dirpath= path.basename(dirpath);
        if(dirpath.length==3 && dirpath==dirpath.toUpperCase()){  //대문자로 3글자인 디렉토리 추출
        lang.push(dirpath);
        }
      }
    });
    return lang;
  },

  makeDoubleQuotes(path){
    return ("\""+path+"\"");
  },

  settingClickListener(){
    const builderList = atom.config.get('mzlp-builder.builderList');
    var builder_list = builderList.replace(/ /g, '').split(',');
    var self = this;

    for(let i in builder_list){
      $("#btn_"+builder_list[i]).click(function(){
        const {dialog} = require('electron').remote;
        let builderpath =dialog.showOpenDialog({properties: ['openFile']});
        let configpath = "mzlp-builder."+builder_list[i];
        // console.log(configpath+"    "+builderpath);
        // console.log(typeof builderPath);
        //취소 누를시
        if(typeof builderpath !== "undefined"){
          atom.config.set(configpath,builderpath[0]);
          $("#path_"+builder_list[i]).attr("value",builderpath);
        }

      });
    }
    $("#btn_settings_OK").click(function(){
      self.builderPathSettingPanel.hide();
    })
  },

  LangClickListener(){
    const langList = atom.config.get('mzlp-builder.langList');


    var self = this;

    $("#btn_lang_OK").click(function(){
      for(let i in langList){
          if($('#sel_lang_'+langList[i]).is(":checked")){
            alert(langList[i]+"is checked!");
          }
      };
      self.selectLangPanel.hide();
    });

    $("#btn_lang_Cancel").click(function(){
      self.selectLangPanel.hide();
    });

  }

};
