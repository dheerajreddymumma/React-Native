import React, { Component } from 'react';
import { DISHES } from '../shared/dishes';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { COMMENTS } from '../shared/comments';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId))
})


function RenderDish(props) {
    if (props.dish != null) {
        return(
            <Card
            featuredTitle={props.dish.name}
            image={{uri: baseUrl + props.dish.image}}>
                <Text style={{margin: 10}}>
                    {props.dish.description}
                </Text>
                <Icon
                    raised
                    reverse
                    name={ props.favorite ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color='#f50'
                    //onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                    onPress={() => props.onPress()}
                />
            </Card>
        );
    }
    else {
        return(<View></View>);
    }
}

function RenderComment(props) {
    if(props.comments) { 
        const comments = props.comments;
        const renderCommentItem = ({item, index}) => {   
            return (
                <View key={index} style={{margin: 10}}>
                    <Text style={{fontSize: 14}}>{item.comment}</Text>
                    <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                    <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
                </View>
            );
        };
        //console.log(comments);
        return(
            <Card title='Comments' >
                <FlatList 
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString()}
                    />
            </Card>
        );
    }
    else{
        return(<View></View>);
    }
}

class DishDetail extends Component {

    static navigationOptions = {
        title: 'Dish Details'
    };

    render() {
        const dishId = this.props.navigation.getParam('dishId','');
        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]} 
                favorite={this.props.favorites.some(el => el === dishId)}
                onPress={() => this.props.postFavorite(dishId)} />
                <RenderComment comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)}/>
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);