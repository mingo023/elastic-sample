import React, { useReducer } from 'react';
import { Layout } from 'antd';

import axios from './config/axiosInstance';
import SearchInput from './components/Search';
import PostList from './components/PostList';

import 'antd/dist/antd.css';

const { Content } = Layout;

const initialState = {
  posts: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'fetchPostsSuccess': {
      return { posts: action.payload };
    }
    default:
      throw new Error();
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  async function getProducts(q) {
    const res = await axios.get(`/search?q=${q}`);
    console.log(res.data);
    dispatch({ type: 'fetchPostsSuccess', payload: res.data });
  }
  return (
    <Layout>
      <Content
        style={{
          padding: 24,
          margin: 0,
          minHeight: '100vh'
        }}
      >
        <SearchInput handleSearch={getProducts} />
        <PostList posts={state.posts} />
      </Content>
    </Layout>
  );
}

export default App;
