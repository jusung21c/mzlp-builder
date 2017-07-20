'use babel';

export default class IndexBuilder{

    constructor(builder,builderfullpath,file,lang,options) {
        let path = require('path')
        this._builderfullpath = builderfullpath
        this._builder = builder;
        this._file = file;
        this._lang = lang;
        this._filename=path.basename(file)
        if(options!==undefined){
        options.args !==undefined ? this._args=options.args : this._args="-V";
        options.copyfrom !==undefined ? this._copyfrom=options.copyfrom : this._copyfrom=path.join("../","output",lang,path.basename(file,path.extname(file)));
        options.copyto !==undefined ? this._copyto=options.copyto : this._copyto=path.join("../../../","Release_EDS4.8","work/data/",lang)
        }else{
            this._args="-V";
            this._copyfrom=path.join("../","output",lang,path.basename(file,path.extname(file)));
            this._copyto=path.join("../../../","Release_EDS4.8","work/data/",lang)
        }
    }
    build(){
        let path = require('path');
        let spawn = require('child_process').spawn;
        let options={cwd:this._builderfullpath}
        let that = this;
        //let cmdarray = ['/c',this._builderfullpath]
        //for (let i in this._args) cmdarray.push(this._args[i])
        //cmdarray.push(this._file)
        //['/c', this._builder, "-V","-S", this._file]
        //console.log(cmdarray)

        let build = spawn('cmd',['/c','Index DB Builder.EXE', this._args, this._file],options)

        build.stdout.on('data', function(data) {
            console.log('stdout: ' + data);
        });

        build.stderr.on('data', function(data) {
            console.log('stderr: ' + data);
        });

        build.on('exit', function(code) {
            console.log('exit: ' + code);
            that.copy();
        });
    }

    copy(){
        let path = require('path');
        let spawn = require('child_process').spawn;
        let options={cwd:this._builderfullpath}
        let copy = spawn('cmd',['/c','COPY', this._copyfrom, this._copyto],options)

        copy.stdout.on('data', function(data) {
            console.log('stdout: ' + data);
        });

        copy.stderr.on('data', function(data) {
            console.log('stderr: ' + data);
        });

        copy.on('exit', function(code) {
            console.log('exit: ' + code);
        });
    }
    buildcopy(){

    }

    get filename() {
        return this._filename;
    }

    set filename(value) {
        this._filename = value;
    }

    get builderfullpath() {
        return this._builderfullpath;
    }

    set builderfullpath(value) {
        this._builderfullpath = value;
    }

    get builder() {
        return this._builder;
    }

    set builder(value) {
        this._builder = value;
    }

    get file() {
        return this._file;
    }

    set file(value) {
        this._file = value;
    }

    get lang() {
        return this._lang;
    }

    set lang(value) {
        this._lang = value;
    }

    get options() {
        return this._options;
    }

    set options(value) {
        this._options = value;
    }

    get args() {
        return this._args;
    }

    set args(value) {
        this._args = value;
    }

    get copyfrom() {
        return this._copyfrom;
    }

    set copyfrom(value) {
        this._copyfrom = value;
    }

    get copyto() {
        return this._copyto;
    }

    set copyto(value) {
        this._copyto = value;
    }
}