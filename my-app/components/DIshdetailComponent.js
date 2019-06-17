import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, StyleSheet, Modal, Platform, Button } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
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
                <View style={styles.formRow}>
                    <Icon
                        raised
                        reverse
                        name={ props.favorite ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color='#f50'
                        //onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                        onPress={() => props.onPress()}
                    />
                    <Icon
                        raised
                        reverse
                        name='pencil'
                        type='font-awesome'
                        color='#f50'
                        //onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                        onPress={() => props.toggleModal()}
                    />
                </View>
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
                    <Rating style={{alignItems: 'flex-start'}}imageSize={12} readonly startingValue={item.rating}/>
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
};

class RenderModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rating: 3,
            author: '',
            comment: ''
        }
        this.setRating = this.setRating.bind(this);
        this.setAuthor = this.setAuthor.bind(this);
        this.setComment = this.setComment.bind(this);
        this.submitComment = this.submitComment.bind(this);
    }

    setRating(newRating) {
        this.setState({rating:newRating});
    };

    setAuthor(newAuthor) {
        this.setState({author:newAuthor});
    };

    setComment(newComment) {
        this.setState({comment:newComment});
    };

    submitComment() {
        this.props.postComment(this.props.dishId, this.state.rating, this.state.author, this.state.comment);
        this.props.toggleModal();
    }

    render() {
        return(
            <Modal animationType = {"slide"} transparent = {false}
            visible = {this.props.showModal}
            onRequestClose = {() => this.props.toggleModal() }
            >
                <View style = {styles.modalHeader} />
                <View style = {styles.modal}>
                    <Text style = {styles.modalTitle}>Add Your Review</Text>

                    <Rating
                        showRating
                        onFinishRating={this.setRating}
                        style={{ paddingVertical: 10 }}
                        startingValue={3}
                    />

                    <Input
                        placeholder='Author'
                        leftIcon={{ type: 'font-awesome', name: 'user' }}
                        leftIconContainerStyle={styles.leftIcon}
                        onChangeText={this.setAuthor}
                    />

                    <Input
                        placeholder='Comment'
                        leftIcon={{ type: 'font-awesome', name: 'comment' }}
                        leftIconContainerStyle={styles.leftIcon}
                        onChangeText={this.setComment}
                    />
                    <View>
                        <View style={styles.buttonColumn}></View>
                        <Button 
                            onPress = {() => this.submitComment()}
                            color="#512DA8"
                            title="Submit" 
                            />
                        <View style={styles.buttonColumn}></View>
                        <Button 
                            onPress = {() => this.props.toggleModal()}
                            color="#512DA8"
                            title="Close" 
                            />
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20
    },
    modalHeader: {
        height: (Platform.OS === 'ios') ? Expo.Constants.statusBarHeight : 0, //this is just to test if the platform is iOS to give it a height of 18, else, no height (Android apps have their own status bar)
        backgroundColor: "white"
    },
    modal: {
        justifyContent: 'center',
        margin: 20
     },
     modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    leftIcon: {
        paddingRight: 5
    },
    buttonColumn: { 
        padding: 10
    }
});

class DishDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false
        }
    }

    static navigationOptions = {
        title: 'Dish Details'
    };

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    render() {
        const dishId = this.props.navigation.getParam('dishId','');
        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]} 
                favorite={this.props.favorites.some(el => el === dishId)}
                onPress={() => this.props.postFavorite(dishId)}
                toggleModal={() => this.toggleModal()} />
                <RenderComment comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)}/>
                <RenderModal showModal={this.state.showModal} dishId={dishId} toggleModal={() => this.toggleModal()}
                postComment={this.props.postComment}/>
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);