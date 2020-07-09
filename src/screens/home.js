import React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';

import ListItem from '../library/list_item';
import HomeNavElement from '../library/home_nav_element';
import BottomNav from '../library/bottom_tab_nav';
import TopNav from '../library/nav_bar';





export default class Home extends React.Component {
  state = {
    items: [],
    categories: [],
    items2d: [],
    drawed: [],
    isLoading: true,
    activeId: 1,
    drawnCategories: []
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
      this.drawCategories();  
    })
    .catch((err) => {console.log(err); })
    .finally(() => this.setState({isLoading: false}));
  }

  drawCategories = () => {
    let cat = this.state.categories;
    let drawnCategories=[];

    for(let i=0; i<cat.length; i++) {
      drawnCategories.push(<HomeNavElement key={i} activeId={this.state.activeId} id={i+1} onPress={this.setActive} title={cat[i]} />);
    }

    this.setState({drawnCategories});
    this.forceUpdate();
  }

  componentWillUnmount() {
    this._isMounted = false;
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
      if(j == this.state.activeId-1){
        console.log("Hi");
        
        let temp = this.getListElements(gfg[j], j);
        drawed.push(temp);
      }
    }    
    this.setState({drawed});

  }

  getListElements = (object, i) => {
    let arr = object;
    let list  = arr.map((e) => {
        let {latitude, longitude, title, visits, image, id} = e;

        visits == null ? visits=0 : visits=visits;
        
        if(visits>=1000) {
          visits = visits/1000+"k";
        }
  
        let url = {uri: image};
  
        return <ListItem key={url + id + i} id={id} title={title} visits={visits} url={url} onPress={this.navigateToDetails} />;
      });

    return list;
  };

  navigateToDetails = (id) => {
    this.props.navigation.navigate('Details', { id: id });
  }   

  setActive = (id) => {    
    // console.log(id);
    // console.log("Hi");
    
    this.setState({activeId: id});
    this.drawCategories();
    this.prepare();
  }

  render() {
    return (
      <View style={styles.mainContainer}>
          {this.state.isLoading 
            ? <ActivityIndicator style={styles.loader} /> 
            : 
            <View style={{height:'100%', width:'100%', flex:1, flexDirection:'column', paddingVertical: '5%'}}> 
              <TopNav  navigation={this.props.navigation} />
              <View style={styles.nav}>
                <ScrollView horizontal={true} style={{width: 'auto', paddingRight: '5%'}}>
                  {this.state.drawnCategories}
                </ScrollView>
              </View>
              <ScrollView style={styles.scroller}>
                {this.state.drawed}
              </ScrollView>
              <BottomNav />
            </View>
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
  },
  loader: {
    height: '25%',
    margin: '40%'
  },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: '5%',
    backgroundColor: 'white',
    paddingHorizontal: '5%',
    width: 'auto',
    marginTop: '10%'
  },
  scroller: {
    height: '70%',
    marginBottom: '10%'
  },
});
