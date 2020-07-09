import React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';

import ListItem from '../library/list_item';
import HomeNavElement from '../library/home_nav_element';
import BottomNav from '../library/bottom_tab_nav';
import TopNav from '../library/nav_bar';



const data = [
  {
      "classification": {
          "id": 6,
          "title": "WHS",
          "hexCode": null
      },
      "locations": [
          {
              "id": 3,
              "title": "Byblos City",
              "image": "http:\/\/138.197.24.211\/DGA\/web\/media\/cache\/locations_main\/uploads\/images\/9a4519fd5394a937f92968885f73b917.jpeg",
              "latitude": "34.1230004",
              "longitude": "35.6344186",
              "visits": 1200
          },
          {
              "id": 2,
              "title": "Byblos Citadel",
              "image": "http:\/\/138.197.24.211\/DGA\/web\/media\/cache\/locations_main\/uploads\/images\/678ac2c1074de902ace8f27b4c168ca1.jpeg",
              "latitude": "34.1198415",
              "longitude": "35.6464656",
              "visits": null
          },
          {
              "id": 1,
              "title": "Baalbak Citadel",
              "image": "http:\/\/138.197.24.211\/DGA\/web\/media\/cache\/locations_main\/uploads\/images\/3d12487b3afe86d0bca967a9231b9d2f.jpeg",
              "latitude": "34.005435",
              "longitude": "36.210954",
              "visits": null
          }
      ]
  },
  {
      "classification": {
          "id": 5,
          "title": "Top Attraction",
          "hexCode": null
      },
      "locations": [
          {
              "id": 3,
              "title": "Byblos City",
              "image": "http:\/\/138.197.24.211\/DGA\/web\/media\/cache\/locations_main\/uploads\/images\/9a4519fd5394a937f92968885f73b917.jpeg",
              "latitude": "34.1230004",
              "longitude": "35.6344186",
              "visits": 1200
          },
          {
              "id": 1,
              "title": "Baalbak Citadel",
              "image": "http:\/\/138.197.24.211\/DGA\/web\/media\/cache\/locations_main\/uploads\/images\/3d12487b3afe86d0bca967a9231b9d2f.jpeg",
              "latitude": "34.005435",
              "longitude": "36.210954",
              "visits": null
          }
      ]
  },
  {
      "classification": {
          "id": 7,
          "title": "Heritage and culture",
          "hexCode": null
      },
      "locations": [
          {
              "id": 3,
              "title": "Byblos City",
              "image": "http:\/\/138.197.24.211\/DGA\/web\/media\/cache\/locations_main\/uploads\/images\/9a4519fd5394a937f92968885f73b917.jpeg",
              "latitude": "34.1230004",
              "longitude": "35.6344186",
              "visits": 1200
          },
          {
              "id": 1,
              "title": "Baalbak Citadel",
              "image": "http:\/\/138.197.24.211\/DGA\/web\/media\/cache\/locations_main\/uploads\/images\/3d12487b3afe86d0bca967a9231b9d2f.jpeg",
              "latitude": "34.005435",
              "longitude": "36.210954",
              "visits": null
          }
      ]
  },
  {
      "classification": {
          "id": 4,
          "title": "Historical sites",
          "hexCode": null
      },
      "locations": [
          {
              "id": 5,
              "title": "Byblos City",
              "image": "http:\/\/138.197.24.211\/DGA\/web\/media\/cache\/locations_main\/uploads\/images\/9a4519fd5394a937f92968885f73b917.jpeg",
              "latitude": "34.1230004",
              "longitude": "35.6344186",
              "visits": 1200
          },
          {
              "id": 4,
              "title": "Baalbak Citadel",
              "image": "http:\/\/138.197.24.211\/DGA\/web\/media\/cache\/locations_main\/uploads\/images\/3d12487b3afe86d0bca967a9231b9d2f.jpeg",
              "latitude": "34.005435",
              "longitude": "36.210954",
              "visits": null
          },
          {
              "id": 3,
              "title": "Byblos City",
              "image": "http:\/\/138.197.24.211\/DGA\/web\/media\/cache\/locations_main\/uploads\/images\/9a4519fd5394a937f92968885f73b917.jpeg",
              "latitude": "34.1230004",
              "longitude": "35.6344186",
              "visits": 1200
          },
          {
              "id": 2,
              "title": "Byblos Citadel",
              "image": "http:\/\/138.197.24.211\/DGA\/web\/media\/cache\/locations_main\/uploads\/images\/678ac2c1074de902ace8f27b4c168ca1.jpeg",
              "latitude": "34.1198415",
              "longitude": "35.6464656",
              "visits": null
          },
          {
              "id": 1,
              "title": "Baalbak Citadel",
              "image": "http:\/\/138.197.24.211\/DGA\/web\/media\/cache\/locations_main\/uploads\/images\/3d12487b3afe86d0bca967a9231b9d2f.jpeg",
              "latitude": "34.005435",
              "longitude": "36.210954",
              "visits": null
          }
      ]
  }
];

export default class Home extends React.Component {
  state = {
    items: [],
    categories: [],
    items2d: [],
    drawed: [],
    isLoading: true,
    activeId: 3,
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

    let arr = [];
    data.forEach((element) => {
      arr.push(element.classification.title);
    });
    this.setState({categories: arr});
    // this.setState({items: data});
    // this.prepare();
    this.drawCategories();  
  }

  drawCategories = () => {
    let cat = this.state.categories;
    let drawnCategories=[];

    for(let i=0; i<cat.length; i++) {
      drawnCategories.push(<HomeNavElement key={i} activeId={this.state.activeId} id={i+1} onPress={() => {this.setActive}} title={cat[i]} />);
    }

    this.setState({drawnCategories});
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
    console.log(id);
    console.log("Hi");
    
    this.setState({activeId: id});
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
