import React from "react";
import { Layout } from "antd";

import NavBar from "components/NavBar/NavBar";
import "layouts/MasterLayout/MasterLayout.css";

const { Content } = Layout;

export default ({ children }) => (
  <>
    <Layout>
      <NavBar />
      <Layout>
        <Content className="content">{children}</Content>
      </Layout>
    </Layout>
  </>
);
