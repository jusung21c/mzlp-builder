'use babel';

import path from 'path';
import fs from 'fs';

export default class TableBuildRunner{
  lang :null

  list : ["dialog","lex","lexeme","literal","reference"]
  constructor(lang){
    this.lang=lang;    
  }
  getCommand(file){
    let command=''; command+="CD '01. Table Builder'\n";
    command += 'CD BUILDER\n';

    command+=file;

    command += 'CD ..\n';
    command += 'CD ..\n';
    return command;
  }

  getCommandAll(lang){
    let command=''; command+="CD '01. Table Builder'\n";
    command += 'CD BUILDER\n';

    command+=this.dialog(lang);
    command+=this.lex(lang);
    command+=this.lexeme(lang);
    command+=this.literal(lang);
    command+=this.reference(lang);

    command += 'CD ..\n';
    command += 'CD ..\n';
    return command;
  }

  copyTo(lang,to){
    switch (to) {
      case "od2":
        return this.makeDoubleQuotes('..\\..\\02. Index DB Builder\\DATA\\'+lang)+"\n";
        break;
      case "od3":
        return this.makeDoubleQuotes('..\\..\\03. Lex DB Builder\\DATA\\'+lang)+"\n";
        break;
      case "od5":
        return this.makeDoubleQuotes('..\\..\\05. Program DB Builder\\DATA\\'+lang)+'\n';
        break;
      case "od6":
        return this.makeDoubleQuotes('..\\..\\06. Dialog DB Builder\\DATA\\'+lang)+'\n';
        break;
      case "od7":
        return this.makeDoubleQuotes('..\\..\\07. Scenario Builder\\DATA\\'+lang)+'\n';
        break;
      case "od9":
        return this.makeDoubleQuotes('..\\..\\09. Reference DB Builder\\DATA\\'+lang)+'\n';
        break;
      default:

    }
  }

  dialog(lang){
    let command ='';
    let args = "-V";
    let input = "..\\INPUT\\"+lang+"\\DIALOG."+lang+".TABLE.DEFINITION"
    let from = "..\\OUTPUT\\"+lang+"\\DIALOG."+lang+".TABLE"

    command+=this.commandForCompile(this.getBuilder(),args,input);command+="\n";
    command+=this.commandForCopy(from,this.copyTo(lang,"od6"));
    command+=this.commandForCopy(from,this.copyTo(lang,"od7"));
    return command;
  }

  lex(lang){
    let command ='';
    let args = "-V";
    let input = "..\\INPUT\\"+lang+"\\LEX."+lang+".TABLE.DEFINITION"
    let from = "..\\OUTPUT\\"+lang+"\\LEX."+lang+".TABLE"

    command+=this.commandForCompile(this.getBuilder(),args,input);command+="\n";
    command+=this.commandForCopy(from,this.copyTo(lang,"od2"));
    command+=this.commandForCopy(from,this.copyTo(lang,"od3"));
    command+=this.commandForCopy(from,this.copyTo(lang,"od7"));
    return command;
  }

  lexeme(lang){
    let command ='';
    let args = "-V";
    let input = "..\\INPUT\\"+lang+"\\LEXEME."+lang+".TABLE.DEFINITION"
    let from = "..\\OUTPUT\\"+lang+"\\LEXEME."+lang+".TABLE"

    command+=this.commandForCompile(this.getBuilder(),args,input);command+="\n";
    command+=this.commandForCopy(from,this.copyTo(lang,"od2"));
    command+=this.commandForCopy(from,this.copyTo(lang,"od3"));
    command+=this.commandForCopy(from,this.copyTo(lang,"od7"));

    return command;
  }

  literal(lang){
    let command ='';
    let args = "-V -L 'ko'";
    let input = "..\\INPUT\\"+lang+"\\LITERAL."+lang+".TABLE.DEFINITION"
    let from = "..\\OUTPUT\\"+lang+"\\LITERAL."+lang+".TABLE"

    command+=this.commandForCompile(this.getBuilder(),args,input);command+="\n";
    command+=this.commandForCopy(from,this.copyTo(lang,"od5"));

    return command;
  }

  reference(lang){
    let command ='';
    let args = "-V";
    let input = "..\\INPUT\\"+lang+"\\REFERENCE."+lang+".TABLE.DEFINITION"
    let from = "..\\OUTPUT\\"+lang+"\\REFERENCE."+lang+".TABLE"

    command+=this.commandForCompile(this.getBuilder(),args,input);command+="\n";
    command+=this.commandForCopy(from,this.copyTo(lang,"od2"));
    command+=this.commandForCopy(from,this.copyTo(lang,"od9"));

    return command;
  }
  getBuilder(){
    return '"TABLE BUILDER.EXE"'
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
