'use babel';
export default class SelectDetailView {
    constructor(detaillist){


        this.element=document.createElement("div")
        this.element.classList.add('SelectDetailView');
        this.element.setAttribute('style','overflow-y:auto');
        this.element.appendChild(this.getDetailContents(detaillist));

        let buttons = document.createElement('div');
        buttons.appendChild(this.getButton("OK"));
        buttons.appendChild(this.getButton("Cancel"));

        this.element.appendChild(buttons);

    }
    initialize(){

    }
    serialize() {

    }
    destroy() {
        this.element.remove();
    }
    getElement() {
        return this.element;
    }

    getDetailContents(detaillist){
        let output = document.createElement('div')
        for(let i in detaillist){
            div = document.createElement('div')
            div.setAttribute('id','detaillist['+i+']')

            content_filename = document.createElement('input')
            content_filename.classList.add('input-text','filename')
            content_filename.setAttribute('type','text')
            content_filename.setAttribute('id','filename_'+i)
            content_filename.setAttribute('value',detaillist[i].filename)

            content_args = document.createElement('input')
            content_args.classList.add('input-text','args')
            content_args.setAttribute('type','text')
            content_args.setAttribute('id','args_'+i)
            content_args.setAttribute('value',detaillist[i].args)

            content_copyto = document.createElement('input')
            content_copyto.classList.add('input-text','copyto')
            content_copyto.setAttribute('type','text')
            content_copyto.setAttribute('id','copyto_'+i)
            content_copyto.setAttribute('value',detaillist[i].copyto)

            div.appendChild(content_filename)
            div.appendChild(content_args)
            div.appendChild(content_copyto)

            output.appendChild(div)
        }
        return output;
    }
    getButton(string){

        var btn = document.createElement('button');
        btn.classList.add('btn','btn-primary','inline-block-tight');
        btn.appendChild(document.createTextNode(string));
        btn.setAttribute('id',"btn_detail_"+string);
        return(btn);
    }

}