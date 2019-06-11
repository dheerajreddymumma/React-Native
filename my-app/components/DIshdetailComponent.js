import React, { Component } from 'react';
import { DISHES } from '../shared/dishes';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';

function RenderDish(props) {
    if (props.dish != null) {
        return(
            <Card
            featuredTitle={props.dish.name}
            image={require('./images/uthappizza.png')}>
                <Text style={{margin: 10}}>
                    {props.dish.description}
                </Text>
            </Card>
        );
    }
    else {
        return(<View></View>);
    }
}

class DishDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES
        };
    }

    static navigationOptions = {
        title: 'Dish Details'
    };

    render() {
        const dishId = this.props.navigation.getParam('dishId','');
        console.log(dishId);
        console.log('the selected dish is' + this.state.dishes[0].name);
        console.log('Hiiiiiiiiiiiiii ' + this.props.navigation.getParam('temp',''));
        return(
            <RenderDish dish={this.state.dishes[+dishId]} />
        );
    }
}

export default DishDetail;