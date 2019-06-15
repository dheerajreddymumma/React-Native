import React, { Component } from 'react';
import { LEADERS } from '../shared/leaders';
import { Text, View, FlatList, ScrollView } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
      leaders: state.leaders
    }
  }

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
                    leftAvatar={{ source: {uri: baseUrl + item.image}}}
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
    static navigationOptions = {
        title: 'About Us'
    };

    render() {
        return(
            <ScrollView>
                <RenderHistory />
                <RenderLeaders leaders={this.props.leaders.leaders}/>
            </ScrollView>
            
        );
    }
}

export default connect(mapStateToProps)(Aboutus);