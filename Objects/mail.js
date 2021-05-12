class Mailer{
    constructor(props){
        this.email = props.email;
        this.from = props.from;
        this.subject = props.subject;
        this.text = props.text;
        this.html = props.html;
    }
}

module.exports = Mailer;