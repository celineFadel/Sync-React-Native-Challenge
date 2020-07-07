import React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';

import ListItem from '../library/list_item';

export default class Home extends React.Component {
  state = {
    items: [],
    categories: [],
    items2d: [],
    drawed: [],
    isLoading: true
  };

  componentDidMount = async () => {
    await fetch('http://138.197.24.211/DGA/web/en/api/home')
    .then((i) => i.json())
    .then((obj) => {
      let arr = [];
      obj.data.forEach((element) => {
        arr.push(element.classification.title);
      });
      this.setState({categories: arr});
      this.setState({items: obj.data});
      this.prepare();
    })
    .catch((err) => {console.log(err); })
    .finally(() => this.setState({isLoading: false}));
  }

  prepare = async () => {
    let arr = this.state.items;
    let cats = this.state.categories;    

    let gfg = [];
    for (var i = 0; i < arr.length; i++) { 
      gfg[i] = arr[i].locations; 
    } 

    let drawed = [];

    for(let j=0; j<cats.length; j++) {
      drawed.push(<Text key={j} style={styles.title}>{cats[j]}</Text>)
      let temp = this.getListElements(gfg[j], j);
      drawed.push(temp);
    }    
    this.setState({drawed});

  }

  getListElements = (object, i) => {
    let arr = object;
    let list  = arr.map((e) => {
        let {latitude, longitude, title, visits, image, id} = e;

        visits == null ? visits=0 : visits=visits;
  
        let url = {uri: image};
  
        return <ListItem key={url + id + i} id={id} title={title} visits={visits} longitude={longitude} latitude={latitude} url={url} onPress={this.navigateToDetails} />;
      });

    return list;
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  navigateToDetails = (id) => {
    this.props.navigation.navigate('Details', { id: id, });
  }   

  render() {
    return (
      <View style={styles.mainContainer}>
        {this.state.isLoading 
      ? <ActivityIndicator style={styles.loader} /> 
      : 
        <ScrollView>
          {this.state.drawed}
        </ScrollView>
  }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    padding: '2%'
  }
});
