'use babel';

import BuilderSettingView from './builder-path-setting-view';
import { CompositeDisposable } from 'atom';
import path from 'path';
import fs from 'fs';
import remote from 'remote';

export default {
  config: require('./config'),
  mzlpBuilderView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.BuilderSettingView = new BuilderSettingView(state.BuilderSettingViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.BuilderSettingView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'mzlp-builder:toggle': () => this.toggle()
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
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.mzlpBuilderView.destroy();
  },

  setPath(builder){
    const {dialog} = require('electron').remote;
    let builderPath =dialog.showOpenDialog({properties: ['openFile']});
    atom.config.set("mzlp-builder."+builder,builderPath);
    $("#path_"+builder).attr("value","builderPath");
  },

  settingClickListener(){
    const builderList = atom.config.get('mzlp-builder.builderList');
    var builder_list = builderList.replace(/ /g, '').split(',');

    for(let i in builder_list){
      $("#btn_"+builder_list[i]).click(function(){
        const {dialog} = require('electron').remote;
        let builderpath =dialog.showOpenDialog({properties: ['openFile']});
        let configpath = "mzlp-builder."+builder_list[i];
        console.log(configpath+"    "+builderpath);
        console.log(atom.config.set(configpath,builderpath[0]));
        $("#path_"+builder_list[i]).attr("value",builderpath);
      });
    }

  },


  serialize() {
    return {
      BuilderSettingViewState: this.BuilderSettingView.serialize()
    };
  },
  //for test
  toggle() {
    console.log('MzlpBuilder was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  },

  tableBuilder(){
    console.log("Table Builer was executed");
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
  makeDoubleQuotes(path){
    return ("\""+path+"\"");
  }

};
