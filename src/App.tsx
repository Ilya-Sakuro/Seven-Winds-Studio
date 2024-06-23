import { Layout } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import Rows from 'components/Rows/Rows';
import './App.scss';

function App() {
    return (
        <Layout>
            <Header className='back'>Header</Header>
            <Layout>
                <Sider className='back' width='234px'>
                    Sider
                </Sider>
                <Content className='back__content'>
                    <Rows />
                </Content>
            </Layout>
        </Layout>
    );
}

export default App;
