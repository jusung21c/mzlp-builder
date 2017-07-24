'use babel';

import BuilderSettingView from './view/builder-path-setting-view';
import SelectDetailView from './view/select-detail-view'
import SelectLangView from './view/select-lang-view';
import { CompositeDisposable } from 'atom';
import BuilderParser from './builder/BuilderClass'
import path from 'path';
import fs from 'fs';
import IndexBuilder from './builder/IndexBuilderClass';
import LexBuilder from './builder/LexBuilderClass';
import GrammarBuilder from './builder/GrammarBuilderClass';
import ProgramBuilder from './builder/ProgramBuilderClass';

export default {
  config: require('./config'),
  mzlpBuilderView: null,
  modalPanel: null,
  builderPathSettingPanel:null,
  selectLangPanel:null,
  selectDetailPanel:null,
  subscriptions: null,
  selectedVal:null,
  detaillist:null,
  defaultcheck:null,

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

    this.defaultcheck = false;
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
    this.SelectLangView.toggle();
    // return (
    //   this.selectLangPanel.isVisible() ?
    //   this.selectLangPanel.hide() :
    //   this.selectLangPanel.show()
    // );
  },


  toggle() {
    console.log('MzlpBuilder was toggled!');

  },

  serialize(object) {
      return {object};
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
    this.getSelectLangPanel("grammarDBBuilder");
  },
  programDBBuilder(){
    console.log("Program DB Builer was executed");
    this.getSelectLangPanel("programDBBuilder");
  },
  dialogDBBuilder(){
    console.log("Dialog DB Builer was executed");
    this.getSelectLangPanel("dialogDBBuilder");
  },
  scenarioDBBuilder(){
    console.log("Scenario DB Builer was executed");
    this.getSelectLangPanel("scenarioDBBuilder");
  },
  promptDBBuilder(){
    console.log("Prompt DB Builer was executed");
    this.getSelectLangPanel("promptDBBuilder");
  },
  referenceDBBuilder(){
    console.log("Reference DB Builer was executed");
    this.getSelectLangPanel("referenceDBBuilder");
  },

    builderPathSettingModal(){
        if(this.builderPathSettingPanel!=null){this.builderPathSettingPanel.destroy();}
        this.BuilderSettingView = new BuilderSettingView();
        this.builderPathSettingPanel = atom.workspace.addModalPanel({
            item: this.BuilderSettingView.getElement(),
            visible: false
        });
        this.builderPathSettingPanel.show();
        this.settingClickListener();
    },

    settingClickListener(){
        console.log("빌드 패스 설정 리스너 진입")
        const builderList = atom.config.get('mzlp-builder.builderList');
        let builder_list =  builderList.replace(/ /g, '').split(',');

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
    },

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
    },

  getSelectLangPanel(builder){
    if(this.selectLangPanel!=null){this.selectLangPanel.destroy();}
    this.SelectLangView = new SelectLangView(builder);
    this.selectLangPanel = atom.workspace.addModalPanel({
        item: this.SelectLangView.getElement(),
        visible: false
    });
    $('atom-panel.modal').attr('style','width:300px');
    this.selectLangPanel.show();
    this.langClickListener(builder);

  },

  langClickListener(builder){
    console.log("언어선택 리스너 진입")
    var self = this;
    let langlist = this.SelectLangView.getLangList();
    let selectedlanglist=[];
    //OK버튼 누를시 처리
    $("#btn_lang_OK").click(function(){
        for(let i in langlist){
            if($('#sel_lang_'+langlist[i]).is(":checked")){
                selectedlanglist.push(langlist[i]);
            }
        };

        self.getDetailSelPanel(builder,selectedlanglist);
    });

    $("#btn_lang_Cancel").click(function(){
        self.selectLangPanel.hide();
        self.selectLangPanel.destroy();
    });


  },

  getDetailSelPanel(builder,selectedlanglist){
      let self = this;
    console.log("디테일 패널 진입")
      //if(this.selectDetailPanel!=null){this.selectDetailPanel.destroy();}
      //this.defaultcheck==false?this.detaillist = this.getDetailList(builder,this.getRootPath(),selectedlanglist):console.log("reuse");
      if(this.state){
        console.log("reuse")
      }else{
          this.detaillist = this.getDetailList(builder,this.getRootPath(),selectedlanglist)
          this.serialize(this.detaillist)
      }
    let that= this;
    atom.config.set('detaillist',this.detaillist)
    //빌더 객체 뷰 생성에 보냄
    this.SelectDetailView = new SelectDetailView(this.detaillist);
    this.selectDetailPanel = atom.workspace.addModalPanel({
        item: this.SelectDetailView.getElement(),
        visible: false
    });
    this.selectDetailPanel.show();
    for(let i in this.detaillist){

        $("#filename_"+i).change(function(){
            that.detaillist[i].filename=$("#filename_"+i).val()
            console.log("filename 변경 : "+ that.detaillist[i].filename)
        })
        $("#args_"+i).change(function(){
            that.detaillist[i].args=$("#args_"+i).val()
            console.log("args 변경 : "+ that.detaillist[i].args)
        })
        $("#copyto_"+i).change(function(){
            that.detaillist[i].copyto=$("#copyto_"+i).val()
            console.log("copyto 변경 : "+ that.detaillist[i].copyto)
        })

    }

      $("#btn_detail_OK").click(function(){
          for(let i in that.detaillist) {
              console.log(that.detaillist[i].args);
              try {
                  that.detaillist[i].build();
              } catch (err) {
                    console.log(err);
                  return;
              }
          }

      });

      $("#btn_detail_Cancel").click(function(){
          self.selectDetailPanel.hide();
          self.selectDetailPanel.destroy();
      });
  },



  getDetailList(builder,rootdir,selectedlanglist){
    let Finder = require('fs-finder');
    let path = require('path');

    let instancelist=[];
    let builderfullpath = this.getBuilderPath(rootdir,builder); //빌더 풀패스
        builderfullpath = path.normalize(builderfullpath)
    let string,rpath,file;
      for(let i in selectedlanglist){
        string ="../Input/"+selectedlanglist[i];
        rpath = path.resolve(builderfullpath,string);

        try {
            let afilefullpath = Finder.in(rpath).findFiles();
            for(let i in afilefullpath){
                filesfullpath= path.normalize(afilefullpath[i]);
                file = path.relative(builderfullpath,afilefullpath[i]);
                instancelist.push(this.getBuilder(builder,builderfullpath,file,path.basename(path.dirname(file))));
                console.log(path.basename(path.dirname(file)));
            }

        } catch (e) {
            console.log(e);
        } finally {

        }
    }
    this.defaultcheck=true;
    console.log(instancelist)
    return instancelist;
  },

  getBuilder(builder,builderfullpath,file,lang,options){
      switch (builder) {
          case "tableBuilder":
              return new TableBuilder(builder,builderfullpath,file,lang,options);
              break;
          case "indexDBBuilder":
              return new IndexBuilder(builder,builderfullpath,file,lang,options);
              break;
          case "lexDBBuilder":
              return new LexBuilder(builder,builderfullpath,file,lang,options);
              break;
          case "grammarDBBuilder":
              return new GrammarBuilder(builder,builderfullpath,file,lang,options);
              break;
          case "programDBBuilder":
              return new ProgramBuilder(builder,builderfullpath,file,lang,options);
              break;
          case "dialogDBBuilder":
              return new DialogBuilder(builder,builderfullpath,file,lang,options);
              break;
          case "scenarioDBBuilder":
              return new ScenarioBuilder(builder,builderfullpath,file,lang,options);
              break;
          case "promptDBBuilder":
              return new PromptBuilder(builder,builderfullpath,file,lang,options);
              break;
          case "referenceDBBuilder":
              return new ReferenceBuilder(builder,builderfullpath,file,lang,options);
              break;

          default:
      }
  },

  getBuilderPath(rootpath,buildername){
    switch (buildername) {
      case "tableBuilder":
          return rootpath+'/01. Table Builder/Builder'
          break;
      case "indexDBBuilder":
          return rootpath+'/02. Index DB Builder/Builder'
          break;
      case "lexDBBuilder":
          return rootpath+'/03. Lex DB Builder/Builder'
          break;
      case "grammarDBBuilder":
          return rootpath+'/04. Grammar DB Builder/Builder'
          break;
      case "programDBBuilder":
          return rootpath+'/05. Program DB Builder/Builder/'
          break;
      case "dialogDBBuilder":
          return rootpath+'/06. Dialog DB Builder/Builder/'
          break;
      case "scenarioDBBuilder":
          return rootpath+'/07. Scenario Builder/Builder/'
          break;
      case "promptDBBuilder":
          return rootpath+'/08. Prompt DB Builder/Builder/'
          break;
      case "referenceDBBuilder":
          return rootpath+'/09. Reference DB Builder/Builder/'
          break;

      default:
    }
  },
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

    },
  makeDoubleQuotes(path){
      return ("\""+path+"\"");
  },

  getRootPath(){
      var treeView;
      if(atom.packages.isPackageLoaded("tree-view")){
          treeView = atom.packages.getLoadedPackage("tree-view");
          treeView = treeView.mainModule.treeView;
          return treeView.list.querySelector('.project-root-header').children[0].getAttribute('data-path');
      }
  }

};




// getLangList(){
//     let Finder = require('fs-finder');
//     let path = require('path');
//     let dirpath;
//     // 해당 디렉토리 설정
//     let baseDir = this.getPathFromTreeview();
//     let lang=[];
//     Finder.in(baseDir+"/Input").findDirectories(function(directories) {
//         for(var i in directories){
//             dirpath= path.normalize(directories[i]);
//             dirpath= path.basename(dirpath);
//             if(dirpath.length==3 && dirpath==dirpath.toUpperCase()){  //대문자로 3글자인 디렉토리 추출
//                 lang.push(dirpath);
//             }
//         }
//     });
//     return lang;
// },