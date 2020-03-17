import React, { PureComponent } from 'react';
import Input from 'chayns-components/lib/react-chayns-input/component/Input';
import TextArea from 'chayns-components/lib/react-chayns-textarea/component/TextArea';
import Button from 'chayns-components/lib/react-chayns-button/component/Button';

export default class Formular extends PureComponent {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            address: '',
            comment: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.sendFormular = this.sendFormular.bind(this);
    }

    handleChange(event) {
        this.setState({
            name: event,
        });
    }

    sendFormular() {
        const { state } = this;
        if (state.comment === '') {
            chayns.dialog.alert('No message to send.');
        } else if (state.name === '') {
            chayns.dialog.alert('Please insert a name.');
        } else if (state.email === '') {
            chayns.dialog.alert('Please insert an E-Mail address.');
        } else if (chayns.env.user.id === 1030866) {
            chayns.dialog.alert('Can not send a message to yourself.');
        } else if (chayns.env.user.id === 0) {
            // optional -> prevents site reload
            chayns.addAccessTokenChangeListener(() => {
                chayns.dialog.alert('Login successful');
            });

            // no reload tapp after login
            chayns.login();
        } else {
            chayns.intercom.sendMessageToUser(1030866, {
                text: `${state.name}, ${state.email}, ${state.address} has sent the message: ${state.comment}`,
            }).then((data) => {
                if (data.status === 200) {
                    chayns.dialog.alert('', 'Message send.');
                }
            });
        }
    }

    render() {
        return (
            <div className="content__card">
                <div className="annotation_formula">
                    <h2>Anmeldungsformular</h2>
                    <div className="inner_annotation_formula">
                        <p>Hier kannst du uns deine Anmeldung schicken, wenn auch deine Seite hier zu finden sein soll.</p>
                        <Input
                            class="input input_formula"
                            type="text"
                            placeholder="Name"
                            onChange={(event) => {
                                this.setState({
                                    name: event,
                                });
                            }}
                            required
                        />
                        <Input
                            class="input input_formula"
                            type="text"
                            placeholder="E-Mail"
                            onChange={(event) => {
                                this.setState({
                                    email: event,
                                });
                            }}
                            required
                        />
                        <Input
                            class="input input_formula"
                            type="text"
                            placeholder="Adresse (optional)"
                            onChange={(event) => {
                                this.setState({
                                    address: event,
                                });
                            }}
                        />
                        <TextArea
                            className="input input_formula"
                            placeholder="Kommentar"
                            type="text"
                            onChange={(event) => {
                                this.setState({
                                    comment: event,
                                });
                            }}
                            autogrow
                            required
                        />
                        <div className="mid">
                            <Button
                                type="button"
                                id="sendbutton"
                                className="button"
                                onClick={this.sendFormular}
                                disabled={!this.state.comment || !this.state.name || !this.state.email}
                            >
                            Kommentar senden
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
