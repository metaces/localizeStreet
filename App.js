import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Keyboard
} from 'react-native';

import api from './src/services/api'

export default function App() {

  const [cep, setCep] = useState('');
  const inputRef = useRef(null);
  const [cepUser, setCepUser] = useState(null);

  function limpar() {
    setCep('');
    setCepUser(null);
    inputRef.current.focus();
  }

  async function buscar() {
    if(cep === '') {
      Alert.alert('Erro', 'Digite um cep valido');
      setCep('');
      return;
    }

    try {
      const response = await api.get(`/${cep}/json`);
      setCepUser(response.data);
      Keyboard.dismiss();
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{alignItems:'center'}}>
        <Text style={styles.text}>Digite o Cep:</Text>
        <TextInput 
          style={styles.input}
          placeholder="Ex: 987987987"
          value={cep}
          onChangeText={(texto) => setCep(texto)}
          keyboardType="numeric"
          ref={inputRef}
        />
      </View>
      <View style={styles.areaBtn}>
        <TouchableOpacity 
          style={[styles.botao, {backgroundColor: '#1d75cd'}]}
          onPress={ buscar }
          >
          <Text style={styles.botaoTexto}>Buscar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.botao, {backgroundColor: '#cd1e1d'}]}
          onPress={ limpar }
          >
          <Text style={styles.botaoTexto}>Limpar</Text>
        </TouchableOpacity>
      </View>

      {cepUser && 
        <View style={styles.resultado}>
          <Text style={styles.itemText}>Cep: {cepUser.cep}</Text>
          <Text style={styles.itemText}>Logradouro: {cepUser.logradouro}</Text>
          <Text style={styles.itemText}>Bairro: {cepUser.bairro}</Text>
          <Text style={styles.itemText}>Cidade: {cepUser.localidade}</Text>
          <Text style={styles.itemText}>Estado: {cepUser.uf}</Text>
        </View>
      }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  text: {
    marginTop: 25,
    marginBottom: 25,
    fontSize: 25,
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    width: '90%',
    padding: 10,
    fontSize: 18,
  },
  areaBtn: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-around'
  },
  botao: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
  },
  botaoTexto: {
    fontSize: 22,
    color: '#fff',
  },
  resultado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemText: {
    fontSize: 22,
  }
});