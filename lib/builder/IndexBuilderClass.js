'use babel';

export default class IndexBuilder{

    constructor(builder,builderfullpath,file,lang,options) {
        this._builderfullpath = builderfullpath
        this._builder = builder;
        this._file = file;
        this._lang = lang;
        this._filename=require('path').basename(file)
        if(options!==undefined){
        options.args !==undefined ? this._args=options.args : this._args="-V"
        options.copyfrom !==undefined ? this._copyfrom=options.copyfrom : this._copyfrom="default"
        options.copyto !==undefined ? this._copyto=options.copyto : this._copyto="default"
        }else{
            this._args="-V"
            this._copyfrom="default"
            this._copyto="default"
        }
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