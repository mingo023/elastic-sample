import React from 'react';
import { Card, Col, Row } from 'antd';

const PostList = ({ posts = [] }) => {
  const renderList = (posts) =>
    posts.map((post) => {
      return (
        <Col style={{ marginBottom: '16px' }} key={post._id} span={6}>
          <Card
            hoverable
            title={post._source.title}
            style={{ width: 240 }}
          >
            <p style={{ height: '150px', overflow: 'hidden' }}>
              {post._source.content}
            </p>
          </Card>
        </Col>
      );
    });

  return <Row gutter={16}>{renderList(posts)}</Row>;
};

export default PostList;
