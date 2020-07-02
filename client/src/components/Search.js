import React from 'react';
import { Input } from 'antd';

const { Search } = Input;

const SearchInput = ({ handleSearch }) => {
  return (
    <Search
      style={{ marginBottom: '16px' }}
      placeholder="input search text"
      enterButton="Search"
      size="large"
      onSearch={(value) => handleSearch(value)}
    />
  );
};

export default SearchInput;
