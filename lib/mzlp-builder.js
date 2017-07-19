'use babel';

import BuilderSettingView from './builder-path-setting-view';
import SelectLangView from './select-lang-view';
import { CompositeDisposable } from 'atom';
import path from 'path';
import fs from 'fs';

export default {
  config: require('./config'),
  mzlpBuilderView: null,
  modalPanel: null,
  builderPathSettingPanel:null,
  selectLangPanel:null,
  subscriptions: null,
  selectedVal:null,

  activate(state) {

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'mzlp-builder:builderPathSettingToggle': () => this.builderPathSettingModal()
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
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'mzlp-builder:toggle': () => this.toggle()
    }));

  },

  deactivate() {
    this.builderPathSettingPanel.destroy();
    this.selectLangPanel.destroy();
    this.mzlpBuilderView.destroy();
    this.SelectLangView.destroy();
    this.subscriptions.dispose();
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

   builderPathSettingModal(){
     if(this.builderPathSettingPanel!=null){this.builderPathSettingPanel.destroy();}
     this.BuilderSettingView = new BuilderSettingView();
     this.builderPathSettingPanel = atom.workspace.addModalPanel({
         item: this.BuilderSettingView.getElement(),
         visible: false
     });
       this.builderPathSettingPanel.show();
   },

  toggle() {
    console.log('MzlpBuilder was toggled!');

  },

  serialize() {
    return {

    };
  },

  tableBuilder(){
    this.getSelectLangPanel("tableBuilder");
  },

  indexDBBuilder(){
    this.getSelectLangPanel("indexDBBuilder");
  },
  lexDBBuilder(){
      this.getSelectLangPanel("lexDBBuilder");

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

  getSelectLangPanel(builder){
    if(this.selectLangPanel!=null){this.selectLangPanel.destroy();}
    this.SelectLangView = new SelectLangView();
    this.selectLangPanel = atom.workspace.addModalPanel({
        item: this.SelectLangView.getElement(),
        visible: false
    });
    this.selectLangPanel.show();
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
  }


};


