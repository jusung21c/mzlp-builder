'use babel';
import Builder from './BuilderClass'

export default class DialogBuilder extends Builder{
    constructor(builder, builderfullpath, file, lang, options) {
        super(builder, builderfullpath, file, lang, options);
        let path = require('path')
        this._builderfullpath = builderfullpath
        this._builder = builder;
        this._file = file;
        this._lang = lang;
        this._filename=path.basename(file)
        //################################################################
        //DefaultSet
        default_args = "-V -S";
        default_copyfrom = path.join("../","OUTPUT",lang,path.basename(file,path.extname(file)));
        default_copyto = path.join("../../../","PG","work/data/",lang);
        //################################################################


        if(options!==undefined){
            options.args !==undefined ? this._args=options.args : this._args=default_args;
            options.copyfrom !==undefined ? this._copyfrom=options.copyfrom : this._copyfrom = default_copyfrom;
            options.copyto !==undefined ? this._copyto=options.copyto : this._copyto = default_copyto;
        }else{
            this._args=default_args;
            this._copyfrom = default_copyfrom;
            this._copyto = default_copyto;
        }
    }


}