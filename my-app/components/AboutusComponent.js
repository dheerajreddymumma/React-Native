import React, { Component } from 'react';
import { LEADERS } from '../shared/leaders';
import { Text, View, FlatList, ScrollView } from 'react-native';
import { Card, ListItem } from 'react-native-elements';

function RenderHistory() {
    return(
        <Card
        title='Our History'
        featuredTitle='Our History'>
            <Text style={{margin: 10}}>
                Para 1 {'\n'}
                Para 2 {'\n'}
            </Text>
        </Card>
    );
}

function RenderLeaders(props) {
    const renderLeader = ({item, index}) => {
        return (
                <ListItem
                    key={index}
                    title={item.name}
                    subtitle={item.description}
                    hideChevron={true}
                    leftAvatar={{ source: require('./images/alberto.png')}}
                />
        );
    };

    return (
        <Card
        title='Corporate Leadership'
        featuredTitle='Corporate Leadership'>
            <FlatList 
                data={props.leaders}
                renderItem={renderLeader}
                keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}

class Aboutus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            leaders: LEADERS

        };
    }

    static navigationOptions = {
        title: 'About Us'
    };

    render() {
        return(
            <ScrollView>
                <RenderHistory />
                <RenderLeaders leaders={this.state.leaders}/>
            </ScrollView>
            
        );
    }
}

export default Aboutus;