import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from 'antd';

const Home: NextPage = () => {
    const router = useRouter();
    return (
        <div>
            <Button
                type='primary'
                size='large'
                onClick={() => {
                    router.push({
                        pathname: '/templates',
                    });
                }}>
                Create My Resume
            </Button>
        </div>
    );
};

export default Home;
