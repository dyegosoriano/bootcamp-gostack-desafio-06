import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Title,
  Info,
  Author,
} from './styles';

export default function User() {
  const route = useRoute();
  const { user } = route.params;

  const [stars, setStars] = useState([]);

  useEffect(async () => {
    try {
      const response = await api.get(`/users/${user.login}/starred`);
      setStars(response.data);
    } catch (error) {
      console.tron.log(error);
    }
  }, []);

  console.tron.log(user);
  console.tron.log(stars);

  return (
    <Container>
      <Header>
        <Avatar source={{ uri: user.avatar }} />
        <Name>{user.name}</Name>
        <Bio>Biografia {user.bio}</Bio>
      </Header>

      <Stars
        data={stars}
        keyExtractor={(star) => String(star.id)}
        renderItem={({ item }) => (
          <Starred>
            <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
            <Info>
              <Title>{item.name}</Title>
              <Author>{item.owner.login}</Author>
            </Info>
          </Starred>
        )}
      />
    </Container>
  );
}
