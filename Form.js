import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text, ScrollView } from "react-native";
import api from "./services/api"
import FlashMessage, { showMessage }  from "react-native-flash-message";

import { CreditCardInput } from './components/CreditCard'

const s = StyleSheet.create({

  switch: {
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  container: {
    backgroundColor: "#FFF",
    width: "100%",
    height: "100%",
    paddingTop: 90,
  },
  label: {
    color: "black",
    width: 200,
    fontSize: 13,
  },
  input: {
    fontSize: 16,
    color: "black",
  },
 
  button: {
    alignItems: "center",
    marginTop: 50,
    borderRadius: 10,
    alignSelf: "center",
    justifyContent: "center",
    width: 340,
    height: 80,
    backgroundColor: "#00a000",
    padding: 10,
    marginBottom: 30
  },
  text: {
      color: "#FFF",
      fontSize: 18
  }
});


export default class Form extends Component {
  state = { content: {} };

  _onChange = (formData) => this.setState({ content: formData });

  render() {

    function formatJSON(json) {
      return Array.of(json)
    }

    function callAPI(formatedJSON){
      api.post("/pay", formatedJSON).then(res => {
        showMessage ({
          message :  "Pagamento Efetuado Com sucesso!" ,
          type :  "success" ,
       });
      }).catch(error => {
        showMessage ({
          message :  "Não foi possivel realizar o pagamento!" ,
          type :  "danger" ,
       });
      })
    }

    const onPress = () => {

      const contentValues = {
        number: this.state.content.values.number,
        name: this.state.content.values.name,
        cvc: this.state.content.values.cvc,
        expiry: this.state.content.values.expiry
      }

      const formatedJSON = formatJSON(contentValues)

      callAPI(formatedJSON)

    };
    return (
      <View style={s.container}>
          <ScrollView>
            <CreditCardInput

              requiresName
              requiresCVC
              labelStyle={s.label}
              inputStyle={s.input}
              inputContainerStyle={{ marginVertical: 15}}
              placeholders={{ number: "Número", expiry: "MM/AA", cvc: "CVC", name: "Nome" }}
              labels={{ number: "Número", expiry: "Vencimento do Cartão", cvc: "CVC", name: "Nome do Titular" }}
              validColor={"black"}
              invalidColor={"red"}
              placeholderColor={"darkgray"}
              onFocus={this._onFocus}
              onChange={this._onChange} />
          
          <TouchableOpacity
            style={s.button}
            onPress={onPress}>

            <Text style={s.text}>Realizar pagamento</Text>
      </TouchableOpacity>
</ScrollView>
      <FlashMessage position="top" animated={true} />
      
      </View>
    );
  }
}