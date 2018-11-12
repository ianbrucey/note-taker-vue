var app = new Vue({
    el: '#app',
    data: {
        title: '',
        body: '',
        bgColor: 'white',
        editMode: false,
        colors: [
            'white',
            'purple',
            'blue',
            'pink',
            'green',
            'lightblue',
            'yellow',
            'lightgrey'
        ],
        notes: [

        ]
    },
    methods:{
        changeNoteColor: function(){
            var cardPreview = $(this.$refs.cardPreview);
            var colorPicker = $(this.$refs.colorPicker);
            cardPreview.css('background', colorPicker.val());
            if(colorPicker.val() !== "white") {
                cardPreview.css('color', "white");
            } else {
                cardPreview.css('color', "black");
            }
        },
        saveNote: function(event){
            event.preventDefault();

            var noteTitle    = this.title;
            var noteBody     = this.body;
            var noteBgColor  = this.bgColor;
            var noteColor    = (noteBgColor === "white" || noteBgColor === "yellow") ? 'black' : 'white';

            var newNote = {
                title: noteTitle,
                body: noteBody,
                bgColor: noteBgColor,
                color: noteColor,
                editMode: false
            };

            try {
                if(this.title.length > 0 && this.body.length > 0) {
                    this.notes.push(newNote);
                } else {
                    alert("Please fill all values");
                }
            } catch (e) {
                console.log("Could not push note " + e.message);
            } finally {
                this.title    = "";
                this.body     = "";
                this.bgColor  = "white";
            }

        },
        editNote: function(note) {
            // since we are using data binding, the model will get updated as i type.
            // So I only need to toggle the edit box
            note.editMode = note.editMode === false;
        },
        deleteNote: function (index, event) {
            this.notes.splice(index, 1);
        },
        editColor: function(note) {
            // yellow and white need to have black color for readability 
            note.color = (note.bgColor !== "white" && note.bgColor !== "yellow") ? "white" : "black";
            console.log(note.color);
        }
    }
});