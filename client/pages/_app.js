/* /pages/_app.js */

import Layout from "../components/Layout";
import withData from "../lib/apollo";

import App, { Container } from "next/app";
import React from "react";

import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "http://localhost:1337/graphql"
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
              <Layout isAuthenticated={isAuthenticated} {...pageProps}>
                <Component {...pageProps} />
              </Layout>

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