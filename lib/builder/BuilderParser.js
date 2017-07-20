'use babel';

export default class BuilderParser{

    constructor(object) {
        this._builderfullpath = object.builderfullpath
        this._builder = object.builder;
        this._file = object.file;
        this._lang = object.lang;
        this._filename=object.filename
        this._args = object.args
        this._copyfrom = object.copyfrom
        this._copyto = object.copyto


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

    get filename() {
        return this._filename;
    }

    set filename(value) {
        this._filename = value;
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