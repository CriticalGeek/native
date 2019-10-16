import React, {Component} from 'react';
import {StyleSheet, View,Alert, ActivityIndicator} from 'react-native';

import {Container, Content,Button,Text} from 'native-base';

import FooterActions from '../../components/FooterActions';
import ContractorHeader from '../../components/ContractorHeader';
import CertiHeader from '../../components/Header';
import EntryList from '../../components/EntryList';

import server from '../../libraries/server';
import AsyncStorage from '@react-native-community/async-storage';

export default class ContractorQrDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scanner:undefined,
      email_contratista:null,
      token:'',
      email_empleado_seguridad:null,
      planta_area: "Taller",
      invalidCode:false,
      isLoading:false,
      contratista: [],
      email: '',
      head: {
        nombre: '',
        apellido_paterno: '',
        imgUrl: '',
      },
      eventCards: '',
    };

    this.handleCheckIn = this.handleCheckIn.bind(this);
    this.handleCheckOut = this.handleCheckOut.bind(this);
  }

  async componentWillMount() {
    var TokenJWT = await AsyncStorage.getItem('AUTH_TOKEN');
    const api_url = await AsyncStorage.getItem('API_URL')
    const email_seguridad = await AsyncStorage.getItem('ACCOUNT_ID')

    const codeQr = this.props.navigation.getParam("contratistaQR", "No data read");
    console.log("THIS ES",codeQr)
    const scanner = this.props.navigation.getParam("scanner", () => false);

   if (codeQr === 'No data read') {
     this.setState({ invalidCode: true, scanner: scanner });
    }
    server
      .getContratistaInPlantaTimeLineNanoId(TokenJWT, codeQr)
      .then(response => {
        console.log(response)
        if(response.data){
          try {
            const email = response.email;
            this.setState({
              token:TokenJWT,
              email_empleado_seguridad:email_seguridad,
              email_contratista: response.data.contratista.email,
              head: {
                empresa:response.data.contratista.empresa_contratista,
                nombre: response.data.contratista.nombre,
                apellido_paterno: response.data.contratista.apellido_paterno,
                imgUrl: response.data.contratista.image_profile,
              },
              eventCards: response.data.date_events,
            });
          } catch (error) {
            throw new Error(error);
          }
        }else{
          throw new Error(response.message);
        }

      })
      .catch(error => {
        console.log('Error en el QR', error.message);
        this.setState({ invalidCode: true,scanner: scanner});
      });

    }

  render() {
    var callback = res => {
      this.props.navigation.navigate('ContractorLogDetail', {
        entryDay: res.entryDay,
        email: res.email,
      });
    };
    return (
      <Container>
        <CertiHeader />

        <Content style={styles.main}>
          <ContractorHeader
            nombre={this.state.head.empresa}
            apellido={`${this.state.head.nombre} ${this.state.head.apellido_paterno}`}
            imgUrl={this.state.head.imgUrl}
          />
          <View style={styles.cardscontainer}>
            <EntryList
              eventCards={this.state.eventCards}
              email={this.state.email}
              entrycallback={callback}
            />
            <Button
              rounded
              block
              style={styles.button}
              onPress={this.handleCheckIn}>
              <Text>CheckIN</Text>
            </Button>

            <Button
              rounded
              block
              style={styles.button}
              onPress={this.handleCheckOut}>
              <Text>CheckOut</Text>
            </Button>
            <Button
              rounded
              block
              style={styles.button}
              onPress={this.handleCheckOut}>
              <Text>Incidente</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }

  handleCheckIn = async () =>{
      this.setState({isLoading:true})

      const newEntry = {
        email_contratista:this.state.email_contratista,
        email_empleado_seguridad:this.state.email_empleado_seguridad,
        planta_area: this.state.planta_area
      };
      console.log("DAtos Entry",JSON.stringify(newEntry));
    server.add_checkIn(this.state.token,newEntry)
      .then((response)=>{
          let message = JSON.stringify(response)
          console.log(message)
          try{
             message = `OperationID:${response.transactionId}`
          }
          catch(error){
            console.log(error)
          }
          Alert.alert(
            'CheckIn Confirmation',
            message,
            [
            //  {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
              {text: 'Yes', onPress: ()=>{

                return this.props.navigation.navigate('Companies');
              }},
            ],
            { cancelable: false }
          )
        //this.props.navigation.navigate('App');
        //this.navigationWithPush('ContractorList');
      })
      .catch((error)=>{
        console.log(error);
        this.props.navigation.navigate('App');
      })


    }

  handleCheckOut = async () =>{
        this.setState({isLoading:true})
        const newEntry = {
          email_contratista:this.state.email_contratista,
          email_empleado_seguridad:this.state.email_empleado_seguridad,
          planta_area: this.state.planta_area
        };

        console.log("DAtos Entry",JSON.stringify(newEntry));

      server.add_checkout(this.state.token,newEntry)
        .then((response)=>{
          console.log("FUNCIONA",Object.keys(response))
          let message = JSON.stringify(response)
          try{
             message = `OperationID:${response['transactionId']}`
          }
          catch(error){
            console.log(error)
          }

          Alert.alert(
            'CheckOut Confirmation',
            message,
            [
              //{text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
              {
                text: 'Ok',
                onPress:()=>{
              
                return this.props.navigation.navigate('Companies');
                }
              },
            ],
            { cancelable: false }
          )

        })
        .catch((error)=>{
          console.log(error);
          this.props.navigation.navigate('App');

        })


      }

}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#FCFCFC',
    position: 'relative',
  },
  cardscontainer: {
    padding: 30,
    flex: 1,
    marginTop: -100,
  },
  header: {
    height: 70,
    backgroundColor: '#000',
  },
  header__text: {
    color: '#fff',
  },
});
