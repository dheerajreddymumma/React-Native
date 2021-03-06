import React, { Component } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { Card } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      promotions: state.promotions,
      leaders: state.leaders
    }
}

function RenderItem(props) {
    const item = props.item;
    if (props.isLoading) {
        return(
                <Loading />
        );
    }
    else if (props.errMess) {
        return(
            <View> 
                <Text>{props.erreMess}</Text>
            </View>
        );
    }
    else {
        if (item != null) {
            return(
                <Card
                    featuredTitle={item.name}
                    featuredSubtitle={item.designation}
                    image={{uri: baseUrl + item.image}}
                    >
                    <Text
                        style={{margin: 11}}>
                        {item.description}
                    </Text>
                </Card>
            );
        }
        else {
            return(<View></View>);
        }
    }
}

class Home extends Component {
    static navigationOptions = {
        title: 'Home',
    };

    render() {
        console.log('Hiii this is inside Home ' + this.props.dishes.dishes );
        if(this.props.dishes == null || this.props.dishes.dishes === undefined || this.props.dishes.dishes == [] || this.props.dishes.dishes == [] || this.props.promotions.promotions == null || this.props.leaders.leaders == null) {
            console.log('inside if');
            return (<View></View>);
        }
        console.log('Second attempt');
        return(
            <ScrollView>
                <RenderItem item={this.props.dishes.dishes.filter((dish) => dish.featured)[0]} isLoading={this.props.dishes.isLoading}
                    erreMess={this.props.dishes.errMess} />
                <RenderItem item={this.props.promotions.promotions.filter((promo) => promo.featured)[0]} isLoading={this.props.promotions.isLoading}
                    erreMess={this.props.promotions.errMess} />
                <RenderItem item={this.props.leaders.leaders.filter((leader) => leader.featured)[0]} isLoading={this.props.dishes.isLoading}
                    erreMess={this.props.leaders.errMess} />
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(Home);