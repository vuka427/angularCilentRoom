export class CKEConfig {
    public static toolbarConfig = {
        toolbar: {
            items: [
                'undo', 'redo',
                '|', 'heading',
                '|', 'fontfamily', 'fontsize', 'fontColor', 'fontBackgroundColor',
                '|', 'bold', 'italic', 'strikethrough', 'subscript', 'superscript', 'code',
                '|', 'alignment:left', 'alignment:right', 'alignment:center', 'alignment:justify',
                '|', 'bulletedList', 'numberedList', 'todoList', 'outdent', 'indent'
            ],
            shouldNotGroupWhenFull: true
        },
        alignment: {
            options: ['left', 'right', 'center', 'justify']
        },
    }
    public static toolbarConfigOffAll = {
        toolbar: {
            items: [
                
            ],
            shouldNotGroupWhenFull: true
        },
        alignment: {
            options: ['left', 'right', 'center', 'justify']
        },
    }
  }