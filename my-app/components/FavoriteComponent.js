import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import Swipeout from 'react-native-swipeout';
import { deleteFavorite } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      favorites: state.favorites
    }
  }

const mapDispatchToProps = dispatch => ({
    deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId))
})

class Favorites extends Component {

    static navigationOptions = {
        title: 'My Favorites'
    };

    render() {

        const { navigate } = this.props.navigation;
        
        const renderMenuItem = ({item, index}) => {
            const rightButton = [
                {
                    text: 'Delete', 
                    type: 'delete',
                    onPress: () => this.props.deleteFavorite(item.id)
                }
            ];
            return (
                <Swipeout right={rightButton} autoClose={true}>
                    <ListItem
                        key={index}
                        title={item.name}
                        subtitle={item.description}
                        hideChevron={true}
                        onPress={() => navigate('DishdetailFav', { dishId: item.id })}
                        leftAvatar={{ source: {uri: baseUrl + item.image}}}
                        />
                </Swipeout>
            );
        };

        if (this.props.dishes.isLoading) {
            return(
                <Loading />
            );
        }
        else if (this.props.dishes.errMess) {
            return(
                <View>            
                    <Text>{this.props.dishes.errMess}</Text>
                </View>            
            );
        }
        else {

            if(this.props.favorites.length > 0) 
                return (
                    <FlatList 
                        data={this.props.dishes.dishes.filter(dish => this.props.favorites.some(el => el === dish.id))}
                        renderItem={renderMenuItem}
                        keyExtractor={item => item.id.toString()}
                        />
                );
            else 
                return(
                    <View style={{flex:1, flexDirection: 'row'}}>
                        <View style={{flex:0.2,flexDirection: 'column'}}/>
                        <View style={{alignItems:'center', flex:0.6, flexDirection: 'column'}}> 
                            <View style={{flex:0.15, flexDirection: 'row'}}></View>
                            <View>
                                    <Text style={{color:'#505050'}}>You do not have any favorite Dishes. Go to Menu and Mark them as Favorites</Text>
                            </View>
                        </View>
                        <View style={{flex:0.2, flexDirection: 'column'}}/>
                    </View>
                );
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Favorites);