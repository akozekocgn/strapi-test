/* /pages/_app.js */

import Layout from "../components/Layout";
import withData from "../lib/apollo";

import App, { Container } from "next/app";
import React from "react";
import AppProvider from "../components/Context/AppProvider";

import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "@apollo/react-hooks";
// import ApolloClient from "apollo-boost";
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

import { setContext } from 'apollo-link-context';
import Cookies from "js-cookie";

// const httpLink = createHttpLink({
//   uri: 'http://localhost:1337/graphql2',
// });

const httpLink = new HttpLink({
  uri: 'http://localhost:1337/graphql'
})
const cache = new InMemoryCache();

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = Cookies.get('jwt');
  console.log('TOKEN', token)

  const context = {
    headers: {
      ...headers
    }
  }

  if (token) {
    context.headers.authorization = `Bearer ${token}`
  }
  // return the headers to the context so httpLink can read them
  return context
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache
});

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }

  render() {
    const { Component, pageProps, isAuthenticated, ctx } = this.props;
    return (
      <ApolloProvider client={client}>
        <ApolloHooksProvider client={client}>
          {
            <Container>
              <AppProvider>
                <Layout isAuthenticated={isAuthenticated} {...pageProps}>
                  <Component {...pageProps} />
                </Layout>
              </AppProvider>
              <style jsx global>
                {`
                  a {
                    color: white !important;
                  }
                  a:link {
                    text-decoration: none !important;
                    color: white !important;
                  }
                  a:hover {
                    color: white;
                  }
                  .card {
                    display: inline-block !important;
                  }
                  .card-columns {
                    column-count: 3;
                  }
                `}
              </style>
            </Container>
        }
        </ApolloHooksProvider>
        </ApolloProvider>
    );
  }
}
export default withData(MyApp);