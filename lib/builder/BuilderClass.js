'use babel';

export default class Builder{

    constructor(builder,builderfullpath,file,lang,options) {
        let path = require('path');
        this._builderfullpath = builderfullpath;
        this._builder = builder;
        this._file = file;
        this._lang = lang;
        this._filename=path.basename(file);
    }
    build(){
        let path = require('path');
        let spawn = require('child_process').spawn;
        let options={cwd:this._builderfullpath}
        let that = this;

        let makeargs = this._args.split(' ');   //spawn의 파라미터로 들어갈 배열 생성
        makeargs.unshift((path.basename(path.dirname(this._builderfullpath))+".exe").substr(4));    //빌더 풀패스에서 빌더네임 탐색/ 앞에 숫자와 화이트스페이스 제거후 + .EXE
        makeargs.unshift('/c');
        makeargs.push(this._file);
        //console.log(makeargs)

        let build = spawn('cmd',makeargs,options)
        //let build = spawn('cmd',['/c','Index DB Builder.EXE', this._args, this._file],options)

        build.stdout.on('data', function(data) {
            console.log("빌드시작 : "+that._file)
            console.log('stdout: ' + data);
        });

        build.stderr.on('data', function(data) {
            console.log('stderr: ' + data);
            build.kill('SIGINT');
            return
        });

        build.on('exit', function(code) {
            console.log('exit: ' + code);
            that.copy();
        });
    }

    copy(){
        let path = require('path');
        let spawn = require('child_process').spawn;
        let that = this;
        let options={cwd:this._builderfullpath}
        let copy = spawn('cmd',['/c','CHCP','65001','|','COPY', this._copyfrom, this._copyto],options)

        copy.stdout.on('data', function(data) {
            console.log("카피시작 : "+that._file)
            console.log('stdout: ' + data);
        });

        copy.stderr.on('data', function(data) {
            console.log('stderr: ' + data);
            copy.kill('SIGINT');
            return
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