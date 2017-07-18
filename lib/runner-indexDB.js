'use babel';

import path from 'path';
import fs from 'fs';

export default class IndexBuildRunner{
  lang :null

  constructor(lang){
    this.lang=lang;
  }


  getCommand(file){
    let command=''; command+="CD '02. Index DB Builder'\n";
    command += 'CD BUILDER\n';

    command+=file;

    command += 'CD ..\n';
    command += 'CD ..\n';
    return command;
  }

  getCommandAll(lang){
    let command=''; command+="CD '02. Index DB Builder'\n";
    command += 'CD BUILDER\n';

    command+=this.lexpc(lang);
    command+=this.lexindex(lang);
    command+=this.lexnavi(lang);
    command+=this.refpc(lang);
    command+=this.refindex(lang);

    command += 'CD ..\n';
    command += 'CD ..\n';
    return command;
  }

  copyTo(lang){    
    return this.makeDoubleQuotes('..\\..\\..\\Release\\WORK\\DATA\\'+lang)+'\n';
  }

  lexpc(lang){
    let command ='';
    let args = "-V";
    let input = "..\\INPUT\\"+lang+"\\LEX."+lang+"_PC.INDEX.DEFINITION"
    let from = "..\\OUTPUT\\"+lang+"\\LEX."+lang+"_PC.INDEX"

    command+=this.commandForCompile(this.getBuilder(),args,input);command+="\n";
    command+=this.commandForCopy(from,this.copyTo(lang));

    return command;
  }

  lexindex(lang){
    let command ='';
    let args = "-V";
    let input = "..\\INPUT\\"+lang+"\\LEX."+lang+".INDEX.DEFINITION"
    let from = "..\\OUTPUT\\"+lang+"\\LEX."+lang+".INDEX"

    command+=this.commandForCompile(this.getBuilder(),args,input);command+="\n";
    command+=this.commandForCopy(from,this.copyTo(lang));

    return command;
  }

  lexnavi(lang){
    let command ='';
    let args = "-V";
    let input = "..\\INPUT\\"+lang+"\\LEX_NAVI_VR."+lang+".INDEX.DEFINITION"
    let from = "..\\OUTPUT\\"+lang+"\\LEX_NAVI_VR."+lang+".INDEX"

    command+=this.commandForCompile(this.getBuilder(),args,input);command+="\n";
    command+=this.commandForCopy(from,this.copyTo(lang));

    return command;
  }

  refpc(lang){
    let command ='';
    let args = "-V -L 'ko'";
    let input = "..\\INPUT\\"+lang+"\\REFERENCE."+lang+"_PC.INDEX.DEFINITION"
    let from = "..\\OUTPUT\\"+lang+"\\REFERENCE."+lang+"_PC.INDEX"

    command+=this.commandForCompile(this.getBuilder(),args,input);command+="\n";
    command+=this.commandForCopy(from,this.copyTo(lang));

    return command;
  }

  refindex(lang){
    let command ='';
    let args = "-V";
    let input = "..\\INPUT\\"+lang+"\\REFERENCE."+lang+".INDEX.DEFINITION"
    let from = "..\\OUTPUT\\"+lang+"\\REFERENCE."+lang+".INDEX"

    command+=this.commandForCompile(this.getBuilder(),args,input);command+="\n";
    command+=this.commandForCopy(from,this.copyTo(lang));

    return command;
  }


  getBuilder(){
    return '"Index DB Builder.EXE"'
  }
  commandForCompile(builder,args,input){
    return builder+" "+args+" "+input;
  }
  commandForCopy(from,to){
    return "COPY " + from +" " + to;
  }
  makeDoubleQuotes(path){
    return ("\""+path+"\"");
  }
}
