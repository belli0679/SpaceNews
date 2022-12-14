import React, { Component }  from "react";
import { Text, View, ImageBackground, SafeAreaView,
         StyleSheet, StatusBar, Alert, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";


export default class ISSLocationScreen extends Component{
    constructor(props){
        super(props);
        this.state ={
            location: {}
        }
    }

    componentDidMount(){
        this.getIssLocation();
    }

    getIssLocation = () =>{
        axios 
            .get("https://api.wheretheiss.at/v1/satellites/25544")
            .then(response=>{
                this.setState({
                    location: response.data
                })
            })
            .catch(error=> {
                Alert.alert(error.message)
            })
    }

    render(){
        if(Object.keys(this.state.location).length === 0){
            return(
                <View style={styles.loadingLocation}>
                    <Text>Carregando...</Text>
                </View>
            )
        } else {

        
            return(
                <View style = {styles.container}> 
                    <SafeAreaView styles={styles.safeArea}/>
                        <ImageBackground source= {require("../assets/iss_bg.jpg")}
                                        style={styles.backgroundImage}>
                            <View style= {styles.titleContainer}>
                                <Text style={styles.titleText}>Tela da localização da EEi</Text>
                            </View>
                            <View style={styles.mapContainer}>
                                <MapView style={styles.map}
                                        region ={{
                                            latitude: this.state.location.latitude,
                                            longitude: this.state.location.longitude,
                                            latitudeDelta: 100,
                                            longitudeDelta: 100
                                        }}
                                > 
                                    <Marker coordinate={{
                                        latitude: this.state.location.latitude,
                                        longitude: this.state.location.longitude,
                                    }}>
                                        <Image source = {require("../assets/iss_icon.png")}
                                            style = {styles.issIcon}/>
                                    </Marker>
                                </MapView>
                            </View>
                            <View style = {styles.infoContainer}>
                                    <Text style ={ styles.infoText }> Latitude: {this.state.location.latitude}</Text>
                                    <Text style ={ styles.infoText }> Longitude: {this.state.location.longitude}</Text>
                                    <Text style ={ styles.infoText }> Altitude (km): {this.state.location.altitude}</Text>
                                    <Text style ={ styles.infoText }> Velocidade (km/h): {this.state.location.velocity}</Text>
                            </View>
                        </ImageBackground>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        marginTop: Platform.OS ===  "android" ? StatusBar.currentHeight : 0
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover"
    },
    titleContainer: {
        flex: 0.1,
        justifyContent: "center",
        alignItems: "center"
    },
    titleText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white"
    },
    mapContainer: {
        flex: 0.6
    },
    map: {
        width: "100%",
        height: "100%"
    },
    issIcon: {
        height: 50, 
        width: 50
    },
    loadingLocation: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    infoContainer: {
        flex: 0.2,
        backgroundColor: "white",
        marginTop: -10,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 30,
    }, 
    infoText: {
        fontSize: 15,
        color: "black",
        fontWeight: "bold"
    }
})