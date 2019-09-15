import React, { Component } from 'react';
import Layout from '../components/layout';
import getConfig from 'next/config';
import Loader from '../components/uploader';

const { publicRuntimeConfig } = getConfig();

class Page extends Component {
    render() {
      return (
        <Layout>
            <h1>Magical File Drop</h1>    
            <Loader />
        </Layout>
      );
  }
}

export default Page;