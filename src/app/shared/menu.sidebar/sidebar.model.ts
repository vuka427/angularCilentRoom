export class SidebarModel {
    constructor(){
        this.title = "";
        this.parentLink = "";
        this.awesomeIcon = "";
        this.type = "";
        this.submenu = [];
    }

    public title: string;
    public parentLink: string;
    public awesomeIcon: string;
    public type : string;
    public menu: boolean = false;
    public submenu: { childtitle: string; islink:boolean; link: string }[];
  }

