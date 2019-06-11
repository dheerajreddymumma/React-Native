import React, { Component } from 'react';
import { Text,View } from 'react-native';
import { Card } from 'react-native-elements';

class Contact extends Component {
    static navigationOptions = {
        title: 'Contact'
    };

    render() {
        return (
            <Card featuredTitle='Contact Information'
            title='Contact Information'>
                <Text
                    style={{margin: 11}}>
                    Line 1 {"\n"}
                    Line 2 {"\n"}
                    Line 3 {"\n"}
                </Text>
            </Card>
        );
    }
}

export default Contact;