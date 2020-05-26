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
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  async function loadMore() {
    if (loading) return;

    setLoading(true);

    try {
      const response = await api.get(`/users/${user.login}/starred`, {
        params: { page },
      });

      setStars([...stars, ...response.data]);
      setPage(page + 1);
    } catch (error) {
      console.tron.log(error);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadMore();
  }, []);

  return (
    <Container>
      <Header>
        <Avatar source={{ uri: user.avatar }} />
        <Name>{user.name}</Name>
        <Bio>{user.bio}</Bio>
      </Header>

      <Stars
        data={stars}
        keyExtractor={(star) => String(star.id)}
        onEndReachedThreshold={0.2}
        onEndReached={loadMore}
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
