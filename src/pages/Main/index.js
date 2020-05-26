import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Keyboard, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api';

import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText,
} from './styles';

export default function Main() {
  const navigation = useNavigation();

  const [newUser, setNewUser] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  function handleNavigate(user) {
    navigation.navigate('User', { user });
  }

  useEffect(async () => {
    const usersStorage = await AsyncStorage.getItem('users');

    if (usersStorage) {
      setUsers(JSON.parse(usersStorage));
    }
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  async function handleAddUser() {
    setLoading(true);

    try {
      const response = await api.get(`/users/${newUser}`);

      const data = {
        name: response.data.name,
        login: response.data.login,
        bio: response.data.bio,
        avatar: response.data.avatar_url,
      };

      setUsers([...users, data]);
      setNewUser('');
      setLoading(false);

      Keyboard.dismiss();
    } catch (error) {
      console.tron.log(error);
      setLoading(false);
    }
  }

  return (
    <Container>
      <Form>
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Adicionar usuário"
          value={newUser}
          onChangeText={(text) => setNewUser(text)}
          returnKeyType="send"
          onSubmitEditing={handleAddUser}
        />

        <SubmitButton loading={loading} onPress={handleAddUser}>
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Icon name="add" size={20} color="#FFF" />
          )}
        </SubmitButton>
      </Form>

      <List
        data={users}
        keyExtractor={(user) => user.login}
        renderItem={({ item: user }) => (
          <User>
            <Avatar source={{ uri: user.avatar }} />
            <Name>{user.name}</Name>
            <Bio>{user.bio}</Bio>

            <ProfileButton onPress={() => handleNavigate(user)}>
              <ProfileButtonText>Ver perfil</ProfileButtonText>
            </ProfileButton>
          </User>
        )}
      />
    </Container>
  );
}
