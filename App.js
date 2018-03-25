import React, { Component } from "react";
import { StyleSheet, Text, View, Image, StatusBar } from "react-native";
import Weather from "./Weather";

const API_KEY = "58518ea993120192f1bc041a7a1b9df9";
export default class App extends Component {
  state = {
    isLoaded: false,
    error: null,
    temparature: null,
    name: null
  };
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this._getWeather(position.coords.latitude, position.coords.longitude);
      },
      error => {
        this.setState({
          error: "something went wrong."
        });
      }
    );
  }
  _getWeather = (lat, long) => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=${API_KEY}`
    )
      .then(response => response.json())
      .then(json => {
        this.setState({
          temparature: json.main.temp,
          name: json.weather[0].main,
          isLoaded: true
        });
      });
  };
  render() {
    const { isLoaded, error, temparature, name } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        {isLoaded ? (
          <Weather weatherName={name} temp={Math.ceil(temparature - 273.15)} />
        ) : (
          <View style={styles.loading}>
            <Text style={styles.loadingText}>Getting the fucking weather</Text>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  loading: {
    flex: 1,
    backgroundColor: "#FDF6AA",
    justifyContent: "flex-end",
    paddingLeft: 25
  },
  loadingText: {
    fontSize: 38,
    marginBottom: 24
  },
  errorText: {
    color: "red",
    backgroundColor: "transparent",
    marginBottom: 45
  }
});
