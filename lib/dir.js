'use babel';
import path from 'path';
import fs from 'fs';

export default class DirSystem{
  //선택한
  constructor(){}

  dirAnaly(){ //선택한게 파일일때, 폴더일때
    let path = this.getPathFromTreeview();


    fs.lstat(path, (err, stats) => {
      if(err) return console.log(err); //Handle error
      if(stats.isFile()){
        console.log("파일");
      }if(stats.isDirectory()){
        console.log("디렉토리");
      }
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




}
