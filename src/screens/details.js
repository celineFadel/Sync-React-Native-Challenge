import React                                                                    from 'react';
import { ActivityIndicator, AsyncStorage, ScrollView, StyleSheet, Text, View }  from 'react-native';
import { EvilIcons, AntDesign, Feather, MaterialCommunityIcons }                from '@expo/vector-icons';

import Carousel                                                                 from '../library/carousel';
import Bar                                                                      from '../library/bar';
import Title                                                                    from '../library/title';
import AccessibilityButton                                                      from '../library/accessibility_button';
import EventsItem                                                               from '../library/events_item';

export default class Details extends React.Component {
  state = {
    title: "",
    longitude: '',
    latitude: '',
    distance: "",
    opening_hours: 'Not specified..',
    lebaneseTicket: '',
    touristTicket: '',
    childrenTicket: '',
    tickets: [],
    spentTime: '',
    accessibility: [],
    events: [],
    images: [],
    isLoading: true,
    phone: ''
  };

  componentDidMount = async () => {
    const { id } = this.props.route.params;
    
    await fetch(`http://138.197.24.211/DGA/web/en/api/locations/show?id=${id}`)
    .then((i) => i.json())
    .then((obj) => {
      let img = obj.data.main_image;
      let arr = [];
      arr.push(img);
      this.setState({images: arr});

      let title = obj.data.title;
      this.setState({title});

      let la = parseFloat(obj.data.latitude);
      let lo = parseFloat(obj.data.longitude);
      let distance = this.calculateDistance(lo, la);
      this.setState({latitude: la});
      this.setState({longitude: lo});
      this.setState({distance});

      if(obj.data.openingHours) {
        let opening_hours = obj.data.openingHours;
        this.setState({opening_hours});
      }

      let tickets = [];
      if(obj.data.entranceFeesLocals) {
        let lebaneseTicket = obj.data.entranceFeesLocals;
        tickets.push(<Text key={1} style={styles.goodToKnowLowerText}>{lebaneseTicket} for lebanese</Text>);
      }
      if(obj.data.entranceFeesForeigns) {
        let touristTicket = obj.data.entranceFeesForeigns;
        tickets.push(<Text key={2} style={styles.goodToKnowLowerText}>{touristTicket} for tourists</Text>);
      }
      if(obj.data.entranceFeesChildren) {
        let childrenTicket = obj.data.entranceFeesChildren;
        tickets.push(<Text key={3} style={styles.goodToKnowLowerText}>{childrenTicket} for children</Text>);
      }
      this.setState({tickets});    
      
      let spentTime = obj.data.spending;
      this.setState({spentTime});

      let arr1 = obj.data.accessibility;
      let accessibility = arr1.map((e) => {
        let {title} = e;
        return <AccessibilityButton key={title} content={title} />;
      });
      this.setState({accessibility});

      let arr2 = obj.data.events;
      let events = arr2.map((e) => {
        let {id, title, eventDate} = e;
        let date = this.transformDate(eventDate);
        return <EventsItem key={id} title={title} date={date} />;
      });
      this.setState({events});

      let phone = obj.data.phone;
      obj.data.phone=='' ? this.setState({phone: "Not available"}) : this.setState({phone});
      this._storeData();
    })
    .catch((err) => {console.log(err);})
    .finally(() => this.setState({isLoading: false}));

  }

  _storeData = async () => {
    try {
      await AsyncStorage.setItem(
        'phone',
        this.state.phone
      );
    } catch (error) {
      console.log(error);
    }
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  calculateDistance = (lo, la) => {
    const R = 6371e3; // metres
    const φ1 = 33.8938 * Math.PI/180; // φ, λ in radians
    const φ2 = la * Math.PI/180;
    const Δφ = (la-33.8938) * Math.PI/180;
    const Δλ = (lo-35.5018) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = (R * c)/1000; 
    return Math.round(d);
  }

  transformDate = (date) => {
    let arr = date.split("-");
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let day = arr[2];
    let month = arr[1];
    let letterMonth = months[month-1];
    let year = arr[0];
    
    let dateStr = day + " " + letterMonth + " " + year;
    return dateStr;
  }


  render() {
    return (
      <View style={styles.mainContainer}>
      {this.state.isLoading 
      ? <ActivityIndicator style={styles.loader} /> 
      : 
      <ScrollView style={styles.container}>
      
        <Carousel images={this.state.images} />

        <Text style={styles.titleText}>{this.state.title}</Text>

        <View style={styles.locationContainer}>
          <EvilIcons name="location" size={30} color="#cccccc" />
          <Text style={styles.location}>{this.state.distance} kilometers northeast of the city of Beirut in</Text>
        </View>

        <Bar title={this.state.title} longitude={this.state.longitude} latitude={this.state.latitude} />

        <Title content="good to know" />
        <View style={styles.goodToKnowContainer}>
          <View style={styles.goodToKnowRow}>
            <View style={styles.timeContainer}>
              <AntDesign name="clockcircleo" size={24} color="red" />
              <Text style={styles.goodToKnowSubtitle}>Opening hours:</Text>
            </View>
            <Text style={styles.goodToKnowLowerText}>{this.state.opening_hours}</Text>
          </View>
          <View style={styles.goodToKnowRow}>
            <View style={styles.timeContainer}>
              <Feather name="calendar" size={24} color="red" />
              <Text style={styles.goodToKnowSubtitle}>Ticket Price:</Text>
            </View>
            {this.state.tickets}
          </View>
          <View style={styles.goodToKnowRow}>
            <View style={styles.timeContainer}>
              <MaterialCommunityIcons name="timer-sand-empty" size={24} color="red" />
              <Text style={styles.goodToKnowSubtitle}>People typically spend:</Text>
            </View>
            {this.state.spentTime 
              ? <Text style={styles.goodToKnowLowerText}> {this.state.spentTime} hours</Text>
              : <Text style={styles.goodToKnowLowerText}> Not specified..</Text>
            }
          </View>
        </View>

        <View style={styles.accessibilityContainer}>
          {this.state.accessibility}
        </View>

        <View style={styles.line} />

        <Title content="events" />
        <View style={styles.eventsContainer}>
          {this.state.events}
        </View>

        <View style={styles.line} />        
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleText: {
    color: '#0059b3',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 30,
    margin: '2.5%',
    padding: '2%'
  },
  location: {
    paddingLeft:'2%',
    paddingRight: '10%',
    paddingBottom: '2%',
    fontSize: 16,
  },
  locationContainer: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: '2.5%',
  },
  goodToKnowContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: 'auto',
    alignItems: 'flex-start'
  },
  timeContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  goodToKnowRow: {
    marginHorizontal: '5%',
    marginBottom: '2%',
    width: '100%',
    height: 'auto',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  goodToKnowLowerText: {
    paddingLeft: '8%',
  },
  goodToKnowSubtitle: {
    paddingLeft:'2%',
    paddingBottom: '2%',
    fontSize: 16,
    color: '#cccccc'
  },
  accessibilityContainer: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginHorizontal: '5%',
    marginBottom: '5%'
  },
  line: {
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
    width: '90%',
    marginHorizontal: '5%',
    marginBottom: '5%'
  },
  eventsContainer: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: '5%'
  }
});
