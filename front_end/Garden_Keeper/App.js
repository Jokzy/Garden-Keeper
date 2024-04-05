import React, { useState , useEffect} from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

export default function App() {
  const ip_adresse = "10.186.2.117"

  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState('');

  // useEffect(() => {
  //     fetch(`http://127.0.0.1:8000/get-data/${searchText}`)
  //         .then(response => response.json())
  //         .then(data => setSearchResult(data))
  //         .catch((err) => setSearchResult("No plant!"))
  //   }, []);


  // const handleSearch = () => {
  //   //setSearchResult(searchText)
  //
  //   fetch(`http://127.0.0.1:8000/get-data/${searchText}/`)
  //         .then(response => response.json())
  //         .then(data => setSearchResult(data))
  //         .catch((error) => console.error(error))
  // }


    const handleSearch = async () => {
      const response = await fetch(`http://${ip_adresse}:8000/get-data/${searchText}/`)

      const info_as_object = await response.json()
      setSearchResult(JSON.stringify(info_as_object))
  }


  return (
      <View style={styles.container}>
        <TextInput
            style={styles.input}
            placeholder="Type here to search..."
            value={searchText}
            onChangeText={text => setSearchText(text)}
        />
        <Button title="Search" onPress={handleSearch}/>
        <Text style={styles.result}>{searchResult}</Text>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  result: {
    marginTop: 20,
    fontSize: 16,
  },
});


